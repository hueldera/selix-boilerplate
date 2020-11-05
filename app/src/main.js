import * as THREE from 'three/build/three.module'
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls'
import { generateHeight, generateTexture } from './demo/functions'
import { gsap } from 'gsap'
import setupLoading from './loading'

export default class Main {
  constructor (experience) {
    this.exp = experience
  }

  setup () {
    const { sceneRef, renderer, camera } = this.exp.getDefaults()
    setupLoading()
    this.scene = sceneRef
    this.renderer = renderer
    this.camera = camera

    // Your code here
    this.clock = new THREE.Clock()
    this.controls = new FirstPersonControls(camera, this.renderer.domElement)
  }

  init () {
    this.controls.handleResize()
    const worldDepth = 256,
      worldWidth = 256

    this.scene.background = new THREE.Color(0xefd1b5)
    this.scene.fog = new THREE.FogExp2(0xefd1b5, 0.0025)

    const data = generateHeight(worldWidth, worldDepth)

    this.camera.position.set(100, 800, -800)
    this.camera.lookAt(-100, 810, -800)

    const geometry = new THREE.PlaneBufferGeometry(
      7500,
      7500,
      worldWidth - 1,
      worldDepth - 1
    )

    geometry.rotateX(-Math.PI / 2)

    const vertices = geometry.attributes.position.array

    for (let i = 0, j = 0, l = vertices.length; i < l; i++, j += 3) {
      vertices[j + 1] = data[i] * 10
    }

    const texture = new THREE.CanvasTexture(
      generateTexture(data, worldWidth, worldDepth)
    )
    texture.wrapS = THREE.ClampToEdgeWrapping
    texture.wrapT = THREE.ClampToEdgeWrapping

    const mesh = new THREE.Mesh(
      geometry,
      new THREE.MeshBasicMaterial({ map: texture })
    )
    this.scene.add(mesh)

    this.controls.movementSpeed = 150
    this.controls.lookSpeed = 0.1
  }

  update () {}

  pointerMove () {}

  render () {
    this.controls.update(this.clock.getDelta())
  }

  windowResize () {
    this.controls.handleResize()
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }
}

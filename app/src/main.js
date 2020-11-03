import * as THREE from 'three/build/three.module'
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls'
import { exp } from '../index'
import { generateHeight, generateTexture } from './demo/functions'
// import setupStore from './store'

function main () {
  const worldWidth = 256,
    worldDepth = 256,
    clock = new THREE.Clock()
  let controls

  // run on start
  exp.subscribeToInit('main', ctx => {
    const { sceneRef, renderer, camera } = ctx.getDefaults()
    controls = new FirstPersonControls(camera, renderer.domElement)

    sceneRef.background = new THREE.Color(0xefd1b5)
    sceneRef.fog = new THREE.FogExp2(0xefd1b5, 0.0025)

    const data = generateHeight(worldWidth, worldDepth)

    camera.position.set(100, 800, -800)
    camera.lookAt(-100, 810, -800)

    // controls.update()

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
    sceneRef.add(mesh)

    controls.movementSpeed = 150
    controls.lookSpeed = 0.1
  })

  // update every frame
  exp.subscribeToUpdate('main', ctx => {
    const { sceneRef, renderer, camera } = ctx.getDefaults()
  })

  exp.subscribeToRender('main', ctx => {
    const { sceneRef, renderer, camera } = ctx.getDefaults()
    controls.update(clock.getDelta())
  })

  // pointer move
  exp.subscribeToPointerMove('main', (event, ctx) => {
    const { sceneRef, renderer, camera } = ctx.getDefaults()
  })

  // resize window
  exp.subscribeToInit('windowResize', ctx => {
    try {
      controls.handleResize()
    } catch {}
  })
}

export default main

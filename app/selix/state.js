import * as THREE from 'three/build/three.module'

export class ExperienceState {
  constructor () {
    this.scenes = {
      default: {
        scene: new THREE.Scene(),
        cameras: {
          default: new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
          )
        }
      }
    }
    this.renderers = { default: new THREE.WebGLRenderer({ antialias: true }) }
    this.renderers.default.setSize(window.innerWidth, window.innerHeight)
  }
}

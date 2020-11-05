import * as THREE from 'three/build/three.module'

export class ExperienceState {
  constructor () {
    this.loading = {
      loading: {
        isLoading: true,
        progress: 0,
        errors: undefined
      }
    }
    this.scenes = {
      default: {
        scene: new THREE.Scene(),
        cameras: {
          default: new THREE.PerspectiveCamera(
            60,
            window.innerWidth / window.innerHeight,
            1,
            10000
          )
        }
      }
    }
    this.custom = {}

    this.renderers = { default: new THREE.WebGLRenderer({ antialias: true }) }

    // default setup

    this.scenes.default.cameras.default.aspect =
      window.innerWidth / window.innerHeight
    this.scenes.default.cameras.default.updateProjectionMatrix()

    this.renderers.default.setSize(window.innerWidth, window.innerHeight)
    this.renderers.default.setPixelRatio(window.devicePixelRatio)
    this.renderers.default.autoClear = false
    this.renderers.default.shadowMap.enabled = true
    this.renderers.default.shadowMap.type = THREE.BasicShadowMap
  }

  addCustomMembers (object) {
    this.custom = { ...this.custom, ...object }
  }

  addCustomMember (key, value) {
    const nObject = {}
    nObject[key] = value
    this.custom = { ...this.custom, ...nObject }
  }

  retrieveMembers (membersArray) {
    if (membersArray.length === 0) {
      return this.custom
    }

    if (membersArray.length === 1) {
      return this.custom[membersArray[0]]
    }

    var resultObject = {}
    for (var key of membersArray) {
      if (this.custom[key]) {
        resultObject[key] = this.custom[key]
      }
    }
    return resultObject
  }
}

import * as THREE from 'three/build/three.module'
import { ExperienceState } from './state'

class Experience {
  constructor () {
    this.state = new ExperienceState()
    this.animate = this.animate.bind(this)
    this.init = this.init.bind(this)
    this.onUpdatePub = {}
    this.onInitPub = {}

    this.render = ({ renderer, sceneRef, camera }) =>
      renderer.render(sceneRef, camera)

    this.subscribeToInit('__renderer', ctx => {
      document
        .getElementById('canvas')
        .appendChild(this.state.renderers.default.domElement)
    })
    this.subscribeToUpdate('__renderer', ctx => {
      ctx.state.renderers.default.render(
        ctx.state.scenes.default.scene,
        ctx.state.scenes.default.cameras.default
      )
    })
  }

  start () {
    this.init()
    this.animate()
  }

  subscribeToInit (id, f) {
    this.onInitPub[id] = f
  }

  unsubscribeFromInit (id) {
    delete this.onInitPub[id]
  }

  getDefaultCamera () {
    return this.state.scenes.default.cameras.default
  }

  setDefaultCamera (camera) {
    this.state.scenes.default.cameras.default = camera
  }

  getDefaultScene () {
    return this.state.scenes.default
  }

  getDefaultSceneRef () {
    return this.state.scenes.default.scene
  }

  getDefaultRenderer () {
    return this.state.renderers.default
  }

  subscribeToUpdate (id, f) {
    this.onUpdatePub[id] = f
  }

  unsubscribeFromUpdate (id) {
    delete this.onUpdatePub[id]
  }

  getDefaults () {
    return {
      camera: this.getDefaultCamera(),
      renderer: this.getDefaultRenderer(),
      scene: this.getDefaultScene(),
      sceneRef: this.getDefaultSceneRef()
    }
  }

  init () {
    Object.values(this.onInitPub).map(f => {
      f(this)
    })
  }

  animate () {
    requestAnimationFrame(this.animate)

    Object.values(this.onUpdatePub).map(f => {
      f(this)
    })

    this.render(this.getDefaults())
  }
}

export default Experience

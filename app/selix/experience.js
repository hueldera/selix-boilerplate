import * as THREE from 'three/build/three.module'
import { ExperienceState } from './state'

class Experience {
  constructor () {
    this.state = new ExperienceState()
    this.animate = this.animate.bind(this)
    this.init = this.init.bind(this)
    this.pointerMove = this.pointerMove.bind(this)
    this.render = this.render.bind(this)
    this.onUpdatePub = {}
    this.onInitPub = {}
    this.onRenderPub = {}
    this.onPointerMovePub = {}

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
    document.body.addEventListener('pointermove', this.pointerMove, false)
  }

  registerClass (classRef) {
    const classObj = new classRef(this)

    classObj.setup()
    this.subscribeToInit('main', classObj.init, classObj)
    this.subscribeToUpdate('main', classObj.update, classObj)
    this.subscribeToPointerMove('main', classObj.pointerMove, classObj)
    this.subscribeToRender('main', classObj.render, classObj)
    window.addEventListener('resize', () => classObj.windowResize(), false)
  }

  start () {
    this.init()
    this.animate()
  }

  subscribeToInit (id, f, ctx) {
    this.onInitPub[id] = f.bind(ctx)
  }

  unsubscribeFromInit (id) {
    delete this.onInitPub[id]
  }

  subscribeToRender (id, f, ctx) {
    this.onRenderPub[id] = f.bind(ctx)
  }

  unsubscribeFromRender (id) {
    delete this.onRenderPub[id]
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

  subscribeToUpdate (id, f, ctx) {
    this.onUpdatePub[id] = f.bind(ctx)
  }

  unsubscribeFromUpdate (id) {
    delete this.onUpdatePub[id]
  }

  subscribeToPointerMove (id, f, ctx) {
    this.onPointerMovePub[id] = f.bind(ctx)
  }

  unsubscribeFromPointerMove (id) {
    delete this.onPointerMovePub[id]
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

  pointerMove (event) {
    Object.values(this.onPointerMovePub).map(f => {
      f(event, this)
    })
  }

  render ({ renderer, sceneRef, camera }) {
    Object.values(this.onRenderPub).map(f => {
      f(this)
    })

    renderer.render(sceneRef, camera)
  }

  animate () {
    requestAnimationFrame(this.animate)

    Object.values(this.onUpdatePub).map(f => {
      f(this)
    })

    this.render(this.getDefaults())
  }

  store (key, value) {
    if (arguments.length === 0) {
      return { ...this.custom }
    } else if (typeof key === 'string') {
      if (typeof value !== 'undefined') {
        return this.state.addCustomMember(key, value)
      } else {
        return this.state.retrieveMembers([key])
      }
    } else if (typeof key === 'object' && !Array.isArray(key)) {
      return this.state.addCustomMembers(key)
    } else if (typeof key === 'object' && Array.isArray(key)) {
      return this.state.retrieveMembers(key)
    } else {
      return { sxNotFound: 'Not Found' }
    }
  }
}

export default Experience

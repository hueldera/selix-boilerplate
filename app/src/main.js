import * as THREE from 'three/build/three.module'
import { project } from '../index'
import fragmentShader from './shaders/default.frag'
import vertexShader from './shaders/default.vert'

function main () {
  // write your code here
  const uniforms = {}
  const objects = {}

  project.subscribeToInit('shaderSetup', ctx => {
    // run on start
    const { sceneRef, renderer, camera } = ctx.getDefaults()
  })

  project.subscribeToUpdate('timeUniform', ctx => {
    // update every frame
  })
}

export default main

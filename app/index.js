import * as THREE from 'three/build/three.module'
import Experience from './selix/experience'
import main from './src/main'
export const exp = new Experience()

exp.subscribeToInit('windowResize', ctx => {
  const { camera, renderer } = ctx.getDefaults()
  renderer.setPixelRatio(window.devicePixelRatio)

  window.addEventListener('resize', onWindowResize, false)
  function onWindowResize () {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }
})

main()
exp.start()

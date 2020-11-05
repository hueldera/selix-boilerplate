import * as THREE from 'three/build/three.module'
import Experience from './selix/experience'
import Main from './src/main'
export const exp = new Experience()

exp.registerClass(Main)
exp.start()
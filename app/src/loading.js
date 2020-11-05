import * as THREE from 'three/build/three.module'

export default function setupLoading () {
  console.log('Loading')
  THREE.DefaultLoadingManager.onStart = function (
    url,
    itemsLoaded,
    itemsTotal
  ) {
    document.querySelector('#loading').style.display = 'flex'
    document.querySelector('#root').style.overflow = 'hidden'
  }

  THREE.DefaultLoadingManager.onProgress = function (
    url,
    itemsLoaded,
    itemsTotal
  ) {
    document.querySelector('#loading h2').textContent =
      'Loading...' + ((itemsLoaded / itemsTotal) * 100).toFixed(1) + '%'
    document.querySelector('#loading .progressBar').style.width =
      (itemsLoaded / itemsTotal) * 100 + '%'
  }

  THREE.DefaultLoadingManager.onLoad = function () {
    document.querySelector('#loading').style.display = 'none'
    document.querySelector('#root').style.overflow = 'initial'
  }

  THREE.DefaultLoadingManager.onError = function (url) {
    console.log('There was an error loading ' + url)
  }
}

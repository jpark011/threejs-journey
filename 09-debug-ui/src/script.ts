import { gsap } from 'gsap'
import GUI from 'lil-gui'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const gui = new GUI({
  width: 300,
  title: 'Awesome Debug UI',
  closeFolders: true,
})
const debugObject = {
  color: '#4a6fc4',
  spin: () => {
    gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI * 2 })
  },
  subdivision: 2,
}

window.addEventListener('keydown', e => {
  if (e.key === 'h' || e.key === 'H') {
    gui.show(gui._hidden)
  }
})

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2)
const material = new THREE.MeshBasicMaterial({
  color: debugObject.color,
  wireframe: true,
})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

const cubeTweaks = gui.addFolder('Awesome Cube')

cubeTweaks
  .add(mesh.position, 'y', -5, 5)
  .min(0)
  .max(10)
  .step(0.01)
  .name('Elevation')
cubeTweaks.add(mesh, 'visible')
cubeTweaks.add(material, 'wireframe')
cubeTweaks.addColor(debugObject, 'color').onChange(value => {
  material.color.set(value)
})
cubeTweaks.add(debugObject, 'spin')
cubeTweaks
  .add(debugObject, 'subdivision')
  .min(1)
  .max(20)
  .step(1)
  .onFinishChange(value => {
    mesh.geometry.dispose()
    const newGeometry = new THREE.BoxGeometry(1, 1, 1, value, value, value)
    mesh.geometry = newGeometry
  })
/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()

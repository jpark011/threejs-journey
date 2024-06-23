import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import alpha from '../static/textures/door/alpha.jpg'
import ambientOcclusion from '../static/textures/door/ambientOcclusion.jpg'
import color from '../static/textures/door/color.jpg'
import height from '../static/textures/door/height.jpg'
import metalness from '../static/textures/door/metalness.jpg'
import normal from '../static/textures/door/normal.jpg'
import roughness from '../static/textures/door/roughness.jpg'
import gradient from '../static/textures/gradients/5.jpg'
import matcaps from '../static/textures/matcaps/8.png'

import GUI from 'lil-gui'

const gui = new GUI()

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl') as HTMLElement

const textureLoader = new THREE.TextureLoader()
const alphaTexture = textureLoader.load(alpha)
const ambientOcclusionTexture = textureLoader.load(ambientOcclusion)
const colorTexture = textureLoader.load(color)
const heightTexture = textureLoader.load(height)
const metalnessTexture = textureLoader.load(metalness)
const normalTexture = textureLoader.load(normal)
const roughnessTexture = textureLoader.load(roughness)
const matcapsTexture = textureLoader.load(matcaps)
const gradientTexture = textureLoader.load(gradient)

colorTexture.colorSpace = THREE.SRGBColorSpace
matcapsTexture.colorSpace = THREE.SRGBColorSpace

// Scene
const scene = new THREE.Scene()

// const material = new THREE.MeshBasicMaterial()
// material.transparent = true
// material.opacity = 0.5
// material.side = THREE.DoubleSide

// const material = new THREE.MeshPhongMaterial()
// material.shininess = 100
// material.specular = new THREE.Color(0x1188ff)

// const material = new THREE.MeshToonMaterial()
// gradientTexture.minFilter = THREE.NearestFilter
// gradientTexture.magFilter = THREE.NearestFilter
// gradientTexture.generateMipmaps = false
// material.gradientMap = gradientTexture

// const material = new THREE.MeshStandardMaterial()
// material.roughness = 1
// material.metalness = 1
// material.map = colorTexture
// material.aoMap = ambientOcclusionTexture
// material.aoMapIntensity = 1
// material.displacementMap = heightTexture
// material.displacementScale = 0.05
// material.metalnessMap = metalnessTexture
// material.normalMap = normalTexture
// material.roughnessMap = roughnessTexture
// material.transparent = true
// material.alphaMap = alphaTexture

// gui.add(material, 'metalness').min(0).max(1).step(0.01)
// gui.add(material, 'roughness').min(0).max(1).step(0.01)

const material = new THREE.MeshPhysicalMaterial()
material.roughness = 1
material.metalness = 1
// material.map = colorTexture
// material.aoMap = ambientOcclusionTexture
// material.aoMapIntensity = 1
// material.displacementMap = heightTexture
// material.displacementScale = 0.05
// material.metalnessMap = metalnessTexture
// material.normalMap = normalTexture
// material.roughnessMap = roughnessTexture
// material.transparent = true
// material.alphaMap = alphaTexture

gui.add(material, 'metalness').min(0).max(1).step(0.01)
gui.add(material, 'roughness').min(0).max(1).step(0.01)

// material.clearcoat = 1
// material.clearcoatRoughness = 1

// gui.add(material, 'clearcoat').min(0).max(1).step(0.01)
// gui.add(material, 'clearcoatRoughness').min(0).max(1).step(0.01)

// material.sheen = 1
// material.sheenRoughness = 0.25
// material.sheenColor.set(1, 1, 1)

// gui.add(material, 'sheen').min(0).max(1).step(0.01)
// gui.add(material, 'sheenRoughness').min(0).max(1).step(0.01)
// gui.addColor(material, 'sheenColor')

// material.iridescence = 1
// material.iridescenceIOR = 1
// material.iridescenceThicknessRange = [100, 180]

// gui.add(material, 'iridescence').min(0).max(1).step(0.01)
// gui.add(material, 'iridescenceIOR').min(0).max(1).step(0.01)
// gui.add(material.iridescenceThicknessRange, '0').min(0).max(200).step(1)
// gui.add(material.iridescenceThicknessRange, '1').min(0).max(200).step(1)

material.transmission = 1
material.ior = 1.5
material.thickness = 0.5

gui.add(material, 'transmission').min(0).max(1).step(0.01)
gui.add(material, 'ior').min(0).max(2).step(0.01)
gui.add(material, 'thickness').min(0).max(1).step(0.01)

const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 64, 64), material)
sphere.position.x = -1

const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 100, 100), material)
plane.position.x = 0

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 64, 64),
  material
)
torus.position.x = 1
scene.add(sphere, plane, torus)

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
// scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 30)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

const rgbeLoader = new RGBELoader()
rgbeLoader.load('/textures/environmentMap/2k.hdr', environmentMap => {
  environmentMap.mapping = THREE.EquirectangularReflectionMapping

  scene.background = environmentMap
  scene.environment = environmentMap
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

  sphere.rotation.y = elapsedTime * 0.1
  plane.rotation.y = elapsedTime * 0.1
  torus.rotation.y = elapsedTime * 0.1

  sphere.rotation.x = elapsedTime * -0.15
  plane.rotation.x = elapsedTime * -0.15
  torus.rotation.x = elapsedTime * -0.15

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()

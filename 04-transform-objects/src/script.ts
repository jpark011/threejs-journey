import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')!

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
const group = new THREE.Group()
scene.add(group)

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
group.add(cube1)

const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x00ff00 })
)
group.add(cube2)
cube2.position.x = -2

const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x0000ff })
)
group.add(cube3)
scene.add(group)
cube3.position.x = 2

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
// scene.add(mesh)
mesh.position.set(0.7, -0.6, 1)
mesh.scale.set(2, 0.5, 0.5)
mesh.rotation.x = Math.PI * 0.3
mesh.rotation.y = Math.PI * 0.2
mesh.rotation.z = Math.PI * 0.1

/**
 * Sizes
 */
const sizes = {
  width: 800,
  height: 600,
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.set(1, 1, 4)
scene.add(camera)
console.log(mesh.position.distanceTo(camera.position))

camera.lookAt(group.position)

const axisHelper = new THREE.AxesHelper(3)
scene.add(axisHelper)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)

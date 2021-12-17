import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import {FontLoader} from 'three/examples/jsm/loaders/FontLoader.js'
import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry'

/**
 * Base
 */
// Debug
// const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

//Axes
// const axesHelper = new THREE.AxesHelper()
// scene.add(axesHelper)

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load('/textures/matcaps/white.png')
const pinkTexture = textureLoader.load('/textures/matcaps/Red.png')
scene.background = new THREE.Color("#198E95" )

/**
 * Fonts
 */
const fontLoader = new FontLoader()


fontLoader.load('/fonts/SquidFont.json', (font)=>{
    const textGeometry= new TextGeometry('Squid Game', {
        font,
                    size: 0.5,
                    height: 0.1,
                    curveSegments: 5,
                    bevelEnabled: true,
                    bevelThickness: 0.03,
                    bevelSize: 0.02,
                    bevelOffset: 0,
                    bevelSegments: 5
    })
    // textGeometry.computeBoundingBox()
    // textGeometry.translate(
    //     - (textGeometry.boundingBox.max.x - 0.02)*0.5,
    //     - (textGeometry.boundingBox.max.y - 0.02)*0.5,
    //     - (textGeometry.boundingBox.max.z - 0.03)*0.5,
    // )
    // textGeometry.computeBoundingBox()

    textGeometry.center()
    // const textMaterial = new THREE.MeshBasicMaterial()
    const textMaterial = new THREE.MeshMatcapMaterial()
    textMaterial.matcap=matcapTexture
    const text = new THREE.Mesh(textGeometry, textMaterial)
    scene.add(text)
    // gui.add(textMaterial, 'wireframe')

    const donutGeometry = new THREE.TorusBufferGeometry(0.3,0.1, 20, 45)
    const sphereGeometry = new THREE.SphereBufferGeometry(0.3, 32, 16)
    const triangleGeometry = new THREE.TetrahedronGeometry(0.3, 0)
    const boxGeometry = new THREE.BoxGeometry(0.3, 0.3, 0.3)

    const shapesMaterial = new THREE.MeshMatcapMaterial()
    shapesMaterial.matcap = pinkTexture

    for (let i=0; i<40; i++) {
        const sphere = new THREE.Mesh(donutGeometry, shapesMaterial)
        
        sphere.position.x = (Math.random() -0.5) *10
        sphere.position.y = (Math.random() -0.5) *10
        sphere.position.z = (Math.random() -0.5) *10

        sphere.rotation.x=Math.random() * Math.PI
        sphere.rotation.y=Math.random() * Math.PI

        const scale = Math.random()

        sphere.scale.x=scale
        sphere.scale.y=scale
        sphere.scale.z=scale

        scene.add(sphere)
    }
    for (let i=0; i<40; i++) {
        const sphere = new THREE.Mesh(triangleGeometry, shapesMaterial)
        
        sphere.position.x = (Math.random() -0.5) *10
        sphere.position.y = (Math.random() -0.5) *10
        sphere.position.z = (Math.random() -0.5) *10

        sphere.rotation.x=Math.random() * Math.PI
        sphere.rotation.y=Math.random() * Math.PI

        const scale = Math.random()

        sphere.scale.x=scale
        sphere.scale.y=scale
        sphere.scale.z=scale

        scene.add(sphere)
    }
    for (let i=0; i<40; i++) {
        const sphere = new THREE.Mesh(boxGeometry, shapesMaterial)
        
        sphere.position.x = (Math.random() -0.5) *10
        sphere.position.y = (Math.random() -0.5) *10
        sphere.position.z = (Math.random() -0.5) *10

        sphere.rotation.x=Math.random() * Math.PI
        sphere.rotation.y=Math.random() * Math.PI

        const scale = Math.random()

        sphere.scale.x=scale
        sphere.scale.y=scale
        sphere.scale.z=scale

        scene.add(sphere)
    }
})

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
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
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
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
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
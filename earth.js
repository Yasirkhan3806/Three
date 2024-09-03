import * as THREE from 'three';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.161.0/examples/jsm/controls/OrbitControls.js';


// Set up the renderer
const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

// Set up the camera
const fov = 75;
const near = 0.1;
const aspect = w / h;
const far = 10;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;

// Set up the scene
const scene = new THREE.Scene();

// Set up OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;

const loader = new THREE.TextureLoader();
// Create the geometry and material for the mesh
const geo = new THREE.IcosahedronGeometry(1, 12);
const matMesh = new THREE.MeshStandardMaterial({
map: loader.load("assets/earthmap1k.jpg"), 
});
const mesh = new THREE.Mesh(geo, matMesh);
scene.add(mesh);

// setup dark side 
const lightMesh = new THREE.MeshBasicMaterial({
    color: 0xfaceff
});
const earthLightMesh = new THREE.Mesh(geo,lightMesh);
earthGroup.add(earthLightMesh)
// setup earth tilt 
const earthGroup = new THREE.Group();
earthGroup.rotation.z = -23.4 * Math.PI / 180;
scene.add(earthGroup)
// Optional: Directional light (corrected code)

const sunLight = new THREE.DirectionalLight(0xffffff);
sunLight.position.set(-2.5,-0.2,0.5)
scene.add(sunLight)


// Add an animation loop
function animate(t = 0) {
  requestAnimationFrame(animate);

  // Optional animation logic
  mesh.rotation.y = t * 0.0001;

  controls.update();
  renderer.render(scene, camera);
}

// Start the animation loop
animate();

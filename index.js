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

// Create the geometry and material for the mesh
const geo = new THREE.IcosahedronGeometry(1, 2);
const matMesh = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  flatShading: true
});
const mesh = new THREE.Mesh(geo, matMesh);
scene.add(mesh);

// Set up lighting
const meshLight = new THREE.HemisphereLight(0x00ffaa, 0xffff00);
scene.add(meshLight);

// Optional: Directional light (corrected code)
const sideLight = new THREE.DirectionalLight(0xffffff, 1);
sideLight.position.set(1, 1, 1); // Set position for directional light
scene.add(sideLight);

// Create wireframe material and mesh
const wire = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  wireframe: true
});
const wireMesh = new THREE.Mesh(geo, wire);
mesh.add(wireMesh); // Add wireMesh to the mesh directly

// Add an animation loop
function animate(t = 0) {
  requestAnimationFrame(animate);

  // Optional animation logic
  // mesh.rotation.x = t * 0.001;

  controls.update();
  renderer.render(scene, camera);
}

// Start the animation loop
animate();

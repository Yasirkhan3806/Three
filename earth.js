import * as THREE from "three";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.161.0/examples/jsm/controls/OrbitControls.js";
import getStarfield from "./starfield.js";
import { getFresnelMat } from "./frenelmesh.js";

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
// Create the geo and material for the mesh
const geo = new THREE.IcosahedronGeometry(1, 12);
const matMesh = new THREE.MeshStandardMaterial({
  map: loader.load("assets/earthmap1k.jpg"),
});
const mesh = new THREE.Mesh(geo, matMesh);

// Create a group to represent the Earth and its lighting effects
const earthGroup = new THREE.Group();
earthGroup.rotation.z = (-23.4 * Math.PI) / 180;
earthGroup.add(mesh);
scene.add(earthGroup);

// Set up the dark side of the earth
const lightMesh = new THREE.MeshBasicMaterial({
  map: loader.load("assets/earthlights1k.jpg"),
  blending: THREE.AdditiveBlending,
});
const earthLightMesh = new THREE.Mesh(geo, lightMesh);
earthGroup.add(earthLightMesh);

const cloudMaterial = new THREE.MeshStandardMaterial({
  map: loader.load("assets/earthcloudmap.jpg"),
  transparent: true,
  opacity: 0.2,
  blending: THREE.AdditiveBlending,
  alphaMap: loader.load("assets/earthcloudmaptrans.jpg"),
  // alphaTest:0.3
  depthWrite: false,
  depthTest: false,
});
const cloudMesh = new THREE.Mesh(geo, cloudMaterial);
cloudMesh.scale.setScalar(1.003);
earthGroup.add(cloudMesh);

const fresnelMat = getFresnelMat();
const glowMesh = new THREE.Mesh(geo, fresnelMat);
glowMesh.scale.setScalar(1.01);
earthGroup.add(glowMesh);

const stars = getStarfield({ numStars: 2000 });
scene.add(stars);

// Optional: Directional light (corrected code)
const sunLight = new THREE.DirectionalLight(0xffffff, 2.0);
sunLight.position.set(-2, 0.5, 1.5);
scene.add(sunLight);

// Add an animation loop
function animate(t = 0) {
  requestAnimationFrame(animate);

  // Optional animation logic
  mesh.rotation.y += 0.002;
  earthLightMesh.rotation.y += 0.002;
  cloudMesh.rotation.y += 0.0023;
  glowMesh.rotation.y += 0.002;
  stars.rotation.y -= 0.0002;
  controls.update();
  renderer.render(scene, camera);
}

// Start the animation loop
animate();

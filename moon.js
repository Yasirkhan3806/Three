import * as THREE from 'three';

const loader = new THREE.TextureLoader();
// Create the geo and material for the mesh
const moon = new THREE.IcosahedronGeometry(0.2,12); // Sphere geometry with more segments

const matMesh = new THREE.MeshStandardMaterial({
  map: loader.load("assets/moonmap4k.jpg"),
  bumpMap: loader.load("assets/moonbump4k.jpg"), // Bump map for surface detail
  bumpScale: 0.05 ,
  transparent: false,                            // Ensure transparency is disabled
  opacity: 1,
});
export const moonMesh = new THREE.Mesh(moon, matMesh);


const moonGroup = new THREE.Group();
moonGroup.rotation.z = (-23.4 * Math.PI) / 180;
moonGroup.add(moonMesh);



export default moonGroup;

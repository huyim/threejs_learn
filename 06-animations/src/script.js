import "./style.css";
import * as THREE from "three";
import gsap from "gsap";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

// Method 1
// Time
// let time = Date.now();

// // Animations
// const tick = () => {
//   //Time
//   const currentTime = Date.now();
//   const deltaTime = currentTime - time;
//   time = currentTime;

//   //console.log(deltaTime);

//   //console.log("tick");
//   //Update objects
//   //mesh.position.x += 0.01;
//   // using delta: animation at the same speed regardless of FPS
//   mesh.rotation.y += 0.001 * deltaTime;
//   mesh.rotation.x += 0.001 * deltaTime;
//   //mesh.rotation.z += 0.01;

//   // Render
//   renderer.render(scene, camera);

//   window.requestAnimationFrame(tick);
// };

// tick();

// Method 2
// Clock
//const clock = new THREE.Clock();

gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 });
gsap.to(mesh.position, { duration: 1, delay: 2, x: 0 });

// Animations
const tick = () => {
  // Clock
  //const elapsedTime = clock.getElapsedTime();

  // using delta: animation at the same speed regardless of FPS
  //mesh.rotation.y = elapsedTime * Math.PI * 2; // 一秒转一圈
  //mesh.position.y = Math.sin(elapsedTime);

  // Render
  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

tick();

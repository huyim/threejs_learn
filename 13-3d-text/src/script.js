import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Axes Helper
// const axesHelper = new THREE.AxesHelper();
// scene.add(axesHelper);

/**
 * Textures
 */
const loadingManager = new THREE.LoadingManager();

loadingManager.onStart = () => {
  console.log("onStart");
};

loadingManager.onProgress = () => {
  console.log("onProgress");
};

loadingManager.onLoad = () => {
  console.log("onLoaded");
};

loadingManager.onError = () => {
  console.log("onError");
};

const textureLoader = new THREE.TextureLoader(loadingManager);

const matcapsTexture = textureLoader.load("/textures/matcaps/8.png");

const material = new THREE.MeshMatcapMaterial();
material.matcap = matcapsTexture;

/**
 * Fonts
 */

const fontLoader = new FontLoader();

// bevel 斜角
fontLoader.load("/fonts/PuHuiTi_Regular.json", (font) => {
  const textGeometry = new TextGeometry("苏黎世", {
    font: font,
    size: 0.5,
    height: 0.2,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 5,
  });
  textGeometry.computeBoundingBox();
  console.log(textGeometry.boundingBox);
  // Move every vertices
  textGeometry.translate(
    -textGeometry.boundingBox.max.x * 0.5,
    -textGeometry.boundingBox.max.y * 0.5,
    -textGeometry.boundingBox.max.z * 0.5
  );

  const text = new THREE.Mesh(textGeometry, material);

  scene.add(text);
});

/**
 * Objects
 */
const donutGeometry = new THREE.TorusGeometry(0.2, 0.1, 18, 45);

for (let i = 0; i < 200; i++) {
  const donut = new THREE.Mesh(donutGeometry, material);

  donut.position.x = (Math.random() - 0.5) * 10;
  donut.position.y = (Math.random() - 0.5) * 10;
  donut.position.z = (Math.random() - 0.5) * 10;

  donut.rotation.x = Math.random() * Math.PI;
  donut.rotation.y = Math.random() * Math.PI;

  const scale = Math.random();
  donut.scale.x = scale;
  donut.scale.y = scale;
  donut.scale.z = scale;

  scene.add(donut);
}

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

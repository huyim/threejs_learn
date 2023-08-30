/*
- A scene that will contain objects
- Some objects
- A camera
- A render 
*/

//Scene
const scene = new THREE.Scene();

//Red cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
// Mesh: Combination of a geometry (the shape) and a material (how it looks)
const cube_mesh = new THREE.Mesh(geometry, material);
scene.add(cube_mesh);

//Sizes
const sizes = {
  width: 800,
  height: 600,
};

//Camera
//The field of view (fov), in degrees; degree越大离物体越近
//The aspect ratio, width of the render divided by the height of the render
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
// forward/backward in z axis
camera.position.z = 3;
camera.position.x = 2;
scene.add(camera);

// Renderer
const canvas = document.querySelector(".webgl");
//console.log(canvas);
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

renderer.render(scene, camera);

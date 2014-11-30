var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.z = 1000;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.SphereGeometry(200, 32, 32);
var material = new THREE.MeshBasicMaterial({ color: 'yellow' });
var sun = new THREE.Mesh(geometry, material);
sun.position.set(0, 0, 0);
scene.add(sun);

geometry = new THREE.SphereGeometry(100, 32, 32);
material = new THREE.MeshLambertMaterial({ color: 'blue' });
var earth = new THREE.Mesh(geometry, material);
earth.position.set(800, 0, 0);
scene.add(earth);

var pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(0, 0, 0);
scene.add(pointLight);

function render() {
  requestAnimationFrame(render);
  earth.rotation.x += 0.01;
  earth.rotation.y += 0.02;
  renderer.render(scene, camera);
}

render();

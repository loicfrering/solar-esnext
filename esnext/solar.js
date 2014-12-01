import { Planet, Earth, Moon } from 'planets';
import Space from 'space';

var space = new Space();

var geometry = new THREE.SphereGeometry(200, 32, 32);
var material = new THREE.MeshBasicMaterial({ color: 'yellow' });
var sun = new THREE.Mesh(geometry, material);
sun.position.set(0, 0, 0);
space.scene.add(sun);

var earth = new Earth([800, 0, 0]);
space.add(earth);

var moon = new Moon([1000, 0, 0]);
space.add(moon);

function render() {
  requestAnimationFrame(render);
  earth.mesh.rotation.x += 0.01;
  earth.mesh.rotation.y += 0.02;
  space.render();
}

render();

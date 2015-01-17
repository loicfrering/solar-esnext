import { Planet, Sun, Earth, Moon } from 'planets';
import Space from 'space';

var space = new Space();

var sun = new Sun();
space.add(sun);

window.earth = new Earth([1200, 0, 0]);
space.add(earth);
space.scene.add(earth.orbitMesh);

var moon = new Moon(earth);
space.add(moon);
space.scene.add(moon.orbitMesh);

//function render() {
//  requestAnimationFrame(render);
//  earth.mesh.rotation.x += 0.01;
//  earth.mesh.rotation.y += 0.02;
//  space.render();
//}
//
//render();

space.start();

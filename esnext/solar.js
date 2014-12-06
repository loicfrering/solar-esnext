import { Planet, Sun, Earth, Moon } from 'planets';
import Space from 'space';

var space = new Space();

var sun = new Sun();
space.add(sun);

var earth = new Earth([1200, 0, 0]);
space.add(earth);

var moon = new Moon(earth);
space.add(moon);

//function render() {
//  requestAnimationFrame(render);
//  earth.mesh.rotation.x += 0.01;
//  earth.mesh.rotation.y += 0.02;
//  space.render();
//}
//
//render();

space.start();

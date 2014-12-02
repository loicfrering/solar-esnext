import Clock from 'clock';

class Space {
  constructor() {
    this.initScene();
    this.initCamera();
    this.initRenderer();
    this.initLight();

    this.initClock();
    this.initObjects();
  }

  initScene() {
    this.scene = new THREE.Scene();
  }

  initCamera() {
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 2000);
    this.camera.position.z = 1000;
  }

  initRenderer() {
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
  }

  initLight() {
    this.ambientLight = new THREE.AmbientLight(0x888888);
    this.ambientLight.position.set(0, 0, 0);
    this.scene.add(this.ambientLight);

    this.pointLight = new THREE.PointLight(0xffffff, 2);
    this.pointLight.position.set(0, 0, 0);
    this.scene.add(this.pointLight);
  }

  initClock() {
    this.clock = new Clock(this.loop, this);
  }

  initObjects() {
    this.objects = [];
  }

  add(object) {
    if (object.mesh instanceof THREE.Mesh) {
      this.objects.push(object);
      return this.scene.add(object.mesh);
    }
    throw new Error('Invalid object added to space.');
  }

  loop(t) {
    this.objects.forEach(function(object) {
      object.move(t);
    });
    this.render();
  }

  start() {
    this.clock.start();
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }
}

export default Space;

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
    var width = window.innerWidth;
    var height = window.innerHeight;
    this.camera = new THREE.OrthographicCamera(width / - 2, width / 2, height / 2, height / - 2, 1, 2000);
    this.camera.position.z = 1000;
  }

  initRenderer() {
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    //this.renderer.shadowMapEnabled = true;
    document.body.appendChild(this.renderer.domElement);
  }

  initLight() {
    this.ambientLight = new THREE.AmbientLight(0x222222);
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

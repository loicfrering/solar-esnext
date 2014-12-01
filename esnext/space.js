class Space {
  constructor() {
    this.initScene();
    this.initCamera();
    this.initRenderer();
    this.initLight();
  }

  initScene() {
    this.scene = new THREE.Scene();
  }

  initCamera() {
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 1000);
    this.camera.position.z = 1000;
  }

  initRenderer() {
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
  }

  initLight() {
    this.light = new THREE.PointLight(0xffffff, 2);
    this.light.position.set(0, 0, 0);
    this.scene.add(this.light);
  }

  add(object) {
    if (object.mesh instanceof THREE.Mesh) {
      return this.scene.add(object.mesh);
    }
    throw new Error('Invalid object added to space.');
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }
}

export default Space;

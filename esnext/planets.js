class Planet {
  constructor(position, radius, color) {
    this.position = position;
    this.radius = radius;
    this.color = color;

    this.buildMesh();
  }

  buildGeometry() {
    this.geometry = new THREE.SphereGeometry(this.radius, 32, 32);
  }

  buildMaterial() {
    this.material = new THREE.MeshLambertMaterial({
      color: this.color
    });
  }

  buildMesh() {
    this.buildGeometry();
    this.buildMaterial();
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(...this.position);
  }

  move() {
  }
}

class Earth extends Planet {
  constructor(position) {
    super(position, 100, 'blue');
  }

  move(t) {
    this.mesh.position.x = 600*Math.cos(t/500);
    this.mesh.position.z = 400*Math.sin(t/500);
  }
}

class Moon extends Planet {
  constructor(earth) {
    super([0, 0, 0], 10, 'white');
    this.earth = earth;
  }

  move(t) {
    this.mesh.position.x = this.earth.mesh.position.x + 150*Math.cos(t/20);
    this.mesh.position.z = this.earth.mesh.position.z + 150*Math.sin(t/20);
  }
}

export { Planet, Earth, Moon };

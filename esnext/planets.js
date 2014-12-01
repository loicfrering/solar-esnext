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
}

class Earth extends Planet {
  constructor(position) {
    super(position, 100, 'blue');
  }
}

class Moon extends Planet {
  constructor(position) {
    super(position, 10, 'white');
  }
}

export { Planet, Earth, Moon };

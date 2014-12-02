class Planet {
  constructor(position, radius, maps) {
    this.position = position;
    this.radius   = radius;
    this.maps     = maps;

    this.buildMesh();
  }

  buildGeometry() {
    this.geometry = new THREE.SphereGeometry(this.radius, 32, 32);
  }

  buildMaterial() {
    this.material = new THREE.MeshPhongMaterial();

    if (this.maps) {
      for (var map in this.maps) {
        this.material[map] = THREE.ImageUtils.loadTexture(this.maps[map]);
      }

      if (this.maps.bumpMap) {
        this.material.bumpScale = this.radius/40;
      }

      if (this.maps.specularMap) {
        //this.material.specular = new THREE.Color('grey');
        this.material.shininess = 4;
      }
    }
  }

  buildMesh() {
    this.buildGeometry();
    this.buildMaterial();
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(...this.position);
    //this.mesh.castShadow = true;
    //this.mesh.receiveShadow = true;
  }

  move() {
  }
}

class Earth extends Planet {
  constructor(position) {
    super(position, 100, {
      map: 'images/earthmap1k.jpg',
      bumpMap: 'images/earthbump1k.jpg',
      specularMap: 'images/earthspec1k.jpg'
    });
  }

  move(t) {
    t -= 1000;
    this.mesh.position.x = 600*Math.cos(t/400);
    this.mesh.position.z = 400*Math.sin(t/400);
    this.mesh.rotation.y += 0.01;
  }
}

class Moon extends Planet {
  constructor(earth) {
    super([0, 0, 0], 10);
    this.earth = earth;
  }

  move(t) {
    this.mesh.position.x = this.earth.mesh.position.x + 150*Math.cos(t/20);
    this.mesh.position.z = this.earth.mesh.position.z + 150*Math.sin(t/20);
  }
}

export { Planet, Earth, Moon };

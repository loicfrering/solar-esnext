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

class Sun extends Planet {
  constructor() {
    this.buildMesh();
  }

  buildGeometry() {
    this.geometry = new THREE.SphereGeometry(40, 32, 32);
  }

  buildMaterial() {
    this.material = new THREE.MeshPhongMaterial({
      color: 'yellow',
      map: THREE.ImageUtils.loadTexture('images/sunmap.jpg'),
      emissive: 0xdddddd
    });
  }

  buildMesh() {
    this.buildGeometry();
    this.buildMaterial();
    this.mesh = new THREE.Mesh(this.geometry, this.material);
  }

  move() {
    this.mesh.rotation.y += 0.005;
  }
}

class Earth extends Planet {
  constructor(position) {
    this.position = position;
    this.radius = 100;

    super(this.position, this.radius, {
      map: 'images/earthmap1k.jpg',
      bumpMap: 'images/earthbump1k.jpg',
      specularMap: 'images/earthspec1k.jpg'
    });

    this.buildCloudMesh();
    this.mesh.add(this.cloudMesh);
    this.buildOrbitMesh();
  }

  buildCloudMesh() {
    var geometry = new THREE.SphereGeometry(this.radius + 2, 32, 32);
    var material = new THREE.MeshPhongMaterial({
      map: THREE.ImageUtils.loadTexture('images/earthcloudmap.jpg'),
      alphaMap: THREE.ImageUtils.loadTexture('images/earthcloudmaptransinv.jpg'),
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8
    });

    this.cloudMesh = new THREE.Mesh(geometry, material);
  }

  buildOrbitMesh() {
    var curve = new THREE.EllipseCurve(
      0, 0,
      600, 400,
      0, 2*Math.PI,
      false
    );
    var path = new THREE.CurvePath();
    path.add(curve);
    var geometry = path.createPointsGeometry(50);

    var material = new THREE.LineBasicMaterial({ color: 0xffffff });

    this.orbitMesh = new THREE.Line(geometry, material);
    this.orbitMesh.rotation.x += Math.PI/2;
  }

  move(t) {
    t -= 1000;
    this.mesh.position.x = 600*Math.cos(t/400);
    this.mesh.position.z = 400*Math.sin(t/400);
    this.mesh.rotation.y += 0.01;
    this.cloudMesh.rotation.y -= 0.002;
  }
}

class Moon extends Planet {
  constructor(earth) {
    super([0, 0, 0], 20, {
      map: 'images/moonmap1k.jpg',
      bumpMap: 'images/moonbump1k.jpg'
    });
    this.earth = earth;
  }

  move(t) {
    this.mesh.position.x = this.earth.mesh.position.x + 150*Math.cos(t/20);
    this.mesh.position.z = this.earth.mesh.position.z + 150*Math.sin(t/20);
  }
}

export { Planet, Sun, Earth, Moon };

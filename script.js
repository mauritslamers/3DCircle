/*globals THREE*/
var scene, camera, renderer, geometry, material, mesh, circle, text;

function createTextCircle (color) {
  var textProps = {
    size: 52,
    curveSegments: 2,
    font: "helvetiker",
    height: 10
  };

  var ret = new THREE.Object3D();
  //var mat = new THREE.MeshDepthMaterial( { color: color, wireframe: false });
  var mat = new THREE.MeshLambertMaterial( { color: color, ambient: 0xbbbbbb, side: THREE.DoubleSide } );
  var text = new THREE.Mesh(new THREE.TextGeometry("A", textProps), mat);
  text.position.set(230,0,0);
  //text.rotation.x = 0.5 * Math.PI;
  text.isText = true;
  ret.add(text);

  text = new THREE.Mesh(new THREE.TextGeometry("C", textProps), mat);
  text.position.set(-41,250,0);
  //text.rotation.x = 0.5 * Math.PI;
  text.isText = true;
  ret.add(text);

 ret.setRotation = function (x, y, z) {
   if (!x) x = 0;
   if (!y) y = 0;
   if (!z) z = 0;
   this.children.forEach(function (c) {
     if (c.isText) {
      c.rotation.x = Math.PI/2 + x;
      c.rotation.y = Math.PI/2 + y;
      c.rotation.z = Math.PI/2 + z;
       //if (x !== 0) c.rotateX((Math.PI/2) + x);
       //if (y !== 0) c.rotateY((Math.PI/2) * y);
       //if (z !== 0) c.rotateZ((Math.PI/2) + z);
       //c.rotation.z = z;
     }
   });
   this.rotation.x = x;
   this.rotation.y = y;
   this.rotation.z = z;
 };
 return ret;
 // //ret.add();
}


function createCircle (color) {

  var ret = new THREE.Object3D();
  var mat = new THREE.MeshLambertMaterial( { color: color, ambient: 0xbbbbbb, side: THREE.DoubleSide } );
  //var mat = new THREE.MeshDepthMaterial( { color: color, wireframe: true });
  //var mat = new THREE.LineBasicMaterial({ color: 0xff0000, wireframe: true });
  var gem = new THREE.RingGeometry(200, 210, 32);
  //var gem = new THREE.BoxGeometry(200, 200, 200);
  ret.add(new THREE.Mesh(gem, mat));
  var blipgem = new THREE.CylinderGeometry(2, 2, 20);
  var blip;
  var twoPI = Math.PI*2;
  for (var i = 0; i < 12; i += 1) { // add a blip
    blip = new THREE.Mesh(blipgem, mat);
    blip.position.set(Math.sin(i/12*twoPI)*200, Math.cos(i/12*twoPI)*200, 0);
    blip.rotation.z = -i*twoPI/12;
    ret.add(blip);
  }

  return ret;
}

function init () {
  //
  scene = new THREE.Scene();
  scene.add( new THREE.AmbientLight( 0x404040 ) );

  var light = new THREE.DirectionalLight( 0xffffff );
  light.position.set( 0, 1, 0 );
  scene.add( light );

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.y = 150;
  camera.position.z = 700;

  // // var sphereCenter = new THREE.Vector3(500,500,500);
  // //geometry = new THREE.BoxGeometry(200, 200, 200);
  // geometry = new THREE.CircleGeometry(200, 12)
  // //material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true });
  // material = new THREE.LineBasicMaterial({ color: 0xff0000, wireframe: true });
  // mesh = new THREE.Mesh(geometry, material);
  mesh = createCircle(0xff0000);
  //mesh.position.set(1,2,3);
  mesh.rotation.x = -1;
  scene.add(mesh);

  mesh = createTextCircle(0xff0000);
  mesh.setRotation(-1);
  // mesh.rotation.y = 1;
  scene.add(mesh);

  mesh = createCircle(0x00ff00);
  mesh.rotation.y = 1;
  scene.add(mesh);

  circle = mesh;

  mesh = createTextCircle(0x00ff00);
  mesh.setRotation(0,1);
  scene.add(mesh);

  text = mesh;

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
}

function animate() {

    // note: three.js includes requestAnimationFrame shim
    requestAnimationFrame( animate );

    //circle.setRotation(0.1);
    text.setRotation();
    circle.rotation.x += 0.01;
    //mesh.rotation.y += 0.02;

    renderer.render( scene, camera );

}

init();
//animate();
renderer.render( scene, camera);
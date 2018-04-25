function initStats() {
    var stats = new Stats();

    stats.setMode(0); // 0: fps, 1: ms

    // Align top-left
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';

    document.getElementById("Stats-output").appendChild(stats.domElement);

    return stats;
}
var stats = initStats();
// 场景
var scene = new THREE.Scene();

// 摄像机
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

// 光源
var spotLight = new THREE.SpotLight(0xffffff, 1);
spotLight.position.set(-40, 60, -10);
// spotLight.position.set( 15, 40, 35 );
spotLight.angle = Math.PI / 4;
spotLight.penumbra = 0.05;
spotLight.decay = 2;
// spotLight.distance = 200;
spotLight.castShadow = true;
spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;
spotLight.shadow.camera.near = 10;
spotLight.shadow.camera.far = 200;
scene.add(spotLight);

// renderer
var renderer = new THREE.WebGLRenderer({
    // antialias: true
});

renderer.setClearColor(0xEEEEEE);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

// show axes in the screen
var axes = new THREE.AxesHelper(20);
scene.add(axes);

// create the ground plane
var planeGeometry = new THREE.PlaneGeometry(60, 20);
var planeMaterial = new THREE.MeshLambertMaterial({
    color: 0xcccccc
});
var plane = new THREE.Mesh(planeGeometry, planeMaterial);

// rotate and position the plane
plane.rotation.x = -0.5 * Math.PI;
plane.position.x = 15;
plane.position.y = 0;
plane.position.z = 0;


// 平面的阴影
plane.receiveShadow = true;
// add the plane to the scene
scene.add(plane);

// create a cube
var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
var cubeMaterial = new THREE.MeshLambertMaterial({
    color: 0xff0000,

});
var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
// 方形体的阴影
cube.castShadow = true;


// position the cube
cube.position.x = -4;
cube.position.y = 3;
cube.position.z = 0;

// add the cube to the scene
scene.add(cube);

// create a sphere
var sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
var sphereMaterial = new THREE.MeshLambertMaterial({
    color: 0x7777ff,

});
var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.castShadow = true;
// position the sphere
sphere.position.x = 20;
sphere.position.y = 4;
sphere.position.z = 2;

// add the sphere to the scene
scene.add(sphere);

// position and point the camera to the center of the scene
camera.position.x = -30;
camera.position.y = 40;
camera.position.z = 30;
camera.lookAt(scene.position);


// 圆环
var torusGeometry = new THREE.TorusGeometry(3, 1, 12, 18);
var torusMaterial = new THREE.MeshLambertMaterial({
    color: 0xff6600,

});


var torus = new THREE.Mesh(torusGeometry, torusMaterial);
torus.castShadow = true;
// position the torus
torus.position.x = 5;
torus.position.y = 4;
torus.position.z = 2;
scene.add(torus);

// add the output of the renderer to the html element
document.body.appendChild(renderer.domElement);

var controls = new function(){
    this.rotationSpeed = 0.02;
    this.bounceSpeed = 0.03;
};

var gui = new dat.GUI();
gui.add(controls, 'rotationSpeed', 0.05);
gui.add(controls, 'bounceSpeed', 0.05);


var step = 0;
function render() {
    requestAnimationFrame(render);

    stats.update();

    cube.position.y = 2 + Math.abs(10 * Math.cos(controls.rotationSpeed));
    cube.rotation.x += controls.rotationSpeed;
    
    step += controls.bounceSpeed;
    sphere.position.x = 20 + 10 * Math.cos(step);
    sphere.position.y = 2 + Math.abs(10 * Math.sin(step));

    // render the scene
    torus.rotation.x += controls.rotationSpeed;
    torus.rotation.y += controls.rotationSpeed;
    torus.rotation.z += controls.rotationSpeed;
    renderer.render(scene, camera);
};

render();
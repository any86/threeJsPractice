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
scene.fog = new THREE.Fog(0xffffff,0.01, 100);
// scene.fog = new THREE.FogExp2(0xffffff,0.01);
// scene.overrideMaterial = new THREE.MeshLambertMaterial({color:0xff0000})

// 摄像机
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.x = -30;
camera.position.y = 40;
camera.position.z = 30;
camera.lookAt(scene.position);
// 光源
var spotLight = new THREE.SpotLight(0xffffff, 1);
spotLight.position.set(-40, 60, -10);
spotLight.castShadow = true;
scene.add(spotLight);

// renderer
var renderer = new THREE.WebGLRenderer({
    // antialias: true
});
renderer.setClearColor(0xEEEEEE);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// 辅助轴线
var axes = new THREE.AxesHelper(20);
scene.add(axes);

// 创建一个平面
var planeGeometry = new THREE.PlaneGeometry(60, 40, 1, 1);
var planeMaterial = new THREE.MeshLambertMaterial({
    color: 0xcccccc
});
var plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -0.5 * Math.PI;
plane.position.x = 0;
plane.position.y = 0;
plane.position.z = 0;
plane.receiveShadow = true;
scene.add(plane);



var controls = new function() {
    this.numberOfObjects = scene.children.length;
    this.rotationSpeed = 0.02;
    this.addCube = function() {
        console.log('addCube');
        var cubeSize = Math.ceil((Math.random() * 3));
        var cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
        var cubeMaterial = new THREE.MeshLambertMaterial({
            color: Math.random() * 0xffffff
        });
        var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cube.castShadow = true;
        cube.name = "cube-" + scene.children.length;

        // position the cube randomly in the scene

        cube.position.x = -30 + Math.round((Math.random() * planeGeometry.parameters.width));
        cube.position.y = Math.round((Math.random() * 5));
        cube.position.z = -20 + Math.round((Math.random() * planeGeometry.parameters.height));

        // add the cube to the scene
        scene.add(cube);
        this.numberOfObjects = scene.children.length;
    };

    this.removeCube = function() {
        var allChildren = scene.children;
        var lastObject = allChildren[allChildren.length - 1];
        if (lastObject instanceof THREE.Mesh && '' != lastObject.name) {
            scene.remove(lastObject);
            this.numberOfObjects = scene.children.length;
        }
    };

    this.outputObjects = () => {
        console.log(scene.children);
    }
};

var gui = new dat.GUI();
gui.add(controls, 'addCube');
gui.add(controls, 'removeCube');
gui.add(controls, 'rotationSpeed', 0, 0.5);


gui.add(controls, 'outputObjects');

function render() {
    scene.traverse(obj => {
        if (-1 !== obj.name.indexOf('cube')) {
            obj.rotation.x+= controls.rotationSpeed;
            obj.rotation.y+= controls.rotationSpeed;
            obj.rotation.z+= controls.rotationSpeed;
        }
    });
    requestAnimationFrame(render);
    stats.update();
    renderer.render(scene, camera);
};

render();
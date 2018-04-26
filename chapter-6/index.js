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
// scene.fog = new THREE.Fog(0xffffff,0.01, 100);
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

const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(ambientLight);

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
// 创建字体
var loader = new THREE.FontLoader();

var path = '../assets/fonts/Alex Brush_Regular.json';
// var path = '../assets/fonts/helvetiker_regular.typeface.js';

loader.load(path, function(font) {
    var textGeometry = new THREE.TextGeometry('s', {
        font: font,
        size: 12,
        height: 1,
        // curveSegments: 12,
        // bevelEnabled: true,
        // bevelThickness: 10,
        // bevelSize: 8,
        // bevelSegments: 5
    });

    const textMaterial = new THREE.MeshPhongMaterial({
        color: 0xff0000,
        specular: 0xff0000
    });

    const text = new THREE.Mesh(textGeometry, textMaterial);
    text.castShadow = true;
    text.position.y = 10;
    scene.add(text);
});

function render() {
    requestAnimationFrame(render);
    stats.update();
    renderer.render(scene, camera);
};

render();
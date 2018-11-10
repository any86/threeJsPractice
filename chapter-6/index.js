// var textureLoader = (url)=> new Promise((resolve, reject)=>{
//     new THREE.TextureLoader().load(url, texture=>{
//         resolve(texture);
//     });
// });

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
// camera.position.x = 10;
// camera.position.y = 300;
// camera.position.z = 200;
camera.lookAt(scene.position);
// 光源
var spotLight = new THREE.SpotLight(0xffffff, 1);

spotLight.castShadow = true;
scene.add(spotLight);

var ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(ambientLight);


// renderer
var renderer = new THREE.WebGLRenderer({
    // antialias: true
});
renderer.setClearColor(0xEEEEEE);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// 辅助轴线
var axes = new THREE.AxesHelper(120);
scene.add(axes);

// 创建一个平面
var planeGeometry = new THREE.PlaneGeometry(360, 360, 1, 1);
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
var path = '../assets/fonts/Alex.json';
// var path = '../assets/fonts/helvetiker_regular.typeface.js';
loader.load(path, function(font) {


    // var textMaterial = new THREE.MeshPhongMaterial({
    //     ambient: 0xffffff,
    //     color: 0xefefef,
    //     specular: 0xefefef
    // });

    // 加载纹理
    var textureLoader = new THREE.TextureLoader();
    textureLoader.load('../assets/textures/soil_normal.jpg', function(texture) {
        var textMaterial = new THREE.MeshPhongMaterial({
            // map: texture,
            ambient: 0xffffff,
            color: 0xeeeeee,
            specular: 0xeeeeee,
            overdraw: 1,
            shininess:97,
            wireframe: 0xff0000,
        });

        var textGeometry = new THREE.TextGeometry('soufeel', {
            font: font,
            size: 100,
            height: 1,
            steps: 10,
            curveSegments: 1,
            bevelEnabled: true,
            bevelThickness: 1,
            bevelSize: 1,
            bevelSegments: 1
        });
        var text = new THREE.Mesh(textGeometry, textMaterial);
        text.castShadow = true;
        text.rotation.x = 0;
        text.rotation.y = 0;
        text.rotation.z = 0;
        text.position.x = 4;
        text.position.y = 50;
        text.position.z = 0;
        scene.add(text);


        var controls = new function() {
            this.cameraX = 10;
            this.cameraY = 60;
            this.cameraZ = 400;

            this.spotLightX = 0;
            this.spotLightY = 200;
            this.spotLightZ = 30;

            this.textRotationX = -0.6;
            this.textRotationY = 0;
            this.textRotationZ = 0;
        }

        var gui = new dat.GUI();
        gui.add(controls, 'cameraX');
        gui.add(controls, 'cameraY');
        gui.add(controls, 'cameraZ');
        gui.add(controls, 'spotLightX');
        gui.add(controls, 'spotLightY');
        gui.add(controls, 'spotLightZ');
        gui.add(controls, 'textRotationX', -2 * Math.PI, 2 * Math.PI);
        gui.add(controls, 'textRotationY', -2 * Math.PI, 2 * Math.PI);
        gui.add(controls, 'textRotationZ', -2 * Math.PI, 2 * Math.PI);

        function render() {
            requestAnimationFrame(render);
            // camera.rotation.x = controls.cameraRotateX;
            // camera.rotation.y = controls.cameraRotateY;
            // camera.rotation.z = controls.cameraRotateZ;
            // console.log(controls.cameraX)
            // camera.position.x = controls.cameraX;
            // camera.position.y = controls.cameraY;
            // camera.position.z = controls.cameraZ;
            camera.position.x = controls.cameraX;
            camera.position.y = controls.cameraY;
            camera.position.z = controls.cameraZ;

            spotLight.position.set(controls.spotLightX, controls.spotLightY, controls.spotLightZ);

            text.rotation.x = controls.textRotationX;
            text.rotation.y = controls.textRotationY;
            text.rotation.z = controls.textRotationZ;
            stats.update();
            renderer.render(scene, camera);
        };

        render();

    });
});
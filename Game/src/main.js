import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x222222); // Темный фон для контраста с UI

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 2, 5);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
    antialias: true
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// Свет
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

// Управление
const controls = new OrbitControls(camera, renderer.domElement);

// Загрузка дерева
const loader = new GLTFLoader();
// Замените на путь к вашему файлу в папке public
loader.load('./assets/models/tree_level_1.glb', (gltf) => {
    scene.add(gltf.scene);
    console.log("Дерево загружено!");
}, undefined, (error) => {
    console.error("Ошибка загрузки:", error);
});

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();


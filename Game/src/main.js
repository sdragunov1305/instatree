import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// 1. Сцена и Камера
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xeeeeee); // Светло-серый фон

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(2, 2, 5); // Отодвигаем камеру, чтобы видеть дерево

// 2. Рендерер
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 3. Управление мышкой (OrbitControls)
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Плавность вращения

// 4. Свет (обязательно, иначе дерево будет черным)
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);
scene.add(new THREE.AmbientLight(0xffffff, 0.5));

// 5. Загрузка вашего дерева
const loader = new GLTFLoader();
loader.load(
    './assets/models/tree_level_1.glb', // ПУТЬ К ВАШЕМУ ФАЙЛУ
    (gltf) => {
        const tree = gltf.scene;
        scene.add(tree);
        
        // Фокусируем камеру на дереве
        controls.target.set(0, 1, 0); 
    },
    undefined,
    (error) => {
        console.error('Ошибка загрузки дерева:', error);
    }
);

// 6. Цикл анимации
function animate() {
    requestAnimationFrame(animate);
    controls.update(); // Нужно для плавности OrbitControls
    renderer.render(scene, camera);
}
animate();

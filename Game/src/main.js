import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// 1. СЦЕНА И КАМЕРА
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1a1a1a);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 2, 5);

// 2. РЕНДЕРЕР
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// 3. СВЕТ
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1.2);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// 4. ТЕСТОВЫЙ ОБЪЕКТ (появится сразу)
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x4CAF50 });
const placeholderCube = new THREE.Mesh(geometry, material);
scene.add(placeholderCube); // Если видим куб - JS работает!

// 5. УПРАВЛЕНИЕ МЫШКОЙ
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// 6. ЗАГРУЗКА ВАШЕГО ДЕРЕВА
const loader = new GLTFLoader();

// ВНИМАНИЕ: Проверьте этот путь! 
// Если на GitHub Pages будет 404, попробуйте изменить на './assets/models/tree_level_1.glb'
loader.load('./public/assets/models/tree_level_1.glb', 
    (gltf) => {
        scene.remove(placeholderCube); // Убираем куб
        scene.add(gltf.scene);         // Добавляем дерево
        console.log("Дерево загружено!");
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% загружено');
    },
    (error) => {
        console.warn("Модель не загружена, используем куб. Причина:", error.message);
    }
);

// 7. ЦИКЛ ОБНОВЛЕНИЯ
function animate() {
    requestAnimationFrame(animate);
    
    // Вращаем куб для динамики (пока дерево не загрузилось)
    if (placeholderCube) {
        placeholderCube.rotation.x += 0.01;
        placeholderCube.rotation.y += 0.01;
    }

    controls.update();
    renderer.render(scene, camera);
}

// Подстройка под размер экрана
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();

const viewer = document.querySelector('#tree-viewer');

// Автоматически определяем путь (для GitHub Pages это /instatree/)
const baseUrl = window.location.pathname.endsWith('/') 
    ? window.location.pathname 
    : window.location.pathname + '/';

const models = [
    'assets/models/tree_level_1.glb',
    'assets/models/tree_level_2.glb',
    'assets/models/tree_level_3.glb',
    'assets/models/tree_level_4.glb',
    'assets/models/tree_level_5.glb'
];

let currentIdx = 0;

function updateTree() {
    if (!viewer) return;

    // Сохраняем текущий ракурс
    const currentOrbit = viewer.getCameraOrbit();
    const currentTarget = viewer.getCameraTarget();

    currentIdx = (currentIdx + 1) % models.length;
    
    // Формируем полный путь
    viewer.src = models[currentIdx];

    // Фиксируем камеру после загрузки
    const onModelLoad = () => {
        viewer.cameraOrbit = currentOrbit.toString();
        viewer.cameraTarget = currentTarget.toString();
    };

    viewer.addEventListener('load', onModelLoad, { once: true });
}

// Интервал 30 секунд
setInterval(updateTree, 1000);

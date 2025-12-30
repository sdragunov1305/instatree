const viewer = document.querySelector('#tree-viewer');

// Пути БЕЗ слова public
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

    // Сохраняем положение камеры
    const currentOrbit = viewer.getCameraOrbit();
    const currentTarget = viewer.getCameraTarget();

    currentIdx = (currentIdx + 1) % models.length;
    
    // Меняем модель
    viewer.src = models[currentIdx];

    // Возвращаем камеру после загрузки
    viewer.addEventListener('load', () => {
        viewer.cameraOrbit = currentOrbit.toString();
        viewer.cameraTarget = currentTarget.toString();
    }, { once: true });

    console.log("Загружена стадия:", models[currentIdx]);
}

// Интервал 30 секунд
setInterval(updateTree, 30000);

// Лог ошибок в консоль
viewer.addEventListener('error', (e) => {
    console.error("Файл не найден по пути:", e.detail.url);
});

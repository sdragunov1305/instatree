const viewer = document.querySelector('#tree-viewer');

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

    // 1. Запоминаем текущий ракурс (даже если пользователь крутил дерево)
    const currentOrbit = viewer.getCameraOrbit();
    const currentTarget = viewer.getCameraTarget();

    currentIdx = (currentIdx + 1) % models.length;
    
    // 2. Меняем путь к файлу
    viewer.src = models[currentIdx];

    // 3. После загрузки новой модели принудительно возвращаем старую камеру
    // Это не даст маленькому дереву "увеличиться" под объектив
    viewer.addEventListener('load', () => {
        viewer.cameraOrbit = currentOrbit.toString();
        viewer.cameraTarget = currentTarget.toString();
    }, { once: true });

    console.log("Stage loaded:", models[currentIdx]);
}

// Переключение каждые 30 секунд
setInterval(updateTree, 30000);

// Отладка ошибок
viewer.addEventListener('error', (e) => {
    console.error("Path error:", e.detail.url);
});

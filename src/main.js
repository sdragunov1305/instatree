const viewer = document.querySelector('#tree-viewer');
const models = [
    'assets/models/tree_level_1.glb',
    'assets/models/tree_level_2.glb',
    'assets/models/tree_level_3.glb',
    'assets/models/tree_level_4.glb',
    'assets/models/tree_level_5.glb'
];
let currentIdx = 0;

function switchModel() {
    // 1. Сохраняем текущую позицию камеры перед сменой модели
    const currentOrbit = viewer.getCameraOrbit();
    const currentTarget = viewer.getCameraTarget();

    // 2. Переходим к следующему индексу
    currentIdx = (currentIdx + 1) % models.length;
    
    // 3. Меняем путь к модели
    viewer.src = models[currentIdx];

    // 4. После загрузки новой модели возвращаем камеру на место
    viewer.addEventListener('load', () => {
        viewer.cameraOrbit = currentOrbit.toString();
        viewer.cameraTarget = currentTarget.toString();
    }, { once: true }); // срабатывает только один раз для текущей загрузки

    console.log("Модель обновлена. Следующее переключение через 30 секунд.");
}

// Запускаем цикл переключения каждые 30 000 миллисекунд (30 секунд)
setInterval(switchModel, 30000);

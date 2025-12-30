const viewer = document.querySelector('#tree-viewer');

// Массив путей к вашим моделям
const models = [
    'assets/models/tree_level_1.glb',
    'assets/models/tree_level_2.glb',
    'assets/models/tree_level_3.glb',
    'assets/models/tree_level_4.glb',
    'assets/models/tree_level_5.glb'
];

let currentIdx = 0;

function updateTree() {
    // 1. Считываем текущее положение камеры пере сменой модели
    const currentOrbit = viewer.getCameraOrbit();
    const currentTarget = viewer.getCameraTarget();

    // 2. Рассчитываем индекс следующей модели (1-2-3-4-5-1...)
    currentIdx = (currentIdx + 1) % models.length;
    
    // 3. Устанавливаем новый источник файла
    viewer.src = models[currentIdx];

    // 4. После того как новая модель загрузится, возвращаем камеру на место
    viewer.addEventListener('load', () => {
        viewer.cameraOrbit = currentOrbit.toString();
        viewer.cameraTarget = currentTarget.toString();
    }, { once: true });

    console.log(`Загружена модель: ${models[currentIdx]}`);
}

// Запуск автоматического переключения каждые 30 секунд (30000 мс)
setInterval(updateTree, 30000);

// Обработчик ошибок для проверки путей в консоли
viewer.addEventListener('error', (e) => {
    console.error("Ошибка! Проверьте, что файл лежит по пути:", e.detail.url);
});

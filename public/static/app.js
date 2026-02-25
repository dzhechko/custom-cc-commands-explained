// State
let allCommands = [];
let filteredCommands = [];
let currentCategory = 'all';

// Category icons
const categoryIcons = {
    deployment: 'fa-rocket',
    development: 'fa-code',
    knowledge: 'fa-lightbulb',
    planning: 'fa-clipboard-list',
    bootstrap: 'fa-play-circle',
    testing: 'fa-flask'
};

// Category colors
const categoryColors = {
    deployment: 'bg-blue-100 text-blue-800',
    development: 'bg-green-100 text-green-800',
    knowledge: 'bg-yellow-100 text-yellow-800',
    planning: 'bg-purple-100 text-purple-800',
    bootstrap: 'bg-pink-100 text-pink-800',
    testing: 'bg-red-100 text-red-800'
};

// Category names in Russian
const categoryNames = {
    deployment: 'Развёртывание',
    development: 'Разработка',
    knowledge: 'Знания',
    planning: 'Планирование',
    bootstrap: 'Bootstrap',
    testing: 'Тестирование'
};

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
    await loadCommands();
    setupEventListeners();
});

// Load commands from API
async function loadCommands() {
    try {
        // Пробуем загрузить из локального файла
        const localResponse = await fetch('/static/commands-data.json');
        if (localResponse.ok) {
            allCommands = await localResponse.json();
        } else {
            // Если локально не получилось, используем GitHub
            const response = await fetch('https://raw.githubusercontent.com/dzhechko/2026-jan-pu-opus-clone-01/main/.claude/commands-data.json')
                .catch(() => null);
            
            if (response && response.ok) {
                allCommands = await response.json();
            } else {
                // Используем встроенные данные как fallback
                allCommands = await fetch('/static/commands-data.json').then(r => r.json());
            }
        }
        
        filteredCommands = [...allCommands];
        renderCommands();
        document.getElementById('loadingState').style.display = 'none';
        document.getElementById('commandsGrid').style.display = 'grid';
    } catch (error) {
        console.error('Error loading commands:', error);
        document.getElementById('loadingState').innerHTML = `
            <i class="fas fa-exclamation-triangle text-red-500 text-4xl mb-4"></i>
            <p class="text-gray-600">Ошибка загрузки команд. Пожалуйста, обновите страницу.</p>
        `;
    }
}

// Setup event listeners
function setupEventListeners() {
    // Search input
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => {
        filterCommands(e.target.value, currentCategory);
    });

    // Category buttons
    const categoryButtons = document.querySelectorAll('.category-badge');
    categoryButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const category = e.target.dataset.category;
            currentCategory = category;
            
            // Update active button
            categoryButtons.forEach(btn => {
                btn.classList.remove('bg-purple-600', 'text-white');
                btn.classList.add('bg-gray-200', 'text-gray-700', 'hover:bg-gray-300');
            });
            e.target.classList.remove('bg-gray-200', 'text-gray-700', 'hover:bg-gray-300');
            e.target.classList.add('bg-purple-600', 'text-white');
            
            filterCommands(searchInput.value, category);
        });
    });
}

// Filter commands
function filterCommands(searchTerm, category) {
    filteredCommands = allCommands.filter(cmd => {
        const matchesSearch = searchTerm === '' || 
            cmd.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            cmd.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            JSON.stringify(cmd.content).toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesCategory = category === 'all' || cmd.category === category;
        
        return matchesSearch && matchesCategory;
    });
    
    renderCommands();
}

// Render commands grid
function renderCommands() {
    const grid = document.getElementById('commandsGrid');
    
    if (filteredCommands.length === 0) {
        grid.innerHTML = `
            <div class="col-span-full glass-effect rounded-2xl shadow-2xl p-12 text-center">
                <i class="fas fa-search text-gray-400 text-5xl mb-4"></i>
                <p class="text-gray-600 text-lg">Команды не найдены</p>
                <p class="text-gray-500 text-sm mt-2">Попробуйте изменить параметры поиска</p>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = filteredCommands.map(cmd => `
        <div class="glass-effect rounded-xl shadow-lg card-hover p-6 cursor-pointer" onclick="showCommandDetail('${cmd.id}')">
            <div class="flex items-start justify-between mb-4">
                <div class="flex-1">
                    <h3 class="text-xl font-bold text-gray-900 mb-2 command-text">${cmd.title}</h3>
                    <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${categoryColors[cmd.category]}">
                        <i class="fas ${categoryIcons[cmd.category]} mr-1"></i>
                        ${categoryNames[cmd.category]}
                    </span>
                </div>
            </div>
            <p class="text-gray-600 text-sm mb-4 line-clamp-3">${cmd.description}</p>
            <div class="flex items-center text-purple-600 text-sm font-medium">
                <span>Подробнее</span>
                <i class="fas fa-arrow-right ml-2"></i>
            </div>
        </div>
    `).join('');
}

// Show command detail
function showCommandDetail(commandId) {
    const command = allCommands.find(cmd => cmd.id === commandId);
    if (!command) return;
    
    const detailContainer = document.getElementById('commandDetail');
    detailContainer.classList.remove('hidden');
    
    let contentHTML = '';
    
    // Render based on command type
    if (command.id === 'deploy') {
        contentHTML = renderDeployContent(command);
    } else if (command.id === 'feature') {
        contentHTML = renderFeatureContent(command);
    } else if (command.id === 'myinsights') {
        contentHTML = renderMyInsightsContent(command);
    } else if (command.id === 'plan') {
        contentHTML = renderPlanContent(command);
    } else if (command.id === 'start') {
        contentHTML = renderStartContent(command);
    } else if (command.id === 'test') {
        contentHTML = renderTestContent(command);
    }
    
    detailContainer.innerHTML = `
        <div class="glass-effect rounded-2xl shadow-2xl p-6 md:p-8 command-detail mb-8">
            <div class="flex items-start justify-between mb-6">
                <div class="flex-1">
                    <h2 class="text-3xl font-bold text-gray-900 mb-3 command-text">${command.title}</h2>
                    <p class="text-gray-600 mb-3">${command.description}</p>
                    <div class="flex flex-wrap gap-2 items-center">
                        <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${categoryColors[command.category]}">
                            <i class="fas ${categoryIcons[command.category]} mr-2"></i>
                            ${categoryNames[command.category]}
                        </span>
                        ${command.arguments ? `
                            <span class="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                                <i class="fas fa-terminal mr-1"></i>
                                Аргументы: <code class="command-text">${command.arguments}</code>
                            </span>
                        ` : ''}
                    </div>
                </div>
                <button onclick="hideCommandDetail()" class="ml-4 p-2 rounded-lg hover:bg-gray-100 transition">
                    <i class="fas fa-times text-gray-600 text-xl"></i>
                </button>
            </div>
            
            ${contentHTML}
        </div>
    `;
    
    // Scroll to detail
    detailContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Hide command detail
function hideCommandDetail() {
    const detailContainer = document.getElementById('commandDetail');
    detailContainer.classList.add('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Render deploy content
function renderDeployContent(command) {
    const { content } = command;
    return `
        <div class="space-y-6">
            <div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                <p class="text-gray-800">${content.overview}</p>
            </div>
            
            <div>
                <h3 class="text-xl font-bold text-gray-900 mb-4">
                    <i class="fas fa-server mr-2 text-purple-600"></i>
                    Окружения
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    ${content.environments.map(env => `
                        <div class="bg-gradient-to-br from-purple-50 to-blue-50 p-4 rounded-lg">
                            <h4 class="font-bold text-gray-900 mb-2 command-text">${env.name}</h4>
                            <p class="text-gray-600 text-sm">${env.description}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div>
                <h3 class="text-xl font-bold text-gray-900 mb-4">
                    <i class="fas fa-list-ol mr-2 text-purple-600"></i>
                    Шаги развёртывания (production)
                </h3>
                <div class="space-y-4">
                    ${content.steps.map(step => `
                        <div class="flex gap-4">
                            <div class="flex-shrink-0">
                                <div class="step-number w-10 h-10 rounded-full text-white flex items-center justify-center font-bold">
                                    ${step.step}
                                </div>
                            </div>
                            <div class="flex-1 bg-white p-4 rounded-lg shadow-sm">
                                <h4 class="font-bold text-gray-900 mb-2">${step.title}</h4>
                                <p class="text-gray-600 text-sm mb-3">${step.description}</p>
                                <div class="code-block">
                                    <code class="text-sm">${step.command}</code>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

// Render feature content
function renderFeatureContent(command) {
    const { content } = command;
    return `
        <div class="space-y-6">
            <div class="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                <p class="text-gray-800">${content.overview}</p>
            </div>
            
            <div class="space-y-6">
                ${content.phases.map(phase => `
                    <div class="phase-card bg-white p-6 rounded-lg shadow-sm">
                        <div class="flex items-start gap-4 mb-4">
                            <div class="flex-shrink-0">
                                <div class="step-number w-12 h-12 rounded-full text-white flex items-center justify-center text-xl font-bold">
                                    ${phase.phase}
                                </div>
                            </div>
                            <div class="flex-1">
                                <h3 class="text-xl font-bold text-gray-900 mb-2">${phase.name}</h3>
                                <p class="text-gray-600 mb-4">${phase.goal}</p>
                                
                                ${phase.steps ? `
                                    <div class="bg-gray-50 p-4 rounded-lg">
                                        <h4 class="font-semibold text-gray-900 mb-3">Шаги:</h4>
                                        <ul class="space-y-2">
                                            ${phase.steps.map(step => `
                                                <li class="flex items-start gap-2 text-gray-700 text-sm">
                                                    <i class="fas fa-check-circle text-green-500 mt-1"></i>
                                                    <span>${step}</span>
                                                </li>
                                            `).join('')}
                                        </ul>
                                    </div>
                                ` : ''}
                                
                                ${phase.validators ? `
                                    <div class="bg-gray-50 p-4 rounded-lg mt-4">
                                        <h4 class="font-semibold text-gray-900 mb-3">Валидаторы:</h4>
                                        <div class="space-y-3">
                                            ${phase.validators.map(v => `
                                                <div class="bg-white p-3 rounded border border-gray-200">
                                                    <div class="font-medium text-gray-900 mb-1">${v.name}</div>
                                                    <div class="text-sm text-gray-600">Область: ${v.scope}</div>
                                                    <div class="text-sm text-gray-600">Цель: ${v.target}</div>
                                                </div>
                                            `).join('')}
                                        </div>
                                    </div>
                                ` : ''}
                                
                                ${phase.reviewers ? `
                                    <div class="bg-gray-50 p-4 rounded-lg mt-4">
                                        <h4 class="font-semibold text-gray-900 mb-3">Ревьюверы:</h4>
                                        <div class="space-y-3">
                                            ${phase.reviewers.map(r => `
                                                <div class="bg-white p-3 rounded border border-gray-200">
                                                    <div class="font-medium text-gray-900 mb-1">${r.name}</div>
                                                    <div class="text-sm text-gray-600">Область: ${r.scope}</div>
                                                    <div class="text-sm text-gray-600">Фокус: ${r.focus}</div>
                                                </div>
                                            `).join('')}
                                        </div>
                                    </div>
                                ` : ''}
                                
                                ${phase.rules ? `
                                    <div class="bg-yellow-50 p-4 rounded-lg mt-4 border border-yellow-200">
                                        <h4 class="font-semibold text-gray-900 mb-3">
                                            <i class="fas fa-exclamation-triangle text-yellow-600 mr-2"></i>
                                            Правила реализации:
                                        </h4>
                                        <ul class="space-y-2">
                                            ${phase.rules.map(rule => `
                                                <li class="text-sm text-gray-700">• ${rule}</li>
                                            `).join('')}
                                        </ul>
                                    </div>
                                ` : ''}
                                
                                ${phase.checkpoint ? `
                                    <div class="bg-purple-50 p-4 rounded-lg mt-4 border border-purple-200">
                                        <h4 class="font-semibold text-gray-900 mb-2">
                                            <i class="fas fa-flag-checkered text-purple-600 mr-2"></i>
                                            Контрольная точка:
                                        </h4>
                                        <p class="text-sm text-gray-700">${phase.checkpoint}</p>
                                    </div>
                                ` : ''}
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// Render myinsights content
function renderMyInsightsContent(command) {
    const { content } = command;
    return `
        <div class="space-y-6">
            <div class="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg">
                <p class="text-gray-800">${content.overview}</p>
            </div>
            
            <div>
                <h3 class="text-xl font-bold text-gray-900 mb-4">
                    <i class="fas fa-terminal mr-2 text-purple-600"></i>
                    Подкоманды
                </h3>
                <div class="space-y-3">
                    ${content.subcommands.map(sub => `
                        <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                            <code class="command-text text-purple-600 font-semibold">${sub.command}</code>
                            <p class="text-gray-600 text-sm mt-2">${sub.description}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div>
                <h3 class="text-xl font-bold text-gray-900 mb-4">
                    <i class="fas fa-clipboard-check mr-2 text-purple-600"></i>
                    Процесс захвата Insight
                </h3>
                <div class="space-y-4">
                    ${Object.entries(content.captureFlow).map(([key, step]) => `
                        <div class="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg">
                            <h4 class="font-bold text-gray-900 mb-3">${step.name}</h4>
                            ${step.description ? `<p class="text-gray-700 text-sm mb-3">${step.description}</p>` : ''}
                            ${step.actions ? `
                                <ul class="space-y-2">
                                    ${step.actions.map(action => `
                                        <li class="flex items-start gap-2 text-sm text-gray-700">
                                            <i class="fas fa-chevron-right text-purple-600 mt-1"></i>
                                            <span>${action}</span>
                                        </li>
                                    `).join('')}
                                </ul>
                            ` : ''}
                            ${step.fields ? `
                                <div class="bg-white p-3 rounded mt-3">
                                    <div class="space-y-2">
                                        ${step.fields.map(field => `
                                            <div class="text-sm">
                                                <span class="font-semibold text-gray-900">${field.name}:</span>
                                                <span class="text-gray-600"> ${field.description}</span>
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                            ` : ''}
                            ${step.format ? `
                                <div class="code-block mt-3">
                                    <code class="text-sm">${step.format}</code>
                                </div>
                            ` : ''}
                        </div>
                    `).join('')}
                </div>
            </div>
            
            ${content.hitCounter ? `
                <div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                    <h4 class="font-semibold text-gray-900 mb-2">
                        <i class="fas fa-chart-line text-blue-600 mr-2"></i>
                        Счётчик использования
                    </h4>
                    <p class="text-gray-700 text-sm">${content.hitCounter}</p>
                </div>
            ` : ''}
        </div>
    `;
}

// Render plan content
function renderPlanContent(command) {
    const { content } = command;
    return `
        <div class="space-y-6">
            <div class="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-r-lg">
                <p class="text-gray-800">${content.overview}</p>
            </div>
            
            <div>
                <h3 class="text-xl font-bold text-gray-900 mb-4">
                    <i class="fas fa-list-ol mr-2 text-purple-600"></i>
                    Шаги планирования
                </h3>
                <div class="space-y-3">
                    ${content.steps.map((step, index) => `
                        <div class="flex gap-4">
                            <div class="flex-shrink-0">
                                <div class="step-number w-10 h-10 rounded-full text-white flex items-center justify-center font-bold">
                                    ${index + 1}
                                </div>
                            </div>
                            <div class="flex-1 bg-white p-4 rounded-lg shadow-sm">
                                <p class="text-gray-700">${step.description}</p>
                                ${step.parallel ? `
                                    <div class="mt-3 bg-gray-50 p-3 rounded">
                                        <div class="text-sm font-semibold text-gray-900 mb-2">Параллельно:</div>
                                        <ul class="space-y-1">
                                            ${step.parallel.map(p => `
                                                <li class="text-sm text-gray-600">• ${p}</li>
                                            `).join('')}
                                        </ul>
                                    </div>
                                ` : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

// Render start content
function renderStartContent(command) {
    const { content } = command;
    return `
        <div class="space-y-6">
            <div class="bg-pink-50 border-l-4 border-pink-500 p-4 rounded-r-lg">
                <p class="text-gray-800 font-medium">${content.overview}</p>
            </div>
            
            <div>
                <h3 class="text-xl font-bold text-gray-900 mb-4">
                    <i class="fas fa-check-circle mr-2 text-purple-600"></i>
                    Предварительные требования
                </h3>
                <ul class="space-y-2">
                    ${content.prerequisites.map(req => `
                        <li class="flex items-start gap-3 bg-white p-3 rounded-lg shadow-sm">
                            <i class="fas fa-check text-green-500 mt-1"></i>
                            <span class="text-gray-700">${req}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>
            
            <div>
                <h3 class="text-xl font-bold text-gray-900 mb-4">
                    <i class="fas fa-layer-group mr-2 text-purple-600"></i>
                    Фазы генерации проекта
                </h3>
                <div class="space-y-6">
                    ${content.phases.map(phase => `
                        <div class="phase-card bg-white p-6 rounded-lg shadow-sm">
                            <div class="flex items-start gap-4 mb-4">
                                <div class="flex-shrink-0">
                                    <div class="step-number w-12 h-12 rounded-full text-white flex items-center justify-center text-xl font-bold">
                                        ${phase.phase}
                                    </div>
                                </div>
                                <div class="flex-1">
                                    <h4 class="text-lg font-bold text-gray-900 mb-2">${phase.name}</h4>
                                    <p class="text-gray-600 text-sm mb-4">${phase.description}</p>
                                    
                                    ${phase.tasks && Array.isArray(phase.tasks) && typeof phase.tasks[0] === 'string' ? `
                                        <div class="bg-gray-50 p-4 rounded-lg">
                                            <h5 class="font-semibold text-gray-900 mb-3">Задачи:</h5>
                                            <ul class="space-y-2">
                                                ${phase.tasks.map(task => `
                                                    <li class="flex items-start gap-2 text-sm text-gray-700">
                                                        <i class="fas fa-angle-right text-purple-600 mt-1"></i>
                                                        <span>${task}</span>
                                                    </li>
                                                `).join('')}
                                            </ul>
                                        </div>
                                    ` : ''}
                                    
                                    ${phase.tasks && Array.isArray(phase.tasks) && typeof phase.tasks[0] === 'object' ? `
                                        <div class="space-y-3">
                                            ${phase.tasks.map(task => `
                                                <div class="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg">
                                                    <h5 class="font-semibold text-gray-900 mb-2">${task.name}</h5>
                                                    <p class="text-sm text-gray-600 mb-2">${task.description}</p>
                                                    <code class="text-xs text-purple-600 bg-white px-2 py-1 rounded">${task.commit}</code>
                                                </div>
                                            `).join('')}
                                        </div>
                                    ` : ''}
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            ${content.flags ? `
                <div>
                    <h3 class="text-xl font-bold text-gray-900 mb-4">
                        <i class="fas fa-flag mr-2 text-purple-600"></i>
                        Флаги
                    </h3>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        ${content.flags.map(flag => `
                            <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                                <code class="command-text text-purple-600 font-semibold">${flag.flag}</code>
                                <p class="text-gray-600 text-sm mt-2">${flag.description}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}
            
            ${content.errorRecovery ? `
                <div class="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                    <h4 class="font-semibold text-gray-900 mb-2">
                        <i class="fas fa-life-ring text-red-600 mr-2"></i>
                        Восстановление при ошибках
                    </h4>
                    <p class="text-gray-700 text-sm">${content.errorRecovery}</p>
                </div>
            ` : ''}
        </div>
    `;
}

// Render test content
function renderTestContent(command) {
    const { content } = command;
    return `
        <div class="space-y-6">
            <div class="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                <p class="text-gray-800">${content.overview}</p>
            </div>
            
            <div>
                <h3 class="text-xl font-bold text-gray-900 mb-4">
                    <i class="fas fa-list-ol mr-2 text-purple-600"></i>
                    Шаги тестирования
                </h3>
                <div class="space-y-3">
                    ${content.steps.map((step, index) => `
                        <div class="flex gap-4">
                            <div class="flex-shrink-0">
                                <div class="step-number w-10 h-10 rounded-full text-white flex items-center justify-center font-bold">
                                    ${index + 1}
                                </div>
                            </div>
                            <div class="flex-1 bg-white p-4 rounded-lg shadow-sm">
                                <p class="text-gray-700 mb-2">${step.description}</p>
                                ${step.parallel ? `
                                    <div class="bg-gray-50 p-3 rounded mt-3">
                                        <div class="text-sm font-semibold text-gray-900 mb-2">Параллельное выполнение:</div>
                                        <div class="space-y-1">
                                            ${step.parallel.map(p => `
                                                <div class="code-block">
                                                    <code class="text-xs">${p}</code>
                                                </div>
                                            `).join('')}
                                        </div>
                                    </div>
                                ` : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            ${content.coverageTargets ? `
                <div>
                    <h3 class="text-xl font-bold text-gray-900 mb-4">
                        <i class="fas fa-chart-bar mr-2 text-purple-600"></i>
                        Целевое покрытие тестами
                    </h3>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        ${content.coverageTargets.map(target => `
                            <div class="bg-gradient-to-br from-green-50 to-blue-50 p-4 rounded-lg">
                                <div class="text-gray-900 font-semibold mb-2">${target.scope}</div>
                                <div class="text-2xl font-bold text-purple-600">${target.target}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}
        </div>
    `;
}

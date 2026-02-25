import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'
import { cors } from 'hono/cors'

const app = new Hono()

// Enable CORS
app.use('/api/*', cors())

// Serve static files
app.use('/static/*', serveStatic({ root: './public' }))

// API endpoint to get commands data
app.get('/api/commands', async (c) => {
  try {
    // В production среде файл будет в public/static/
    const commands = await fetch('https://raw.githubusercontent.com/dzhechko/claude-commands-docs/main/commands-data.json')
      .then(res => res.json())
      .catch(() => [])
    
    return c.json(commands)
  } catch (error) {
    return c.json({ error: 'Failed to load commands' }, 500)
  }
})

// Main page
app.get('/', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="ru">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="Интерактивный транскрипт команд Claude Code — полное руководство по командам для разработки">
        <meta name="keywords" content="Claude Code, команды, разработка, AI, documentation">
        <meta name="author" content="Дмитрий Жечков">
        
        <!-- Open Graph / Facebook -->
        <meta property="og:type" content="website">
        <meta property="og:title" content="Команды Claude Code — Интерактивный Транскрипт">
        <meta property="og:description" content="Полное интерактивное руководство по командам Claude Code для разработки">
        <meta property="og:url" content="https://claude-commands-docs.pages.dev/">
        
        <!-- Twitter -->
        <meta property="twitter:card" content="summary_large_image">
        <meta property="twitter:title" content="Команды Claude Code — Интерактивный Транскрипт">
        <meta property="twitter:description" content="Полное интерактивное руководство по командам Claude Code">
        
        <title>Команды Claude Code — Интерактивный Транскрипт</title>
        
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Fira+Code:wght@400;500&display=swap');
            
            * {
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            }
            
            code, pre, .command-text {
                font-family: 'Fira Code', 'Courier New', monospace;
            }
            
            body {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                min-height: 100vh;
            }
            
            .glass-effect {
                background: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.2);
            }
            
            .card-hover {
                transition: all 0.3s ease;
            }
            
            .card-hover:hover {
                transform: translateY(-4px);
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
            }
            
            .category-badge {
                transition: all 0.2s ease;
            }
            
            .category-badge:hover {
                transform: scale(1.05);
            }
            
            .search-input {
                transition: all 0.3s ease;
            }
            
            .search-input:focus {
                box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
            }
            
            .command-detail {
                animation: slideIn 0.3s ease-out;
            }
            
            @keyframes slideIn {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .step-number {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            }
            
            .code-block {
                background: #1e1e1e;
                color: #d4d4d4;
                border-radius: 8px;
                padding: 1rem;
                overflow-x: auto;
            }
            
            .loading-spinner {
                border: 3px solid rgba(102, 126, 234, 0.3);
                border-radius: 50%;
                border-top: 3px solid #667eea;
                width: 40px;
                height: 40px;
                animation: spin 1s linear infinite;
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            
            .phase-card {
                border-left: 4px solid #667eea;
            }
            
            /* Скрыть скроллбар, но оставить возможность прокрутки */
            .hide-scrollbar::-webkit-scrollbar {
                display: none;
            }
            .hide-scrollbar {
                -ms-overflow-style: none;
                scrollbar-width: none;
            }
        </style>
    </head>
    <body class="p-4 md:p-8">
        <!-- Header -->
        <header class="glass-effect rounded-2xl shadow-2xl mb-8 p-6 md:p-8">
            <div class="max-w-6xl mx-auto">
                <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div>
                        <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                            <i class="fas fa-terminal text-purple-600 mr-3"></i>
                            Команды Claude Code
                        </h1>
                        <p class="text-gray-600 text-sm md:text-base">
                            Интерактивный транскрипт команд для разработки
                        </p>
                        <p class="text-gray-500 text-xs md:text-sm mt-1">
                            <i class="fas fa-user mr-1"></i>
                            Подготовил: <a href="https://t.me/llm_notes" target="_blank" class="text-purple-600 hover:underline">Дмитрий Жечков</a>
                        </p>
                    </div>
                    <div class="flex flex-col gap-2">
                        <a href="https://github.com/dzhechko/2026-jan-pu-opus-clone-01" target="_blank" 
                           class="inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition">
                            <i class="fab fa-github mr-2"></i>
                            GitHub
                        </a>
                    </div>
                </div>
            </div>
        </header>

        <!-- Main Content -->
        <main class="max-w-6xl mx-auto">
            <!-- Search and Filter -->
            <div class="glass-effect rounded-2xl shadow-2xl mb-8 p-6">
                <div class="flex flex-col md:flex-row gap-4">
                    <div class="flex-1">
                        <div class="relative">
                            <i class="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                            <input 
                                type="text" 
                                id="searchInput" 
                                placeholder="Поиск команд..." 
                                class="search-input w-full pl-12 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-purple-600 focus:outline-none"
                            />
                        </div>
                    </div>
                    <div class="flex gap-2 flex-wrap">
                        <button class="category-badge px-4 py-2 rounded-lg bg-purple-600 text-white font-medium" data-category="all">
                            Все
                        </button>
                        <button class="category-badge px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-medium hover:bg-gray-300" data-category="deployment">
                            Развёртывание
                        </button>
                        <button class="category-badge px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-medium hover:bg-gray-300" data-category="development">
                            Разработка
                        </button>
                        <button class="category-badge px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-medium hover:bg-gray-300" data-category="knowledge">
                            Знания
                        </button>
                        <button class="category-badge px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-medium hover:bg-gray-300" data-category="planning">
                            Планирование
                        </button>
                        <button class="category-badge px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-medium hover:bg-gray-300" data-category="bootstrap">
                            Bootstrap
                        </button>
                        <button class="category-badge px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-medium hover:bg-gray-300" data-category="testing">
                            Тестирование
                        </button>
                    </div>
                </div>
            </div>

            <!-- Loading State -->
            <div id="loadingState" class="glass-effect rounded-2xl shadow-2xl p-12 text-center">
                <div class="loading-spinner mx-auto mb-4"></div>
                <p class="text-gray-600">Загрузка команд...</p>
            </div>

            <!-- Commands Grid -->
            <div id="commandsGrid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8" style="display: none;">
                <!-- Commands will be inserted here -->
            </div>

            <!-- Command Detail Modal -->
            <div id="commandDetail" class="hidden">
                <!-- Detail will be inserted here -->
            </div>
        </main>

        <!-- Footer -->
        <footer class="glass-effect rounded-2xl shadow-2xl mt-8 p-6 max-w-6xl mx-auto">
            <div class="text-center text-gray-600 text-sm">
                <p class="mb-2">
                    <i class="fas fa-code mr-2"></i>
                    Создано с использованием Claude Code & Hono
                </p>
                <p>
                    <i class="fas fa-calendar-alt mr-2"></i>
                    2026 | 
                    <a href="https://t.me/llm_notes" target="_blank" class="text-purple-600 hover:underline ml-1">
                        <i class="fab fa-telegram mr-1"></i>
                        t.me/llm_notes
                    </a>
                </p>
            </div>
        </footer>

        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <script src="/static/app.js"></script>
    </body>
    </html>
  `)
})

export default app

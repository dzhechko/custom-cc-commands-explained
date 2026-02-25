# 🚀 Настройка GitHub Pages

## ✅ Код успешно загружен в GitHub!

Репозиторий: https://github.com/dzhechko/custom-cc-commands-explained

## 📋 Настройка деплоя на GitHub Pages

### Вариант 1: Автоматический деплой (рекомендуется)

#### Шаг 1: Создайте GitHub Actions workflow вручную

1. Перейдите в ваш репозиторий: https://github.com/dzhechko/custom-cc-commands-explained
2. Нажмите **Add file** → **Create new file**
3. Введите путь: `.github/workflows/deploy.yml`
4. Вставьте следующий код:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

5. Нажмите **Commit changes**

#### Шаг 2: Включите GitHub Pages

1. Перейдите в **Settings** вашего репозитория
2. В левом меню выберите **Pages**
3. В разделе **Source** выберите: **GitHub Actions**
4. Сохраните изменения

#### Шаг 3: Проверьте деплой

1. Перейдите во вкладку **Actions**
2. Вы увидите запущенный workflow "Deploy to GitHub Pages"
3. Дождитесь его завершения (2-3 минуты)
4. Сайт будет доступен по адресу:
   **https://dzhechko.github.io/custom-cc-commands-explained/**

---

### Вариант 2: Ручной деплой (если Actions не работает)

#### Шаг 1: Соберите проект локально

В Claude Code выполните:

```bash
cd /home/user/webapp
npm run build
```

#### Шаг 2: Создайте ветку gh-pages

```bash
cd /home/user/webapp

# Создать orphan ветку
git checkout --orphan gh-pages

# Удалить все файлы
git rm -rf .

# Скопировать собранные файлы
cp -r dist/* .

# Добавить все файлы
git add .

# Коммит
git commit -m "Deploy to GitHub Pages"

# Push в gh-pages
git push -f origin gh-pages

# Вернуться в main
git checkout main
```

#### Шаг 3: Настройте Pages

1. Settings → Pages
2. Source: **Deploy from a branch**
3. Branch: **gh-pages** / **/ (root)**
4. Save

Сайт будет доступен: **https://dzhechko.github.io/custom-cc-commands-explained/**

---

## 🔍 Проверка статуса

После настройки:

1. **Actions** (вариант 1): Проверьте статус workflow
2. **Pages** в Settings: Увидите URL сайта
3. Подождите 2-3 минуты после первого деплоя

---

## 🎯 Ваш сайт будет доступен по адресу:

### 🔗 https://dzhechko.github.io/custom-cc-commands-explained/

---

## 📝 Обновление сайта

После изменений в коде:

```bash
cd /home/user/webapp
git add .
git commit -m "update: описание изменений"
git push origin main
```

GitHub Actions автоматически задеплоит изменения!

---

## ⚠️ Возможные проблемы

### Проблема: Actions не запускается

**Решение:**
1. Settings → Actions → General
2. Workflow permissions: выберите "Read and write permissions"
3. Сохраните и повторите push

### Проблема: Сайт не открывается

**Решение:**
1. Проверьте статус в Settings → Pages
2. Убедитесь, что деплой завершился успешно в Actions
3. Подождите 5-10 минут после первого деплоя

### Проблема: 404 ошибка

**Решение:**
1. Проверьте, что в dist/ есть файлы после сборки
2. Убедитесь, что путь в upload-pages-artifact правильный: `./dist`

---

## 🆘 Нужна помощь?

Если что-то не работает:
1. Проверьте логи в Actions
2. Убедитесь, что репозиторий **public**
3. Проверьте права доступа Actions

**Контакты:**
- Telegram: [@llm_notes](https://t.me/llm_notes)
- GitHub Issues: https://github.com/dzhechko/custom-cc-commands-explained/issues

---

**✨ Готово! Ваш сайт готов к публикации!**

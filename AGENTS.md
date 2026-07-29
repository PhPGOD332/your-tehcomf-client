# Tehcomf Client: правила разработки

Этот файл действует для всего репозитория `your-tehcomf-client`.

## Ветки и синхронизация

Рабочая ветка проекта — `develop`. В `main` напрямую не разрабатывать и не
пушить. Репозиторий общий: перед каждой правкой обязательно проверить обе
удалённые ветки.

До редактирования файлов:

1. Проверить рабочее дерево и сохранить чужие изменения:

   ```bash
   git status --short --branch
   git remote -v
   ```

   Не выполнять `reset --hard`, `checkout --`, принудительный stash или другие
   операции, способные потерять незакоммиченные изменения.

2. Получить актуальные remote refs:

   ```bash
   git fetch origin --prune
   ```

3. Обновить `main` только fast-forward:

   ```bash
   git switch main
   git pull --ff-only origin main
   ```

4. Перейти в `develop` и обновить её. Если локальной ветки ещё нет, создать её
   от `origin/develop`:

   ```bash
   git switch develop
   git pull --ff-only origin develop
   ```

   Для первого перехода допустимо:

   ```bash
   git switch --track -c develop origin/develop
   ```

5. Сравнить ветки:

   ```bash
   git rev-list --left-right --count develop...main
   git log --oneline --decorate --graph --max-count=20 main develop
   ```

6. Если в `main` появились коммиты, которых ещё нет в `develop`, находясь в
   `develop`, сначала влить `main`, проверить результат и отправить обновлённую
   `develop`:

   ```bash
   git merge --no-ff main
   npm run lint
   git push origin develop
   ```

   Только после успешного merge и push переходить к новой работе. Конфликты не
   разрешать вслепую; изучить обе стороны и сохранить смысл изменений.

7. Если `main` и `develop` разошлись, всё равно вливать `main` в `develop`, а
   не переписывать историю `develop`. Не использовать rebase общей ветки и
   никогда не выполнять force-push.

Если локальные незакоммиченные изменения мешают переключению веток, остановиться
и сохранить их без потери: использовать отдельный worktree либо запросить у
пользователя решение. Не присваивать существующие изменения себе.

Перед push после длительной работы снова выполнить `git fetch origin --prune`.
Если `origin/develop` продвинулась, сначала влить её в локальную `develop`,
проверить проект и только затем push.

## Завершение работы и публикация

Всю разработку вести в `develop`. Когда задача полностью готова, проверки
успешны и изменения можно публиковать, выполнить полный цикл
`develop -> main -> develop`.

1. Ещё раз получить удалённые изменения, обновить `main`, вернуться в
   `develop` и влить актуальные remote-изменения обеих веток:

   ```bash
   git fetch origin --prune
   git switch main
   git pull --ff-only origin main
   git switch develop
   git merge origin/develop
   git merge --no-ff main
   ```

2. Выполнить проверки, просмотреть diff и закоммитить только изменения текущей
   задачи. Не добавлять существовавшие пользовательские изменения:

   ```bash
   npm run lint
   npm run build
   git status --short
   git diff
   git add <файлы-текущей-задачи>
   git commit -m "<осмысленное сообщение>"
   git push origin develop
   ```

3. Перед финальным merge ещё раз обновить `main`. Если за это время в
   `origin/main` появились новые коммиты, вернуться в `develop`, влить их,
   повторить проверки и push `develop`:

   ```bash
   git switch main
   git pull --ff-only origin main
   ```

4. Влить готовую `develop` в `main`, повторить необходимые проверки и
   отправить `main`:

   ```bash
   git merge --no-ff develop
   npm run lint
   npm run build
   git push origin main
   ```

5. После успешного push `main` синхронизировать `develop` с финальным merge-
   коммитом, отправить её и оставить рабочее дерево в `develop`:

   ```bash
   git switch develop
   git merge --ff-only main
   git push origin develop
   ```

Если push отклонён из-за новых удалённых коммитов или защиты ветки, не
использовать force-push и не обходить защиту. Повторить синхронизацию либо
создать требуемый репозиторием PR и сообщить пользователю. Не выполнять merge
в `main`, если проверки не прошли или задача ещё не готова.

## Стек и команды

- Next.js 16, React 19, TypeScript, SCSS.
- Требуемая версия Node.js указана в `.nvmrc`.
- Пакетный менеджер — npm; lock-файл — `package-lock.json`.

Подготовка окружения:

```bash
source /home/dev/.nvm/nvm.sh
nvm use
npm ci
```

Основные проверки:

```bash
npm run lint
npm run build
```

Не запускать `npm install` и не менять lock-файл без необходимости. Если
`package-lock.json` уже изменён до начала задачи, считать это пользовательской
правкой и не включать её в свои изменения.

## Dev-запуск

Стандартный порт клиента — `3000`. Для HTTPS через публичный IP backend должен
слушать только loopback:

```bash
npm run dev -- --hostname 127.0.0.1 --port 3000
```

Публичный адрес после подключения порта в Caddy:

```text
https://144.31.221.28:3000
```

Следовать общим правилам `/home/dev/projects/AGENTS.md`: проверить локальный
HTTP backend и публичный HTTPS перед отправкой ссылки пользователю.

## Особенности проекта

- Контент загружается из Directus; server-side запросы используют
  `NEXT_PUBLIC_API_URL`, а browser-side запросы идут через
  `/api/directus`.
- `.env` может указывать на реальные внешние сервисы. Не показывать значения
  переменных и не выполнять тестовую отправку форм/запись данных без явного
  разрешения пользователя.
- При изменении маршрутов проверить главную страницу, портфолио, динамическую
  страницу портфолио, партнёров, контакты, страницу о компании и privacy policy.
- Перед завершением проверить `git diff`, `git status`, lint и, для изменений
  сборки или серверного кода, `npm run build`.

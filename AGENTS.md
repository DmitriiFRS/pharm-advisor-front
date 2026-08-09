# AGENTS.md

## Назначение и стек

`pharm-advisor-front` — публичный сайт и личный кабинет Pharmadvisor. Это Next.js 16-приложение на React 19, TypeScript (strict), App Router, Tailwind CSS v4 и `next-intl`.

Основные команды:

```bash
npm run dev
npm run lint
npm run build
npm run start
```

Автотестов в проекте пока нет. Для изменений UI/API запускайте как минимум `npm run lint`; перед передачей значимых изменений также запускайте `npm run build`.

## Карта архитектуры

Проект использует Feature-Sliced-подобное разделение. Сохраняйте направление зависимостей: `app/widgets/features` могут использовать нижележащие слои, но `shared` и `entities` не должны импортировать из `features`, `widgets` или `app`.

| Каталог | Ответственность |
| --- | --- |
| `src/app` | App Router: локализованные страницы, layouts, metadata, middleware и BFF route handlers. |
| `src/widgets` | Крупные секции и компоновка страниц: Header, Footer, Hero, каталоги и контактный блок. |
| `src/features` | Пользовательские сценарии: auth, profile, feedback, FAQ, services, education, knowledge base. |
| `src/entities` | Доменные сущности и их типы/UI: пользователь, компания, service card. |
| `src/shared` | Переиспользуемые API-обёртки, UI, hooks, конфиг, типы и утилиты. |
| `src/components/ui` | Базовые shadcn/Radix-примитивы. |
| `src/i18n` и `locales` | Маршрутизация и переводы `ru`/`uz`. |
| `public/assets` | Локальные статические изображения и SVG. Импортируйте их через алиас `@/assets/*`. |

Новый модуль располагайте на самом узком подходящем уровне. В feature/widget держите публичный API в `index.ts`; детальные реализации делите на `api`, `model`, `types`, `ui` по существующему примеру.

## Маршруты, локализация и SSR

- Все пользовательские страницы живут в `src/app/[locale]`; допустимые locale — только `ru` и `uz`, default — `ru`, prefix — `as-needed`.
- Для внутренних ссылок и роутинга используйте `Link`, `useRouter`, `usePathname` из `@/i18n/navigation` (или уже принятого в файле `@/i18n/routing`), а не `next/link`/`next/navigation`. Это сохраняет locale при переходах.
- Любой новый пользовательский текст должен появляться в **обоих** `locales/ru.json` и `locales/uz.json` и выводиться через `next-intl`. Не добавляйте новые захардкоженные русские/узбекские строки в компоненты.
- Layout `src/app/[locale]/layout.tsx` отвечает за `NextIntlClientProvider`, user context, общий Header/Footer, contacts, toast и metadata. Не дублируйте эти провайдеры на страницах.
- Компоненты серверные по умолчанию. Добавляйте `"use client"` только при необходимости state, effect, browser API, обработчиков событий или клиентских hooks. Серверные API-вызовы выполняйте в Server Components/route handlers.
- Защищённые пути задаются в `src/middleware.ts`. При добавлении нового закрытого раздела обновляйте `PROTECTED_ROUTES` и проверяйте сценарии с истёкшими токенами и неподтверждённым пользователем.

## Данные, BFF и авторизация

- Браузер не должен обращаться к backend напрямую для доменных операций. Используйте `apiClientService`, `useData` или существующие API-функции feature, которые идут через `/api/get`, `/api/post`, `/api/patch`.
- BFF намеренно работает по allowlist: каждый новый backend GET endpoint добавляйте в `ENDPOINT_MAP` в `src/app/api/get/[...path]/route.ts`; POST/PATCH — в соответствующий `ENDPOINT_MAP`. Не превращайте proxy route в открытый прокси по произвольному URL.
- Endpoint-строки живут рядом с feature/entity в `api/*.endpoints.ts`; не размазывайте их по UI.
- Для server-side запросов используйте `apiServerService` или специализированный server API и передавайте locale в заголовке `accept-language`, когда ответ локализован.
- Не ломайте контракт авторизации: `accessToken` и `refreshToken` управляются route handlers в `src/app/api/auth`; middleware обновляет их и ограничивает protected routes. Не читайте/не записывайте эти cookies напрямую в client components.
- Секреты не должны иметь префикс `NEXT_PUBLIC_` и не должны попадать в клиентский bundle. Telegram-ключи сейчас используют публичные env-имена: при любой работе с этой интеграцией переносите токен и chat id в server-only env и сохраняйте отправку только в route handler.
- Обрабатывайте ошибки backend в BFF через `bffErrorParse` там, где пользователю нужен ответный текст; не скрывайте неуспешный `fetch` как успешный ответ.

## UI и стили

- Используйте Tailwind CSS и токены из `src/app/[locale]/globals.css`; сохраняйте существующие значения типографики, цветов и breakpoints. Глобальные стили добавляйте только для действительно глобального поведения.
- Для общей раскладки используйте `Container`, для типовых кнопок/инпутов — компоненты из `src/shared/ui`; для простых вариаций передавайте `className`, а не создавайте дубликат компонента.
- Для составления Tailwind-классов с условиями используйте `cn` из `@/lib/utils` (новый код). `src/shared/lib/utils.ts` — дублирующая историческая копия; не создавайте третью.
- Используйте `next/image` для локальных и удалённых изображений. Если добавляется новый удалённый origin, внесите его в `images.remotePatterns` в `next.config.ts`.
- Доступность обязательна: осмысленный `alt`, семантические элементы, `type` у button внутри form, доступные label/ошибки полей. Для сложных overlay/controls предпочитайте уже установленные Radix/shadcn primitives.

## Формы и типизация

- Формы строятся на `react-hook-form` + `zod` + `zodResolver`. Схема хранится в `model/*Schema.ts`, тип берётся через `z.infer<typeof schema>`, API-вызов — в `api`.
- Показывайте пользователю результат асинхронной операции через существующий `react-toastify`; всегда снимайте loading в `finally`.
- TypeScript остаётся strict: не добавляйте `any`, широкие касты или отключения ESLint без точной, локальной причины. Описывайте backend payload/response интерфейсами в `types` или рядом с API.

## Перед сдачей изменений

- Проверьте, что изменённый файл соответствует границе слоя и использует `@/*` aliases.
- Для локализованных UI — проверьте обе locale и locale-aware переходы.
- Для API/auth — проверьте allowlist BFF, проброс заголовка locale, обработку неуспешного ответа и отсутствие секретов на клиенте.
- Запустите `npm run lint`; для затрагивающих маршруты, конфигурацию или production UI изменений — `npm run build`.
- Не изменяйте чужие незакоммиченные правки. На момент составления этого файла `package-lock.json` уже изменён и не относится к данной документации.

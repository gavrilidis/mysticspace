# MYSTIC SPACE — Навигационная система судьбы

Интерактивная веб-платформа на **Next.js (App Router) + TypeScript + Tailwind CSS** с 3D-космосом на HTML5 Canvas, симуляцией движения галактик, интерактивными картами Таро, синастрией, лунным навигатором и расчётом Матрицы Судьбы.

---

## Архитектура проекта

```text
mysticspace/
├── scripts/
│   └── deploy.mjs                   # Скрипт ручного деплоя статики (out/) в ветку gh-pages
├── src/
│   ├── app/
│   │   ├── globals.css              # Глобальные стили, CSS-переменные и анимации
│   │   ├── layout.tsx               # Корневой Layout (шрифты, метаданные, провайдеры)
│   │   └── page.tsx                 # Главная страница приложения
│   ├── components/
│   │   ├── canvas/
│   │   │   └── CosmosCanvas.tsx     # 3D-движок космоса, звёздного поля и галактик
│   │   ├── hud/
│   │   │   └── FlightControllerHud.tsx # Панель управления полётом, скоростью и палитрами
│   │   ├── layout/
│   │   │   ├── Header.tsx           # Шапка сайта и мобильное меню
│   │   │   └── Footer.tsx           # Подвал сайта
│   │   ├── modals/
│   │   │   └── ActionModal.tsx      # Модальное окно оформления доступа
│   │   ├── sections/
│   │   │   ├── HeroGyroscope.tsx    # Интерактивное 3D-колесо созвездий
│   │   │   ├── HeroSection.tsx      # Первый экран (Hero)
│   │   │   ├── MorphVisualizer.tsx  # Голографический SVG-визуализатор этапов
│   │   │   ├── EcosystemSection.tsx # Scrollytelling-секция «Пять граней пути»
│   │   │   ├── InteractiveLabSection.tsx # Секция живых интерактивных виджетов
│   │   │   ├── ExpressCodeSection.tsx    # Калькулятор космического кода по дате рождения
│   │   │   └── PricingSection.tsx        # Тарифные орбиты
│   │   └── widgets/
│   │       ├── TarotWidget.tsx      # 3D-карта Таро дня
│   │       ├── SynastryWidget.tsx   # Симулятор резонанса стихий (Синастрия)
│   │       └── LunarWidget.tsx      # Интерактивный трекер фаз Луны
│   ├── context/
│   │   └── CosmicContext.tsx        # Глобальное состояние космоса, тем и модальных окон
│   ├── data/
│   │   ├── astrology.ts             # Знаки зодиака, глифы и трактовки 22 Арканов
│   │   ├── ecosystem.ts             # Данные этапов экосистемы
│   │   ├── palettes.ts              # Цветовые темы, спектры звёзд и параметры галактик
│   │   ├── pricing.ts               # Тарифные планы
│   │   ├── synastry.ts              # Матрица совместимости стихий
│   │   └── tarot.ts                 # Колода старших Арканов Таро
│   ├── hooks/
│   │   └── useScrollMorph.ts        # Хук анимаций появления и параллакса при скролле
│   ├── lib/
│   │   ├── cosmosEngine.ts          # Генерация 3D-частиц, туманностей и спрайтов звёзд
│   │   └── destinyCalculator.ts     # Вычисление солнечного знака, Аркана и фаз Луны
│   └── types/
│       └── mystic.ts                # TypeScript-интерфейсы и типы данных
├── next.config.mjs                  # Конфигурация Next.js (Static Export)
├── tailwind.config.ts               # Конфигурация Tailwind CSS
├── postcss.config.mjs               # Конфигурация PostCSS
├── tsconfig.json                    # Конфигурация TypeScript
└── package.json                     # Зависимости и скрипты
```

---

## Стек технологий

- **Framework:** Next.js 15 (App Router, Static Export)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 3 + CSS Custom Properties
- **Graphics:** HTML5 Canvas 2D Engine (3D projection, procedural nebulae, diffraction spikes) + SVG animations

---

## Локальный запуск

1. Установка зависимостей:
   ```bash
   npm install
   ```

2. Запуск сервера разработки:
   ```bash
   npm run dev
   ```
   Откройте [http://localhost:3000](http://localhost:3000) в браузере.

3. Сборка production-версии:
   ```bash
   npm run build
   ```

4. Ручной деплой на прод (GitHub Pages без GitHub Actions):
   ```bash
   npm run deploy
   ```
   Команда локально собирает статику в `out/`, добавляет `.nojekyll` и пушит готовый бандл в ветку `gh-pages`.

# Деплой на Beget + отправка ссылки на курс после оплаты

## 1. Сборка сайта
```bash
npm install
npm run build
```
Готовые файлы — в папке `dist/` (уже с `.htaccess` и `favicon/`).

## 2. Загрузка сайта на Beget
- Домен: **loromarova.ru** → корневая папка сайта, обычно `~/loromarova.ru/public_html/`.
- Загрузите **всё содержимое `dist/`** в `public_html/` (включая `.htaccess`).
- Проверьте, что `index.html` лежит прямо в `public_html/`.

## 3. Бэкенд для письма (PHP)
- В `public_html/` создайте папку **`pay/`**.
- Загрузите туда `server/pay-callback.php` → получится `public_html/pay/pay-callback.php`.
- Скопируйте `server/config.sample.php` в ту же папку под именем **`config.php`**
  (`public_html/pay/config.php`) и впишите реальные значения:
  - `cp_secret` — CloudPayments → Настройки → API → «Пароль для API».
  - `course_link` — ссылка, дающая доступ к курсу (TG-канал/платформа).
  - `mail_from` / `mail_from_name` — почта отправителя на домене.
  - (опц.) `smtp_*` — если хотите слать через SMTP Beget (`smtp.beget.com:465`).
- ⚠️ `config.php` с ключами в git НЕ коммитится — он живёт только на сервере.

## 4. Почта
- В панели Beget создайте ящик, напр. **info@loromarova.ru** — с него уходят письма.
- Если используете SMTP — впишите логин/пароль ящика в `config.php`.

## 5. Настройка CloudPayments
- ЛК CloudPayments → **Уведомления → Pay**:
  - URL: `https://loromarova.ru/pay/pay-callback.php`
  - Метод: `POST`
- Убедитесь, что «Пароль для API» в ЛК совпадает с `cp_secret` в `config.php`.
- Для приёма реальных платежей замените тестовый `publicId` в
  `src/lib/checkout.ts` на **боевой** publicId и пересоберите (`npm run build`).

## 6. Как это работает
1. Клиент вводит e-mail и оплачивает картой (виджет CloudPayments).
2. CloudPayments шлёт POST на `pay-callback.php`.
3. Скрипт проверяет подпись (HMAC на секрете), берёт e-mail покупателя и
   отправляет письмо со ссылкой на курс, отвечает `{"code":0}`.

## Проверка
- Тестовый режим CloudPayments: оплата тестовой картой, деньги не спишутся,
  вебхук придёт — письмо должно уйти на указанный e-mail.
- Если письмо не пришло: проверьте `config.php`, ящик отправителя, логи Beget,
  и что URL вебхука указан верно.

> Примечание: GitHub Pages больше не используется как прод (base сайта = `/`).
> При необходимости workflow `.github/workflows/deploy.yml` можно отключить.

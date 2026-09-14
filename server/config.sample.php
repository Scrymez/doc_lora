<?php
/**
 * Скопируйте этот файл в config.php (рядом) и впишите реальные значения.
 * config.php НЕ коммитится в git (см. .gitignore).
 */
return [
    // CloudPayments → Настройки → API → «Пароль для API» (секрет).
    'cp_secret' => 'ВСТАВЬТЕ_API_PASSWORD_CLOUDPAYMENTS',

    // Ссылка, которая даёт доступ к курсу (Telegram-канал / платформа и т.п.).
    'course_link' => 'https://ВСТАВЬТЕ_ССЫЛКУ_НА_КУРС',

    // От кого отправляется письмо (создайте ящик в Beget на домене).
    'mail_from' => 'info@loromarova.ru',
    'mail_from_name' => 'Жизнь без соплей',

    // Необязательно: SMTP (надёжнее mail()). Beget: smtp.beget.com:465.
    // Если оставить smtp_host пустым — используется PHP mail().
    'smtp_host' => '',
    'smtp_port' => 465,
    'smtp_user' => 'info@loromarova.ru',
    'smtp_pass' => '',
];

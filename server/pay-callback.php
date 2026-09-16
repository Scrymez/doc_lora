<?php
/**
 * Вебхук CloudPayments «Pay» (уведомление об успешной оплате).
 *
 * Что делает:
 *  1. Проверяет подпись запроса (HMAC-SHA256 тела на API-секрете).
 *  2. Берёт e-mail покупателя (указанный при оплате).
 *  3. Отправляет на этот e-mail письмо со ссылкой на курс.
 *  4. Отвечает CloudPayments {"code":0} — оплата принята.
 *
 * Настройка в ЛК CloudPayments:
 *   Уведомления → Pay → URL: https://loromarova.ru/pay/pay-callback.php  (метод POST)
 *
 * ВАЖНО: реальные ключи держим в config.php (рядом), он НЕ коммитится в git.
 */

// При запуске из CLI (тестовая отправка) — пропускаем обработку вебхука,
// но оставляем определения функций доступными для подключающего скрипта.
if (PHP_SAPI !== 'cli') {

// Не показываем ошибки наружу (утечка путей/деталей)
@ini_set('display_errors', '0');
error_reporting(0);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

// Принимаем только POST (вебхук CloudPayments шлёт POST)
if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'POST') {
    http_response_code(405);
    echo json_encode(['code' => 13]);
    exit;
}

$configPath = __DIR__ . '/config.php';
if (!file_exists($configPath)) {
    http_response_code(500);
    echo json_encode(['code' => 13, 'error' => 'no config']);
    exit;
}
$cfg = require $configPath;

// --- 1. Проверка подписи ---
$body = file_get_contents('php://input');
$headers = array_change_key_case(getallheaders(), CASE_UPPER);
$received = $headers['CONTENT-HMAC'] ?? ($headers['X-CONTENT-HMAC'] ?? '');
$expected = base64_encode(hash_hmac('sha256', $body, $cfg['cp_secret'], true));

if (!$received || !hash_equals($expected, $received)) {
    http_response_code(200);
    echo json_encode(['code' => 13]); // неверная подпись — не подтверждаем
    exit;
}

// --- 2. Данные оплаты ---
$status = $_POST['Status'] ?? '';
$email = $_POST['Email'] ?? '';
if (!$email && !empty($_POST['Data'])) {
    $data = json_decode($_POST['Data'], true);
    if (is_array($data) && !empty($data['email'])) {
        $email = $data['email'];
    }
}
if (!$email) {
    $email = $_POST['AccountId'] ?? '';
}

// Pay-уведомление приходит только по успешной оплате, но подстрахуемся
if ($status && strcasecmp($status, 'Completed') !== 0) {
    echo json_encode(['code' => 0]);
    exit;
}

// --- 3. Письмо со ссылкой на курс ---
$email = trim((string) $email);
// защита от инъекции заголовков письма
if (preg_match('/[\r\n]/', $email)) {
    $email = '';
}
if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
    send_course_email($cfg, $email);
}

// --- 4. Подтверждение ---
echo json_encode(['code' => 0]);
exit;

} // конец веб-обработки (не-CLI)


function build_course_email_html(): string
{
    // Ссылки (не секретные). Можно переопределить в config.php при необходимости.
    $gcLink = 'https://omarovalor.getcourse.ru/teach/control/stream/view/id/935058123';
    $tgLink = 'https://t.me/+14PWzTFB9483NTFi';

    return '<!DOCTYPE html><html lang="ru"><head><meta charset="UTF-8">'
        . '<meta name="viewport" content="width=device-width,initial-scale=1"></head>'
        . '<body style="margin:0;padding:0;background:#f3e3c8;">'
        . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3e3c8;padding:24px 12px;">'
        . '<tr><td align="center">'
        . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#fffaf2;border-radius:22px;overflow:hidden;box-shadow:0 10px 30px rgba(66,40,30,0.12);">'

        // Шапка
        . '<tr><td style="background:linear-gradient(135deg,#a84322,#f34d05);padding:34px 30px;text-align:center;">'
        . '<div style="font:700 13px Arial,sans-serif;letter-spacing:2px;color:#ffe9d5;text-transform:uppercase;">Доктор Маржанат Омарова</div>'
        . '<div style="font:800 26px Arial,sans-serif;color:#ffffff;margin-top:8px;">Спасибо за доверие! 🎉</div>'
        . '</td></tr>'

        // Приветствие
        . '<tr><td style="padding:30px 30px 6px;font:400 16px/1.6 Arial,sans-serif;color:#42281e;">'
        . '<p style="margin:0 0 14px;">Благодарю тебя за доверие к Доктору! Ты успешно оплатила участие на курсе Маржанат Омаровой <b>«Не болей-ка»</b>.</p>'
        . '<p style="margin:0;">Материалы будут доступны в твоём личном кабинете на платформе <b>GetCourse</b>.</p>'
        . '</td></tr>'

        // Блок доступа
        . '<tr><td style="padding:20px 30px 6px;">'
        . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fcf1e0;border-radius:16px;">'
        . '<tr><td style="padding:22px 22px 8px;font:700 17px Arial,sans-serif;color:#a84322;">Как попасть в личный кабинет</td></tr>'
        . '<tr><td style="padding:0 22px 6px;font:400 15px/1.6 Arial,sans-serif;color:#42281e;">'
        . '1. Перейди по кнопке ниже.<br>'
        . '2. Введи логин — почту, указанную при оплате.<br>'
        . '3. Установи пароль (нажми «Восстановить», если нужно).'
        . '</td></tr>'
        . '<tr><td style="padding:14px 22px 22px;" align="center">'
        . '<a href="' . $gcLink . '" style="display:inline-block;padding:15px 30px;background:linear-gradient(110deg,#f34d05,#ec734b);color:#ffffff;text-decoration:none;border-radius:12px;font:700 16px Arial,sans-serif;">Войти в личный кабинет</a>'
        . '</td></tr>'
        . '<tr><td style="padding:0 22px 20px;font:400 12px/1.5 Arial,sans-serif;color:#9a8a80;">Если кнопка не открывается, скопируй ссылку:<br><a href="' . $gcLink . '" style="color:#a84322;">' . $gcLink . '</a></td></tr>'
        . '</table></td></tr>'

        // Совет про приложение
        . '<tr><td style="padding:14px 30px 0;font:400 14px/1.6 Arial,sans-serif;color:#6a4d3c;">'
        . 'Для удобства можно скачать мобильное приложение <b>GetCourse</b> и авторизоваться там.'
        . '</td></tr>'

        // Подарочный канал
        . '<tr><td style="padding:20px 30px 6px;">'
        . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#42281e;border-radius:16px;">'
        . '<tr><td style="padding:22px;font:400 15px/1.6 Arial,sans-serif;color:#fff1f1;">'
        . '<div style="font:700 17px Arial,sans-serif;color:#ffbf8f;margin-bottom:8px;">Подарок для тебя 🎁</div>'
        . 'Внутри более 50 ценных постов и эксклюзивные подкасты с ответами на вопросы от Маржанат Омаровой 😍'
        . '<div style="margin-top:16px;"><a href="' . $tgLink . '" style="display:inline-block;padding:13px 26px;background:#ffbf8f;color:#42281e;text-decoration:none;border-radius:12px;font:700 15px Arial,sans-serif;">Открыть подарочный канал</a></div>'
        . '</td></tr></table></td></tr>'

        // Подпись
        . '<tr><td style="padding:26px 30px 30px;font:400 14px/1.6 Arial,sans-serif;color:#9a8a80;border-top:1px solid #f0e2cf;">'
        . 'С теплом, <b style="color:#a84322;">Доктор Маржанат</b><br>'
        . '<span style="font-size:12px;">Онлайн-курс «Жизнь без соплей»</span>'
        . '</td></tr>'

        . '</table></td></tr></table></body></html>';
}

function send_course_email(array $cfg, string $to): bool
{
    $subject = 'Доступ к курсу открыт 🎉 Добро пожаловать!';
    $html = build_course_email_html();

    // Если заданы SMTP-настройки — отправляем через SMTP (надёжнее), иначе mail()
    if (!empty($cfg['smtp_host'])) {
        return smtp_send($cfg, $to, $subject, $html);
    }

    $from = $cfg['mail_from'];
    $fromName = '=?UTF-8?B?' . base64_encode($cfg['mail_from_name']) . '?=';
    $headers = "MIME-Version: 1.0\r\n"
        . "Content-Type: text/html; charset=UTF-8\r\n"
        . "From: {$fromName} <{$from}>\r\n"
        . "Reply-To: {$from}\r\n";
    $encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
    return mail($to, $encodedSubject, $html, $headers);
}

/** Минимальный SMTP-клиент (AUTH LOGIN, SSL). */
function smtp_send(array $cfg, string $to, string $subject, string $html): bool
{
    $host = $cfg['smtp_host'];
    $port = (int) ($cfg['smtp_port'] ?? 465);
    $user = $cfg['smtp_user'] ?? $cfg['mail_from'];
    $pass = $cfg['smtp_pass'] ?? '';
    $from = $cfg['mail_from'];

    $transport = $port === 465 ? "ssl://{$host}" : $host;
    $fp = @stream_socket_client("{$transport}:{$port}", $errno, $errstr, 15);
    if (!$fp) {
        return false;
    }
    $read = function () use ($fp) {
        $data = '';
        while ($line = fgets($fp, 515)) {
            $data .= $line;
            if (isset($line[3]) && $line[3] === ' ') {
                break;
            }
        }
        return $data;
    };
    $cmd = function ($c) use ($fp, $read) {
        fwrite($fp, $c . "\r\n");
        return $read();
    };

    $read();
    $cmd('EHLO loromarova.ru');
    if ($port !== 465) {
        $cmd('STARTTLS');
        stream_socket_enable_crypto($fp, true, STREAM_CRYPTO_METHOD_TLS_CLIENT);
        $cmd('EHLO loromarova.ru');
    }
    $cmd('AUTH LOGIN');
    $cmd(base64_encode($user));
    $cmd(base64_encode($pass));
    $cmd("MAIL FROM:<{$from}>");
    $cmd("RCPT TO:<{$to}>");
    $cmd('DATA');

    $fromName = '=?UTF-8?B?' . base64_encode($cfg['mail_from_name']) . '?=';
    $encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
    $message = "From: {$fromName} <{$from}>\r\n"
        . "To: <{$to}>\r\n"
        . "Subject: {$encodedSubject}\r\n"
        . "MIME-Version: 1.0\r\n"
        . "Content-Type: text/html; charset=UTF-8\r\n\r\n"
        . $html . "\r\n.";
    $resp = $cmd($message);
    $cmd('QUIT');
    fclose($fp);

    return strpos($resp, '250') !== false;
}

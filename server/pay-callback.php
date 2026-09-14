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

header('Content-Type: application/json; charset=utf-8');

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
if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
    send_course_email($cfg, $email);
}

// --- 4. Подтверждение ---
echo json_encode(['code' => 0]);
exit;


function send_course_email(array $cfg, string $to): bool
{
    $subject = 'Доступ к курсу «Жизнь без соплей»';
    $link = htmlspecialchars($cfg['course_link'], ENT_QUOTES, 'UTF-8');
    $html = '<div style="font-family:Arial,sans-serif;font-size:16px;color:#42281e;line-height:1.6">'
        . '<h2 style="color:#a84322">Спасибо за покупку! 🎉</h2>'
        . '<p>Ваш доступ к онлайн-курсу <b>«Жизнь без соплей»</b> открыт.</p>'
        . '<p>Ссылка на курс:</p>'
        . '<p><a href="' . $link . '" style="display:inline-block;padding:12px 22px;'
        . 'background:#f34d05;color:#fff;text-decoration:none;border-radius:10px;font-weight:bold">'
        . 'Перейти к курсу</a></p>'
        . '<p style="color:#6a4d3c;font-size:14px">Если кнопка не открывается, скопируйте ссылку:<br>'
        . '<a href="' . $link . '">' . $link . '</a></p>'
        . '<p style="color:#9a8a80;font-size:13px;margin-top:24px">С теплом, Доктор Маржанат</p>'
        . '</div>';

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

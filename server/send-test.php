<?php
/**
 * Тестовая отправка письма о покупке курса.
 * Запускать ТОЛЬКО из консоли (SSH) на хостинге:
 *   php ~/loromarova.ru/public_html/pay/send-test.php s.l.t1998@mail.ru
 *
 * Использует те же функции и config.php, что и боевой вебхук,
 * поэтому письмо уходит через реальный SMTP/mail() — как при настоящей оплате.
 */

if (PHP_SAPI !== 'cli') {
    http_response_code(403);
    exit('CLI only');
}

require __DIR__ . '/pay-callback.php'; // определяет функции, веб-логику пропускает (CLI)

$configPath = __DIR__ . '/config.php';
if (!file_exists($configPath)) {
    fwrite(STDERR, "Нет config.php рядом со скриптом\n");
    exit(1);
}
$cfg = require $configPath;

$to = $argv[1] ?? '';
if (!filter_var($to, FILTER_VALIDATE_EMAIL)) {
    fwrite(STDERR, "Использование: php send-test.php <email>\n");
    exit(1);
}

$ok = send_course_email($cfg, $to);
echo $ok ? "OK: письмо отправлено на {$to}\n" : "FAIL: не удалось отправить (проверьте SMTP в config.php)\n";
exit($ok ? 0 : 1);

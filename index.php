<?php
function writeLog($message, $logFile = 'access.log', $level = 'INFO')
{
    // Create timestamp
    $timestamp = date('Y-m-d H:i:s');

    // Format the log entry
    $logEntry = sprintf(
        "[%s] [%s] %s%s",
        $timestamp,
        strtoupper($level),
        $message,
        PHP_EOL
    );

    // Ensure directory exists
    $dir = dirname($logFile);
    if (!file_exists($dir)) {
        mkdir($dir, 0777, true);
    }

    // Append to file
    return file_put_contents(
        $logFile,
        $logEntry,
        FILE_APPEND | LOCK_EX
    ) !== false;
}
$page = file_get_contents('https://www.sushiexpress.com.tw/sushi-express/Menu');
$page = preg_replace('/href=\"\//', 'href="https://www.sushiexpress.com.tw/', $page);   // css/link href
$page = preg_replace('/src=\"\//', 'src="https://www.sushiexpress.com.tw/', $page);     // js/img src
$page = preg_replace('/url\(\"\//', 'url("https://www.sushiexpress.com.tw/', $page);    // css properties url()
echo $page;
$log = sprintf(
    'IP:[%s], UserAgent:[%s]',
    $_SERVER['HTTP_CF_CONNECTING_IP'],
    $_SERVER['HTTP_USER_AGENT']
);
writeLog($log);

?>

<!-- bootstrap icon -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
<script src="/index.js?202411061255"></script>
<script>
    const sushiexpress = new SushiExpress();
    window.addEventListener('load', () => {
        console.clear();
        console.log("開發者們，歡迎前往GitHub看看這個專案～\nGitHub: https://github.com/80113hunterhsu/sushi-express-order-page");
    })
</script>
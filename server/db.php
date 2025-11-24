<?php

declare(strict_types=1);

/**
 * Lightweight helper to read environment variables with fallback.
 */
function env_value(string $key, ?string $default = null): ?string
{
    $value = $_ENV[$key] ?? $_SERVER[$key] ?? getenv($key);
    return $value !== false && $value !== null && $value !== '' ? $value : $default;
}

/**
 * Lazily create and reuse a PDO connection using env-based credentials.
 *
 * Expected environment variables:
 *  - DB_HOST
 *  - DB_NAME
 *  - DB_USER
 *  - DB_PASS
 *  - DB_CHARSET (optional, defaults to utf8mb4)
 */
function getDBConnection(): PDO
{
    static $pdo = null;
    if ($pdo instanceof PDO) {
        return $pdo;
    }

    $host = env_value('DB_HOST', '192.168.1.182');
    $database = env_value('DB_NAME', 'roofr');
    $username = env_value('DB_USER', 'root');
    $password = env_value('DB_PASS', '');
    $charset = env_value('DB_CHARSET', 'utf8mb4');

    if ($database === '' || $username === '' || $password === '') {
        throw new RuntimeException('Database credentials are not fully configured in environment variables.');
    }

    $dsn = sprintf('mysql:host=%s;dbname=%s;charset=%s', $host, $database, $charset);

    try {
        $pdo = new PDO($dsn, $username, $password, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]);

        return $pdo;
    } catch (PDOException $exception) {
        error_log('Database connection failed: ' . $exception->getMessage());
        throw new RuntimeException('Unable to establish database connection.');
    }
}

/**
 * Quick utility to confirm the connection is working.
 */
function testConnection(): bool
{
    try {
        getDBConnection();
        return true;
    } catch (Throwable $throwable) {
        error_log($throwable->getMessage());
        return false;
    }
}



<?php
// Script para configurar o banco de dados
// Execute este arquivo uma vez para criar todas as tabelas e dados iniciais

$host = 'localhost';
$username = 'root';
$password = '';

try {
    // Conectar sem especificar o banco
    $pdo = new PDO("mysql:host=$host;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Ler o arquivo SQL
    $sql = file_get_contents(__DIR__ . '/../database.sql');

    if ($sql === false) {
        die("Erro ao ler arquivo database.sql");
    }

    // Executar o SQL
    $pdo->exec($sql);

    echo "✅ Banco de dados configurado com sucesso!\n";
    echo "✅ Tabelas criadas: users, categories, products, orders, order_items, reviews, favorites, shipping_rates\n";
    echo "✅ Dados iniciais inseridos: categorias, taxas de frete, usuário admin\n";
    echo "✅ Usuário admin: admin@stech.co.mz / senha: admin123\n";

} catch (PDOException $e) {
    die("❌ Erro ao configurar banco de dados: " . $e->getMessage() . "\n");
}

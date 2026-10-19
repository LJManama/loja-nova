<?php
require_once 'db.php';

header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        if (isset($_GET['province'])) {
            // Get shipping rate for a specific province
            $sql = 'SELECT * FROM shipping_rates WHERE province = ?';
            $params = [$_GET['province']];

            if (isset($_GET['city'])) {
                $sql .= ' AND city = ?';
                $params[] = $_GET['city'];
            }

            $stmt = $pdo->prepare($sql);
            $stmt->execute($params);
            $rate = $stmt->fetch();

            if ($rate) {
                echo json_encode($rate);
            } else {
                // Get default rate for province
                $stmt = $pdo->prepare('SELECT * FROM shipping_rates WHERE province = ? AND city IS NULL');
                $stmt->execute([$_GET['province']]);
                $rate = $stmt->fetch();
                echo json_encode($rate ?: ['rate' => 0, 'estimated_days' => 7]);
            }
        } else {
            // Get all shipping rates
            $stmt = $pdo->query('SELECT * FROM shipping_rates ORDER BY province, city');
            $rates = $stmt->fetchAll();
            echo json_encode($rates);
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);

        $sql = 'INSERT INTO shipping_rates (province, city, rate, estimated_days) VALUES (?, ?, ?, ?)';

        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            $data['province'],
            $data['city'] ?? null,
            $data['rate'],
            $data['estimated_days'] ?? 3
        ]);

        echo json_encode(['id' => $pdo->lastInsertId(), 'message' => 'Shipping rate created']);
        break;

    case 'PUT':
        $data = json_decode(file_get_contents('php://input'), true);

        $sql = 'UPDATE shipping_rates SET province = ?, city = ?, rate = ?, estimated_days = ? WHERE id = ?';

        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            $data['province'],
            $data['city'] ?? null,
            $data['rate'],
            $data['estimated_days'] ?? 3,
            $_GET['id']
        ]);

        echo json_encode(['message' => 'Shipping rate updated']);
        break;

    case 'DELETE':
        $stmt = $pdo->prepare('DELETE FROM shipping_rates WHERE id = ?');
        $stmt->execute([$_GET['id']]);
        echo json_encode(['message' => 'Shipping rate deleted']);
        break;

    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
}

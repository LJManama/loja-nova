<?php
require_once 'db.php';

header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        if (isset($_GET['user_id'])) {
            // Get favorites for a user
            $sql = 'SELECT f.*, p.name, p.price, p.image, p.rating, p.brand
                    FROM favorites f
                    LEFT JOIN products p ON f.product_id = p.id
                    WHERE f.user_id = ?
                    ORDER BY f.created_at DESC';
            $stmt = $pdo->prepare($sql);
            $stmt->execute([$_GET['user_id']]);
            $favorites = $stmt->fetchAll();
            echo json_encode($favorites);
        } else {
            http_response_code(400);
            echo json_encode(['error' => 'user_id required']);
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);

        // Check if already favorited
        $checkStmt = $pdo->prepare('SELECT id FROM favorites WHERE user_id = ? AND product_id = ?');
        $checkStmt->execute([$data['user_id'], $data['product_id']]);

        if ($checkStmt->fetch()) {
            http_response_code(400);
            echo json_encode(['error' => 'Product already in favorites']);
            break;
        }

        $sql = 'INSERT INTO favorites (user_id, product_id) VALUES (?, ?)';

        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            $data['user_id'],
            $data['product_id']
        ]);

        echo json_encode(['id' => $pdo->lastInsertId(), 'message' => 'Added to favorites']);
        break;

    case 'DELETE':
        $data = json_decode(file_get_contents('php://input'), true);

        $stmt = $pdo->prepare('DELETE FROM favorites WHERE user_id = ? AND product_id = ?');
        $stmt->execute([$data['user_id'], $data['product_id']]);

        echo json_encode(['message' => 'Removed from favorites']);
        break;

    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
}

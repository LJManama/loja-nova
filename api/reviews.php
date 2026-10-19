<?php
require_once 'db.php';

header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        if (isset($_GET['product_id'])) {
            // Get reviews for a product
            $sql = 'SELECT r.*, u.name as user_name FROM reviews r
                    LEFT JOIN users u ON r.user_id = u.id
                    WHERE r.product_id = ?
                    ORDER BY r.created_at DESC';
            $stmt = $pdo->prepare($sql);
            $stmt->execute([$_GET['product_id']]);
            $reviews = $stmt->fetchAll();
            echo json_encode($reviews);
        } else {
            http_response_code(400);
            echo json_encode(['error' => 'product_id required']);
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);

        // Check if user already reviewed this product
        $checkStmt = $pdo->prepare('SELECT id FROM reviews WHERE product_id = ? AND user_id = ?');
        $checkStmt->execute([$data['product_id'], $data['user_id']]);

        if ($checkStmt->fetch()) {
            http_response_code(400);
            echo json_encode(['error' => 'User already reviewed this product']);
            break;
        }

        $sql = 'INSERT INTO reviews (product_id, user_id, rating, comment) VALUES (?, ?, ?, ?)';

        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            $data['product_id'],
            $data['user_id'],
            $data['rating'],
            $data['comment'] ?? ''
        ]);

        // Update product rating
        $updateRating = $pdo->prepare('
            UPDATE products p
            SET rating = (
                SELECT AVG(rating) FROM reviews WHERE product_id = p.id
            ),
            reviews = (
                SELECT COUNT(*) FROM reviews WHERE product_id = p.id
            )
            WHERE p.id = ?
        ');
        $updateRating->execute([$data['product_id']]);

        echo json_encode(['id' => $pdo->lastInsertId(), 'message' => 'Review created']);
        break;

    case 'DELETE':
        $data = json_decode(file_get_contents('php://input'), true);

        $stmt = $pdo->prepare('DELETE FROM reviews WHERE id = ? AND user_id = ?');
        $stmt->execute([$_GET['id'], $data['user_id']]);

        // Update product rating
        $updateRating = $pdo->prepare('
            UPDATE products p
            SET rating = (
                SELECT AVG(rating) FROM reviews WHERE product_id = p.id
            ),
            reviews = (
                SELECT COUNT(*) FROM reviews WHERE product_id = p.id
            )
            WHERE p.id = ?
        ');
        $updateRating->execute([$data['product_id']]);

        echo json_encode(['message' => 'Review deleted']);
        break;

    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
}

<?php
require_once 'db.php';

header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        if (isset($_GET['id'])) {
            // Get single user
            $stmt = $pdo->prepare('SELECT id, name, email, phone, is_admin, created_at FROM users WHERE id = ?');
            $stmt->execute([$_GET['id']]);
            $user = $stmt->fetch();

            if ($user) {
                echo json_encode($user);
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'User not found']);
            }
        } else {
            // Get all users
            $stmt = $pdo->query('SELECT id, name, email, phone, is_admin, created_at FROM users ORDER BY id DESC');
            $users = $stmt->fetchAll();
            echo json_encode($users);
        }
        break;
        
    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);

        $sql = 'INSERT INTO users (name, email, phone, password, is_admin) VALUES (?, ?, ?, ?, ?)';

        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            $data['name'],
            $data['email'],
            $data['phone'] ?? null,
            password_hash($data['password'], PASSWORD_DEFAULT),
            $data['is_admin'] ?? false
        ]);

        echo json_encode(['id' => $pdo->lastInsertId(), 'message' => 'User created']);
        break;
        
    case 'PUT':
        $data = json_decode(file_get_contents('php://input'), true);
        
        $sql = 'UPDATE users SET name = ?, email = ?, is_admin = ? WHERE id = ?';
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            $data['name'],
            $data['email'],
            $data['is_admin'] ?? false,
            $_GET['id']
        ]);
        
        echo json_encode(['message' => 'User updated']);
        break;
        
    case 'DELETE':
        $stmt = $pdo->prepare('DELETE FROM users WHERE id = ?');
        $stmt->execute([$_GET['id']]);
        echo json_encode(['message' => 'User deleted']);
        break;
        
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
}

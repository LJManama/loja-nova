<?php
require_once 'db.php';

header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        if (isset($_GET['id'])) {
            // Get single category
            $stmt = $pdo->prepare('SELECT * FROM categories WHERE id = ?');
            $stmt->execute([$_GET['id']]);
            $category = $stmt->fetch();
            
            if ($category) {
                // Get product count
                $countStmt = $pdo->prepare('SELECT COUNT(*) as count FROM products WHERE category_id = ?');
                $countStmt->execute([$_GET['id']]);
                $category['productCount'] = $countStmt->fetch()['count'];
                echo json_encode($category);
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'Category not found']);
            }
        } else {
            // Get all categories
            $stmt = $pdo->query('SELECT * FROM categories ORDER BY name');
            $categories = $stmt->fetchAll();
            
            foreach ($categories as &$category) {
                $countStmt = $pdo->prepare('SELECT COUNT(*) as count FROM products WHERE category_id = ?');
                $countStmt->execute([$category['id']]);
                $category['productCount'] = $countStmt->fetch()['count'];
            }
            
            echo json_encode($categories);
        }
        break;
        
    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        
        $sql = 'INSERT INTO categories (name, description, image) VALUES (?, ?, ?)';
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            $data['name'],
            $data['description'],
            $data['image']
        ]);
        
        echo json_encode(['id' => $pdo->lastInsertId(), 'message' => 'Category created']);
        break;
        
    case 'PUT':
        $data = json_decode(file_get_contents('php://input'), true);
        
        $sql = 'UPDATE categories SET name = ?, description = ?, image = ? WHERE id = ?';
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            $data['name'],
            $data['description'],
            $data['image'],
            $_GET['id']
        ]);
        
        echo json_encode(['message' => 'Category updated']);
        break;
        
    case 'DELETE':
        // Check if category has products
        $checkStmt = $pdo->prepare('SELECT COUNT(*) as count FROM products WHERE category_id = ?');
        $checkStmt->execute([$_GET['id']]);
        $count = $checkStmt->fetch()['count'];
        
        if ($count > 0) {
            http_response_code(400);
            echo json_encode(['error' => 'Cannot delete category with products']);
        } else {
            $stmt = $pdo->prepare('DELETE FROM categories WHERE id = ?');
            $stmt->execute([$_GET['id']]);
            echo json_encode(['message' => 'Category deleted']);
        }
        break;
        
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
}

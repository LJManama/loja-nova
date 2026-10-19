<?php
require_once 'db.php';

header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        if (isset($_GET['id'])) {
            // Get single order with items
            $stmt = $pdo->prepare('SELECT * FROM orders WHERE id = ?');
            $stmt->execute([$_GET['id']]);
            $order = $stmt->fetch();
            
            if ($order) {
                // Get order items
                $itemsStmt = $pdo->prepare('SELECT oi.*, p.name as product_name, p.image as product_image 
                                            FROM order_items oi 
                                            LEFT JOIN products p ON oi.product_id = p.id 
                                            WHERE oi.order_id = ?');
                $itemsStmt->execute([$_GET['id']]);
                $order['items'] = $itemsStmt->fetchAll();
                echo json_encode($order);
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'Order not found']);
            }
        } else {
            // Get all orders with optional user filter
            $sql = 'SELECT o.*, u.name as customer_name FROM orders o LEFT JOIN users u ON o.user_id = u.id';
            $params = [];
            
            if (isset($_GET['user_id'])) {
                $sql .= ' WHERE o.user_id = ?';
                $params[] = $_GET['user_id'];
            }
            
            $sql .= ' ORDER BY o.id DESC';
            
            $stmt = $pdo->prepare($sql);
            $stmt->execute($params);
            $orders = $stmt->fetchAll();
            echo json_encode($orders);
        }
        break;
        
    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        
        try {
            $pdo->beginTransaction();
            
            // Create order
            $orderSql = 'INSERT INTO orders (user_id, total, status, shipping_address, payment_method) 
                        VALUES (?, ?, ?, ?, ?)';
            $orderStmt = $pdo->prepare($orderSql);
            $orderStmt->execute([
                $data['user_id'],
                $data['total'],
                'pending',
                $data['shipping_address'],
                $data['payment_method']
            ]);
            
            $orderId = $pdo->lastInsertId();
            
            // Add order items
            $itemSql = 'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)';
            $itemStmt = $pdo->prepare($itemSql);
            
            foreach ($data['items'] as $item) {
                $itemStmt->execute([
                    $orderId,
                    $item['product_id'],
                    $item['quantity'],
                    $item['price']
                ]);
                
                // Update product stock
                $stockStmt = $pdo->prepare('UPDATE products SET stock = stock - ? WHERE id = ?');
                $stockStmt->execute([$item['quantity'], $item['product_id']]);
            }
            
            $pdo->commit();
            
            echo json_encode(['id' => $orderId, 'message' => 'Order created']);
        } catch (Exception $e) {
            $pdo->rollBack();
            http_response_code(500);
            echo json_encode(['error' => 'Failed to create order: ' . $e->getMessage()]);
        }
        break;
        
    case 'PUT':
        $data = json_decode(file_get_contents('php://input'), true);
        
        $sql = 'UPDATE orders SET status = ? WHERE id = ?';
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            $data['status'],
            $_GET['id']
        ]);
        
        echo json_encode(['message' => 'Order updated']);
        break;
        
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
}

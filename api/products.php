<?php
require_once 'db.php';

header('Content-Type: application/json; charset=utf-8');

$method = $_SERVER['REQUEST_METHOD'];

// Função para normalizar string (remover acentos e converter para minúsculas)
function normalizeString($str) {
    $str = mb_strtolower($str, 'UTF-8');
    $str = preg_replace('/[áàãâä]/u', 'a', $str);
    $str = preg_replace('/[éèêë]/u', 'e', $str);
    $str = preg_replace('/[íìîï]/u', 'i', $str);
    $str = preg_replace('/[óòõôö]/u', 'o', $str);
    $str = preg_replace('/[úùûü]/u', 'u', $str);
    $str = preg_replace('/[ç]/u', 'c', $str);
    return $str;
}

switch ($method) {
    case 'GET':
        // Get language parameter (default to 'pt')
        $language = isset($_GET['lang']) ? $_GET['lang'] : 'pt';
        
        if (isset($_GET['id'])) {
            // Get single product
            $stmt = $pdo->prepare('SELECT * FROM products WHERE id = ?');
            $stmt->execute([$_GET['id']]);
            $product = $stmt->fetch();
            
            if ($product) {
                $product['images'] = json_decode($product['images'], true);
                
                // Return translated description
                unset($product['description']);
                if ($language === 'en' && !empty($product['description_en'])) {
                    $product['description'] = $product['description_en'];
                } elseif (!empty($product['description_pt'])) {
                    $product['description'] = $product['description_pt'];
                } else {
                    $product['description'] = $product['description_pt'] ?? $product['description_en'] ?? '';
                }
                
                // Return translated specifications
                unset($product['specifications']);
                if ($language === 'en' && !empty($product['specifications_en'])) {
                    $product['specifications'] = json_decode($product['specifications_en'], true);
                } elseif (!empty($product['specifications_pt'])) {
                    $product['specifications'] = json_decode($product['specifications_pt'], true);
                } else {
                    $product['specifications'] = json_decode($product['specifications_pt'] ?? $product['specifications_en'] ?? '{}', true);
                }
                
                echo json_encode($product);
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'Product not found']);
            }
        } else {
            // Get all products with optional filters
            $sql = 'SELECT p.*, c.name as category_name FROM products p LEFT JOIN categories c ON p.category_id = c.id';
            $params = [];
            
            if (isset($_GET['category'])) {
                // Use LIKE para busca flexível (case-insensitive e sem acentos)
                $searchTerm = normalizeString($_GET['category']);
                $sql .= ' WHERE LOWER(c.name) LIKE ?';
                $params[] = '%' . $searchTerm . '%';
            }
            
            if (isset($_GET['search'])) {
                $sql .= (isset($_GET['category']) ? ' AND' : ' WHERE') . ' LOWER(p.name) LIKE ?';
                $params[] = '%' . mb_strtolower($_GET['search'], 'UTF-8') . '%';
            }
            
            if (isset($_GET['discount']) && $_GET['discount'] === 'true') {
                $sql .= (isset($_GET['category']) || isset($_GET['search']) ? ' AND' : ' WHERE') . ' p.discount > 0 AND p.discount IS NOT NULL';
            }
            
            if (isset($_GET['featured'])) {
                $sql .= (isset($_GET['category']) || isset($_GET['search']) || isset($_GET['discount']) ? ' AND' : ' WHERE') . ' p.featured = 1';
            }
            
            if (isset($_GET['sort'])) {
                if ($_GET['sort'] === 'new') {
                    $sql .= ' ORDER BY p.id DESC';
                } elseif ($_GET['sort'] === 'price-low') {
                    $sql .= ' ORDER BY p.price ASC';
                } elseif ($_GET['sort'] === 'price-high') {
                    $sql .= ' ORDER BY p.price DESC';
                } elseif ($_GET['sort'] === 'rating') {
                    $sql .= ' ORDER BY p.rating DESC';
                }
            } else {
                $sql .= ' ORDER BY p.id DESC';
            }
            
            $stmt = $pdo->prepare($sql);
            $stmt->execute($params);
            $products = $stmt->fetchAll();
            
            foreach ($products as &$product) {
                $product['images'] = json_decode($product['images'], true);
                $product['category'] = $product['category_name'];
                unset($product['category_name']);
                
                // Return translated description
                unset($product['description']);
                if ($language === 'en' && !empty($product['description_en'])) {
                    $product['description'] = $product['description_en'];
                } elseif (!empty($product['description_pt'])) {
                    $product['description'] = $product['description_pt'];
                } else {
                    $product['description'] = $product['description_pt'] ?? $product['description_en'] ?? '';
                }
                
                // Return translated specifications
                unset($product['specifications']);
                if ($language === 'en' && !empty($product['specifications_en'])) {
                    $product['specifications'] = json_decode($product['specifications_en'], true);
                } elseif (!empty($product['specifications_pt'])) {
                    $product['specifications'] = json_decode($product['specifications_pt'], true);
                } else {
                    $product['specifications'] = json_decode($product['specifications_pt'] ?? $product['specifications_en'] ?? '{}', true);
                }
            }
            
            echo json_encode($products);
        }
        break;
        
    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);

        // Processar especificações
        $specs = $data['specifications'] ?? [];
        $specsPt = $data['specifications_pt'] ?? json_encode($specs);
        $specsEn = $data['specifications_en'] ?? json_encode($specs);

        // Se specifications_pt/en já são strings JSON, usar diretamente
        if (is_string($specsPt) && json_decode($specsPt) !== null) {
            // Já é JSON string
        } else {
            $specsPt = json_encode($specs);
        }

        if (is_string($specsEn) && json_decode($specsEn) !== null) {
            // Já é JSON string
        } else {
            $specsEn = json_encode($specs);
        }

        $sql = 'INSERT INTO products (name, description, description_pt, description_en, price, original_price, discount, image, images, category_id, brand, stock, rating, reviews, featured, specifications, specifications_pt, specifications_en)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            $data['name'],
            $data['description'] ?? '',
            $data['description_pt'] ?? $data['description'] ?? '',
            $data['description_en'] ?? $data['description'] ?? '',
            $data['price'],
            $data['original_price'] ?? $data['price'],
            $data['discount'] ?? 0,
            $data['image'],
            json_encode($data['images'] ?? [$data['image']]),
            $data['category_id'],
            $data['brand'],
            $data['stock'],
            $data['rating'] ?? 0,
            $data['reviews'] ?? 0,
            $data['featured'] ?? false,
            json_encode($specs),
            $specsPt,
            $specsEn
        ]);

        echo json_encode(['id' => $pdo->lastInsertId(), 'message' => 'Product created']);
        break;
        
    case 'PUT':
        $data = json_decode(file_get_contents('php://input'), true);

        // Processar especificações
        $specs = $data['specifications'] ?? [];
        $specsPt = $data['specifications_pt'] ?? json_encode($specs);
        $specsEn = $data['specifications_en'] ?? json_encode($specs);

        // Se specifications_pt/en já são strings JSON, usar diretamente
        if (is_string($specsPt) && json_decode($specsPt) !== null) {
            // Já é JSON string
        } else {
            $specsPt = json_encode($specs);
        }

        if (is_string($specsEn) && json_decode($specsEn) !== null) {
            // Já é JSON string
        } else {
            $specsEn = json_encode($specs);
        }

        $sql = 'UPDATE products SET name = ?, description = ?, description_pt = ?, description_en = ?, price = ?, original_price = ?, discount = ?,
                image = ?, images = ?, category_id = ?, brand = ?, stock = ?, featured = ?, specifications = ?, specifications_pt = ?, specifications_en = ?
                WHERE id = ?';

        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            $data['name'],
            $data['description'] ?? '',
            $data['description_pt'] ?? $data['description'] ?? '',
            $data['description_en'] ?? $data['description'] ?? '',
            $data['price'],
            $data['original_price'] ?? $data['price'],
            $data['discount'] ?? 0,
            $data['image'],
            json_encode($data['images'] ?? [$data['image']]),
            $data['category_id'],
            $data['brand'],
            $data['stock'],
            $data['featured'] ?? false,
            json_encode($specs),
            $specsPt,
            $specsEn,
            $_GET['id']
        ]);

        echo json_encode(['message' => 'Product updated']);
        break;
        
    case 'DELETE':
        $stmt = $pdo->prepare('DELETE FROM products WHERE id = ?');
        $stmt->execute([$_GET['id']]);
        echo json_encode(['message' => 'Product deleted']);
        break;
        
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
}

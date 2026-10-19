-- Banco de dados para Loja Online STECH
-- Sistema de e-commerce com suporte para produtos, categorias, pedidos e usuários

CREATE DATABASE IF NOT EXISTS loja_nova CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE loja_nova;

-- Tabela de usuários
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(20),
    password VARCHAR(255) NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabela de categorias
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabela de produtos
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    original_price DECIMAL(10, 2),
    discount DECIMAL(5, 2) DEFAULT 0,
    image VARCHAR(1000),
    images JSON,
    category_id INT,
    brand VARCHAR(255),
    stock INT DEFAULT 0,
    rating DECIMAL(3, 2) DEFAULT 0,
    reviews INT DEFAULT 0,
    featured BOOLEAN DEFAULT FALSE,
    specifications JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabela de pedidos
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
    shipping_address TEXT,
    payment_method VARCHAR(100),
    shipping_cost DECIMAL(10, 2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabela de itens do pedido
CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabela de avaliações de produtos
CREATE TABLE IF NOT EXISTS reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    user_id INT NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_review (product_id, user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabela de favoritos
CREATE TABLE IF NOT EXISTS favorites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    UNIQUE KEY unique_favorite (user_id, product_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabela de taxas de frete por localização
CREATE TABLE IF NOT EXISTS shipping_rates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    province VARCHAR(100) NOT NULL,
    city VARCHAR(100),
    rate DECIMAL(10, 2) NOT NULL,
    estimated_days INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Inserir dados iniciais de categorias
INSERT INTO categories (name, description) VALUES
('Smartphones', 'Telefones inteligentes e acessórios'),
('Laptops', 'Computadores portáteis e notebooks'),
('Gaming', 'Produtos para jogos e gamers'),
('Acessórios', 'Acessórios de tecnologia'),
('Áudio', 'Equipamentos de áudio e fones'),
('TV', 'Televisores e monitores'),
('Redes', 'Equipamentos de rede e internet'),
('Câmeras', 'Câmeras fotográficas e filmadoras')
ON DUPLICATE KEY UPDATE name=name;

-- Inserir taxas de frete iniciais (Moçambique)
INSERT INTO shipping_rates (province, city, rate, estimated_days) VALUES
('Maputo', 'Maputo Cidade', 50.00, 1),
('Maputo', 'Matola', 50.00, 1),
('Maputo', 'Boane', 60.00, 2),
('Maputo', 'Marracuene', 60.00, 2),
('Gaza', 'Xai-Xai', 150.00, 3),
('Gaza', 'Chokwe', 160.00, 4),
('Inhambane', 'Inhambane', 180.00, 4),
('Inhambane', 'Maxixe', 180.00, 4),
('Sofala', 'Beira', 200.00, 3),
('Sofala', 'Dondo', 210.00, 4),
('Manica', 'Chimoio', 220.00, 4),
('Manica', 'Gondola', 230.00, 5),
('Tete', 'Tete', 250.00, 4),
('Tete', 'Moatize', 250.00, 4),
('Zambézia', 'Quelimane', 280.00, 5),
('Zambézia', 'Nacala', 290.00, 5),
('Nampula', 'Nampula', 300.00, 5),
('Nampula', 'Monapo', 310.00, 6),
('Niassa', 'Lichinga', 350.00, 7),
('Cabo Delgado', 'Pemba', 320.00, 6),
('Cabo Delgado', 'Montepuez', 330.00, 7)
ON DUPLICATE KEY UPDATE province=province;

-- Criar usuário admin padrão (senha: admin123)
INSERT INTO users (name, email, password, is_admin, phone) VALUES
('Administrador', 'admin@stech.co.mz', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', TRUE, '+258 84 123 4567')
ON DUPLICATE KEY UPDATE email=email;

-- Índices para melhorar performance
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_featured ON products(featured);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_order_items_product ON order_items(product_id);
CREATE INDEX idx_reviews_product ON reviews(product_id);
CREATE INDEX idx_reviews_user ON reviews(user_id);
CREATE INDEX idx_favorites_user ON favorites(user_id);
CREATE INDEX idx_favorites_product ON favorites(product_id);

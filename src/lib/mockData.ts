import { Product, Category } from '../types'

export const categories: Category[] = [
  { id: 1, name: 'Portáteis', description: 'Laptops e notebooks de alta performance para trabalho e jogos', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400', productCount: 45 },
  { id: 2, name: 'Desktops', description: 'Computadores de mesa completos e torres personalizadas', image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400', productCount: 32 },
  { id: 3, name: 'Monitores', description: 'Monitores LCD, LED, OLED e curvos de alta resolução', image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400', productCount: 28 },
  { id: 4, name: 'Processadores', description: 'CPUs de alta performance Intel e AMD', image: 'https://images.unsplash.com/photo-1555625322-3c03a27bb835?w=400', productCount: 18 },
  { id: 5, name: 'Placas de Vídeo', description: 'GPUs NVIDIA e AMD para jogos e trabalho profissional', image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400', productCount: 22 },
  { id: 6, name: 'Memória RAM', description: 'Módulos de memória DDR4 e DDR5', image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=400', productCount: 35 },
  { id: 7, name: 'Armazenamento', description: 'SSDs, HDDs e unidades de armazenamento externo', image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400', productCount: 42 },
  { id: 8, name: 'Placas-Mãe', description: 'Motherboards Intel e AMD de alta qualidade', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400', productCount: 25 },
  { id: 9, name: 'Fontes de Alimentação', description: 'PSUs de alta eficiência e potência', image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400', productCount: 20 },
  { id: 10, name: 'Gabinetes', description: 'Cases e gabinetes para montagem de PCs', image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400', productCount: 30 },
  { id: 11, name: 'Teclados', description: 'Teclados mecânicos, gaming e profissionais', image: 'https://images.unsplash.com/photo-1587829741301-dc798b91add1?w=400', productCount: 38 },
  { id: 12, name: 'Mouses', description: 'Mouses gaming, ergonômicos e sem fio', image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400', productCount: 45 },
  { id: 13, name: 'Headsets', description: 'Fones de ouvido com microfone para jogos e trabalho', image: 'https://images.unsplash.com/photo-1599669454699-248893623440?w=400', productCount: 28 },
  { id: 14, name: 'Webcams', description: 'Câmeras para streaming e videoconferências', image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400', productCount: 15 },
  { id: 15, name: 'Impressoras', description: 'Impressoras a laser, jato de tinta e multifuncionais', image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=400', productCount: 22 },
  { id: 16, name: 'Roteadores', description: 'Roteadores Wi-Fi e equipamentos de rede', image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400', productCount: 18 },
  { id: 17, name: 'Smartphones', description: 'Telefones móveis das melhores marcas', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400', productCount: 78 },
  { id: 18, name: 'Tablets', description: 'Tablets para trabalho, estudo e entretenimento', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400', productCount: 25 },
  { id: 19, name: 'Acessórios', description: 'Cases, cabos e acessórios para seus dispositivos', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', productCount: 120 },
  { id: 20, name: 'Áudio', description: 'Fones de ouvido e speakers de alta qualidade', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400', productCount: 56 },
  { id: 21, name: 'Gaming', description: 'Consoles e periféricos para gamers', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400', productCount: 34 },
  { id: 22, name: 'Câmeras', description: 'Equipamentos para fotografia e vídeo', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400', productCount: 28 },
]

export const products: Product[] = [
  // Portáteis
  {
    id: 1, name: 'MacBook Pro 14" M3', description: 'Processador M3, 8GB RAM, 512GB SSD. Tela Liquid Retina XDR de 14 polegadas.',
    price: 129999, original_price: 149999, discount: 13,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600',
    images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600'],
    category: 'Portáteis', brand: 'Apple', stock: 15, rating: 4.8, reviews: 234, featured: true,
    specifications: { 'Processador': 'Apple M3', 'RAM': '8GB', 'Armazenamento': '512GB SSD', 'Tela': '14.2" Liquid Retina XDR' }
  },
  {
    id: 2, name: 'Dell XPS 15', description: 'Intel Core i7-13700H, 16GB RAM, 512GB SSD, OLED 3.5K, RTX 4050.',
    price: 89999, original_price: 104999, discount: 14,
    image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=600',
    images: ['https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=600'],
    category: 'Portáteis', brand: 'Dell', stock: 18, rating: 4.5, reviews: 156, featured: true,
    specifications: { 'Processador': 'Intel Core i7-13700H', 'RAM': '16GB DDR5', 'Armazenamento': '512GB SSD', 'Tela': '15.6" OLED 3.5K', 'GPU': 'NVIDIA RTX 4050 6GB' }
  },
  {
    id: 3, name: 'ASUS ROG Strix G16', description: 'Intel i9-13980HX, 32GB RAM, 1TB SSD, RTX 4080, 165Hz.',
    price: 149999, original_price: 169999, discount: 12,
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600',
    images: ['https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600'],
    category: 'Portáteis', brand: 'ASUS', stock: 12, rating: 4.7, reviews: 89, featured: true,
    specifications: { 'Processador': 'Intel i9-13980HX', 'RAM': '32GB DDR5', 'Armazenamento': '1TB SSD', 'Tela': '16" 165Hz', 'GPU': 'NVIDIA RTX 4080 12GB' }
  },
  {
    id: 4, name: 'Lenovo ThinkPad X1 Carbon', description: 'Intel i7-1365U, 16GB RAM, 512GB SSD, 14" OLED.',
    price: 119999, original_price: 134999, discount: 11,
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600',
    images: ['https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600'],
    category: 'Portáteis', brand: 'Lenovo', stock: 20, rating: 4.6, reviews: 78, featured: false,
    specifications: { 'Processador': 'Intel i7-1365U', 'RAM': '16GB', 'Armazenamento': '512GB SSD', 'Tela': '14" OLED', 'Peso': '1.12kg' }
  },
  {
    id: 5, name: 'HP Spectre x360', description: 'Intel i7-1355U, 16GB RAM, 1TB SSD, 13.5" 2K, conversível.',
    price: 99999, original_price: 114999, discount: 13,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600',
    images: ['https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600'],
    category: 'Portáteis', brand: 'HP', stock: 15, rating: 4.4, reviews: 67, featured: false,
    specifications: { 'Processador': 'Intel i7-1355U', 'RAM': '16GB', 'Armazenamento': '1TB SSD', 'Tela': '13.5" 2K', 'Conversível': 'Sim' }
  },
  {
    id: 6, name: 'Acer Swift Go 14', description: 'Intel i5-1340P, 8GB RAM, 512GB SSD, 14" OLED.',
    price: 49999, original_price: 59999, discount: 17,
    image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600',
    images: ['https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600'],
    category: 'Portáteis', brand: 'Acer', stock: 25, rating: 4.3, reviews: 45, featured: false,
    specifications: { 'Processador': 'Intel i5-1340P', 'RAM': '8GB', 'Armazenamento': '512GB SSD', 'Tela': '14" OLED', 'Peso': '1.25kg' }
  },
  // Desktops
  {
    id: 7, name: 'Alienware Aurora R16', description: 'Intel i9-14900K, 32GB RAM, 2TB SSD, RTX 4090, 360mm AIO.',
    price: 249999, original_price: 279999, discount: 11,
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600',
    images: ['https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600'],
    category: 'Desktops', brand: 'Alienware', stock: 8, rating: 4.8, reviews: 123, featured: true,
    specifications: { 'Processador': 'Intel i9-14900K', 'RAM': '32GB DDR5', 'Armazenamento': '2TB NVMe SSD', 'GPU': 'NVIDIA RTX 4090 24GB', 'Cooling': '360mm AIO' }
  },
  {
    id: 8, name: 'HP Omen 45L', description: 'AMD Ryzen 9 7950X, 32GB RAM, 1TB SSD, RTX 4080, 240mm AIO.',
    price: 199999, original_price: 224999, discount: 11,
    image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=600',
    images: ['https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=600'],
    category: 'Desktops', brand: 'HP', stock: 10, rating: 4.6, reviews: 87, featured: true,
    specifications: { 'Processador': 'AMD Ryzen 9 7950X', 'RAM': '32GB DDR5', 'Armazenamento': '1TB NVMe SSD', 'GPU': 'NVIDIA RTX 4080 16GB', 'Cooling': '240mm AIO' }
  },
  {
    id: 9, name: 'Lenovo Legion Tower 7i', description: 'Intel i7-14700K, 32GB RAM, 1TB SSD, RTX 4070 Ti, 240mm AIO.',
    price: 159999, original_price: 179999, discount: 11,
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600',
    images: ['https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600'],
    category: 'Desktops', brand: 'Lenovo', stock: 12, rating: 4.5, reviews: 56, featured: false,
    specifications: { 'Processador': 'Intel i7-14700K', 'RAM': '32GB DDR5', 'Armazenamento': '1TB NVMe SSD', 'GPU': 'NVIDIA RTX 4070 Ti 12GB', 'Cooling': '240mm AIO' }
  },
  {
    id: 10, name: 'Dell XPS Desktop', description: 'Intel i7-14700K, 32GB RAM, 1TB SSD, RTX 4060 Ti, design compacto.',
    price: 129999, original_price: 149999, discount: 13,
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600',
    images: ['https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600'],
    category: 'Desktops', brand: 'Dell', stock: 15, rating: 4.4, reviews: 34, featured: false,
    specifications: { 'Processador': 'Intel i7-14700K', 'RAM': '32GB DDR5', 'Armazenamento': '1TB NVMe SSD', 'GPU': 'NVIDIA RTX 4060 Ti 8GB', 'Design': 'Compacto' }
  },
  // Monitores
  {
    id: 11, name: 'LG UltraGear 27GP850', description: '27" IPS 1K 165Hz 1ms, G-Sync Compatible, HDR10.',
    price: 8999, original_price: 10999, discount: 18,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600',
    images: ['https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600'],
    category: 'Monitores', brand: 'LG', stock: 30, rating: 4.7, reviews: 234, featured: true,
    specifications: { 'Tela': '27" IPS', 'Resolução': '2560x1440', 'Taxa': '165Hz', 'Tempo': '1ms', 'G-Sync': 'Sim' }
  },
  {
    id: 12, name: 'Samsung Odyssey G7', description: '32" Curvo 1K 240Hz 1ms, VA, G-Sync, HDR600.',
    price: 14999, original_price: 17999, discount: 17,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600',
    images: ['https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600'],
    category: 'Monitores', brand: 'Samsung', stock: 20, rating: 4.8, reviews: 156, featured: true,
    specifications: { 'Tela': '32" Curvo 1000R', 'Resolução': '2560x1440', 'Taxa': '240Hz', 'Tempo': '1ms', 'HDR': 'HDR600' }
  },
  {
    id: 13, name: 'ASUS ROG Swift PG27AQN', description: '27" IPS 1K 360Hz 1ms, G-Sync, HDR400.',
    price: 19999, original_price: 22999, discount: 13,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600',
    images: ['https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600'],
    category: 'Monitores', brand: 'ASUS', stock: 15, rating: 4.9, reviews: 89, featured: true,
    specifications: { 'Tela': '27" IPS', 'Resolução': '2560x1440', 'Taxa': '360Hz', 'Tempo': '1ms', 'G-Sync': 'Sim' }
  },
  {
    id: 14, name: 'Dell UltraSharp U2723QE', description: '27" IPS 4K 60Hz, USB-C, HDR400, 99% P3.',
    price: 15999, original_price: 18999, discount: 16,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600',
    images: ['https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600'],
    category: 'Monitores', brand: 'Dell', stock: 25, rating: 4.6, reviews: 67, featured: false,
    specifications: { 'Tela': '27" IPS', 'Resolução': '3840x2160', 'Taxa': '60Hz', 'USB-C': '90W', 'Cor': '99% P3' }
  },
  // Processadores
  {
    id: 15, name: 'Intel Core i9-14900K', description: '24 núcleos (32 threads), 6.0GHz, LGA1700, sem cooler.',
    price: 24999, original_price: 27999, discount: 11,
    image: 'https://images.unsplash.com/photo-1555625322-3c03a27bb835?w=600',
    images: ['https://images.unsplash.com/photo-1555625322-3c03a27bb835?w=600'],
    category: 'Processadores', brand: 'Intel', stock: 20, rating: 4.9, reviews: 345, featured: true,
    specifications: { 'Núcleos': '24 (32 threads)', 'Clock': 'Até 6.0GHz', 'Socket': 'LGA1700', 'TDP': '125W' }
  },
  {
    id: 16, name: 'AMD Ryzen 9 7950X', description: '16 núcleos (32 threads), 5.7GHz, AM5, sem cooler.',
    price: 22999, original_price: 25999, discount: 12,
    image: 'https://images.unsplash.com/photo-1555625322-3c03a27bb835?w=600',
    images: ['https://images.unsplash.com/photo-1555625322-3c03a27bb835?w=600'],
    category: 'Processadores', brand: 'AMD', stock: 18, rating: 4.8, reviews: 234, featured: true,
    specifications: { 'Núcleos': '16 (32 threads)', 'Clock': 'Até 5.7GHz', 'Socket': 'AM5', 'TDP': '170W' }
  },
  {
    id: 17, name: 'Intel Core i7-14700K', description: '20 núcleos (28 threads), 5.6GHz, LGA1700, sem cooler.',
    price: 17999, original_price: 19999, discount: 10,
    image: 'https://images.unsplash.com/photo-1555625322-3c03a27bb835?w=600',
    images: ['https://images.unsplash.com/photo-1555625322-3c03a27bb835?w=600'],
    category: 'Processadores', brand: 'Intel', stock: 25, rating: 4.7, reviews: 189, featured: false,
    specifications: { 'Núcleos': '20 (28 threads)', 'Clock': 'Até 5.6GHz', 'Socket': 'LGA1700', 'TDP': '125W' }
  },
  {
    id: 18, name: 'AMD Ryzen 7 7800X3D', description: '8 núcleos (16 threads), 5.0GHz, AM5, 96MB 3D V-Cache.',
    price: 15999, original_price: 17999, discount: 11,
    image: 'https://images.unsplash.com/photo-1555625322-3c03a27bb835?w=600',
    images: ['https://images.unsplash.com/photo-1555625322-3c03a27bb835?w=600'],
    category: 'Processadores', brand: 'AMD', stock: 22, rating: 4.9, reviews: 456, featured: true,
    specifications: { 'Núcleos': '8 (16 threads)', 'Clock': 'Até 5.0GHz', 'Socket': 'AM5', 'Cache': '96MB 3D V-Cache' }
  },
  // Placas de Vídeo
  {
    id: 19, name: 'NVIDIA RTX 4090', description: '24GB GDDR6X, 16384 CUDA, 2520MHz, DLSS 3.',
    price: 249999, original_price: 279999, discount: 11,
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=600',
    images: ['https://images.unsplash.com/photo-1591488320449-011701bb6704?w=600'],
    category: 'Placas de Vídeo', brand: 'NVIDIA', stock: 10, rating: 4.9, reviews: 567, featured: true,
    specifications: { 'VRAM': '24GB GDDR6X', 'CUDA': '16384', 'Clock': '2520MHz', 'DLSS': '3', 'TDP': '450W' }
  },
  {
    id: 20, name: 'NVIDIA RTX 4080 Super', description: '16GB GDDR6X, 10240 CUDA, 2550MHz, DLSS 3.',
    price: 149999, original_price: 169999, discount: 12,
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=600',
    images: ['https://images.unsplash.com/photo-1591488320449-011701bb6704?w=600'],
    category: 'Placas de Vídeo', brand: 'NVIDIA', stock: 15, rating: 4.8, reviews: 345, featured: true,
    specifications: { 'VRAM': '16GB GDDR6X', 'CUDA': '10240', 'Clock': '2550MHz', 'DLSS': '3', 'TDP': '320W' }
  },
  {
    id: 21, name: 'AMD RX 7900 XTX', description: '24GB GDDR6, 6144 Stream, 2.5GHz, FSR 3.',
    price: 119999, original_price: 139999, discount: 14,
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=600',
    images: ['https://images.unsplash.com/photo-1591488320449-011701bb6704?w=600'],
    category: 'Placas de Vídeo', brand: 'AMD', stock: 18, rating: 4.7, reviews: 234, featured: true,
    specifications: { 'VRAM': '24GB GDDR6', 'Stream': '6144', 'Clock': '2.5GHz', 'FSR': '3', 'TDP': '355W' }
  },
  {
    id: 22, name: 'NVIDIA RTX 4070 Ti Super', description: '16GB GDDR6X, 8448 CUDA, 2610MHz, DLSS 3.',
    price: 89999, original_price: 99999, discount: 10,
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=600',
    images: ['https://images.unsplash.com/photo-1591488320449-011701bb6704?w=600'],
    category: 'Placas de Vídeo', brand: 'NVIDIA', stock: 20, rating: 4.6, reviews: 189, featured: false,
    specifications: { 'VRAM': '16GB GDDR6X', 'CUDA': '8448', 'Clock': '2610MHz', 'DLSS': '3', 'TDP': '285W' }
  },
  // Memória RAM
  {
    id: 23, name: 'Corsair Vengeance DDR5 32GB', description: '2x16GB 6000MHz CL36, preto.',
    price: 6999, original_price: 7999, discount: 13,
    image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=600',
    images: ['https://images.unsplash.com/photo-1562976540-1502c2145186?w=600'],
    category: 'Memória RAM', brand: 'Corsair', stock: 40, rating: 4.7, reviews: 456, featured: true,
    specifications: { 'Capacidade': '32GB (2x16GB)', 'Velocidade': '6000MHz', 'Latência': 'CL36', 'Tipo': 'DDR5' }
  },
  {
    id: 24, name: 'G.Skill Trident Z5 RGB 32GB', description: '2x16GB 6400MHz CL32, RGB.',
    price: 8999, original_price: 9999, discount: 10,
    image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=600',
    images: ['https://images.unsplash.com/photo-1562976540-1502c2145186?w=600'],
    category: 'Memória RAM', brand: 'G.Skill', stock: 35, rating: 4.8, reviews: 345, featured: true,
    specifications: { 'Capacidade': '32GB (2x16GB)', 'Velocidade': '6400MHz', 'Latência': 'CL32', 'RGB': 'Sim' }
  },
  {
    id: 25, name: 'Kingston Fury Beast 64GB', description: '2x32GB 5600MHz CL36, preto.',
    price: 11999, original_price: 13999, discount: 15,
    image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=600',
    images: ['https://images.unsplash.com/photo-1562976540-1502c2145186?w=600'],
    category: 'Memória RAM', brand: 'Kingston', stock: 25, rating: 4.6, reviews: 234, featured: false,
    specifications: { 'Capacidade': '64GB (2x32GB)', 'Velocidade': '5600MHz', 'Latência': 'CL36', 'RGB': 'Não' }
  },
  {
    id: 26, name: 'Crucial Pro 32GB', description: '2x16GB 6000MHz CL36, sem RGB.',
    price: 5999, original_price: 6999, discount: 14,
    image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=600',
    images: ['https://images.unsplash.com/photo-1562976540-1502c2145186?w=600'],
    category: 'Memória RAM', brand: 'Crucial', stock: 45, rating: 4.5, reviews: 189, featured: false,
    specifications: { 'Capacidade': '32GB (2x16GB)', 'Velocidade': '6000MHz', 'Latência': 'CL36', 'RGB': 'Não' }
  },
  // Armazenamento
  {
    id: 27, name: 'Samsung 990 Pro 2TB', description: 'NVMe M.2, 7450MB/s leitura, 6900MB/s escrita.',
    price: 6999, original_price: 7999, discount: 13,
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=600',
    images: ['https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=600'],
    category: 'Armazenamento', brand: 'Samsung', stock: 50, rating: 4.9, reviews: 678, featured: true,
    specifications: { 'Capacidade': '2TB', 'Interface': 'NVMe M.2 PCIe 4.0', 'Leitura': '7450MB/s', 'Escrita': '6900MB/s' }
  },
  {
    id: 28, name: 'WD Black SN850X 1TB', description: 'NVMe M.2, 7300MB/s leitura, 6600MB/s escrita.',
    price: 4999, original_price: 5999, discount: 17,
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=600',
    images: ['https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=600'],
    category: 'Armazenamento', brand: 'Western Digital', stock: 60, rating: 4.8, reviews: 456, featured: true,
    specifications: { 'Capacidade': '1TB', 'Interface': 'NVMe M.2 PCIe 4.0', 'Leitura': '7300MB/s', 'Escrita': '6600MB/s' }
  },
  {
    id: 29, name: 'Seagate Barracuda 4TB', description: 'HDD 3.5", 5400RPM, 256MB cache.',
    price: 3999, original_price: 4999, discount: 20,
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=600',
    images: ['https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=600'],
    category: 'Armazenamento', brand: 'Seagate', stock: 80, rating: 4.5, reviews: 234, featured: false,
    specifications: { 'Capacidade': '4TB', 'Tipo': 'HDD 3.5"', 'RPM': '5400', 'Cache': '256MB' }
  },
  {
    id: 30, name: 'Crucial T700 2TB', description: 'NVMe M.2 PCIe 5.0, 12400MB/s leitura.',
    price: 12999, original_price: 14999, discount: 13,
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=600',
    images: ['https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=600'],
    category: 'Armazenamento', brand: 'Crucial', stock: 25, rating: 4.7, reviews: 123, featured: true,
    specifications: { 'Capacidade': '2TB', 'Interface': 'NVMe M.2 PCIe 5.0', 'Leitura': '12400MB/s', 'Escrita': '11800MB/s' }
  },
  // Smartphones
  {
    id: 31, name: 'iPhone 15 Pro Max', description: 'A17 Pro, 256GB, Titânio. Câmera de 48MP com zoom 5x.',
    price: 109999, original_price: 119999, discount: 8,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600',
    images: ['https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600'],
    category: 'Smartphones', brand: 'Apple', stock: 25, rating: 4.9, reviews: 567, featured: true,
    specifications: { 'Processador': 'A17 Pro', 'Armazenamento': '256GB', 'Tela': '6.7" Super Retina XDR', 'Câmera': '48MP' }
  },
  {
    id: 32, name: 'Samsung Galaxy S24 Ultra', description: 'Snapdragon 8 Gen 3, 512GB, S Pen integrado. Câmera de 200MP.',
    price: 99999, original_price: 114999, discount: 13,
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600',
    images: ['https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600'],
    category: 'Smartphones', brand: 'Samsung', stock: 20, rating: 4.7, reviews: 345, featured: true,
    specifications: { 'Processador': 'Snapdragon 8 Gen 3', 'Armazenamento': '512GB', 'Tela': '6.8" Dynamic AMOLED', 'Câmera': '200MP' }
  },
  {
    id: 33, name: 'Google Pixel 8 Pro', description: 'Tensor G3, 128GB, Câmera de 50MP com AI.',
    price: 79999, original_price: 89999, discount: 11,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600',
    images: ['https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600'],
    category: 'Smartphones', brand: 'Google', stock: 30, rating: 4.6, reviews: 234, featured: false,
    specifications: { 'Processador': 'Tensor G3', 'Armazenamento': '128GB', 'Tela': '6.7" OLED', 'Câmera': '50MP' }
  },
  {
    id: 34, name: 'Xiaomi 14 Ultra', description: 'Snapdragon 8 Gen 3, 512GB, Câmera Leica 1"',
    price: 89999, original_price: 99999, discount: 10,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600',
    images: ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600'],
    category: 'Smartphones', brand: 'Xiaomi', stock: 25, rating: 4.5, reviews: 189, featured: false,
    specifications: { 'Processador': 'Snapdragon 8 Gen 3', 'Armazenamento': '512GB', 'Tela': '6.73" AMOLED', 'Câmera': 'Leica 1"' }
  },
  // Áudio
  {
    id: 35, name: 'AirPods Pro 2ª Geração', description: 'Cancelamento de ruído ativo, áudio espacial, USB-C.',
    price: 24999, original_price: 27999, discount: 11,
    image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=600',
    images: ['https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=600'],
    category: 'Áudio', brand: 'Apple', stock: 50, rating: 4.6, reviews: 892, featured: true,
    specifications: { 'Tipo': 'In-ear', 'Conectividade': 'Bluetooth 5.3', 'Bateria': 'Até 6 horas', 'Resistência': 'IP54' }
  },
  {
    id: 36, name: 'Sony WH-1000XM5', description: 'Cancelamento de ruído líder de mercado, 30 horas de bateria.',
    price: 34999, original_price: 39999, discount: 13,
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=600',
    images: ['https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=600'],
    category: 'Áudio', brand: 'Sony', stock: 35, rating: 4.8, reviews: 456, featured: true,
    specifications: { 'Tipo': 'Over-ear', 'Conectividade': 'Bluetooth 5.2', 'Bateria': '30 horas', 'ANC': 'Sim' }
  },
  {
    id: 37, name: 'Bose QuietComfort Ultra', description: 'Cancelamento de ruído, áudio espacial, 24h bateria.',
    price: 32999, original_price: 37999, discount: 13,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600',
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600'],
    category: 'Áudio', brand: 'Bose', stock: 30, rating: 4.7, reviews: 345, featured: false,
    specifications: { 'Tipo': 'Over-ear', 'Conectividade': 'Bluetooth 5.3', 'Bateria': '24 horas', 'ANC': 'Sim' }
  },
  {
    id: 38, name: 'JBL Tune 760NC', description: 'Cancelamento de ruído, 50h bateria, dobrável.',
    price: 1999, original_price: 2499, discount: 20,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600',
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600'],
    category: 'Áudio', brand: 'JBL', stock: 60, rating: 4.4, reviews: 678, featured: false,
    specifications: { 'Tipo': 'Over-ear', 'Conectividade': 'Bluetooth 5.3', 'Bateria': '50 horas', 'ANC': 'Sim' }
  },
  // Gaming
  {
    id: 39, name: 'PlayStation 5', description: 'Console de última geração com 825GB SSD, 4K/120fps.',
    price: 54999, original_price: 59999, discount: 8,
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=600',
    images: ['https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=600'],
    category: 'Gaming', brand: 'Sony', stock: 12, rating: 4.9, reviews: 1234, featured: true,
    specifications: { 'Armazenamento': '825GB SSD', 'Resolução': '4K/120fps', 'RAM': '16GB GDDR6', 'Saída': 'HDMI 2.1' }
  },
  {
    id: 40, name: 'Xbox Series X', description: '1TB SSD, 4K/120fps, Game Pass Ultimate.',
    price: 54999, original_price: 59999, discount: 8,
    image: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=600',
    images: ['https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=600'],
    category: 'Gaming', brand: 'Microsoft', stock: 15, rating: 4.8, reviews: 987, featured: true,
    specifications: { 'Armazenamento': '1TB NVMe SSD', 'Resolução': '4K/120fps', 'RAM': '16GB GDDR6', 'Game Pass': 'Ultimo' }
  },
  {
    id: 41, name: 'Nintendo Switch OLED', description: '7" OLED, 64GB, Joy-Con coloridos.',
    price: 24999, original_price: 27999, discount: 11,
    image: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=600',
    images: ['https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=600'],
    category: 'Gaming', brand: 'Nintendo', stock: 25, rating: 4.7, reviews: 567, featured: true,
    specifications: { 'Tela': '7" OLED', 'Armazenamento': '64GB', 'Joy-Con': 'Coloridos', 'Modos': 'Portátil/Dock' }
  },
  {
    id: 42, name: 'Steam Deck OLED', description: '7.4" OLED, 512GB, AMD APU.',
    price: 39999, original_price: 44999, discount: 11,
    image: 'https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=600',
    images: ['https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=600'],
    category: 'Gaming', brand: 'Valve', stock: 20, rating: 4.6, reviews: 345, featured: true,
    specifications: { 'Tela': '7.4" OLED', 'Armazenamento': '512GB NVMe', 'CPU': 'AMD Zen 2', 'GPU': 'AMD RDNA 2' }
  },
]

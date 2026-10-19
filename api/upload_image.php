<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

error_log('Upload image script started');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    error_log('Method not allowed: ' . $_SERVER['REQUEST_METHOD']);
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

if (!isset($_FILES['image'])) {
    error_log('No image file provided');
    http_response_code(400);
    echo json_encode(['error' => 'No image file provided']);
    exit;
}

$file = $_FILES['image'];
error_log('File info: ' . print_r($file, true));

// Check for errors
if ($file['error'] !== UPLOAD_ERR_OK) {
    error_log('Upload error code: ' . $file['error']);
    http_response_code(400);
    echo json_encode(['error' => 'Upload error: ' . $file['error']]);
    exit;
}

// Validate file type
$allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/avif'];
if (!in_array($file['type'], $allowedTypes)) {
    error_log('Invalid file type: ' . $file['type']);
    http_response_code(400);
    echo json_encode(['error' => 'Invalid file type. Allowed: JPEG, PNG, WebP, AVIF']);
    exit;
}

// Validate file size (max 5MB)
$maxSize = 5 * 1024 * 1024;
if ($file['size'] > $maxSize) {
    error_log('File too large: ' . $file['size']);
    http_response_code(400);
    echo json_encode(['error' => 'File too large. Max size: 5MB']);
    exit;
}

// Generate unique filename
$extension = pathinfo($file['name'], PATHINFO_EXTENSION);
$basename = pathinfo($file['name'], PATHINFO_FILENAME);
$basename = preg_replace('/[^a-zA-Z0-9-]/', '-', $basename);
$filename = $basename . '-' . time() . '.' . $extension;

$uploadDir = __DIR__ . '/../public/images/';
$uploadPath = $uploadDir . $filename;

error_log('Upload dir: ' . $uploadDir);
error_log('Upload path: ' . $uploadPath);

// Create directory if it doesn't exist
if (!is_dir($uploadDir)) {
    error_log('Creating directory: ' . $uploadDir);
    mkdir($uploadDir, 0755, true);
}

// Move uploaded file
if (move_uploaded_file($file['tmp_name'], $uploadPath)) {
    $imageUrl = '/images/' . $filename;
    error_log('Upload successful: ' . $imageUrl);
    echo json_encode([
        'success' => true,
        'url' => $imageUrl,
        'filename' => $filename
    ]);
} else {
    error_log('Failed to move uploaded file');
    http_response_code(500);
    echo json_encode(['error' => 'Failed to move uploaded file']);
}

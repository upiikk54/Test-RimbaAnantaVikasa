# User Management API

Simple RESTful API untuk manajemen data pengguna menggunakan Express.js, Sequelize ORM, dan PostgreSQL.

## Fitur

- CRUD Operations (Create, Read, Update, Delete)
- Validasi input menggunakan express-validator
- Logging request dan response ke file
- Database PostgreSQL dengan Sequelize ORM
- UUID sebagai primary key
- Error handling

## Endpoints

### Users
- `POST /users` - Membuat user baru
- `GET /users` - Mendapatkan semua user
- `GET /users/:id` - Mendapatkan user berdasarkan ID
- `PUT /users/:id` - Mengupdate user berdasarkan ID
- `DELETE /users/:id` - Menghapus user berdasarkan ID

## Struktur Project
Saya menggunakan struktur project yang terdiri dari beberapa folder dan file utama sebagai berikut:

- `server.js` - File utama yang menjalankan server Express.js
- `models/` - Folder yang berisi model Sequelize untuk tabel database
- `controllers/` - Folder yang berisi controller untuk menangani request dan response
- `services/` - Folder yang berisi service untuk menangani logika bisnis
- `repositories/` - Folder yang berisi repository untuk menangani operasi database
- `middlewares/` - Folder yang berisi middleware untuk validasi input dan logging
- `logs/` - Folder yang berisi file log request dan response

Saya biasa sebut struktur project ini sebagai Repository Pattern.

## Instalasi

1. Clone repository ini ke komputer Anda
2. Install Node.js dan PostgreSQL di komputer Anda
3. Jalankan perintah `yarn install` atau `yarn` untuk menginstal dependensi
4. Konfigurasi file `.env` dengan informasi database Anda
5. Jalankan perintah `yarn dev` untuk menjalankan server

## Testing

1. Jalankan perintah `yarn test` untuk menjalankan testing


# ✅ API REST – Backend (Node + Express + MongoDB)

API REST desarrollada con Node.js, Express y MongoDB que gestiona **Productos**, **Categorías** y **Usuarios**, incluyendo autenticación JWT.  
Se trata del backend de una plataforma de gestión diseñada para negocios de comida rápida. Actualmente ofrece un backoffice administrativo que permite al personal autorizado gestionar usuarios internos, categorías de productos y productos del menú, con control centralizado y acceso seguro.
A futuro se puede integrar una la parte de e-commerce para que los clientes puedan visualizar el menú, realizar pedidos en línea y hacer pagos desde la web o dispositivos móviles, convirtiendo el sistema en una solución completa para la operación digital del negocio.

---

## Topics
- [📌 Tecnologías utilizadas](#-tecnologías-utilizadas)
- [📂 Estructura del proyecto](#-estructura-del-proyecto)
- [🗄️ Esquema de la Base de Datos (MongoDB con Mongoose)](#️-esquema-de-la-base-de-datos-mongodb-con-mongoose)
- [🚀 Cómo correr el proyecto](#-cómo-correr-el-proyecto)
- [✅ Endpoints Disponibles](#-endpoints-disponibles)
- [🧪 Mock JSON (solo POST)](#-mock-json-solo-post)
- [🔐 Autenticación](#-autenticación)
- [💾 Base de datos MongoDB con Docker](#-base-de-datos-mongodb-con-docker)
- [📄 LICENSE](#-license)

---

## 📌 Tecnologías utilizadas

| Tecnología | Uso |
|------------|-----|
| **Node.js** | Entorno de ejecución |
| **Express.js** | Framework HTTP |
| **MongoDB + Mongoose** | Base de datos NoSQL y modelado ODM |
| **JWT (jsonwebtoken)** | Autenticación de usuarios |
| **bcrypt** | Hasheo de contraseñas |
| **Dotenv** | Variables de entorno |
| **Nodemon** | Desarrollo en caliente (opcional) |

## 📂 Estructura del proyecto

```
backend/
├── index.js
├── config.js
├── .env
├── package.json
└── src
    ├── config/db.js
    ├── controllers/
    │   ├── productController.js
    │   ├── categoryController.js
    │   └── userController.js
    ├── models/
    │   ├── productModel.js
    │   ├── categoryModel.js
    │   └── userModel.js
    ├── routes/
    │   ├── productRoute.js
    │   ├── categoryRoute.js
    │   └── userRoute.js
    ├── middlewares/
    │   └── verifyTokenMiddleware.js
    ├── services/
    │   ├── productService.js
    │   ├── categoryService.js
    │   └── userService.js
    └── utils/
        ├── validators.js
        └── verifyToken.js
```

## 🗄️ Esquema de la Base de Datos (MongoDB con Mongoose)

### ✅ Users
```json
{
   "firstName":{
      "required":true,
      "maxlength":30,
      "minlength":2,
      "trim":true,
      "lowercase":true
   },
   "lastName":{
      "required":true,
      "maxlength":30,
      "minlength":2,
      "trim":true,
      "lowercase":true
   },
   "email":{
      "required":true,
      "maxlength":30,
      "minlength":2,
      "trim":true,
      "lowercase":true
   },
   "phone":{
      "required":false,
      "trim":true,
      "lowercase":true
   },
   "address":{
      "trim":true,
      "lowercase":true
   },
   "passwordHash":{
      "required":true,
      "validate":{
         "message":"Password must be bewteen 6 and 12 characters, with at least one number, one uppercase letter and one lowercase letter"
      }
   }
}
```

### ✅ Categories
```json
{
   "name":{
      "required":true,
      "maxlength":30,
      "minlength":2,
      "trim":true,
      "lowercase":true
   },
   "description":{
      "required":true,
      "maxlength":100,
      "trim":true
   },
   "imageUrl":{
      "default":null
   }
}
```

### ✅ Products
```json
{
   "name":{
      "required":[
         true,
         "Name field is required"
      ],
      "maxlength":50,
      "minlength":2,
      "unique":true,
      "trim":true,
      "lowercase":true
   },
   "description":{
      "required":true,
      "maxlength":500,
      "minlength":2,
      "trim":true
   },
   "price":{
      "required":[
         true,
         "Price field is required"
      ],
      "min":[
         1,
         "Price field has to be a number"
      ]
   },
   "stock":{
      "required":true,
      "min":[
         0,
         "Stock can't be a negative number"
      ]
   },
   "imageUrl":{
      "default":null
   },
   "highlighted":{
      "default":false
   },
   "category":{
      "type":"mongoose.Schema.Types.ObjectId",
      "ref":"categories",
      "required":true
   }
}
```

## 🚀 Cómo correr el proyecto

### 1. Clonar repositorio
```bash
git clone <repo-url>
cd backend
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar .env
```
PORT=3001
MONGO_CONNECTION_STRING=mongodb://localhost:27017/mcfood
JWT_SECRET=<secret_key>
```

### 4. Iniciar
```bash
npm start
```

## ✅ Endpoints Disponibles

### Users – `/api/users`

| Método | Endpoint                                                                        | Descripción                                                | Auth |
| ------ | ------------------------------------------------------------------------------- | ---------------------------------------------------------- | ---- |
| GET    | `/api/users/search?query=test@example.com&page=2&pageSize=10&sort=lastName:asc` | Buscar usuarios por criterios (texto + paginación + orden) | ✅    |
| GET    | `/api/users`                                                                    | Obtener todos los usuarios                                 | ✅    |
| GET    | `/api/users/:id`                                                                | Obtener usuario por ID                                     | ✅    |
| POST   | `/api/users`                                                                    | Crear un nuevo usuario                                     | ✅    |
| PUT    | `/api/users/:id`                                                                | Actualizar completamente un usuario                        | ✅    |
| PATCH  | `/api/users/:id`                                                                | Actualizar parcialmente un usuario                         | ✅    |
| DELETE | `/api/users/:id`                                                                | Eliminar usuario                                           | ✅    |
| POST   | `/api/users/login`                                                              | Autenticar usuario por email y contraseña, devuelve JWT    | ❌    |

### Categories – `/api/categories`

| Método | Endpoint                                                                     | Descripción                                                  | Auth |
| ------ | ---------------------------------------------------------------------------- | ------------------------------------------------------------ | ---- |
| GET    | `/api/categories/search?query=burguers&page=2&pageSize=10&sort=lastName:asc` | Buscar categorías por criterios (texto + paginación + orden) | ✅    |
| GET    | `/api/categories`                                                            | Obtener todas las categorías                                 | ❌    |
| GET    | `/api/categories/:id`                                                        | Obtener una categoría por ID                                 | ❌    |
| POST   | `/api/categories`                                                            | Crear una nueva categoría                                    | ✅    |
| PUT    | `/api/categories/:id`                                                        | Actualizar completamente una categoría                       | ✅    |
| PATCH  | `/api/categories/:id`                                                        | Actualizar parcialmente una categoría                        | ✅    |
| DELETE | `/api/categories/:id`                                                        | Eliminar una categoría                                       | ✅    |

### Products – `/api/products`

| Método | Endpoint                                                                   | Descripción                                                 | Auth |
| ------ | -------------------------------------------------------------------------- | ----------------------------------------------------------- | ---- |
| GET    | `/api/products/search?query=burguers&page=2&pageSize=10&sort=lastName:asc` | Buscar productos por criterios (texto + paginación + orden) | ✅    |
| GET    | `/api/products`                                                            | Obtener todos los productos                                 | ✅    |
| GET    | `/api/products/:id`                                                        | Obtener un producto por ID                                  | ✅    |
| GET    | `/api/products/by-category/:id`                                            | Listar productos por ID de categoría                        | ❌    |
| GET    | `/api/products/highlighted/:maxItems`                                      | Listar productos destacados (máx. `maxItems`)               | ❌    |
| POST   | `/api/products`                                                            | Crear un producto                                           | ✅    |
| PUT    | `/api/products/:id`                                                        | Actualizar completamente un producto                        | ✅    |
| PATCH  | `/api/products/:id`                                                        | Actualizar parcialmente un producto                         | ✅    |
| DELETE | `/api/products/:id`                                                        | Eliminar un producto                                        | ✅    |

### ***Notas rápidas***
- **Auth** ✅ significa que el endpoint requiere JWT en `Authorization: Bearer <token>` o una cookie `authtoken`.
- **Query params (search)**:
  - `query` (string, opcional) – texto a buscar.
  - `page` (number, opcional) – página (por defecto 1).
  - `pageSize` (number, opcional) – tamaño de página (por defecto 20).
  - `sort` (string, opcional) – campo y orden, p. ej. name:asc, price:desc.
- **Path params**:
  - `:id` — ObjectId del producto o categoría.
  - `:maxItems` — número máximo de productos destacados a devolver.

## 🧪 Mock JSON (solo POST)

### Crear Usuario
```json
{
  "firstName": "Hector",
  "lastName": "Galarze",
  "email": "hectorgalarze@mcfood.com",
  "passwordHash": "Secret123",
  "address": "Argentina",
  "phone": "+5454123456"
}
```

### Login
```json
{
  "email": "hectorgalarze@mcfood.com",
  "passwordHash": "Secret123"
}
```

### Crear Categoría
```json
{
  "name": "hamburguesas",
  "description": "Hamburguesas artesanales premium",
  "imageUrl": "https://cdn.mcfood.com/hamburguesas.png"
}
```

### Crear Producto
```json
{
  "name": "doble bacon",
  "description": "Doble carne, cheddar y bacon crocante",
  "price": 8.90,
  "stock": 20,
  "highlighted": true,
  "imageUrl": "https://cdn.mcfood.com/bacon.png",
  "category": "67a00b8ed5a321dc02310ae9"
}
```

## 🔐 Autenticación

Enviar token en cookie:

```
authtoken: <token>
```

o enviar token en headers:

```
Authorization: Bearer <token>
```

## 💾 Base de datos MongoDB con Docker

Este proceso levanta una instancia de **MongoDB Community Server** mediante Docker. Incluye un script de inicialización para crear base de datos, colecciones o datos iniciales automáticamente la primera vez que se ejecuta.

### 📁 Contenido del proyecto

```
.
├─ docker-compose.yml
└─ init/
   └─ init.mongodb.js
```

#### ¿Qué hace cada archivo?

| Archivo | Descripción |
|---------|-------------|
| `docker-compose.yml` | Define el contenedor de MongoDB y un volumen persistente para los datos |
| `init/init.mongodb.js` | Script que se ejecuta automáticamente la primera vez, permitiendo crear base, usuarios o datos iniciales |

### ✅ Requisitos

- Docker instalado
- Docker Desktop o Docker Engine
- (Opcional) MongoDB Compass o cualquier cliente para conectarse a la base

### 🚀 Cómo levantar MongoDB

Ejecutar desde la carpeta donde está `docker-compose.yml`:

```bash
docker compose up -d
```

Esto hará:

✅ Descargar la imagen oficial de MongoDB  
✅ Crear y ejecutar el contenedor `mongodb`  
✅ Crear un volumen persistente  
✅ Ejecutar el script `init.mongodb.js` si es la primera vez

### 🧪 Verificar que está corriendo

```bash
docker ps
```

Debe aparecer algo similar:

```
mongodb   ...   27017->27017/tcp
```

Luego puedes conectarte con:

- **Host:** `localhost`
- **Puerto:** `27017`

### 🧰 ¿Qué hace `init.mongodb.js`?

Este archivo se ejecuta automáticamente en el primer arranque del contenedor. 

Sirve para:

✅ Crear la base  
✅ Crear colecciones  
✅ Insertar datos de prueba  
✅ Crear usuarios y roles

> Puedes modificarlo libremente para personalizar la inicialización.

### 🛑 Detener el contenedor

```bash
docker compose down
```

> ➡️ Esto **no borra los datos**, porque se guardan en un volumen persistente.

### 🗑 Eliminar contenedor + volumen + datos

```bash
docker compose down -v
```

> ⚠️ Esto borra la base completa. Úsalo solo si estás seguro.

### 📡 Conectarse desde un backend Node/Mongoose

```js
mongoose.connect("mongodb://localhost:27017/mcfood");
```

### ✅ Comandos rápidos

| Acción | Comando |
|--------|---------|
| Levantar MongoDB | `docker compose up -d` |
| Ver contenedores | `docker ps` |
| Detener contenedor | `docker compose down` |
| Eliminar contenedor + datos | `docker compose down -v` |

### ✔ Listo

Una vez levantado el contenedor ya puedes conectarte desde tu aplicación o cliente GUI. 

---
## 📄 LICENSE

[MIT License](LICENSE)
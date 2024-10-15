![URL shortener](./url-shortener.jpg)

# URL Shortener

Este es un proyecto **fullstack** de acortador de URLs desarrollado con **NestJS** en el backend y **HTML, CSS y JavaScript** en el frontend.

## 📋 Características

- Acortar URLs rápidamente mediante un formulario.
- Mostrar la URL acortada junto con su fecha de expiración.
- Paleta de colores oscura y diseño responsivo.

## 🛠️ Tecnologías Utilizadas

- **Frontend:** HTML5, CSS3, JavaScript
- **Backend:** NestJS (Node.js Framework)
- **Base de Datos:** PostgreSQL

## 📦 Instalación

Sigue estos pasos para ejecutar el proyecto en tu máquina local.

### Prerrequisitos

- **Node.js** y **npm** instalados.  
  Puedes descargarlos desde [Node.js](https://nodejs.org).

- **NestJS CLI** instalado globalmente:

  ```bash
  npm install -g @nestjs/cli
  ```

### Paso 1: Clonar el Repositorio

```bash
git clone https://github.com/angelchavez19/url-shortener.git
cd url-shortener
```

### Paso 2: Configurar el Backend (NestJS)

1. Accede al directorio del backend:

   ```bash
   cd backend
   ```

2. Instala las dependencias necesarias:

   ```bash
   npm install
   ```

3. Crea un archivo `.env` en el directorio del backend y agrega la configuración necesaria (como la URL de la base de datos):

   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/urlshortener
   ```

4. Inicia el servidor NestJS:

   ```bash
   npm run start:dev
   ```

   El backend estará disponible en `http://localhost:3000`.

---

## ⚙️ API Endpoints

### **POST** `/api/url`

Este endpoint recibe una URL para acortarla.

**Request Body:**

```json
{
  "url": "https://example.com"
}
```

**Response:**

```json
{
  "shortened": "lecaqx",
  "expires": "2024-10-17T13:30:21.230Z"
}
```

### **GET** `/:shortened`

Este endpoint permite redireccionar a la URL original a partir de la versión acortada.

---

## 🧑‍💻 Autor

Desarrollado por [Angel Chávez](https://angelchavezportfolio.vercel.app/).  
[LinkedIn](https://www.linkedin.com/in/angel-ch%C3%A1vez) | [GitHub](https://github.com/angelchavez19)

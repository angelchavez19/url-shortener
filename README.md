![URL Shortener](./url-shortener.jpg)

# URL Shortener

This is a **fullstack** URL shortener project developed with **NestJS** for the backend and **HTML, CSS, and JavaScript** for the frontend.

## 📋 Features

- Quickly shorten URLs using a form.
- Display the shortened URL along with its expiration date.
- Dark color palette and responsive design.

## 🛠️ Technologies Used

- **Frontend:** HTML5, CSS3, JavaScript
- **Backend:** NestJS (Node.js Framework)
- **Database:** PostgreSQL

## 📦 Installation

Follow these steps to run the project on your local machine.

### Prerequisites

- **Node.js** and **npm** installed.  
  You can download them from [Node.js](https://nodejs.org).

- **NestJS CLI** installed globally:

  ```bash
  npm install -g @nestjs/cli
  ```

### Step 1: Clone the Repository

```bash
git clone https://github.com/angelchavez19/url-shortener.git
cd url-shortener
```

### Step 2: Set Up the Backend (NestJS)

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install the required dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory and add the necessary configuration (such as the database URL):

   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/urlshortener
   ```

4. Start the NestJS server:

   ```bash
   npm run start:dev
   ```

   The backend will be available at `http://localhost:3000`.

---

## ⚙️ API Endpoints

### **POST** `/api/url`

This endpoint receives a URL to shorten.

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

This endpoint allows redirecting to the original URL from the shortened version.

---

## 🧑‍💻 Author

Developed by [Angel Chávez](https://angelchavezportfolio.vercel.app/).  
[LinkedIn](https://www.linkedin.com/in/angel-ch%C3%A1vez) | [GitHub](https://github.com/angelchavez19)

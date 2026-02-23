
# Blog App Backend

**Project Overview**
- **Description:** Backend API for a simple blog application providing authentication, post creation, file uploads and basic validations.
- **Stack:** Node.js, Express, MongoDB, Mongoose, Multer, JSON Web Tokens

**Prerequisites**
- **Node.js:** v16+ recommended
- **MongoDB:** a running MongoDB instance or MongoDB Atlas connection string

**Environment**
- **Required env vars:**
	- **MONGODB_URI:** MongoDB connection string
	- **JWT_SECRET:** Secret used to sign JWT tokens
	- **EXPIRATION_TIME:** JWT expiration (e.g. `7d`, `1h`)
	- **PORT:** (optional) port for the server; defaults to `8000`

**Installation**
- **Install dependencies:**

	```bash
	npm install
	```

**Run**
- **Start development server:**

	```bash
	npm run dev
	```

- **Start production server:**

	```bash
	npm start
	```

**Important Files**
- **Entry point:** [src/server.js](src/server.js)
- **Express app:** [src/app.js](src/app.js)
- **DB config:** [src/config/db.js](src/config/db.js)
- **Auth routes/controller:** [src/routes/auth.routes.js](src/routes/auth.routes.js), [src/controllers/auth.controller.js](src/controllers/auth.controller.js)
- **Post routes/controller:** [src/routes/post.routes.js](src/routes/post.routes.js), [src/controllers/post.controller.js](src/controllers/post.controller.js)
- **Upload middleware:** [src/middlewares/upload.middleware.js](src/middlewares/upload.middleware.js)

**Folder Notes**
- **Uploaded files** are saved to the `uploads/` folder and served statically at `/uploads` (see [src/app.js](src/app.js)).

**API Reference (quick)**

Base URL: `http://<HOST>:<PORT>/api`

- **Auth**
	- POST `/api/auth/signup` — Register a new user
		- Body (JSON): `{ "email": "user@example.com", "password": "pass", "confirmPassword": "pass" }`
		- Returns created user (without token).

	- POST `/api/auth/login` — Login and receive JWT
		- Body (JSON): `{ "email": "user@example.com", "password": "pass" }`
		- Returns `{ msg, token }` on success. Use header `Authorization: Bearer <token>` for protected routes.

- **Posts** (all post routes require authentication)
	- POST `/api/post/create` — Create a post (multipart/form-data)
		- Fields: `title` (string), `content` (string), `tags` (array or comma-separated), `name` (author name)
		- File fields: `banner` (single image), `profile` (single image)
		- Example curl (multipart):

			```bash
			curl -X POST http://localhost:8000/api/post/create \
				-H "Authorization: Bearer <TOKEN>" \
				-F "title=My Post" \
				-F "content=Hello world" \
				-F "name=Author Name" \
				-F "banner=@/path/to/banner.jpg" \
				-F "profile=@/path/to/profile.jpg"
			```

	- GET `/api/post/getPosts` — List posts (query: `page`, `limit`, `search`, `sort`)
	- GET `/api/post/getPostById/:id` — Get post by id
	- PATCH `/api/post/update/:id` — Update a post (multipart/form-data)
	- DELETE `/api/post/delete/:id` — Soft-delete a post

**Auth & Tokens**
- The app uses `jsonwebtoken` for auth. Provide `JWT_SECRET` and `EXPIRATION_TIME` in `.env`.
- Protected endpoints expect header: `Authorization: Bearer <token>` (see [src/middlewares/auth.middleware.js](src/middlewares/auth.middleware.js)).

**Validation & Uploads**
- Request validation is implemented via `express-validator` (see `src/validations/`).
- File uploads are handled by Multer with a 2MB limit and only image mime types allowed (see [src/middlewares/upload.middleware.js](src/middlewares/upload.middleware.js)).

**Development tips**
- Ensure the `uploads/` folder exists and is writable by the server.
- Use a tool like `Postman` or `curl` to test multipart requests and file uploads.

**Common env example (.env)**

```
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster0.mongodb.net/mydb?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret
EXPIRATION_TIME=7d
PORT=8000
```

**Contributing**
- Bug fixes and documentation updates are welcome. Open a PR with clear details.

**License**
- MIT


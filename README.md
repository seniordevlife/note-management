## 🛠 Tech Stack

- **Frontend:** React, Tailwind CSS  
- **Framework:** NestJS  
- **Testing:** Jest

---

## 🚀 Deployment & CI/CD

### 🔁 Continuous Integration - CircleCI

This project uses [CircleCI](https://circleci.com/) for CI/CD:

- Automatically installs dependencies
- Builds the app
- Runs tests (`npm run test`)
- Deploys to Vercel on successful test pass

The config is located at `.circleci/config.yml`.  
CircleCI workflow includes:
- `install-deps`
- `build`
- `test`
- `deploy` via [Vercel deploy hook](https://vercel.com/docs/projects/git#deploy-hooks)

### 🌐 Deployment - Vercel

The app is auto-deployed to Vercel using a deploy hook triggered by CircleCI after successful tests.

🔗 **Live URL**: [note-management.vercel.app](https://note-management-nwk0jomuv-vincents-projects-26c3f3b1.vercel.app/)

---

## 🧪 Run Test 

```bash 
npm run test

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.


## Login Credentials
 ````bash
 Username: admin
 
 Password: admin
 ````
 
 ## Run test 
````bash 
npm run test
````

## Mock API Documentation

### 1. **GET /api/notes**
   - **Description:** Fetch all notes.
   - **Response:**
     - `200 OK` - Returns an array of all notes.
     - Example:
       ```json
       [
         {
           "id": "1",
           "title": "Note Title 1",
           "content": "Note Content 1",
           "createdTime": "2023-03-20T12:00:00Z"
         },
         {
           "id": "2",
           "title": "Note Title 2",
           "content": "Note Content 2",
           "createdTime": "2023-03-21T15:30:00Z"
         }
       ]
       ```

### 2. **POST /api/notes**
   - **Description:** Create a new note.
   - **Request Body:**
     ```json
     {
       "title": "New Note Title",
       "content": "New Note Content"
     }
     ```
   - **Response:**
     - `201 Created` - Returns the newly created note with a generated `id` and `createdTime`.
     - Example:
       ```json
       {
         "id": "3",
         "title": "New Note Title",
         "content": "New Note Content",
         "createdTime": "2023-03-22T10:00:00Z"
       }
       ```

---

### 3. **GET /api/notes/[id]**
   - **Description:** Fetch a specific note by its ID.
   - **Parameters:**
     - `id` (required) - The ID of the note to retrieve.
   - **Response:**
     - `200 OK` - Returns the note matching the specified ID.
     - Example:
       ```json
       {
         "id": "1",
         "title": "Note Title 1",
         "content": "Note Content 1",
         "createdTime": "2023-03-20T12:00:00Z"
       }
       ```
     - `404 Not Found` - If the note with the specified ID does not exist.

### 4. **PUT /api/notes/[id]**
   - **Description:** Update an existing note by its ID.
   - **Parameters:**
     - `id` (required) - The ID of the note to update.
   - **Request Body:**
     ```json
     {
       "title": "Updated Note Title",
       "content": "Updated Note Content"
     }
     ```
   - **Response:**
     - `200 OK` - Returns the updated note with the same `createdTime`.
     - Example:
       ```json
       {
         "id": "1",
         "title": "Updated Note Title",
         "content": "Updated Note Content",
         "createdTime": "2023-03-20T12:00:00Z"
       }
       ```
     - `404 Not Found` - If the note with the specified ID does not exist.

### 5. **DELETE /api/notes/[id]**
   - **Description:** Delete a specific note by its ID.
   - **Parameters:**
     - `id` (required) - The ID of the note to delete.
   - **Response:**
     - `200 OK` - Returns a success message confirming the deletion.
     - Example:
       ```json
       {
         "message": "Note deleted successfully"
       }
       ```
     - `404 Not Found` - If the note with the specified ID does not exist.


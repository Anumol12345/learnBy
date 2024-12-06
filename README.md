
**Learn By Forms**  
A full-stack web application built with Angular for the frontend, Node.js for the backend, and MySQL for the database.  

**Features**    
User authentication and authorization.  
RESTful API for CRUD operations.  
Responsive and dynamic frontend with Angular.  
MySQL database for data persistence.  
Error handling and input validation.  
Token-based authentication (e.g., JWT).  

**Technologies Used**  
Frontend:  
Angular  
Angular Material (optional)  
Bootstrap (optional)  
Backend:  
Node.js  
Express.js  
Database:    
MySQL   

**Prerequisites**  
Ensure the following are installed on your machine:  
Node.js  
Angular CLI  
MySQL  

**Project Structure**  
bash   
Copy code  
project-root/  
│  
├── client/                    # Angular frontend  
│   ├── src/  
│   ├── dist/                # Production build  
│   ├── angular.json  
│   └── package.json  
│
├── server/                  # Node.js backend  
│   ├── controllers/         # API controllers  
│   ├── models/              # Database models  
│   ├── routes/              # API routes  
│   ├── server.js            # Main server file  
│   └── package.json  
│  
├── .gitignore   
├── README.md  
└── .env                    # Environment variables  
Setup  

**Step 1: Clone the Repository**  
git clone https://github.com/your-username/project-name.git  
cd project-name  
**Step 2: Install Dependencies**  
Frontend (Angular)  
Navigate to the client directory:   
cd client  
npm install  
Backend (Node.js)  
Navigate to the server directory:  

cd ../server   
npm install  
**Step 3: Configure Environment Variables** 
In the server directory, create a .env file: 
  

touch .env    
Add the following:   
  
env   
DB_HOST=localhost     
DB_USER=root   
DB_PASSWORD=yourpassword   
DB_NAME=yourdatabase  
JWT_SECRET=your_secret_key  
PORT=3080  
Update these values based on your MySQL configuration.  
 
**Step 4: Set Up the MySQL Database**  
Open your MySQL client and run the following:  
sql  
CREATE DATABASE yourdatabase;  
Import the schema if you have a .sql file:  

mysql -u root -p yourdatabase < path/to/schema.sql 
Running the Application  
Frontend (Angular)  
Navigate to the client directory:  

cd client  
Start the Angular development server:  

ng serve  
Open your browser and navigate to http://localhost:4200.  
Backend (Node.js)  
Navigate to the server directory:  

cd server  
Start the server:  

npm start  
The backend will be available at http://localhost:3080.  
API Endpoints  
Method	Endpoint	Description  
GET	/api/items	Get all items  
POST	/api/items	Add a new item  
GET	/api/items/:id	Get item by ID  
PUT	/api/items/:id	Update item by ID  
DELETE	/api/items/:id	Delete item by ID  
Deployment  
Frontend  
Build the Angular project:  

ng build --prod  
Serve the dist/ folder using Node.js or a hosting service like Firebase Hosting or Netlify.  
Backend  
Deploy the server directory to a hosting provider like Heroku,  AWS, or DigitalOcean. 
Contributing  
Fork the repository.  
**Create a feature branch:**  

git checkout -b feature-name  
Commit your changes:  

git commit -m "Description of changes"  
Push to the branch:  

git push origin feature-name  
Create a pull request.  

## Document Management System

Steps to run the project.  
**cd** into the project directory  
Create .env file in root directory.  
The content of the **.env** will look like this.  

    NODE_ENV=development
    PORT=8080
    JWT_SECRET=somesecret
    JWT_EXPIRATION_MINUTES=50
    MONGO_URI=respective connection string
    MONGO_URI_TESTS=respective connection string

> **npm install**

Run development mode.
> **npm run dev**


To run on production server

> **npm run start**

### Demo
Test email : dummy@gmail.com  
password : 12345asdf  
[Click here for demo](https://node-dms.herokuapp.com/)  
Note : Still some features are pending in UI, only the basic workflow has been developed.

### Docker 

> `docker build -t username/dms-api-app .`  
> `docker run -p 8080:8080 -d username/dms-api-app`  
> The app uses mongodb transactions, So to run the project, MongoDB replica set is mandatory. If you are not having, create one here([https://www.mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register)). To setup local environment, you can download restore the collection by clicking the following link [MongoDB Collections ](https://jeyraj-1994.gitbook.io/dms/)

 ### Entity Relationship Diagram and Other information
 
[Entity Relationship Diagram](https://jeyraj-1994.gitbook.io/dms/entity-diagram)  
    [Postman Documentation](https://documenter.getpostman.com/view/854460/T1LFmVH3)

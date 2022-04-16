# Films - API

### Database
The database management system used for this project is MongoDB.

### Run the project
### Prerequisites
    - [Install Node.js](https://nodejs.org/es/download/). Install version greater than or equal to 12.

### Instructions
1) Install the required dependencies running: ```npm i```
2) Create a .env file and save it in this directory.

    The keys being used are:
    - PORT: number of port that is going to be used to run the app when it is run locally. If not specified, "3000" is used.
    - DATABASE_CONNECTION_URI: it is the connection URI with which the app will connect to the database.

3) In order to run the app, there are two different ways:
    
    - ```npm run build && npm start```: build the app for production environment and run it locally. 
    - ```npm run dev```: run the app while you are developing (using nodemon to reload the server after saving changes)
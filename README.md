# Express Backend Application

This is an Express application.

## Getting Started

To get started with this application, follow the instructions below.

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- npm (comes with Node.js)
- [docker desktop](https://www.docker.com/products/docker-desktop/)
- [docker-compose](https://docs.docker.com/compose/install/)

### Environment Variables

Create a `.env` file in the root folder of the project with the following structure:
```bash
PORT=
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
```
Note: all variables starting with "DB" should match variables in the docker-compose.yml.
Make sure to specify the desired variables after the equal signs.

### Starting the Application

To start the application, run the following command in your terminal:

```bash
docker-compose up --build
npm start
```
This will start the Express server with nodemon and listen for incoming requests.

### Insert data
To insert data into the database, run insert_data.js file in /config folder.
```bash
cd config   # assuming you're in a root folder
node insert_data.js
```

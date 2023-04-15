
## Run Locally

Clone the project

```bash
git clone https://github.com/JeanCremonezzi/node-gamelib.git
```

Go to the project directory

```bash
cd node-gamelib
```

Install dependencies

```bash
npm install
```

Create a .env file in the root of your project and add the following environment variables

```js
  SERVER_PORT=
  CLIENT_ID=
  ACCESS_TOKEN=
  API_URL=https://api.igdb.com/v4

  DB_NAME=
  DB_USER=
  DB_PASS=
```

Install sequelize-cli
```bash
npm install -g sequelize-cli
```

Create the database
>***MySQL must be installed and running***
```bash
npm run db
```

Start the server

```bash
npm run dev
```


## Dev Dependencies

* Express
* Nodemon
* Dotenv
* Axios
* MySQL2
* Sequelize
* JWT
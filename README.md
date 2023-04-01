
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
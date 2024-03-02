# Articles Backend

## Description
Backend of the articles project developed with Nestjs and SQL Server.

### To Do:
- [x] Add database connection
- [x] Add articles controller
- [x] Add users controller
- [X] Add authentication
- [X] Add Swagger
- [ ] Improve configuration
- [ ] ~~Return max 70 characters for the content to reduce respose size?~~
- [ ] Improve error messages

## Run the project

This project can work independetly but you can check this other [frontend project](https://github.com/jonathangomz/articles) that implements this API.

- Clone the repository

```bash
git clone https://github.com/jonathangomz/articles-api.git

cd articles-api
```

- Install dependencies

```bash
npm install
```

- Create you `.env.local` file in the root directory with the next properties (you can copy and paste and modify the values):
```
DB_SERVER=<sql_database_server>
DB_PORT=<sql_database_port>
DB_USERNAME=<sql_database_username>
DB_PASSWORD=<sql_database_password>
DB_DATABASE=<sql_database_name>
SECRET=<jwt_secret>
EXPIRATION_TIME=<jwt_expiration_time_1h>
SALT_OR_ROUNDS=<jwt_number_of_salt_or_rounds>
```

- Run

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Jonathan Gomez Perez](https://jonathangomz.github.io)
- GitHub - [@jonathangomz](https://github.com/jonathangomz)

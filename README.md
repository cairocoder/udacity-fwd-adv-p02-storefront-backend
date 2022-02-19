# Storefront Backend Project

## Usage

### Install all dependencies

```bash
npm install
```

### .env file with variables

```bash
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=store_dev
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
ENV=dev
BCRYPT_PASSWORD=myPassword
SALT_ROUNDS=11
TOKEN_SECRET=mySecret
```

### Use below script to compile the project:

```bash
npm run build
```

### Install database docker"

```bash
docker-compose -f "docker-compose.yml" up -d --build
```

Run project in dev mode

```bash
npm run watch
```

Run project in prod mode

```bash
npm run start
```

Run Tests

```bash
npm run test
```

Lint and prettier

```bash
npm run lint
```

```bash
npm run prettier
```

### Database details

For development and Testing
HOST: 127.0.0.1
PORT: 5432
USER: postgres
PASSWD: postgres
DB Name: store_dev (dev)
DB Name: store_test (prod)

## Endpoints

### Orders:

```bash
/api/v1/orders
/api/v1/orders/:id
/api/v1/orders/user/:userID
/api/v1/orders
/api/v1/orders/:orderID/products
```

### Products:

```bash
/api/v1/products
/api/v1/products/:id
```

### Users:

```bash
/api/v1/users/admin
/api/v1/users
/api/v1/users/:id
/api/v1/users/login
```

# Storefront API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. Storefront backend project aim to build RESTful APIs that will meet company requirements.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

### Users

-   Index [token required]
    (http://localhost:5000/api/v1/users) GET and Authorization Header including token
-   Show [args: id] (token required)
    (http://localhost:5000/api/v1/users/:id) GET and Authorization Header including token
-   Create [args: User](token required)
    (http://localhost:5000/api/v1/users) POST with body including {user_name,first_name,last_name,password} and Authorization Header including token
-   Create [args: Admin] (token not required)
    (http://localhost:5000/api/v1/users/admin) POST with body including {user_name,first_name,last_name,password} for admin account no token required

### Products

-   Index
    (http://localhost:5000/api/v1/products) GET
-   Show (args: product id)
    (http://localhost:5000/api/v1/products/:id) GET
-   Create [args: Product](token required)
    (http://localhost:5000/api/v1/products) with body including {name, price} and Authorization Header including token

### Orders

-   Create [args: user_id, order_status](token required)
    (http://localhost:5000/api/v1/orders) POST with body including { user_id, order_status}
-   AddProduct [args: product_id, quantity](token required)
    (http://localhost:5000/api/v1/orders/:orderID/products) POST with body including { product_id, quantity}
-   Index [token required] to display list of all orders
    (http://localhost:5000/api/v1/orders) GET method with Authorization Header including token
-   Show [args: id](token required)
    (http://localhost:5000/api/v1/orders/:id) GET and Authorization Header including token
-   Current Order by user [args: user id](token required)
    (http://localhost:5000/api/v1/orders/:userID) GET and Authorization Header including token

## Data Shapes

![database schema](https://res.cloudinary.com/arizk76/image/upload/v1642267913/store_front_bgdwci.jpg)

### Product

-   id
-   name
-   price

### User

-   id
-   user_name
-   first_name
-   last_name
-   password

### Order

-   id
-   user_id
-   order_status

### OrderProducts

-   id
-   quantity
-   order_id
-   product_id

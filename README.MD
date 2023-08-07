
#### Setup Basic Express Server

-  import express and assign to variable
-  setup start port variable (5000) and start function

#### Connect To DB

-  get connection string
-  setup .env with MONGO_URL variable and assign the value
-  import 'dotenv' and setup package
-  import connect() and invoke
-  restart the server

#### Basic Routes and Middleware

-  setup express.json() middleware
-  setup 404 and errorHandler middleware
-  import 'exress-async-errors' package

#### Morgan Pacakge
- [Morgan Package](https://www.npmjs.com/package/morgan)

#### Validator Package

- [Validator](https://www.npmjs.com/package/validator)

#### JWT
-  require 'jsonwebtoken' package
-  create jwt - jwt.sign(payload,secret,options)
-  verify jwt - jwt.verify(token,secret)
-  add variables in .env JWT_SECRET=jwtSecret and JWT_LIFETIME=1d

#### Create Docs

-  Export Postman Collection
-  install docgen.exe from https://github.com/thedevsaddam/docgen/releases
-  docgen.exe build -i E-Commerce-API.postman_collection.json -o ./public/index.html



# E-Commerce-API



<!--- If we have only one group/collection, then no need for the "ungrouped" heading -->



## Endpoints

* [auth](#auth)
    1. [Register](#1-register)
    1. [Login](#2-login)
    1. [Logout](#3-logout)
* [Users](#users)
    1. [getAllUsers](#1-getallusers)
    1. [getSingleUser](#2-getsingleuser)
    1. [showCurrentUser](#3-showcurrentuser)
    1. [updateUserPassword](#4-updateuserpassword)
    1. [updateUser](#5-updateuser)
* [Product](#product)
    1. [Get All Product](#1-get-all-product)
    1. [uploadImage](#2-uploadimage)
    1. [Get Single Product](#3-get-single-product)
    1. [getSingleProductReviews](#4-getsingleproductreviews)
    1. [create product](#5-create-product)
    1. [Delete Product](#6-delete-product)
    1. [update product](#7-update-product)
* [Reviews](#reviews)
    1. [getAllReivews](#1-getallreivews)
    1. [get single review](#2-get-single-review)
    1. [update review](#3-update-review)
    1. [delete review](#4-delete-review)
    1. [create review](#5-create-review)
* [Orders](#orders)
    1. [create order](#1-create-order)
    1. [getAllOrders](#2-getallorders)
    1. [getSingleOrders](#3-getsingleorders)
    1. [update order](#4-update-order)
    1. [show current user Orders](#5-show-current-user-orders)
* [Ungrouped](#ungrouped)
    1. [Home](#1-home)

--------



## auth



### 1. Register



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: http://localhost:5000/api/v1/auth/register
```



***Body:***

```js        
{
    "name" : "User",
    "email" : "username@gmail.com",
    "password": "secret"
} 
```



### 2. Login



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: http://localhost:5000/api/v1/auth/login
```



***Body:***

```js        
{
    "email" : "username@gmail.com",
    "password": "secret"
}
```



### 3. Logout



***Endpoint:***

```bash
Method: POST
Type: 
URL: http://localhost:5000/api/v1/auth/logout
```



## Users



### 1. getAllUsers



***Endpoint:  admin access required*** 

```bash
Method: GET
Type: 
URL: http://localhost:5000/api/v1/users
```



### 2. getSingleUser



***Endpoint:***

```bash
Method: GET
Type: 
URL: http://localhost:5000/api/v1/users/64d07326bdebcf5684906fe3
```



### 3. showCurrentUser



***Endpoint:***

```bash
Method: GET
Type: 
URL: http://localhost:5000/api/v1/users/showMe
```


### 4. updateUserPassword

***Endpoint:***

```bash
Method: PATCH
Type: RAW
URL: http://localhost:5000/api/v1/users/updateUserPassword/
```



***Body:***

```js        
{
    "oldPassword":"secret2",
    "newPassword":"secret"
}
```



### 5. updateUser



***Endpoint:***

```bash
Method: PATCH
Type: RAW
URL: http://localhost:5000/api/v1/users/updateUser/
```



***Body:***

```js        
{
    "name": "Updated User",
    "email": "username@gmail.com"
}
```



## Product



### 1. Get All Product



***Endpoint:***

```bash
Method: GET
Type: 
URL: http://localhost:5000/api/v1/products
```



### 2. uploadImage

***Endpoint: admin access required***

```bash
Method: POST
Type: FORMDATA
URL: http://localhost:5000/api/v1/products/uploadImage
```



***Body:***

| Key | Value | Description |
| --- | ------|-------------|
| image |  |  |



### 3. Get Single Product



***Endpoint:***

```bash
Method: GET
Type: 
URL: http://localhost:5000/api/v1/products/64ce51018fbf23e5f00df41b
```



### 4. getSingleProductReviews



***Endpoint:***

```bash
Method: GET
Type: 
URL: http://localhost:5000/api/v1/products/64ce51018fbf23e5f00df41b/reviews
```



### 5. create product



***Endpoint: admin access required***

```bash
Method: POST
Type: RAW
URL: http://localhost:5000/api/v1/products
```



***Body:***

```js        
{
    "name": "emperor bed prafull",
    "price": 23999,
    "image": "https://dl.airtable.com/.attachmentThumbnails/0446e84c5bca9643de3452a61b2d6195/1b32f48b",
    "colors": ["#0000ff", "#000"],
    "company": "ikea",
    "description": "Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge",
    "category": "bedroom"
}
```



### 6. Delete Product

***Endpoint: admin access required***

```bash
Method: DELETE
Type: 
URL: http://localhost:5000/api/v1/products/64ce51018fbf23e5f00df41b
```



### 7. update product
***Endpoint: admin access required***

```bash
Method: PATCH
Type: RAW
URL: http://localhost:5000/api/v1/products/64c90c0b3bec66409e65ad1a
```



## Reviews

### 1. getAllReivews

***Endpoint:***

```bash
Method: GET
Type: 
URL: http://localhost:5000/api/v1/reviews/
```



### 2. get single review



***Endpoint:***

```bash
Method: GET
Type: 
URL: http://localhost:5000/api/v1/reviews/64cef515029dc265fa3cd8e0
```



### 3. update review



***Endpoint:***

```bash
Method: PATCH
Type: RAW
URL: http://localhost:5000/api/v1/reviews/64cb36741a60530f42169abc
```



***Body:***

```js        
{
    "rating": 1,
    "title": "Product6 prafullepili",
    "comment": "Good Product"
}
```



### 4. delete review



***Endpoint:***

```bash
Method: DELETE
Type: 
URL: http://localhost:5000/api/v1/reviews/64cb342642e221fd23ff6ddb
```



### 5. create review



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: http://localhost:5000/api/v1/reviews/
```



***Body:***

```js        
{
    "product": "64ce51018fbf23e5f00df41b",
    "comment": "Very good product by User",
    "title": "Updated User reviwed",
    "rating": 5
}
```



## Orders



### 1. create order



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: http://localhost:5000/api/v1/orders
```



***Body:***

```js        
{
    "tax": 399,
    "shippingFee": 499,
    "items": [
        {
            "name": "accent chair",
            "price": 2599,
            "image": "https://dl.airtable.com/.attachmentThumbnails/e8bc3791196535af65f40e36993b9e1f/438bd160",
            "amount": 34,
            "product": "64ce51018fbf23e5f00df41b"
        }
    ]
}

```



### 2. getAllOrders



***Endpoint:***

```bash
Method: GET
Type: 
URL: http://localhost:5000/api/v1/orders
```



### 3. getSingleOrders



***Endpoint:***

```bash
Method: GET
Type: 
URL: http://localhost:5000/api/v1/orders/64d0749fbdebcf5684907007
```



### 4. update order



***Endpoint:***

```bash
Method: PATCH
Type: RAW
URL: http://localhost:5000/api/v1/orders/64d0749fbdebcf5684907007
```



***Body:***

```js        
{
    "paymentIntentId" : "kdjfkjd"
}
```



### 5. show current user Orders



***Endpoint:***

```bash
Method: GET
Type: 
URL: http://localhost:5000/api/v1/orders/showAllMyOrders
```



## Ungrouped



### 1. Home



***Endpoint:***

```bash
Method: GET
Type: 
URL: localhost:5000
```



---
[Back to top](#e-commerce-api)

>Generated at 2023-08-07 10:18:53 by [docgen](https://github.com/thedevsaddam/docgen)

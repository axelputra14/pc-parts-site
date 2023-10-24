# Branded Items Axel

CMS Integration - Server

# Branded Items API Documentation

## Endpoints :

List of available endpoints:

- `POST /register`

- `POST /login`
- `POST /login/google`

- `GET /products`
- `POST /products`
- `PATCH /products/:id`
- `PUT /products/:id`

- `GET /categories`
- `POST /categories`

- `GET /histories`

- `POST /pub/login`
- `POST /pub/register`

- `GET /pub/product`

- `GET /pub/wishlist`
- `POST /pub/wishlist/:id`

&nbsp;

## 1. POST /register

Description:

- Register user to database

Request:

- body:

```json
{
  "email": "string",
  "password": "string",
  "role": "string",
  "phoneNumber": "string",
  "address": "string"
}
```

_Response (201 - Created)_

```json
{
  "message": "User registered successfully",
  "id": "integer",
  "email": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email cannot be empty"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "Email has already been registered"
}
OR
{
  "message": "Password cannot be empty"
}
```

&nbsp;

## 2. POST /login

Description:

- Login user to database

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string",
  "id": "integer",
  "email": "string",
  "role": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Invalid email or password"
}
OR
{
  "message": "Field cannot be empty"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

## 3. POST /login/google

Description:

- Register user to database using Google

Request:

- body:

```json
{
  "email": "string",
  "password": "string",
  "role": "string",
  "phoneNumber": "string",
  "address": "string"
}
```

_Response (200 - OK)_

```json
{
  "message": "Success register using google"
  "data": { user }
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is already registered. Use another email"
}
```

&nbsp;

## 4. GET /products

Description:

- Get all products from database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
  {
    "id": 1,
    "name": "Dark Power 13 1000W",
    "description": "Dark Power 13 is the most progressive power supply series be quiet! has ever built. An unrivaled efficiency of up to 95.8% earns the PSU its 80 PLUS Titanium certification. This makes the Dark Power 13 series a paragon of efficiency.",
    "price": 289,
    "stock": 36,
    "imgUrl": "https://www.bequiet.com/admin/ImageServer.php?ID=88e39a44933@be-quiet.net&omitPreview=true&width=140",
    "categoryId": 1,
    "authorId": 1
  },
  {
    "id": 2,
    "name": "Straight Power 12 850W",
    "description": "With 80 PLUS Platinum certification, premium technology such as full bridge LLC and high-quality Japanese capacitors Straight Power 12 is the reliable pick for powerful systems of today and the ones to come. ",
    "price": 209,
    "stock": 12,
    "imgUrl": "https://www.bequiet.com/admin/ImageServer.php?ID=8c1f6a47534@be-quiet.net&omitPreview=true&width=140",
    "categoryId": 1,
    "authorId": 1
  }
  ...,
]
```

&nbsp;

## 5. POST /products

Description:

- Post a product to database and record the action to History

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "name": "string",
  "description": "string",
  "price": "integer",
  "stock": "integer",
  "imgUrl": "string",
  "categoryId": "integer",
  "authorId": "integer"
}
```

_Response (201 - OK)_

```json for product
[
    "message": "Product added successfully",
    "data": {
        "name": "Dark Power 13 1000W",
        "description": "Dark Power 13 is the most progressive power supply series be quiet! has ever built. An unrivaled efficiency of up to 95.8% earns the PSU its 80 PLUS Titanium certification. This makes the Dark Power 13 series a paragon of efficiency.",
        "price": 289,
        "stock": 36,
        "imgUrl": "https://www.bequiet.com/admin/ImageServer.php?ID=88e39a44933@be-quiet.net&omitPreview=true&width=140",
        "status": "Active",
        "categoryId": 1,
        "authorId": 1
    }
]
```

```json for history
{
  "title": "POST",
  "description": "New entity with id 31 created",
  "updatedBy": 1
}
```

&nbsp;

## 6. PATCH /products/:id

Description:

- Update selected product's status and record the action to history

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

- body:

```json
{
  "status": "string"
}
```

_Response (200 - OK)_

```json
{
  "message": "Successfully updated"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Product not found"
}
```

```json for history
{
  "title": "PATCH",
  "description": "Entity status with id 3 has been updated from Active to Archived",
  "updatedBy": 1
}
```

&nbsp;

## 7. PUT /products/:id

Description:

- Update selected product's status and record the action to history

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

- body:

```json
{
  "name": "string",
  "description": "string",
  "price": "integer",
  "stock": "integer",
  "imgUrl": "string",
  "categoryId": "integer",
  "authorId": "integer"
}
```

- extraData:

```json
{
  "userId": "integer"
}
```

_Response (200 - OK)_

```json
{
  "message": "Successfully updated"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Product not found"
}
```

```json for history
{
  "title": "PUT",
  "description": "Entity with id 5 updated",
  "updatedBy": 1
}
```

&nbsp;

## 8. GET /categories

Description:

- Get all categories from database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
  {
    "id": 1,
    "name": "Power Supply"
  },
  {
    "id": 2,
    "name": "PC Case"
  }
  ...,
]
```

&nbsp;

## 9. POST /categories

Description:

- Post a category to database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "name": "string"
}
```

_Response (201 - OK)_

```json for product
[
    "message": "Category added successfully",
    "data": {
        "name": "Extension cable",
    }
]
```

&nbsp;

## 10. GET /histories

Description:

- Get all histories from database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
    "message": "Success get history",
    "data": [
        {
            "title": "PUT",
            "description": "Entity with id 5 updated",
            "updatedBy": "1"
        },
    ...
    ]
]
```

&nbsp;

## 11. POST /pub/login

Description:

- Login customer

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string",
  "id": "integer",
  "email": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Invalid email or password"
}
OR
{
  "message": "Field cannot be empty"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

&nbsp;

## 12. POST /pub/register

Description:

- Register customer to database

Request:

- body:

```json
{
  "email": "string",
  "password": "string",
  "phoneNumber": "string",
  "address": "string"
}
```

_Response (201 - Created)_

```json
{
  "message": "User registered successfully",
  "id": "integer",
  "email": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email cannot be empty"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "Email has already been registered"
}
OR
{
  "message": "Password cannot be empty"
}
```

&nbsp;

## 13. GET /pub/product

Description:

- Get product from customer's side

Request:

- query: search, page

```
  Example
  ${baseUrl}/pub/product?search=searchquery&page=2

```

_Response (200 - OK)_

```json
[
  {
    "id": 1,
    "name": "Dark Power 13 1000W",
    "description": "Dark Power 13 is the most progressive power supply series be quiet! has ever built. An unrivaled efficiency of up to 95.8% earns the PSU its 80 PLUS Titanium certification. This makes the Dark Power 13 series a paragon of efficiency.",
    "price": 289,
    "stock": 36,
    "imgUrl": "https://www.bequiet.com/admin/ImageServer.php?ID=88e39a44933@be-quiet.net&omitPreview=true&width=140",
    "categoryId": 1,
    "authorId": 1
  },
  {
    "id": 2,
    "name": "Straight Power 12 850W",
    "description": "With 80 PLUS Platinum certification, premium technology such as full bridge LLC and high-quality Japanese capacitors Straight Power 12 is the reliable pick for powerful systems of today and the ones to come. ",
    "price": 209,
    "stock": 12,
    "imgUrl": "https://www.bequiet.com/admin/ImageServer.php?ID=8c1f6a47534@be-quiet.net&omitPreview=true&width=140",
    "categoryId": 1,
    "authorId": 1
  }
  ...,
]
```

&nbsp;

## 14. GET /pub/product/:id

Description:

- Get product detail from customer side

_Response (200 - OK)_

```json
{
  "id": 8,
  "name": "Straight Power 12 850W",
  "description": "With 80 PLUS Platinum certification, premium technology such as full bridge LLC and high-quality Japanese capacitors Straight Power 12 is the reliable pick for powerful systems of today and the ones to come.",
  "price": 209,
  "stock": 12,
  "imgUrl": "https://www.bequiet.com/admin/ImageServer.php?ID=8415aa47535@be-quiet.net&omitPreview=true&width=600",
  "status": "Active",
  "categoryId": 1,
  "authorId": 1,
  "createdAt": "2023-09-19T14:48:37.924Z",
  "updatedAt": "2023-09-19T14:48:37.924Z",
  "Category": {
    "id": 1,
    "name": "Power Supplies",
    "createdAt": "2023-09-19T10:42:54.659Z",
    "updatedAt": "2023-09-19T10:42:54.659Z"
  }
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Product not found"
}
```

&nbsp;

## 15. GET /pub/wishlist

Description:

- Get customer's wishlist

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
  {
    "id": 1,
    "CustomerId": 2,
    "ProductId": 8,
    "createdAt": "2023-09-19T15:57:46.739Z",
    "updatedAt": "2023-09-19T15:57:46.739Z",
    "Product": {
      "id": 8,
      "name": "Straight Power 12 850W",
      "description": "With 80 PLUS Platinum certification, premium technology such as full bridge LLC and high-quality Japanese capacitors Straight Power 12 is the reliable pick for powerful systems of today and the ones to come.",
      "price": 209,
      "stock": 12,
      "imgUrl": "https://www.bequiet.com/admin/ImageServer.php?ID=8415aa47535@be-quiet.net&omitPreview=true&width=600",
      "status": "Active",
      "categoryId": 1,
      "authorId": 1,
      "createdAt": "2023-09-19T14:48:37.924Z",
      "updatedAt": "2023-09-19T14:48:37.924Z"
    }
  },
  ...
]
```

&nbsp;

## 16. POST /pub/wishlist/:id

Description:

- Add a product to customer's wishlist

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (201 - Created)_

```json
{
  "message": "Added to wishlist successfully",
  "ProductId": "integer",
  "CustomerId": "integer"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Product not found"
}
```

&nbsp;

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token, login first"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```

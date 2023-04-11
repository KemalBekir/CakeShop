# CakeShop
Welcome to CakeShop. Web application for a boutique cake shop where you can order one of our standart cakes or you can order a custom one.
We offer cakes for all kinds of occasions(birthday, weddings, engagements, hen and stag do).

## Tech

- ReactJS - https://reactjs.org/
- React-router-dom v6 - https://reactrouter.com/docs/en/v6/getting-started/overview
- node.js - https://nodejs.org/en/t
- Express - https://expressjs.com/
- Mongoose - https://mongoosejs.com/
- bcrypt - https://www.npmjs.com/package/bcryptjs
- cors - https://www.npmjs.com/package/cors
- jsonwebtoken - https://jwt.io/
- socket.io - https://socket.io/
- formik https://formik.org/
- yup https://github.com/jquense/yup
- react-toastify https://www.npmjs.com/package/react-toastify

## Installation

Install the dependencies and devDependencies and start the server.

```sh
cd server
npm i
npm start
```
Install the dependencies in client and start.
```sh
cd client
npm i
npm start
```

## REST_API Endpoints:
>baseUrl: http://localhost:5000

#### Login
Login by sending a **POST** request with email and password to /users/login. The service will respond with an object, containing a standard string token, that can be used for requests.

#### Register
Create a new user by sending a **POST** request to /users/register with properties username, email, password and tel as an optional property. The service automatically creates a session and returns an authorization token, that can be used for requests.

#### Logout
Send an authorized **GET** request to /users/logout. The service returns an empty response - if you attempt to parse it as JSON, you will receive an error! You can check for this type of response by looking at the status (204 instead of 200) and the content-type header (will not be present).

#### Authorized Requests
To make an authorized request, add the following header, where {token} is the access token, returned by the service upon successful login or registration:
>X-Authorization: {token}

#### Get User Details
Send an authorized **GET** request to /users/profile. The service will return the record of the user, associated with the passed-in session token.

#### Update User Details
*This request requires authorization and content-type headers. Only the owner of the resource can edit it.*
Send an authorized **PUT** request to /users/profile. 
>Content-Type: application/json
>
>X-Authorization: {token}
>
>[Request body]
---

#### Get Chat
*This request requires authorization and content-type headers. Only the owner of the resource can edit it.*
Send an authorized **GET** request to /message/:chatId
>Content-Type: application/json
>
>X-Authorization: {token}
>
>[Request body]
---

#### Post Chat
*This request requires authorization and content-type headers. Only the owner of the resource can edit it.*
Send an authorized **POST** request to /message/:chatId
>Content-Type: application/json
>
>X-Authorization: {token}
>
>[Request body]
- Send POST request to /message/:chatId to create a new message. If chat with this **ID** does not exist, it will be created. Request body must contain, content, chatId, token.

## CRUD

#### Read
An end point is revealed at /catalog, which grants access to information, stored on the service. GET requests to the service will return the following responses:

- **GET** /catalog/ - array of all entries in the collection; will return 404 if collection does not exist
- **GET** /catalog/top5 - array of latest 5 entries in the collection
- **GET** /catalog/deals - array of all cakes that are on offer
- **GET** /catalog/search - array of cakes by name or type  

#### Create
Only available for Admin user.

*This request requires authorization and content-type headers*
>Content-Type: application/json
>
>X-Authorization: {token}
>
>[Request body]
- Send POST request to /catalog/ to create new entry. Request body must contain, name, description, price, type, imgOne, imgTwo, imgThree, imgFour, onOffer, discount. ID will be generated automatically and will be included in the returned object. If the collection does not exist, it will be created.

#### Update 
Only available for Admin user.

*This request requires authorization and content-type headers. Only the owner of the resource can edit it.*
>Content-Type: application/json
>
>X-Authorization: {token}
>
>[Request body]
- Send PUT request to /catalog/:id to update a single entry. Note that the existing entry will be replaced!

#### Delete
Only available for Admin user.

*This request requires authorization headers. Only the owner of the resource can delete it.*
>Content-Type: application/json
>
>X-Authorization: {token}
>
>[Request body]
- Send DELETE request to /catalog/:id to delete a single entry.

## Screenshots

### CakeShop Web App

|         | Desktop |         |
| -------- | -------- | -------- |
| [![CakeShop Desktop 1](https://github.com/KemalBekir/CakeShop/raw/main/Screenshots/Desktop/1.jpg)](https://github.com/KemalBekir/CakeShop/blob/main/Screenshots/Desktop/1.jpg) | [![CakeShop Desktop 2](https://github.com/KemalBekir/CakeShop/raw/main/Screenshots/Desktop/2.jpg)](https://github.com/KemalBekir/CakeShop/blob/main/Screenshots/Desktop/2.jpg) | [![CakeShop Desktop 3](https://github.com/KemalBekir/CakeShop/raw/main/Screenshots/Desktop/3.jpg)](https://github.com/KemalBekir/CakeShop/blob/main/Screenshots/Desktop/3.jpg) |
| [![CakeShop Desktop 4](https://github.com/KemalBekir/CakeShop/raw/main/Screenshots/Desktop/4.jpg)](https://github.com/KemalBekir/CakeShop/blob/main/Screenshots/Desktop/4.jpg) | [![CakeShop Desktop 5](https://github.com/KemalBekir/CakeShop/raw/main/Screenshots/Desktop/5.jpg)](https://github.com/KemalBekir/CakeShop/blob/main/Screenshots/Desktop/5.jpg) | [![CakeShop Desktop 6](https://github.com/KemalBekir/CakeShop/raw/main/Screenshots/Desktop/6.jpg)](https://github.com/KemalBekir/CakeShop/blob/main/Screenshots/Desktop/6.jpg) |
| [![CakeShop Desktop 7](https://github.com/KemalBekir/CakeShop/raw/main/Screenshots/Desktop/7.jpg)](https://github.com/KemalBekir/CakeShop/blob/main/Screenshots/Desktop/7.jpg) | [![CakeShop Desktop 8](https://github.com/KemalBekir/CakeShop/raw/main/Screenshots/Desktop/8.jpg)](https://github.com/KemalBekir/CakeShop/blob/main/Screenshots/Desktop/8.jpg) | [![CakeShop Desktop 9](https://github.com/KemalBekir/CakeShop/raw/main/Screenshots/Desktop/9.jpg)](https://github.com/KemalBekir/CakeShop/blob/main/Screenshots/Desktop/9.jpg) |
| [![CakeShop Desktop 10](https://github.com/KemalBekir/CakeShop/raw/main/Screenshots/Desktop/10.jpg)](https://github.com/KemalBekir/CakeShop/blob/main/Screenshots/Desktop/10.jpg) | [![CakeShop Desktop 11](https://github.com/KemalBekir/CakeShop/raw/main/Screenshots/Desktop/11.jpg)](https://github.com/KemalBekir/CakeShop/blob/main/Screenshots/Desktop/11.jpg) | |

#### Tablet

|          |          |          |
|----------|----------|----------|
| [![Image 1](https://github.com/KemalBekir/CakeShop/blob/main/Screenshots/Tablet/1.jpg)](https://github.com/KemalBekir/CakeShop/blob/main/Screenshots/Tablet/1.jpg) | [![Image 2](https://github.com/KemalBekir/CakeShop/blob/main/Screenshots/Tablet/2.jpeg)](https://github.com/KemalBekir/CakeShop/blob/main/Screenshots/Tablet/2.jpeg) | [![Image 3](https://github.com/KemalBekir/CakeShop/blob/main/Screenshots/Tablet/3.jpeg)](https://github.com/KemalBekir/CakeShop/blob/main/Screenshots/Tablet/3.jpeg) |
| [![Image 4](https://github.com/KemalBekir/CakeShop/blob/main/Screenshots/Tablet/4.jpeg)](https://github.com/KemalBekir/CakeShop/blob/main/Screenshots/Tablet/4.jpeg) | [![Image 5](https://github.com/KemalBekir/CakeShop/blob/main/Screenshots/Tablet/5.jpeg)](https://github.com/KemalBekir/CakeShop/blob/main/Screenshots/Tablet/5.jpeg) | [![Image 6](https://github.com/KemalBekir/CakeShop/blob/main/Screenshots/Tablet/6.jpeg)](https://github.com/KemalBekir/CakeShop/blob/main/Screenshots/Tablet/6.jpeg) |
| [![Image 7](https://github.com/KemalBekir/CakeShop/blob/main/Screenshots/Tablet/7.jpeg)](https://github.com/KemalBekir/CakeShop/blob/main/Screenshots/Tablet/7.jpeg) | [![Image 8](https://github.com/KemalBekir/CakeShop/blob/main/Screenshots/Tablet/8.jpeg)](https://github.com/KemalBekir/CakeShop/blob/main/Screenshots/Tablet/8.jpeg) | [![Image 9](https://github.com/KemalBekir/CakeShop/blob/main/Screenshots/Tablet/9.jpeg)](https://github.com/KemalBekir/CakeShop/blob/main/Screenshots/Tablet/9.jpeg) |

#### Mobile

|        |        |        |
|--------|--------|--------|
| [![mobile1](https://github.com/KemalBekir/CakeShop/raw/main/Screenshots/Mobile/1.jpeg)](https://github.com/KemalBekir/CakeShop/blob/main/Screenshots/Mobile/1.jpeg) | [![mobile2](https://github.com/KemalBekir/CakeShop/raw/main/Screenshots/Mobile/2.jpeg)](https://github.com/KemalBekir/CakeShop/blob/main/Screenshots/Mobile/2.jpeg) | [![mobile3](https://github.com/KemalBekir/CakeShop/raw/main/Screenshots/Mobile/3.jpeg)](https://github.com/KemalBekir/CakeShop/blob/main/Screenshots/Mobile/3.jpeg) |
| [![mobile4](https://github.com/KemalBekir/CakeShop/raw/main/Screenshots/Mobile/4.jpeg)](https://github.com/KemalBekir/CakeShop/blob/main/Screenshots/Mobile/4.jpeg) | [![mobile5](https://github.com/KemalBekir/CakeShop/raw/main/Screenshots/Mobile/5.jpeg)](https://github.com/KemalBekir/CakeShop/blob/main/Screenshots/Mobile/5.jpeg) | [![mobile6](https://github.com/KemalBekir/CakeShop/raw/main/Screenshots/Mobile/6.jpeg)](https://github.com/KemalBekir/CakeShop/blob/main/Screenshots/Mobile/6.jpeg) |
| [![mobile7](https://github.com/KemalBekir/CakeShop/raw/main/Screenshots/Mobile/7.jpeg)](https://github.com/KemalBekir/CakeShop/blob/main/Screenshots/Mobile/7.jpeg) | [![mobile8](https://github.com/KemalBekir/CakeShop/raw/main/Screenshots/Mobile/8.jpeg)](https://github.com/KemalBekir/CakeShop/blob/main/Screenshots/Mobile/8.jpeg) | |



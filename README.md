# E-Commerce API by HTMLephants

An E-Commerce API with user authentication, and product & purchase resources. Some actions such as update/delete are restricted to owners of those resources. Comment resources are also available as subdocuments for products.

## Important Links

- [Hosted Website Front-End](https://sei-htmlephants.github.io/react-ecommerce-client)
- [Front-End Repo](https://github.com/sei-htmlephants/react-ecommerce-client)
- [Heroku Hosted API](https://thawing-beach-03969.herokuapp.com/)
- [Sample cURL Scripts](./sample_curl.md)

## Development Plan

This project was planned using Jira. MVP user stories were established and given story points. We completed stories in daily sprints using Scrum.

Each team-member worked off git feature branches, and pushed to the dev branch on feature completion. Changes were reviewed and pulled up to the main branch before deployment.

The data is stored in a document database (MongoDB) due to it's relative simplicity. The back-end routes and schemas are viewable here.

## User Stories

- A user should be able to login/signup
- A user should be able to purchase a product.
- A user should be able to see all their purchases.
- A user should be able to update/delete their purchases.
- An admin should be able to create a product.
- An admin should be able to update/delete products.

## Technologies Used

### Front-End

- React
- HTML/CSS/Javascript
- Bootstrap

### Back-End

- Node.js
- Express
- MongoDB
- Mongoose
- MongoDB Atlas
- Heroku

## Future Development

- User image upload forum with likes
- Product image uploads with `multer`
- Comments/Ratings on products
- Comments on purchases (for customer support)

## Entity Relationship Diagram

[Planning ERD and Wireframe](https://imgur.com/a/sqmwFmF)

### Routes

| Request | URL             | Function                  |
|---------|-----------------|---------------------------|
| GET     | /purchases      | Index of all purchases    |
| GET     | /purchases-user | Index of user's purchases |
| GET     | /purchases/:id  | Show one purchase         |
| POST    | /purchases      | Create purchase           |
| PATCH   | /purchases/:id  | Update purchase           |
| DELETE  | /purchases/:id  | Delete purchase           |

| Request | URL             | Function                  |
|---------|-----------------|---------------------------|
| GET     | /products/      | Index of all products     |
| GET     | /products/:id   | Show one product          |
| POST    | /products/      | Create product            |
| PATCH   | /products/:id   | Update product            |
| DELETE  | /products/:id   | Delete product            |

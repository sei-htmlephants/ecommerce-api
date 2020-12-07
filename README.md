<h1 style="text-align: center;">E-Commerce HTMLephants</h1>

An E-Commerce API with user authentication, product & purchase documents and authenticated access to updating/deleting products and purchase.

## Important Links

- [Hosted Website Front-End](https://sei-htmlephants.github.io/react-ecommerce-client)
- [Front-End Repo](https://github.com/sei-htmlephants/react-ecommerce-client)
- [Heroku Hosted API](https://thawing-beach-03969.herokuapp.com/)

## Development Plan

// edit here 

Jira, scrum, github, agile
collaborative programming projects. 

The data is stored in a document database (MongoDB). GraphQL relationships and SQL table joins were not needed, therefore prioritizing developer experience was paramount and for that reason MongoDB was chosen. 

Issue documents have subdocuments called comments. Anyone can attach a subdocument to anyone else's issue. Issue documents also have special 'enums' called tags. These are a limited set of strings that catagorize issues. These are used to create the Kanban board view on the front end. 

Only owners of issues and comments can edit or delete their respective creations. 

## Routes

- /GET purchases
- /POST purchases
- /DELETE purchases/:id
- /PATCH purchases/:id

- /GET products 
- /POST products
- /DELETE products/:id
- /PATCH products/:id

- /POST sign-up
- /POST sign-in
- /PATCH change-password
- /DELETE sign-out

## User Stories

- A user should be able to login/signup
- A user should be able to purchase a product. 
- A user should be able to see all their purchases. 
- A admin user should be able to add images/code to a comment.
- A admin user should be able to create a product.  

## Technologies Used

#### Front-End

- React
- HTML/CSS/Javascript
- Bootstrap

#### Back-End

- Node.js
- Express
- MongoDB
- Mongoose
- MongoDB Atlas

## Future Development

- Setting reminders
- Assigning Users
- User Roles
- Allowing certain users to tag any issue
- Elegant UI for editing comments

## Entity Relationship Diagram

[Planning ERD and Wireframe](https://imgur.com/a/sqmwFmF)

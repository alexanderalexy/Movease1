NOTE: to copy this readme structure simply click on `Raw` on the top right of this gist. There you have the content in the basic [Markdown syntax](https://www.markdownguide.org/basic-syntax/) used in readme files. Then paste it on a README.md file in your repository and fill the information. Always do this directly from VS code, not from github. DON'T ADD THIS NOTE TO YOUR README. Also make sure to remove any notes from this template.

# movease

## [See the App!](https://movease.adaptable.app)

![App Logo](./public/images/movease_logo.svg)

## Description

**NOTE -** A film recommendation app with which you can search for recommendations of A Movies based on a variety of search criteria.

## How to use the app as User

 **NOTE -** As a User: First create a account or log in if you already have one. You can then search for film recommendations on the Search page according to different preferences. As search results you will now receive film recommendations based on your preferences. Have fun watching.

 ## How to use the app as Admin
As an admin, you can also add, update and remove films to the database via the navigation.
 **NOTE -** As admin you

## User Stories


- **404** - Shows up when a page doesn't exists.
- **500** - Shows up when it is not an User error.
- **homepage** - As a user, you have the option of logging in or creating an account on the homepage. In addition, we tell you what it's about in the Hero Headline. After successful login, the user is automatically forwarded to the search page.
- **sign up** - A user can create an account here.
- **login** - A user can login to the app.
- **logout** - Logout from account.
- **search page** - Here, the user can search for film recommendations based on a large number of predefined parameters. You will be redirected to the recommendation page automatically.
- **recommondation page** - Here the user is shown the film recommendations based on his search results.
- **Only for admins, add-movie page** - The admins can add new movies to the recommendation database here.
- **Only for admins, update-movie page** - The admins can update films in the recommendation database or make changes here.
- **Only for admins, delete-movie page** - The admins can delete movies with their Id from the database.

## To do

**NOTE -** Add navigation after login on recommendation page and homepage -> better ux. In order to avoid the resulting problems as a user, you can use the browser's arrow keys (back) to navigate back to search from the recommendation page. If you are logged in to the homepage, you can return to the search page by deleting the cookie or by entering /search in the browser.

**NOTE -** Hide update movie link for users.

**NOTE -** Drop-down menu for set times of movies. E.g. >= 90 mins, >=120 mins

**NOTE -** Genre search drop down menu.

**NOTE -** Make movie not found on recommondation red.

**NOTE -** Center the search button.

## Backlog Functionalities

**NOTE -** API for dynamic links to streaming-services and a short movie preview.

**NOTE -** Secure password conditions.

**NOTE -** Completly responsive design.

## Technologies used

**NOTE -** HTML, CSS, Javascript, Node, Express, Handlebars, Sessions & Cookies, Cloudinary, Adaptable.


## (Optional) Routes

**NOTE -** List here all the routes of your server. Example:

- GET / 
  - renders the homepage
- GET /auth/signup
  - redirects to / if user logged in
  - renders the signup form (with flash msg)
- POST /auth/signup
  - redirects to / if user logged in
  - body:
    - username
    - email
    - password
- GET /auth/login
  - redirects to / if user logged in
  - renders the login form (with flash msg)
- POST /auth/login
  - redirects to / if user logged in
  - body:
    - username
    - password




## Models

**NOTE -** List here all the models & Schemas of your Database Structure. Example: 

User model
 
```
   username: {
      type: String,
      trim: true,
      required: false,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    passwordHash: {
      type: String,
      required: true
    }
```

Movie model

```
      image: String,
      title: String,
      director: String,
      actors: [String],
      genre: String,
      description: String,
      length: Number,
``` 

## Links

## Collaborators

[Developer 1 Jazz](www.github-url.com)

[Developer 2 Alexander](https://github.com/alexanderalexy)

### Project

[Repository Link](https://github.com/alexanderalexy/Movease1)

[Deploy Link](https://movease.adaptable.app)

### Trello

[Link to your trello board](https://trello.com/b/RnrSrOSo/ironhack-project-2)

### Slides

[Slides Link](www.your-slides-url-here.com)


NOTE: to copy this readme structure simply click on `Raw` on the top right of this gist. There you have the content in the basic [Markdown syntax](https://www.markdownguide.org/basic-syntax/) used in readme files. Then paste it on a README.md file in your repository and fill the information. Always do this directly from VS code, not from github. DON'T ADD THIS NOTE TO YOUR README. Also make sure to remove any notes from this template.

# movease

## [See the App!](https://movease.adaptable.app)

![App Logo](./public/images/movease_logo.svg)

## Description

**NOTE -** A film recommendation app with which you can search for recommendations based on a variety of search criteria.
 
## User Stories

**NOTE -**  List here all the actions a user can do in the app. Example:

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault 
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **homepage** - As a user I want to be able to access the homepage so that I see what the app is about and login and signup
- **sign up** - As a user I want to sign up on the webpage so that I can see all the events that I could attend
- **login** - As a user I want to be able to log in on the webpage so that I can get back to my account
- **logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account
- **events list** - As a user I want to see all the events available so that I can choose which ones I want to attend
- **events create** - As a user I want to create an event so that I can invite others to attend

## Backlog Functionalities

**NOTE -** API for dynamic links to streaming-services and a short movie preview.

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

- GET /events
  - renders the event list + the create form
- POST /events/create 
  - redirects to / if user is anonymous
  - body: 
    - name
    - date
    - location
    - description


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


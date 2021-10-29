# Client Side

HabTrac is a habit tracking website, where users can record and monitor habits that they want to develop from various devices. Users can add there own habits and complete these daily. Users can also see the number of consecutive days theat they have completed these habits via their streaks.

This README will guide you through how to setup the client side of the application and our experiences during this project.

![image](https://) (Images of client side)
![image](https://) (Images of client side)
![image](https://) (Images of client side)

The repo for the server side of the application can be found [here](https://github.com/Rachiey/habit-tracker-server). 
The server deployment can be accessed [here](https://staging--habtrac.netlify.app/).
The client website can be viewed [here](https://habtrac.netlify.app/).

## Installation & Usage

### Installation

1. Clone or download the repository.
2. Run `npm install` to install the dependencies.

### Usage

* run `open index.html` in mac or `start index.html` on windows to open the file in your browser

## Technologies

* Heroku for deploying the server side
* HTML, CSS and JavaScript
* MongoDB for the database
* jwt and bcrypt for auth and auth
* Supertest library to test HTTP requests
* VSCode, which was our code editor
* Github for version control
* Slack for collaboration and communication between team members

## Process

* We started by creating two different repositories for both the client and server.
* Created an initial file structure for both repositories
* Inside each of these repositories we created a Kanban board with all the tasks required.
* Initially we started working together on the docker compose yaml files, as well as creating the basic server side functionality
* Then we started working on separate tasks including the styling, the client side JS and creating the RESTful routes (CRUD)
* Then we added JS to the client side to fetch data from our server and generate habits on our website.
* Finished by adding styling to the client side to improve the user interface.

## Wins & Challenges

### Wins

* Worked seamlessly as a team
* Website successfully deployed on Netlify.
* Server successfully deployed on Heroku.
* Managed to get a coverage of more than XXX%.
* Implemented authentication and authorisation.
* Routes and HTTP requests provided us with the output we intended.
* Successfully managed to produce a site which met all of the basic requirements.

### Challenges

* Experienced a few merge conflicts and Git issues when pulling from the repo. The solution was to apply the Driver and Navigator approach when a specific task was being worked on by more than one team member.

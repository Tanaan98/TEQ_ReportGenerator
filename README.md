# Comments Over Code (COC)

## Project Description

Video - https://youtu.be/_3ffxWs3D2w

This is a CSCC01 project for the University of Toronto Scarborough 2018 fall term. The application is used to help TEQ employees
gather data from other different companies to track and analyze clients and their needs. We have chosen to write the application in javascript for its flexibility when working remotely or with other organizations.

## Project instructions
- using our current web version
1. Go to https://icarereportgenerator.surge.sh.
2. Log in with corresponding account information described below.
- hosting the application locally

Prerequisites: node, npm
1. Open command prompt.
2. Clone this project into your local directory:
    "git clone https://github.com/CSCC01/Team18.git"
3. Go to the project/my-app subdirectory.
4. Use npm to install the app:
    "npm install"
5. Use npm to start the app:
    "npm start"
6. Go to "http://localhost:3000/" in your browser. This application was primarily tested in Google Chrome.

## Logging into the application
We have set up two accounts that you can use to log into the application with.

For the admin account that is able to view and modify data from the database directly, log in with the username "test@mail.com" and the password "testtest".

For the account that can only upload, log in with the username "uploadonly@mail.com" and the password "testtest".

## Managing the database

We use Google Firebase (https://console.firebase.google.com/) to host our data.
To manage data in Firebase, use the following account:

gmail: available upon request

password: available upon request

To view data through Google Firebase,
1. Select the project (in this case, cscc01coc).
2. In the "Develop" tab on the left, select "Database".
3. Select "Real-time Database".
4. Select the database labelled cscc01coc to expand it.

The data references are listed here. You can further expand each data reference to view its data.

(For a visual example of how to use data references to access and modify the data, please see the video listed at the beginning of the readme.)

## Unit/integration test instructions
1. Open command prompt.
2. Go to the project/my-app subdirectory.
3. Run "npm test".

The unit testing files are those that end with .test.js. For example, the unit test file for filterdata.js is filterdata.test.js.

## Features in Application
##### Upload and store data:
You can upload an xlsx or csv file (that follows a template in the system) and push it into the database. Once a file has been uploaded, we can name the file and push the data so that it is stored in the database.

The following features are only available if you are using the admin account (test@mail.com):

##### Retrieve Data:
We can get information from our database so that we can see the information that is stored, given the name of the file.

##### Modify Data:
We can edit database values on site when given all required fields.

##### Generate Report:
We can generate a report that summarizes the data by its fields and dates.

## Members of Team 18
Nathan Chau | Jikai Long | Tanaan Karunakaran | Chenkai Lin | Hugh Ding

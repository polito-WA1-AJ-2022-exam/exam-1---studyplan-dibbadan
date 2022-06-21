# Exam #12345: "Exam Title"
## Student: s303470 DI BATTISTA DANIELE 

## React Client Application Routes

- Route `/`: Home Page. Here the anonymous client will se the list of all courses offered by the University. The logged in user, if its plan exist, sees the plan at the top, with two buttons ( one to edit the plan and another one to completely delete the plan) and at the bottom the list of courses. If the user is logged in and the pland doesn't exist, he/she sees a button to create a new plan and the list of courses.
- Route `/login`: Login Page
- Route `/create`: Route which indicates the process of creation for the Study Plan. User will see the number of credits at the top ( min, max, actual ). Here user finds the list of courses with the possibility to Add and Remove a course from the Study Plan. If all conditions are satisfied, the 'Save' button will be enabled.
- Route `/edit`: Route which indicates the process of modifying an exstisting Study Plan. Same as for create.

## API Server

- POST `/api/login`
  - request parameters and request body content
  - response body content
- GET `/courses`
  - request parameters will contain only user information
  - response body will contain the list of all courses
- PUT `/enroll/:code`
  - request parameters will contain the Code of the course and the user information
  - response body will contain the string 'Enrolled!' if the request was succesfully otherwise it will contain 'Something was wrong!'
- POST `/init` 
  - request parameters will contain only user information. Request body will contain the selected option.
  - Response body will contain 'Empty Study Plan created!' if status code is 201, otherwise 'You are not authenticated!' if status code is 401 or 'Something was wrong!' for anything else.
- GET `/init` 
  - Request parameters will contain only user information.
  - Response body will contain the option if status code is 200, otherwise 'You are not authenticated!' if status code is 401 or 'Something was wrong!' for anything else.
- GET `/studyPlan` 
  - Request parameters will contain only user information.
  - Response body will contain the Study Plan if status code is 200, otherwise 'You are not authenticated!' if status code is 401 or 'Something was wrong!' for anything else.
- POST `/newStudyPlan` 
  - Request parameters will contain the Study Plan and user information.
  - Response body will contain the 'Study plan has been created!' if status code is 201, 'You are not authenticated!' if status code is 401, 'Study Plan is not valid! Cannot be created!' if status code is 422 or 'Something was wrong!' for anything else.
- DELETE `/destroy` 
  - Request parameters will contain the Study Plan to delete and user information.
  - Response body will contain the 'Destroyed!' if status code is 200, 'You are not authenticated!' if status code is 401, or 'Something was wrong!' for anything else.
   

## Database Tables

- Table `USERS` - contains id ( integer, primary key ), email (text), name (text), hash (integer), salt (integer)
- Table `OPTION` - contains type ( text ), userID ( integer, primary key ), min ( integer ), max ( integer )
- Table `COURSES` - contains Code ( text, primary key ), Name (text), Credits (integer), Max_Students (integer), Incompatible_Courses (text), Preparatory_Course (text), Enrolled_In ( integer )
- Table `STUDY_PLAN` - contains userID (integer, primary key), courseCode (text, primary key)

## Main React Components

- `App` (in `App.js`): This component defines all the routes for the web application. It also manages the authentication procedure using a 'loggedIn' state, plus another state for the 'courses' and also one which indicates if the user has a studyPlan 'hasStudyPlan'.
- `AddForm` (in `AddForm.js`): This component is responsible to manage the creation and/or edit of a Study Plan. The main functionalities consist in adding/removing courses to the Study Plan while checking if all requirements are satisfied. If all requirements are satisifed ( the plan is correct ), user can save the plan in a persistent way. 
- `CoursesList` (in `CoursesList.js`): This component is responsible to render all the courses in the context of the creation/edit process of the Study Plan. It highlights selected courses using a green color and, when the user try to add a course which doesn't respect the constraints it marks it with a red color and an icon which shows a tooltip with the error message.
- `CreatePlan` (in `CreatePlan.js`): This component is rendered as the first action of the creation process. Here, the user can select one option between Full-Time and Part-Time ( if he/she doesn't select it before ). If the option is selected, the AddForm component takes place.

(only _main_ components, minor ones may be skipped)

## Screenshot

![Screenshot](./img/screenshot.jpg)

## Users Credentials

- lucas@polito.com, password
- jacob@polito.com, password
- hannah@polito.com, password

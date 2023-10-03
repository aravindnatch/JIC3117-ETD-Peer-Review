# Effective Team Dynamics (ETD) Peer Review Tool

![ETD Logo](http://dl.dropboxusercontent.com/scl/fi/mlcqqendtjfn7rqznpv32/ETD.jpg?rlkey=stc8m9l9podusjd8djk8igu3d&dl=0)

The ETD Peer Review tool allows instructors to distribute peer evaluations to their students and view and evaluate the results of the completed peer evaluations. The ETD tool also allows students to evaluate their teammates by conducting these peer evaluations given out by their instructors. Therefore, ETD can make viewing and grading students' peer evaluations easier for course instructors, letting instructors efficiently assess the teams' well-being, while teaching students how to evaluate their peers through carefully formatted evaluations with instructions.

# Release Notes

## Version 0.2.0

### New Features

* A working Login page that can be typed in, accepting login info and storing them for sign-ups, and logging the users in if they put in the correct credentials.
* The Login page is working for both Instructors and Students.
* Instructors can create new groups and set names for the groups on the Instructor's page.

### Bug Fixes

* The login page is no longer there for demonstration, it is functioning.
* The "Add Team" button on the Instructor's page is not for show, it can add new teams.

### Known Issues

* The student form is not the actual ETD peer evaluation form we will use in our tool.
* The student cannot save an incomplete peer review and come back to it later.

## Version 0.1.0

### New Features

* A login page with Student Login and Instructor Login. Both "Login" buttons can lead users to corresponding pages.
* A Peer Evaluation Form where the student can choose teammates' names from the top and give point evaluation and explanations to each teammate. After the evaluation is done for all teammates, the student can choose "Submit & Logout" from the top right to go back to the login page. The Peer Evaluation Form can be accessed through "Student Login."
* A Teams page where the instructor can see the completion rate for a team and choose a team to view details. The Teams page can be accessed through "Instructor Login."
* A team details page where the instructor can choose a team member from a drop-down menu and see the specific responses the team member received.

### Bug Fixes

N/A

### Known Issues

* The login page is not taking user inputs and is not connected to the backend database as of now.

### Run Locally

```bash
# clone the repository
git clone https://github.com/aravindnatch/team-dynamics.git

# install the dependencies
npm install

# start the development server
npm run dev
```

# Effective Team Dynamics (ETD) Peer Review Tool

![ETD Logo](http://dl.dropboxusercontent.com/scl/fi/mlcqqendtjfn7rqznpv32/ETD.jpg?rlkey=stc8m9l9podusjd8djk8igu3d&dl=0)

The ETD Peer Review tool allows instructors to distribute peer evaluations to their students and view and evaluate the results of the completed peer evaluations. The ETD tool also allows students to evaluate their teammates by conducting these peer evaluations given out by their instructors. Therefore, ETD can make viewing and grading students' peer evaluations easier for course instructors, letting instructors efficiently assess the teams' well-being, while teaching students how to evaluate their peers through carefully formatted evaluations with instructions.

# Release Notes

## Version 1.0.0

### New Features

* The Student side is connected to the Instructor side.
* Students can access assigned peer evaluations once get added to the course.
* Students can complete peer evaluations.
* Student completion of peer evaluation gets recorded on the Instructor side.
* Instructors can generate a report for each student containing the student's responses to others and from others in the team.

### Bug Fixes

* The Instructor side and the Student side are now connected.
* Instructors can now generate reports for students.

### Known Issues

* Report of team "health score" is not here.

## Version 0.4.0

### New Features

* Instructors can delete students from a course.
* Instructors can add students to a team.
* Changed database structure for the above functionalities.
* Have a main peer evaluation page skeleton for students.

### Bug Fixes

* Students can navigate the skeleton peer evaluation form.
* Students can give scores and comments for each member of their team in the skeleton peer evaluation form.
* Students can complete the skeleton peer evaluation form.

### Known Issues

* The Instructor side and the Student side are not connected (for instructors' custom evaluation forms).
* Instructors cannot generate a report for a peer evaluation they gave out.

## Version 0.3.0

### New Features

* Instructors can create question sets - groups of questions to be used across courses.
* Instructors are able to edit the question sets.
* Instructors are able to view course information.
* Instructors can create teams in a course.
* Instructors are able to add students to a course.
* The tool is able to generate invitation codes for students to use if they are not automatically added to a course.
* Instructors can see a table view of the students.
* Made UI changes to the tool.

### Bug Fixes

* The instructors are able to create new teams in a course, as opposed to the previous version.
* The instructors can create question sets to use across courses, which is a new function added to the previous version.

### Known Issues

* The students cannot complete forms.
* The students cannot save and leave a form to come back later.
* The students cannot see the completed forms for all their teams across courses.

## Version 0.2.0

### New Features

* A working Login page that can bring the user to the GT login page and create a new account if the user is a first-time user.
* The Login page can remember the users who have created an account.
* The Login page is working for both Instructors and Students.
* Instructors can create new courses and set course names on the Instructor's page.
* The added courses will be remembered for the user (Instructor).

### Bug Fixes

* The Login page is no longer there for demonstration, it is functioning.
* The Login page is connected to the GT login.
* The instructors can add new courses to their accounts.

### Known Issues

* The instructors cannot create new groups for each class.
* The instructors cannot create evaluation forms for each class.

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

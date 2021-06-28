class App {
    constructor() {
        this.mainElement = document.createElement('div')
        this.currentStudent = students[0]; //DontUse
        this.currentSubject = subjects[0];
        this.currentVideo = 'video._id';
        this.currentVideoId = '7CqJlxBYj-M'
        this.currentPage = 'Login'
        this.currentUser = administrators[0]
        this.userPermission = this.currentUser.permissions

        //Modal variables
        this.showAddVideoModal = false;
        this.showWatchVideoModal = false;
        this.showAddLectureModal = false;
        this.showAddStudentModal = false;
        this.showAddGradeModal = false;
        this.showAddCourseModal = false;
        this.showAddSubjectsModal = false;
        this.showAddUserModal = false;
        this.showAddAssignmentModal = false;
        this.rubricMode = false;

        //AddStudentModal
        this.modalCurrentLecture;
        this.modalCurrentSemester = 1;
        this.rubricSelectedIndex = 0;
        this.modalCurrentStudent = students[0];
        this.modalCurrentSemesterId = semesters[0]._id;
        this.addStudentModalRubric = rubrics[0];

        //AddGradesModal
        this.currentStudentGrades = [];

        //Update dom
        this.update();
    }
}

App.prototype.update = function () {
    if (this.currentPage == 'Subjects') {
        renderSubjectsPage(this)
    } else if (this.currentPage == 'AdminAccounts') {
        renderAdminAccountsPage(this)
    } else if (this.currentPage == 'AdminSubjects') {
        renderAdminSubjectsPage(this)
    } else if (this.currentPage == 'Home') {
        renderHomePage(this)
    } else if (this.currentPage == 'Login') {
        renderLogin(this)
    } else {
        this.html = 'Page not found'
    }
    
    this.mainElement.innerHTML = this.html
    root.append(this.mainElement);
    startSlides(this);
}

let app = new App();
//validateUser()
setInterval(() => nextSlide(), 10000)

axios.get(`/videos`)
.then(res => {
    videos = res.data
    //console.log(res.data)
    app.update()
})
.catch(err => console.log(err))

function getInitialData() {
    return new Promise(resolve => {
        let header = { headers: {"Authorization" : `Bearer ${app.token}`}}
        axios.defaults.headers.common['Authorization'] = `Bearer ${app.token}`;
        app.authHeader = header
        axios.all([
            axios.get('/lectures/'),
            axios.get('/subjects/'),
            axios.get('/students/'),
            axios.get('/teachers/'),
            axios.get('/administrators/'),
        ])
        .then(res => {
            lectures = res[0].data
            subjects = res[1].data
            students = res[2].data
            teachers = res[3].data
            administrators = res[4].data
            resolve()
        })
        .catch(err => console.log(err))
    })
    
}




  /*********************************************/
 /**************** Render Page ****************/
/*********************************************/

function renderHomePage(state) {
    state.html = `
    ${Navbar(state)}
    ${WelcomeTitle(state)}
    ${Videos(state)}
    ${Courses(state)}
    ${StudentAssignments(state)}
`
}

function renderSubjectsPage(state) {
    state.html = `
    ${Navbar(state)}
    ${Title(state)}
    ${Videos(state)}
    ${Lectures(state)}
    ${Assignments(state)}
    ${SubjectStudents(state)}
    `
}

function renderAdminAccountsPage(state) {
    state.html = `
    ${Navbar(state)}
    ${AdminAccountsTitle(state)}
    ${AdminStudents(state)}
    ${AdminTeachers(state)}
    ${AddUsersModal(state)}
    `
}

function renderAdminSubjectsPage(state) {
    state.html = `
    ${Navbar(state)}
    ${AdminSubjectsTitle(state)}
    ${AdminSubjects(state)}
    ${AddSubjectsModal(state)}
    `
}

function renderLogin(state) {
    state.html = `
    ${Navbar(state)}
    ${LoginTitle(state)}
    ${Login(state)}
    ${LoginVideosTitle(state)}
    ${Videos(state)}
    `
}




function Courses(state) {
    if (state.userPermission != 'S') return ' '
    this.html = 
    `
    <section id="courses-section">
        <div class="container">
            <div class="section-title"><h3>Courses</h3></div>
            <div class="section-body">
                <div class="table-header">
                    <div class="header-info">
                        <div class="table-name">Course Name</div>
                        <div class="table-username"></div>
                    </div>
                    <div class="options" style="display: none;"></div>
                </div>
                ${getMyCourses(state)}
            </div>
            <button onclick="toggleAddCourseModal()" class="btn"><i class="fas fa-plus"></i></button>
        </div>
    </section>

    ${AddCourseModal(state)}
    `

    return this.html
}

function toggleAddCourseModal() {
    app.showAddCourseModal = !app.showAddCourseModal
    app.update();
}

function getMyCourses(state){
    let ids = state.currentUser.subjects;

    let elements = [];

    subjects.forEach(subject => {
        if (ids.includes(`${subject._id}`)) {
            elements.push(
                `
                <div class="course table-body-item">
                <div class="table-info">
                    <div class="table-name">${subject.name}</div>
                    <div class="table-username">${getAverageGrade(state)}</div>
                </div>
                <div class="options">
                    <div class="edit-button"></div>
                    <div onclick="removeCourse('${subject._id}')" class="delete-button"><i class="far fa-trash-alt"></i></div>
                </div>
                </div>
                `
            )
        }
    })

    return elements.join('')
}



function getAverageGrade(state){
    return '';
}

function removeCourse(subjectId) {
    app.currentUser.subjects = app.currentUser.subjects.filter(id => {
        return id != subjectId;
    })

    subject = subjects.find(subject => subject._id == subjectId);
    subject.enrolledStudents = subject.enrolledStudents.filter(id => id =! app.currentStudent._id);

    
    axios.post(` /subjects/update/${subject._id}`,
        subject)
        .then(res => {
            console.log(res.data)
    })

    axios.post(` /students/update/${app.currentUser._id}`,
        app.currentUser)
        .then(res => {
            console.log(res.data)
    })
    

    app.update();
}
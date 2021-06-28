function AddCourseModal(state) {
    this.html =
    `
    <section id="add-student-modal" tabindex="0" onfocus="toggleAddCourseModal()" class="modal ${state.showAddCourseModal ? '' : 'hide'}">
        <div class="container">
            <div tabindex="0" class="add-student-modal">
                <div class="table-header">Enrolled Courses</div>
                <div class="enrolled-courses">
                    ${getEnrolledCourses(state)}
                </div>
                <div class="table-header">Available Courses</div>
                <div class="available-courses">
                    ${getAllCourses(state)}
                </div>
            </div>
            
        </div>
    </section>
    `

    return this.html
}

function getEnrolledCourses(state) {
    let ids = state.currentUser.subjects;
    let elements = [];

    subjects.forEach(subject => {
        if (ids.includes(`${subject._id}`)) {
            elements.push(
                `
                <div class="course table-body-item">
                <div class="table-info">
                    <div class="table-name">${subject.name}</div>
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

function getAllCourses(state) {
    let ids = state.currentUser.subjects;

    let elements = [];

    subjects.forEach(subject => {
        if (ids.includes(subject._id)) return //Already enrolled
            elements.push(
                `
                <div class="course table-body-item">
                <div class="table-info">
                    <div class="table-name">${subject.name}</div>
                </div>
                <div class="options">
                    <div class="edit-button"></div>
                    <div onclick="enrollCourse('${subject._id}')" class="enroll-button slide-button"></i></div>
                </div>
                </div>
                `
            )
    })

    return elements.join('')
}

function enrollCourse(subjectId) {
    
    let student = app.currentUser;
    student.subjects.push(`${subjectId}`)
    
    subject = subjects.find(subject => subject._id == subjectId)
    console.log('the subject', subject.enrolledStudents)
    subject.enrolledStudents.push(`${app.currentUser._id}`)


    axios.post(`http://localhost:5000/subjects/update/${subject._id}`,
    subject)
    .then(res => {
        console.log(res.data)
    })

    axios.post(`http://localhost:5000/students/update/${app.currentUser._id}`,
    app.currentUser)
    .then(res => {
        console.log(res.data)
    })


    app.update();
}


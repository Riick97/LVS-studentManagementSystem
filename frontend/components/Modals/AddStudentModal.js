function AddStudentModal(state) {
    this.html = 
    `
    <section id="add-student-modal" tabindex="0" onfocus="toggleAddStudentModal()" class="modal ${state.showAddStudentModal ? '' : 'hide'}" >
        <div class="container hide">
            <div class="add-student-modal" tabindex="0">
                <div class="table-header">Enrolled Students</div>
                <div class="enrolled-courses">
                    ${getEnrolledStudentNames(state)}
                </div>
                <div class="table-header">All Students</div>
                <div class="available-courses">
                    ${getAllStudentNames(state)}
                </div>
            </div>
            
        </div>
    </section>
    `

    return this.html
}

function getEnrolledStudentNames(state) {
    let ids = state.currentSubject.enrolledStudents;
    let attendingStudents = []

    students.forEach(student => {
        if (ids.includes(`${student._id}`)) {
            attendingStudents.push(student);
        }
    })


    let elements = [];
    attendingStudents.forEach(student => {
        elements.push(
            `
            <div class="course table-body-item">
                <div class="table-info">
                    <div class="table-name">${student.name} ${student.lastName}</div>
                </div>
                <div class="options">
                    <div class="edit-button"></div>
                    <div onclick="removeEnrolledStudent('${student._id}')" class="delete-button"><i class="far fa-trash-alt"></i></div>
                </div>
            </div>
            `)
    })
    return elements.join('')
}

function getAllStudentNames(state) {
    let ids = state.currentSubject.enrolledStudents;
    let elements = []
    students.forEach(student => {
        if (ids.includes(`${student._id}`)) return
        elements.push(
            `
            <div class="course table-body-item">
                <div class="table-info">
                    <div class="table-name">${student.name} ${student.lastName}</div>
                </div>
                <div class="options">
                    <div class="edit-button"></div>
                    <div onclick="enrollStudent('${student._id}')" class="enroll-button slide-button"></div>
                </div>
            </div>
            `
        )
    })
    return elements.join('')
}

function enrollStudent(studentId) {
    app.currentSubject.enrolledStudents.push(`${studentId}`);

    let student = students.find(student => student._id == studentId)
    student.subjects.push(app.currentSubject._id)

    axios.post(`http://localhost:5000/subjects/update/${app.currentSubject._id}`,
    app.currentSubject)
    .then(res => {
        console.log(res.data)
    })

    axios.post(`http://localhost:5000/students/update/${studentId}`,
    student)
    .then(res => {
        console.log(res.data)
    })

    app.update();
}
function SubjectStudents(state) {
    this.html = 
    `
    <section id="subject-students">
        <div class="container">
            <div class="section-title"><h3>Students</h3></div>
            <div class="students section-body">
                ${getSubjectStudents(state)}
            </div>
            <button class="btn"onclick="toggleAddStudentModal()"><i class="fas fa-plus"></i></button>
        </div>
    </section>

    ${AddStudentModal(state)}
    ${AddGradesModal(state)}
    `

    return this.html
}

function toggleAddStudentModal() {
    app.showAddStudentModal = !app.showAddStudentModal
    app.update();
}

function toggleAddGradeModal(studentId) {
    app.showAddGradeModal = !app.showAddGradeModal
    if (studentId == 0) { //isClosing
        app.update()
        return
    }

    let currentStudent;
    students.forEach(student => {
        if (student._id == studentId) {
            currentStudent = student;
            return;
        }
    })

    //Set currentStudent to app
    app.modalCurrentStudent = currentStudent;
    


    //get currentSemester
    let semesterPeriod = app.modalCurrentSemester;
    let currentSemester = currentStudent.semesters.find(semester => {
        return semester.period == semesterPeriod 
    })

    if (currentSemester) {
        let currentRubric = getCurrentRubric()
        app.addStudentModalRubric = currentRubric;
    } else {
        app.addStudentModalRubric = null
    }

    app.update();
}

function getCurrentRubric() {
    if (!app.rubricMode) return //Only if in rubricMode
    let select = document.querySelector('#changeRubricSelect')
    let rubricId = select.options[select.selectedIndex].value
    let semesterPeriod = app.modalCurrentSemester
    let student = app.modalCurrentStudent
    let currentRubric;

    //Get currentRubric from student
    student.semesters.forEach(semester => {
        let samePeriod = semester.period == semesterPeriod
        let sameSubject = semester.subject == app.currentSubject._id
        if (samePeriod && sameSubject) {
            semester.rubrics.forEach(rubric => {
                if (rubric._id == rubricId) {
                    currentRubric = rubric
                    return
                }
            })
        }
    })

    return currentRubric
}

function getSubjectStudents(state) {
    let ids = state.currentSubject.enrolledStudents
    let subjectStudents = []
    students.forEach(student => {
        if (ids.includes(`${student._id}`)) {
            subjectStudents.push(student);
        }
    })
    let elements = [];
    subjectStudents.forEach(student => {
        elements.push(
            `
            <div class="student">
            <div class="student-info">
                <div class="student-id">${student.studentId}</div>
                <div class="student-name">${student.name} ${student.lastName}</div>
                <div class="student-grade"></div>
            </div>
            <div class="options">
                <div onclick="toggleAddGradeModal('${student._id}')" class="edit-button"><i class="fas fa-ellipsis-v"></i></div>
                <div onclick="removeEnrolledStudent('${student._id}')" class="delete-button"><i class="far fa-trash-alt"></i></div>
            </div>
        </div>
            `)
    })

    if (subjectStudents.length == 0) {
        elements.push(
            `
            <div class="course table-body-item">
            <div class="table-info">
                <div class="table-name">
                    <h4>No Students</h4>
                    <p>Enroll student to the course</p> 
                </div>
            </div>
            <div class="options">
            </div>
        </div>
            `
        )
    }
    return elements.join('')
}

function removeEnrolledStudent(studentId) {
    console.log(studentId)
    app.currentSubject.enrolledStudents = app.currentSubject.enrolledStudents.filter(id => `${id}` != `${studentId}`)

    let student = students.find(student => student._id == studentId);
    student.subjects = student.subjects.filter(id => id != app.currentSubject._id);

    axios.post(` /subjects/update/${app.currentSubject._id}`,
        app.currentSubject)
        .then(res => {
            console.log(res.data)
    })

    axios.post(` /students/update/${student._id}`,
        student)
        .then(res => {
            console.log(res.data)
    })

    app.update();
}
function AdminSubjects(state) {
    this.html =
    `
    <section id="subject-students">
        <div class="container">
            <div class="section-title"><h3>Subjects</h3></div>
            <div class="subject-students">
                <div class="table-header">
                    <div class="header-info">
                        <div class="student-id">Subject Id</div>
                        <div class="student-name">Subject Name</div>
                         <div class="student-username">Teachers</div>
                    </div>
                    <div class="options"></div>
                </div>
                ${getAdminSubjects(state)}
            </div>
            <button onclick="toggleAddSubjectsModal()" class="btn"><i class="fas fa-plus"></i></button>
        </div>
    </section>
    `

    return this.html
}

function toggleAddSubjectsModal() {
    app.showAddSubjectsModal = !app.showAddSubjectsModal
    app.update();
}

function toggleEditSubject(subjectId) {
    if (app.showAddSubjectsModal == false) toggleAddSubjectsModal();
    let subject = subjects.find(subject => subject._id == subjectId);
    let name = document.querySelector("#subject-name")
    let description = document.querySelector("#subject-description")
    let checkbox = document.querySelector(".checkboxes")
    let teachers = checkbox.querySelectorAll("#teacher")

    let form = document.querySelector("#submit-subject-form")
    let submitButton = document.querySelector("#submit-subject")

    //console.log((subject.teachers).includes(242))
    let subjectTeachers = subject.teachers;


    teachers.forEach(teacher => {
        if (subjectTeachers.includes(teacher.value)) {
            teacher.checked = true
        } else {
            teacher.checked = false
        }
    })


    name.value = subject.name
    description.value = subject.description


    form.onsubmit = function() {saveEditSubject(subjectId)}

    submitButton.value = 'Save changes';
}

function getAdminSubjects(state) {
    let element = [];
    subjects.forEach(subject => {
        element.push(
            `
            <div class="student">
            <div class="student-info">
                <div class="student-id">${subject._id}</div>
                <div class="student-name">${subject.name}</div>
                <div class="student-username">${(subject.teachers).length}</div>
            </div>
            <div class="options">
                <div onclick="toggleEditSubject('${subject._id}')" class="edit-button"><i class="fas fa-ellipsis-v"></i></div>
                <div onclick="deleteSubject('${subject._id}')" class="delete-button"><i class="far fa-trash-alt"></i></div>
            </div>
            </div>
            `
        )
    });
    return element.join('');
}

function removeEnrolledSubject(subjectId) {
    app.currentStudent.subjects = app.currentStudent.subjects.filter(id => {
        return id != subjectId;
    })
    app.update();
}

function deleteSubject(subjectId) {
    subjects = subjects.filter(subject => subject._id != subjectId);

    axios.delete(`http://localhost:5000/subjects/${subjectId}`)
    .then(res => console.log(res.data))
    .catch(err => console.log(err))

    app.update();
}


function AdminStudents(state) {
    this.html = 
    `
    <section id="subject-students">
        <div class="container">
            <div class="section-title"><h3>Students</h3></div>
            <div class="subject-students">
                <div class="table-header">
                    <div class="header-info">
                        <div class="student-id">Student Id</div>
                        <div class="student-name">Full Name</div>
                         <div class="student-username">Permissions</div>
                    </div>
                    <div class="options"></div>

                </div>
                ${getStudents(state)}
            </div>
            <button onclick="toggleAddUserModal()" class="btn"><i class="fas fa-plus"></i></button>
        </div>
    </section>
    `

    return this.html
}



function getStudents(state) {
    let element = [];
    students.forEach(student => {
        element.push(
            `
            <div class="course table-body-item">
                <div class="table-info">
                    <div class="table-name">${student.studentId}</div>
                    <div class="table-name">${student.name} ${student.lastName}</div>
                    <div class="table-username">${student.permissions}</div>
                </div>
                <div class="options">
                    <div onclick="toggleEditUser('${student._id}')" class="edit-button"><i class="fas fa-ellipsis-v"></i></div>
                    <div onclick="deleteStudent('${student._id}')" class="delete-button"><i class="far fa-trash-alt"></i></div>
                </div>
            </div>
            `
        )
    });
    return element.join('');
}




function deleteStudent(studentId) {
    console.log(`delete ${studentId}`)
    students = students.filter(student => student._id != studentId);

    axios.delete(`http://localhost:5000/students/${studentId}`)
    .then(res => console.log(res.data))
    .catch(err => console.log(err))

    app.update();
}
function AdminTeachers(state) {
    this.html = 
    `
    <section id="subject-students">
        <div class="container">
            <div class="section-title"><h3>Teachers</h3></div>
            <div class="subject-students">
                <div class="table-header">
                    <div class="header-info">
                        <div class="student-id">Teacher Id</div>
                        <div class="student-name">Full Name</div>
                         <div class="student-username">Permissions</div>
                    </div>
                    <div class="options"></div>

                </div>
                ${getAdminTeachers(state)}
            </div>
            <button onclick="toggleAddUserModal()" class="btn"><i class="fas fa-plus"></i></button>
        </div>
    </section>
    `

    return this.html
}

function toggleEditTeacher(teacherId) {
    console.log(`edit ${teacherId}`)
    if (app.showAddUserModal == false) toggleAddUserModal();
}

function getAdminTeachers(state) {
    let element = [];
    teachers.forEach(teacher => {
        element.push(
            `
            <div class="course table-body-item">
                        <div class="table-info">
                            <div class="table-name">${teacher.teacherId}</div>
                            <div class="table-name">${teacher.name} ${teacher.lastName}</div>
                            <div class="table-username">${teacher.permissions}</div>
                        </div>
                        <div class="options">
                            <div onclick="toggleEditUser('${teacher._id}')" class="edit-button"><i class="fas fa-ellipsis-v"></i></div>
                            <div onclick="deleteTeacher('${teacher._id}')" class="delete-button"><i class="far fa-trash-alt"></i></div>
                        </div>
            </div>
            `
        )
    })
    return element.join('');
}

function deleteTeacher(teacherId) {
    console.log(`delete ${teacherId}`)
    teachers = teachers.filter(teacher => teacher._id != teacherId);

    axios.delete(` /teachers/${teacherId}`)
    .then(res => console.log(res.data))
    .catch(err => console.log(err))

    app.update();
}
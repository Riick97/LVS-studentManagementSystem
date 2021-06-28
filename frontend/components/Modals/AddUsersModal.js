function AddUsersModal(state) {
    this.html = 
    `
    <section id="add-user-modal" tabindex="0" onfocus="toggleAddUserModal()" class="modal ${state.showAddUserModal ? '' : 'hide'}">
        <div class="container">
            <div tabindex="0" class="add-grades-modal">
                <div class="table-sidebar">
                    <div class="modal-header">User Type:
                        <select name="" id="">
                            <option value="1">All</option>
                        </select>
                    </div> 
                </div>
                
                <div class="sub-section-right">
                    <div class="table-students">
                        <div class="table-header">
                            <div class="header-info">
                                <div class="table-name">Id</div>
                                <div class="table-name">Name</div>
                                <div class="table-username">Permissions</div>
                            </div>
                            <div class="options" style="display: none;"></div>
        
                        </div>
                        <div class="available-courses section-body">
                            ${getStudents(state)}
                            ${getAdminTeachers(state)}
                        </div>
                        <form id="submit-user-form" action="javascript:void(0);" method="POST" onsubmit="addUser(this)">
                        <div class="available-courses section-body bottom-body">
                            <div class="sub-body">
                                <div class="body-item">
                                    <h4>Id:</h4>
                                    <input minlength="3" type="text" name="" id="user-id">
                                </div>
                                <div class="body-item">
                                    <h4>Name:</h4>
                                    <input minlength="3" type="text" name="" id="user-name">
                                </div>
                                <div class="body-item">
                                    <h4>Last Name:</h4>
                                    <input minlength="3" type="text" name="" id="user-last-name">
                                </div>
                                <div class="body-item checkbox-item">
                                    <h4>Subjects:</h4>
                                    <div class="checkboxes">
                                        ${getUsersSubjects(state)}
                                    </div>
                                </div>
                            </div>
                            <div class="sub-body">
                                <div class="body-item">
                                    <h4>Username:</h4>
                                    <input minlength="3" type="text" name="" id="user-username">
                                </div>
                                <div class="body-item">
                                    <h4>Password:</h4>
                                    <input minlength="3" type="text" name="" id="user-password">
                                </div>
                                <div class="body-item">
                                    <h4>Permissions:</h4>
                                    <select name="" id="select-user-permission">
                                            <option value="N">N</option>
                                            <option value="S">S</option>
                                            <option value="T">T</option>
                                    </select>
                                </div>
                                <div class="body-item">
                                    <h4>Email:</h4>
                                    <input minlength="3" type="text" name="" id="user-email">
                                </div>
                                <div class="body-item">
                                    <h4>User Type:</h4>
                                    <select name="" id="select-user-type">
                                            <option value="none">None</option>
                                            <option value="student">Student</option>
                                            <option value="teacher">Teacher</option>
                                    </select>
                                </div>
                            </div> 
                        </div>
                        <div class="course table-body-item">
                            <input id="submit-user" type="submit" value="Create User">
                        </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    </section>

    `

    return this.html
}

function toggleAddUserModal() {
    app.showAddUserModal = !app.showAddUserModal
    app.update();
}

function getUsersSubjects(state) {
    let element = [];
    subjects.forEach(subject => {
        element.push(
            `
            <div style="display: flex; margin-bottom: .5rem">   
                <input type="checkbox" id="${subject._id}" name="subject" value="${subject._id}">
                <label for="subject">${subject.name}</label><br>
            </div>
            `
        )
    })
    return element.join('');
}

function addUser(form) {
    event.preventDefault();

    let userTypeSelect = document.getElementById("select-user-type")
    let userType = userTypeSelect.options[userTypeSelect.selectedIndex].value;
    if (userType == 'none') return
    

    let name = form.querySelector("#user-name").value
    let lastName = form.querySelector("#user-last-name").value
    let id = form.querySelector("#user-id").value
    let userName = form.querySelector("#user-username").value
    let email = form.querySelector("#user-email").value
    let password = form.querySelector("#user-password").value

    let permissionSelect = document.querySelector("#select-user-permission")
    let permission = permissionSelect.options[permissionSelect.selectedIndex].value

    let checkBoxInputs = document.querySelectorAll(".checkboxes")
    let subjects = [];
    checkBoxInputs.forEach(checkBox => {
        if (checkBox.checked == true) {
            subjects.push(checkBox.value);
        }
    })


    let newUser = {
        permissions: permission,
        email: email,
        username: userName,
        password: password,
        name: name,
        lastName: lastName,
        subjects: subjects,
        semesters: []
    }


    if (userType == 'student') {
        newUser.studentId = id

        console.log('Student: ', newUser)

        axios.post(' /students/add', newUser)
        .then(res => {
            data = res.data
            console.log(data)
            let studentId = data.slice(data.length - 24, data.length)

            newUser._id = studentId
            students.push(newUser);
            app.update();
        })
        .catch(err => console.log(err))

    } else {
        newUser.teacherId = id

        axios.post(' /teachers/add', newUser)
        .then(res => {
            data = res.data
            console.log(data)
            let teacherId = data.slice(data.length - 24, data.length)

            newUser._id = teacherId
            teachers.push(newUser);
            app.update();
        })
        .catch(err => console.log(err))

    }
    
}

function toggleEditUser(userId) {
    if (app.showAddUserModal == false) toggleAddUserModal();

    //Get currentuser
    function getUser() {
        student = students.find(user => user._id == userId)
        teacher = teachers.find(user => user._id == userId)
        if(student) return {user: student, type: 'student'}
        if(teacher) return {user: teacher, type: 'teacher'}
    }
    let user = getUser()
    let currentUser = user.user
    

    //Get empty input fields
    let name = document.querySelector("#user-name")
    let lastName = document.querySelector("#user-last-name")
    let id = document.querySelector("#user-id")
    let userName = document.querySelector("#user-username")
    let email = document.querySelector("#user-email")
    let password = document.querySelector("#user-password")
    let permissionSelect = document.querySelector("#select-user-permission")
    let userTypeSelect = document.querySelector("#select-user-type")
    let form = document.querySelector("#submit-user-form")
    let submitButton = document.querySelector("#submit-user")
    let checkBoxInputs = document.querySelectorAll(".checkboxes input")
    id.disabled = false

    //Fill checkboxes
    userSubjects = currentUser.subjects
    checkBoxInputs.forEach(subject => {
        if (userSubjects.includes(subject.value)) {
            subject.checked = true
        } else {
            subject.checked = false
        }
    })

    //Fill fields user info
    name.value = currentUser.name 
    lastName.value = currentUser.lastName 
    userName.value = currentUser.username
    email.value = currentUser.email 
    password.value = currentUser.password 

    //Fill field with studentId
    if (user.type == 'student') id.value = currentUser.studentId
    if (user.type == 'teacher') id.value = currentUser.teacherId

    //Set index for permissions
    Array.from(permissionSelect.options).forEach((option, i) => {
        if (option.value == currentUser.permissions) permissionSelect.selectedIndex = i
    })

    //Set index for userType
    Array.from(userTypeSelect.options).forEach((option, i) => {
        if (option.value == user.type) userTypeSelect.selectedIndex = i
    })


    //Change form behaviour to edit
    form.onsubmit = function() {saveEditUser(user)}
    submitButton.value = 'Save Changes'

}

function saveEditUser(user) {
    event.preventDefault();
    let currentUser = user.user

    //Get input values
    let name = document.querySelector("#user-name").value
    let lastName = document.querySelector("#user-last-name").value
    let id = document.querySelector("#user-id").value
    let userName = document.querySelector("#user-username").value
    let email = document.querySelector("#user-email").value
    let password = document.querySelector("#user-password").value
    let checkBoxInputs = document.querySelectorAll(".checkboxes input")

    //Get values from subjects
    newSubjects = [];
    checkBoxInputs.forEach(subject => {
        if (subject.checked == true) {
            newSubjects.push(subject.value)
        }
    })

    //Set new attributes for user
    currentUser.name = name;
    currentUser.lastName = lastName;
    currentUser.studentId = id;
    currentUser.username = userName;
    currentUser.email = email;
    currentUser.password = password;
    currentUser.subjects = newSubjects;

    //Update user in database
    if (user.type == 'student') {
        axios.post(` /students/update/${currentUser._id}`,
        currentUser)
        .then(res => {
            console.log(res.data)
        })
    }
    
    if (user.type == 'teacher') {
        updateTeacherDB(currentUser._id, currentUser)
        newSubjects.forEach(subject => {
            console.log(subject)
            if (subject.teachers.includes(`${currentUser._id}`)) return
            subject.teachers.push(`${currentUser._id}`)
        })
    }

    app.update()
}



function updateSubjectDB(subjectId, subject) {
    axios.post(` /subjects/update/${subjectId}`,
        subject)
        .then(res => {
            console.log(res.data)
        .catch(err => console.log(err))
    })
}

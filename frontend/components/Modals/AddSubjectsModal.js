function AddSubjectsModal(state) {
    this.html = 
    `
    <section id="add-subjects-modal" tabindex="0" onfocus="toggleAddSubjectsModal()" class="modal ${state.showAddSubjectsModal ? '' : 'hide'}">
        <div class="container">
            <div tabindex="0" class="add-subjects-modal">
                
                <div class="sub-section-right">
                    <div class="table-students">
                        <div class="table-header">
                            <div class="header-info">
                                <div class="table-name">Subject Id</div>
                                <div class="table-name">Subject</div>
                                <div class="table-username">Teachers</div>
                            </div>
                            <div class="options" style="display: none;"></div>
        
                        </div>
                        <div class="available-courses section-body">
                            ${getAdminSubjects(state)}
                        </div>
                        <form id="submit-subject-form" action="javascript:void(0);" method="POST" onsubmit="addSubject(this)">
                        <div class="available-courses section-body bottom-body">
                            <div class="sub-body">
                                <div class="body-item checkbox-item">
                                    <h4>Teachers:</h4>
                                    <div class="checkboxes">
                                        ${getTeachers(state)}
                                    </div>
                                </div>
                            </div>
                            <div class="sub-body">
                                <div class="body-item">
                                    <h4>Name:</h4>
                                    <input minlenth="3" type="text" name="" id="subject-name">
                                </div>
                                <div class="body-item" style="height: 6.5rem;">
                                    <h4>Description:</h4>
                                    <textarea name="" id="subject-description" cols="30" rows="30" style="margin-top: .5rem;"></textarea>
                                </div>
                            </div>
                        </div>
                        <div class="course table-body-item">
                            <input id="submit-subject" type="submit" value="Create Subject">
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

function getTeachers(state) {
    let element = [];
    teachers.forEach(teacher => {
        element.push(
            `
            <div style="display: flex; margin-bottom: .5rem">   
                <input type="checkbox" id="teacher" name="teacher" value="${teacher._id}">
                <label for="teacher">${teacher.name} ${teacher.lastName}</label><br>
            </div>
            `
        )
    })
    return element.join('');
}

function addSubject(form) {
    event.preventDefault();
    let name = form.querySelector("#subject-name").value
    let description = form.querySelector("#subject-description").value

    let subjectTeacher = [];
    let teacherCheckbox = form.querySelectorAll("#teacher")
    teacherCheckbox.forEach(teacher => { 
        if (teacher.checked == true) {
            subjectTeacher.push(`${teacher.value}`)
        }
    });

    let newSubject = {
        name: name,
        description: description,
        videos: [],
        teachers: subjectTeacher,
        enrolledStudents: [],
        lectures: [],
        assignments: []
    }

    axios.post('http://localhost:5000/subjects/add', newSubject)
    .then(res => {
        let data = res.data
        console.log(data)
        let SubjectId = data.slice(data.length - 24, data.length)

        newSubject._id = SubjectId;
        subjects.push(newSubject);

        teachers.forEach(teacher => { 
            if (teacher.checked == true) {
                console.log(teacher)
                teacher.subjects.push(`${subjectId}`)

                updateTeacherDB(teacher._id, teacher)
            }
        });

        app.update();
    })
    .catch(err => console.log(err))

}

function updateTeacherDB(teacherId, teacher) {
    axios.post(`http://localhost:5000/teachers/update/${teacherId}`,
    teacher)
    .then(res => {
        console.log(res.data)
    })
    .catch(err => console.log(err))
}

function saveEditSubject(subjectId) {
    event.preventDefault();
    let subject = subjects.find(subject => subject._id == subjectId);
    let newName = document.querySelector("#subject-name").value
    let newDescription = document.querySelector("#subject-description").value
    let newTeachers = [];
    let checkbox = document.querySelector(".checkboxes")
    let subjectTeachers = checkbox.querySelectorAll("#teacher")
    

    subjectTeachers.forEach(teacher => {
        //Temporarily remove subject
        let currentT = teachers.find(t => t._id == teacher.value)
        currentT.subjects = currentT.subjects.filter(subject => subject._id != subjectId)

        if (teacher.checked == true) {
            newTeachers.push(teacher.value)
            //Add subject back in
            currentT.subjects.push(`${subjectId}`)
        }

        updateTeacherDB(currentT._id, currentT);
    })

    subject.name = newName;
    subject.description = newDescription;
    subject.teachers = newTeachers;
    axios.post(`http://localhost:5000/subjects/update/${subject._id}`,
        subject)
        .then(res => {
            console.log(res.data)
    })
    app.update();
}
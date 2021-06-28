function StudentAssignments(state) {
    if (state.userPermission != 'S') return ' '
    this.html = 
    `
    <section id="courses-section">
        <div class="container">
            <div class="section-title"><h3>Assignments</h3></div>
            <div class="section-body">
                <div class="table-header">
                    <div class="header-info">
                        <div class="table-name">Subject - Assignment</div>
                        <div class="table-username"></div>
                    </div>
                    <div class="options" style="display: none;"></div>
                </div>
                ${getMyAssignments(state)}
            </div>
        </div>
    </section>

    ${AddCourseModal(state)}
    `

    return this.html
}

function getMyAssignments(state){
    let ids = state.currentUser.subjects;

    let elements = [];

    subjects.forEach(subject => {
        if (subject.assignments && ids.includes(`${subject._id}`)) {
            subject.assignments.forEach(assignment => {
                elements.push(
                    `
                    <div class="course table-body-item">
                    <div class="table-info">
                        <div class="table-name"><div class="subject-name">${subject.name}</div>${assignment.name}</div>
                        <div id="table-date">${assignment.date}</div>
                    </div>
                    <div class="options">
                        <div class="edit-button"></div>
                        <div></div>
                    </div>
                    </div>
                    `
                )
            })
        }
    })

    if (elements.length == 0) {
        elements.push(
            `
            <div class="course table-body-item">
            <div class="table-info">
                <div class="table-name">No Assignments</div>
                <div id="table-date"></div>
            </div>
            <div class="options">
                <div class="edit-button"></div>
                <div></div>
            </div>
            </div>
            `
        )
    }

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
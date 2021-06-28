function Assignments(state) {
    this.html =
    `
    <section id="lectures-section">
        <div class="container">
            <div class="section-title"><h3>Assignments</h3></div>
            <div class="section-body lectures ">
                ${getAssignments(state)}
            </div>
            <button class="btn" onclick="toggleAddAssignmentModal()">
                <i class="fas fa-plus"></i></button>
        </div>
    </section>

    ${AddAssignmentModal(state)}
    `

    return this.html
}

function toggleAddAssignmentModal() {
    app.showAddAssignmentModal = !app.showAddAssignmentModal
    app.update();
}

function getAssignments(state) {
    let elements = [];
    let assignments = state.currentSubject.assignments;

    if (!assignments || assignments.length == 0) {
        elements.push(
            `
            <div class="course table-body-item">
                <div class="table-info">
                    <div class="table-name">
                        <h4>No Assignments</h4>
                        <p>Add a new assignment</p> 
                    </div>
                </div>
                <div class="options">
                </div>
            </div>
            `
        )
        return elements.join(' ')
    }

    assignments.forEach(assignment => {
        if (true) {
            elements.push(
            `
            <div class="course table-body-item">
                <div class="table-info">
                    <div class="table-name">
                        <h4>${assignment.name}</h4>
                        <p>${assignment.date}</p> 
                    </div>
                </div>
                <div class="options">
                    <div onclick="toggleEditAssignment('${assignment._id}')" class="edit-button"><i class="fas fa-ellipsis-v"></i></div>
                    <div onclick="deleteAssignment('${assignment._id}')" class="delete-button"><i class="far fa-trash-alt"></i></div>
                </div>
            </div>
            `
        )
        }
    })

    
    return elements.join(' ')
}



function addAssignment(form) {
    event.preventDefault();
    let name = form.querySelector('#assignment-name').value;
    let date = form.querySelector('#assignment-date').value;


    let newAssignment = {
        name: name,
        date: date,
    }

    //Set in object.assignments
    if (!app.currentSubject.assignments) app.currentSubject.assignments = []
    app.currentSubject.assignments.push(newAssignment)

    axios.post(` /subjects/update/${app.currentSubject._id}`,
    app.currentSubject)
    .then(res => {
        console.log(res.data)
    })
    .catch(err => console.log(err))

    app.update()
}

function deleteAssignment(assignmentId) {
    let assignments = app.currentSubject.assignments
    
    console.log('assigID: ',assignmentId)
    app.currentSubject.assignments = assignments.filter(assignment => `${assignment._id}` != assignmentId)

    axios.post(` /subjects/update/${app.currentSubject._id}`,
    app.currentSubject)
    .then(res => {
        console.log(res.data)
    })
    .catch(err => console.log(err))

    
    app.update();
}



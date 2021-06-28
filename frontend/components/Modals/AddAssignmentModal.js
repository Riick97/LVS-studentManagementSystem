function AddAssignmentModal(state) {
    this.html = 
    `
    <section id="add-lecture-modal" tabindex="0" onfocus="toggleAddAssignmentModal()" class="modal ${state.showAddAssignmentModal ? '': 'hide'}">
        <div class="container">
            <div class="add-lecture-modal" tabindex="0">
                <div class="table-header modal-header">Add Assignment</div>
                <div class="available-courses">
                    ${getAssignments(state)}
                    ${getAssignmentInput(state)}
                </div>
            </div>
        </div>
    </section>
    `

    return this.html
}



function getAssignmentInput(state) {
    function getTodayString() {
        let today = new Date();
        let month = (today.getMonth() + 1);               
        let day = today.getDate();
        if (month < 10) 
        month = "0" + month;
        if (day < 10) 
        day = "0" + day;
        let todayString = today.getFullYear() + '-' + month + '-' + day;
        return todayString
    }
    let element = `
    <form id="submit-assignment-form" action="javascript:void(0);" onsubmit="addAssignment(this)" class="course table-body-item ">
                <div class="table-info">
                    <div class="table-input">
                        <input type="text" placeholder="Assignment ..." id="assignment-name">
                        <input type="date" name="" id="assignment-date" value="${getTodayString()}" >
                    </div>
                </div>
                <div class="options">
                    <div class="edit-button"></div>
                    <div class="submit-assignment-btn"><input id="submit-assignment" type="Submit" value="+"></div>
                </div>
    </form>
    `
    return element;
}


function toggleEditAssignment(assignmentId) {
    //Toggle modal
    if (app.showAddAssignmentModal == false) toggleAddAssignmentModal();


    //Get current Assignment
    let assignments = app.currentSubject.assignments
    let assignment = assignments.find(assignment => `${assignment._id}` == assignmentId)
    //app.modalCurrentAssignment = assignment
    app.update()
    let name = document.querySelector("#assignment-name")
    let date = document.querySelector("#assignment-date")
    

    //Fill in current lecture values
    name.value = assignment.name
    date.value = assignment.date

    //Prepare form for saving
    let form = document.querySelector("#submit-assignment-form")
    let submitButton = document.querySelector("#submit-assignment")
    form.onsubmit = function() {saveEditAssignment(assignment)}
    submitButton.value = '+';
}

function saveEditAssignment(assignment) {
    event.preventDefault();

    //Get current subject
    let subject = app.currentSubject

    //Get new values
    let newName = document.querySelector("#assignment-name").value
    let newDate = document.querySelector("#assignment-date").value


    //Set new values to current lecture
    assignment.name = newName;
    assignment.date = newDate;


    axios.post(`http://localhost:5000/subjects/update/${subject._id}`,
        subject)
        .then(res => {
            console.log(res.data)
    })

    //app.modalCurrentLecture = undefined;
    app.update();
}


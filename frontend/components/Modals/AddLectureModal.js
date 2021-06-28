function AddLectureModal(state) {
    this.html = 
    `
    <section id="add-lecture-modal" tabindex="0" onfocus="toggleAddLectureModal()" class="modal ${state.showAddLectureModal ? '': 'hide'}">
        <div class="container">
            <div class="add-lecture-modal" tabindex="0">
                <div class="table-header modal-header">Add Lecture</div>
                <div class="available-courses">
                    ${getLectures(state)}
                    ${getLectureInput(state)}
                </div>
                <div class="table-header modal-header">Attendance List: ${getLectureTitle(state)}</div>
                <div class="available-courses lecture-checkboxes">
                    ${getAttendingStudents(state)}
                </div>
                </div>
            </div>
        </div>
    </section>
    `

    return this.html
}



function getLectureInput(state) {
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
    <form id="submit-lecture-form" action="javascript:void(0);" method="POST" onsubmit="addLecture(this)" class="course table-body-item ">
                <div class="table-info">
                    <div class="table-input">
                        <input minlength="3" type="text" placeholder="Lecture ..." id="lecture-name">
                        <input type="date" name="" id="lecture-date" value="${getTodayString()}" >
                    </div>
                </div>
                <div class="options">
                    <div class="edit-button"></div>
                    <div class="submit-lecture-btn"><input id="submit-lecture" type="Submit" value="+"></div>
                </div>
    </form>
    `
    return element;
}

function getAttendingStudents(state) {
    let studentIds = state.currentSubject.enrolledStudents
    let attendingStudents = []
    if (state.modalCurrentLecture) {
        attendingStudents = state.modalCurrentLecture.attendingStudents
    }

    let elements = [];
    students.forEach(student => {
        if (studentIds.includes(`${student._id}`) || attendingStudents.includes(`${student._id}`)) {
            elements.push(
                `
                <div style="display: flex; margin-bottom: .5rem">   
                    <input type="checkbox" id="student" name="student" value="${student._id}">
                    <label for="student">${student.name} ${student.lastName}</label><br>
                </div>
                `
            )
        }
    })
    
    return elements.join('')
}

function getLectureTitle(state) {
    if (state.modalCurrentLecture) return state.modalCurrentLecture.name
    return 'New Lecture'
}

// Edit Lecture

function toggleEditLecture(lectureId) {
    //Toggle modal
    if (app.showAddLectureModal == false) toggleAddLectureModal();

    //Get current Lecture
    let lecture = lectures.find(lecture => lecture._id == lectureId);
    app.modalCurrentLecture = lecture;
    app.update()
    let name = document.querySelector("#lecture-name")
    let date = document.querySelector("#lecture-date")
    

    
    //Get checkbox
    let checkbox = document.querySelector(".lecture-checkboxes")
    let studentsCheckbox = checkbox.querySelectorAll("#student")

    studentsCheckbox.forEach(checkbox => {
        if (lecture.attendingStudents.includes(`${checkbox.value}`)) {
            checkbox.checked = true;
        } else {
            checkbox.checked = false;
        }
    })

    //Fill in current lecture values
    name.value = lecture.name
    date.value = lecture.date

    //Prepare form for saving
    let form = document.querySelector("#submit-lecture-form")
    let submitButton = document.querySelector("#submit-lecture")
    form.onsubmit = function() {saveEditLecture(lectureId)}
    submitButton.value = '+';
}

function saveEditLecture(lectureId) {
    event.preventDefault();

    //Get current lecture
    let lecture = lectures.find(lecture => lecture._id == lectureId);

    //Get new values
    let newName = document.querySelector("#lecture-name").value
    let newDate = document.querySelector("#lecture-date").value
    let newStudents = [];

    let checkbox = document.querySelector(".lecture-checkboxes")
    let lectureStudents = checkbox.querySelectorAll("#student")

    lectureStudents.forEach(student => {
        if (student.checked == true) {
            newStudents.push(`${student.value}`)
        }
    })

    //Set new values to current lecture
    lecture.name = newName;
    lecture.date = newDate;
    lecture.attendingStudents = [...newStudents];


    axios.post(`http://localhost:5000/lectures/update/${lecture._id}`,
        lecture)
        .then(res => {
            console.log(res.data)
    })


    app.modalCurrentLecture = undefined;
    app.update();
}


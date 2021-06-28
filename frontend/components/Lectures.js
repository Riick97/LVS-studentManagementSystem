function Lectures(state) {
    this.html =
    `
    <section id="lectures-section">
        <div class="container">
            <div class="section-title"><h3>Lectures</h3></div>
            <div class="section-body lectures ">
                ${getLectures(state)}
            </div>
            <button class="btn" onclick="toggleAddLectureModal()">
                <i class="fas fa-plus"></i></button>
        </div>
    </section>

    ${AddLectureModal(state)}
    `

    return this.html
}

function toggleAddLectureModal() {
    app.showAddLectureModal = !app.showAddLectureModal
    app.update();
}

function getLectures(state) {
    let elements = [];
    let subjectLecturesIds = state.currentSubject.lectures;

    lectures.forEach(lecture => {
        if (subjectLecturesIds.includes(`${lecture._id}`)) {
            elements.push(
            `
            <div class="course table-body-item">
                <div class="table-info">
                    <div class="table-name">
                        <h4>${lecture.name}</h4>
                        <p>${lecture.date}</p> 
                    </div>
                </div>
                <div class="options">
                    <div onclick="toggleEditLecture('${lecture._id}')" class="edit-button"><i class="fas fa-ellipsis-v"></i></div>
                    <div onclick="deleteLecture('${lecture._id}')" class="delete-button"><i class="far fa-trash-alt"></i></div>
                </div>
            </div>
            `
        )
        }
    })

    if (subjectLecturesIds.length == 0) {
        elements.push(
            `
            <div class="course table-body-item">
                <div class="table-info">
                    <div class="table-name">
                        <h4>No Lectures</h4>
                        <p>Add a new lecture</p> 
                    </div>
                </div>
                <div class="options">
                </div>
            </div>
            `
        )
    }
    return elements.join(' ')
}



function addLecture(form) {
    event.preventDefault();
    let name = form.querySelector('#lecture-name').value;
    let date = form.querySelector('#lecture-date').value;


    //Get checkbox values
    let attendingStudents = []
    let checkbox = document.querySelector(".lecture-checkboxes")
    let studentsCheckbox = checkbox.querySelectorAll("#student")

    studentsCheckbox.forEach(checkbox => {
        if (checkbox.checked == true) {
            attendingStudents.push(`${checkbox.value}`)
        } 
    })

    let newLecture = {
        name: name,
        date: date,
        attendingStudents: attendingStudents,
    }

    axios.post(' /lectures/add', newLecture)
    .then(res => {
        data = res.data
        console.log(data)
        let lectureId = data.slice(data.length - 24, data.length)

        newLecture._id = lectureId
        lectures.push(newLecture);

        app.currentSubject.lectures.push(lectureId)
        app.update();

        axios.post(` /subjects/update/${app.currentSubject._id}`,
        app.currentSubject)
        .then(res => {
            console.log(res.data)
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
    
}

function deleteLecture(lectureId) {
    app.currentSubject.lectures = app.currentSubject.lectures.filter(lecture => `${lecture}` != `${lectureId}`)

    axios.delete(` /lectures/${lectureId}`)
    .then(res => console.log(res.data))
    .catch(err => console.log(err))

    axios.post(` /subjects/update/${app.currentSubject._id}`,
    app.currentSubject)
    .then(res => {
        console.log(res.data)
    })
    .catch(err => console.log(err))

    app.update();
}



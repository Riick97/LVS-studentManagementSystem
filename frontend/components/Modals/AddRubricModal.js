function Rubric(state) {
    this.html = 
    `
    <div style="display: ${state.rubricMode ? 'flex' : 'none'}" class="modal-down-part">
                    <div class="modal-left-part">
                        ${getModalSidebar(state)}
                    </div>
                    <div class="modal-right-part">
                        <div class="table-header">
                            <div class="head-info-container">
                                <div class="head-info"><h4>Description</h4></div>
                                <div class="head-info"><h4>Score</h4></div>
                            </div>
                            <div class="options">
                            </div>
                        </div>
                        <div class="table-body">
                            ${getModalRubricDescriptions(state)}
                            <form action="javascript:void(0);" method="POST" onsubmit="addRubricCategory(this)">
                                <div class="table-item">
                                    <div class="item-info-container">
                                        <div class="item-info"><input type="text" name="" id="description-name"></div>
                                        <div class="item-info">
                                            <select name="" id="description-score">
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="options"><input class="add-item-btn" type="submit" value="Add"></div>
                                </div>
                            </form>
                        </div>
                        <div class="table-result">
                            <form id="addRubricGradeForm" action="javascript:void(0);" method="POST" onsubmit="addRubricGrade(this)">
                                <div class="result-info-container">
                                    <div id="rubric-grade" class="item-info">Grade: ${getRubricResult(state)} </div>
                                    <div class="item-info">Weight: <input id="rubric-weight" style="width: 2.5rem;" type="number" name="" id=""></div>
                                </div>
                                <div class="options"><input class="add-item-btn" type="submit" value="Add"></div>
                            </form>
                        </div>
                    </div>
    </div>
    `

    return this.html
}


function toggleRubric() {
    app.rubricMode = !app.rubricMode;
    app.update();

    //Set updatedRubricCategories to app
    let select = document.querySelector("#changeRubricSelect")
    changeCurrentRubric(select)
}



function changeCurrentRubric(select) {
    if (!app.rubricMode) return //available only in rubricMode

    let rubricId = select.value
    let semesterPeriod = app.modalCurrentSemester
    let student = app.modalCurrentStudent
    let currentRubric;

    // Get currentRubric from student
    student.semesters.forEach(semester => {
        let samePeriod = semester.period == semesterPeriod
        let sameSubject = semester.subject == app.currentSubject._id
        if (samePeriod && sameSubject) {
            semester.rubrics.forEach(rubric => {
                if (rubric._id == rubricId) {
                    currentRubric = rubric
                    return
                }
            })
        }
    })

    //Set currentRubric to app
    app.addStudentModalRubric = currentRubric;
    app.rubricSelectedIndex = select.selectedIndex;
    app.update();
}

function getModalRubricDescriptions(state) {
    let rubric = state.addStudentModalRubric;
    
    let empty = 
    `
    <div class="table-item">
            <div class="item-info-container">
                No Categories Yet
            </div>
            <div class="options">
            </div>
        </div>
    `

    let rubricCategories

    if (rubric) {
        rubricCategories = rubric.rubricCategories;
    } else {
        return empty
    }

    let element = [];
    rubricCategories.forEach(category => {
        element.push(
            `
            <div class="table-item">
                <div class="item-info-container">
                    <div class="item-info">${category.description}</div>
                    <div class="item-info">${category.score}</div>
                </div>
                <div class="options">
                    <div class="edit-button"></div>
                    <div onclick="deleteRubricCategory('${category._id}')" class="delete-button"><i class="far fa-trash-alt"></i></div>
                </div>
            </div>
            `
        )
    })

    return element.join('')
}

function getRubricOptions(state) {
    //get semester from currentstudent, period, subject
    let student = state.modalCurrentStudent
    let semesterPeriod = state.modalCurrentSemester
    let subject = state.currentSubject
    // console.log(`currentStudent: ${student.name}` )
    // console.log(`currentSemester: ${semesterPeriod}`)
    // console.log(`currentSubject: ${subject.name}`)
    makeSemester(student, semesterPeriod, subject._id)

    let currentSemester;
    student.semesters.forEach(semester => {
        if (semester.period == semesterPeriod && semester.subject == subject._id) {
            currentSemester = semester;
        }
    })
    let rubrics = currentSemester.rubrics;

    //Write none to AddGradesModal.getModalSidebar
    if (!currentSemester || rubrics.length == 0) {
        return `<option value="">None</option>`
    }

    


    let element = [];

    rubrics.forEach((rubric, index)=> {
        let selectedIndex = state.rubricSelectedIndex;
        let selected = (selectedIndex == index)
        element.push(
            `
            <option ${selected? 'selected' : ' '} value="${rubric._id}">${rubric.name}</option>
            `
        )
    })

    // Write options to AddGradesModal.getModalSidebar
    return element.join('')
}

function getRubricResult(state) {
    let sum = 0
    let count = 0

    let currentRubric = state.addStudentModalRubric

    if (!currentRubric || currentRubric.rubricCategories.length == 0) return 'No Grade'

    currentRubric.rubricCategories.forEach(category => {
        sum += category.score
        count++
    })

    let grade = sum / (count * 5) * 10


    return `${parseFloat(grade).toFixed(1)}`
}



function addRubric(form) {
    event.preventDefault();
    //Get name
    let rubricName = form.querySelector('#rubric-name').value
    let semester = app.currentStudent.semesters.find(semester => semester.period == app.modalCurrentSemester)
    let rubric = {
        name: rubricName,
        rubricCategories: []
    }

    semester.rubrics.push(rubric)

    updateStudent(app.currentStudent._id, app.currentStudent)
    
    app.update();
}

function addRubricCategory(form) {
    event.preventDefault();
    let name = form.querySelector("#description-name").value
    let select = form.querySelector("#description-score")
    let student = app.modalCurrentStudent
    let score = select.options[select.selectedIndex].value
    let rubric = getCurrentRubric()

    let newRubricCategory = {
        description: name,
        score: parseInt(score)
    }

    //Write newRubricCategoryReference to rubric
    rubric.rubricCategories.push(newRubricCategory);

    updateStudent(student._id, student)
    app.update();
}


function deleteRubricCategory(categoryId) {
    let student = app.modalCurrentStudent
    let currentRubric = getCurrentRubric()

    currentRubric.rubricCategories = currentRubric.rubricCategories.filter(category => {
        return  category._id != categoryId
    })
        
    updateStudent(student._id, student)
    app.update();

    console.log('category', currentRubric)
    console.log('student:', student)

    //Set currentRubric to app
    // let select = document.querySelector("#changeRubricSelect")
    // changeCurrentRubric(select)
}

function addRubricGrade(form) {
    event.preventDefault();
    let name = app.addStudentModalRubric.name
    let grade = getRubricResult(app)
    let weight = form.querySelector("#rubric-weight").value

    //Get semester from student
    let currentStudent = app.modalCurrentStudent;
    let semesterPeriod = app.modalCurrentSemester;
    let semester = currentStudent.semesters.find(semester => {
        return semester.period == semesterPeriod 
    })

    let newGrade = {
        description: name,
        weight: parseInt(weight),
        score: parseFloat(grade).toFixed(1),
    }

    semester.grades.push(newGrade)
    updateStudent(currentStudent._id, currentStudent)
    app.update()

}


function deleteRubric(rubricId) {
    if (rubricId == 'none') return
    
    let semester = app.modalCurrentStudent.semesters.find(semester => semester.period == app.modalCurrentSemester)
    semester.rubrics = semester.rubrics.filter(rubric => {
        return rubric._id != rubricId
    }) 

    updateStudent(app.modalCurrentStudent._id, app.modalCurrentStudent)

    app.update();
    
    //Set currentRubric to app
    let select = document.querySelector("#changeRubricSelect")
    changeCurrentRubric(select)
}
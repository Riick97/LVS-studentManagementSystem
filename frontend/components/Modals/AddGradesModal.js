function AddGradesModal(state) {
    this.html =
    `
    <section id="add-grades-modal" tabindex="0" onfocus="toggleAddGradeModal(0)" class="${state.showAddGradeModal ? '' : 'hide'}" class="hide">
        <div class="container">
            <div tabindex="0"  class="add-grades-modal">

                <button class="toggle-mode-btn" onclick="toggleRubric()">${state.rubricMode ? 'Rubric' : 'Grade'} mode</button>

                <div style="display: ${state.rubricMode ? 'none' : 'flex'}" class="modal-upper-part">
                    ${getModalSidebar(state)}
                    <div class="modal-right-part">
                        <div class="table-header">
                            <div class="head-info-container">
                                <div class="head-info"><h4>Test</h4></div>
                                <div class="head-info"><h4>Grade</h4></div>
                                <div class="head-info"><h4>%</h4></div>
                            </div>
                            <div class="options">
                            </div>
                        </div>
                        <div class="table-body">
                            ${getModalTests(state)}

                            <form action="javascript:void(0);" method="POST" onsubmit="addTest(this)">
                                <div class="table-item">
                                    <div class="item-info-container">
                                        <div class="item-info">
                                            <input type="text" name="" id="test-name">
                                        </div>
                                        <div class="item-info">
                                            <input max="10" type="number" name="" id="test-grade">
                                        </div>
                                        <div class="item-info">
                                            <input type="number" name="" id="test-weight">
                                        </div>
                                    </div>
                                    <div class="options"><input class="add-item-btn" type="submit" value="+"></div>
                                </div>
                            </form>
                        </div>
                        <div class="table-result">
                            <div class="result-info-container">
                                Semester Result: ${getGradesResult(state)}
                            </div>
                            <div class="align-button-right">
                                <button onclick="download()" class="export-button">Export excel</button>
                            </div>
                        </div>
                    </div>
                </div>

                ${Rubric(state)}
                
            </div>
        </div>
    </section>
    `

    return this.html
}

function changeSemester(select) {
    let studentId = app.modalCurrentStudent._id;
    let semesterPeriod = select.options[select.selectedIndex].value

    let currentStudent = students.find(student => student._id == studentId)
    let subjectId = app.currentSubject._id


    makeSemester(currentStudent, semesterPeriod, subjectId)
    //Set currentSemester
    app.modalCurrentSemester = semesterPeriod

    app.update();

    //Set currentRubric to app
    let rubricSelect = document.querySelector("#changeRubricSelect")
    changeCurrentRubric(rubricSelect)
}

function makeSemester(student, period, subject) {
    let currentSemester;
    student.semesters.forEach(semester => {
        if (semester.period == period && semester.subject == subject) {
            currentSemester = semester
        } 
    })
    
    if (!currentSemester) {
        currentSemester = {
            subject : subject,
            period : period,
            grades : [],
            rubrics : []
        }

        student.semesters.push(currentSemester)
        updateStudent(student._id, student)
    }
}

function updateStudent(id, student) {
    axios.post(`http://localhost:5000/students/update/${id}`,
    student)
    .then(res => {
        console.log(res.data)
    })
    .catch(err => console.log(res.date))
}

function getModalTests(state) {
    
    let currentStudent = state.modalCurrentStudent;

    //Set grades to clear
    state.currentStudentGrades = [];


    //Get semester from student
    let semesterPeriod = state.modalCurrentSemester;
    let semester = currentStudent.semesters.find(semester => {
        return semester.period == semesterPeriod 
    })


    let noGradesYet = 
    `
            <div class="table-item">
                        <div class="item-info-container">
                            <div class="item-info">No Grades Yet</div>
                        </div>
                        <div class="options">
                        </div>
            </div>
        
    `

    if (!semester || semester.grades.length == 0) return noGradesYet;

    let element = [];
    semester.grades.forEach(grade => {
        state.currentStudentGrades.push(grade)

        element.push(`
            <div class="table-item">
                        <div class="item-info-container">
                            <div class="item-info">${grade.description}</div>
                            <div class="item-info">${grade.score}</div>
                            <div class="item-info">${grade.weight}%</div>
                        </div>
                        <div class="options">
                            <div class="edit-button"></div>
                            <div onclick="deleteGrade('${grade._id}')" class="delete-button"><i class="far fa-trash-alt"></i></div>
                        </div>
            </div>
        `)
    })
    return element.join('') 
}

function getModalSidebar(state) {
    let student = state.modalCurrentStudent;
    let semesters = student.semesters;
    let element;

    if (state.rubricMode) {
        element = 
            `
            <div class="info">
                Semester: 
                
                <select onchange="changeSemester(this)" name="" id="rubrics">
                    ${getSemesterOptions(student._id, state)}
                </select> 
            </div>
            <div class="info">
                <h4>Rubric: </h4>
                <select onchange="changeCurrentRubric(this)" name="" id="changeRubricSelect">
                    ${getRubricOptions(state)}
                </select> 
            </div>    
            <form action="javascript:void(0);" method="POST" onsubmit="addRubric(this)">
                <input minlength="5" type="text" name="" id="rubric-name">
                <input class="submit-button" type="submit" value="Add">
            </form>   
            <button onclick="deleteRubric('${state.addStudentModalRubric ? state.addStudentModalRubric._id : 'none'}')">Delete</button>                 
            `
    } else {
        element = 
            `
            <div class="modal-left-part">
                        <div class="main-info">
                            <div class="info">
                                <h4>${student.name} ${student.lastName}</h4>
                            </div>
                            <div class="info">${student.studentId}</div>
                        </div>
                        <div class="info">
                            Semester: 
                            <select onchange="changeSemester(this)" name="" id="rubrics">
                                ${getSemesterOptions(student._id, state)}
                            </select> 
                        </div>
                    </div>
            `
    }
    return element;
}

function getSemesterOptions(studentId, state) {
    let semesters = [1, 2, 3, 4, 5, 6, 7, 8]
    let element = []

    semesters.forEach((semester) => {
        let sem = semester.toString()
        let currentSemester = state.modalCurrentSemester.toString()
        let selected = (sem == currentSemester);

        element.push(`
        <option ${selected? 'selected' : ' '}
            value="${semester}">
            ${semester}
        </option>
    `)
    })
    return element.join('')
}

function getGradesResult(state) {
    let totalWeightedScore = 0
    let totalWeight = 0

    let gradesArray = state.currentStudentGrades

    if (gradesArray.length == 0) {
        return "No Grades"
    }

    gradesArray.forEach(grade => {
        totalWeightedScore += (grade.score * grade.weight) 
        totalWeight += parseInt(grade.weight)
    })

    let finalScore = totalWeightedScore / totalWeight

    //Set to AddGradesModal
    return parseFloat(finalScore).toFixed(1);
}


// Add Methods

function addTest(form) {
    event.preventDefault();
    let name = form.querySelector("#test-name").value
    let grade = form.querySelector("#test-grade").value
    let weight = form.querySelector("#test-weight").value

    let newGrade = {
        description: name,
        weight: parseInt(weight),
        score: parseFloat(grade),
    }

    //Get semester from student
    let currentStudent = app.modalCurrentStudent;
    let semesterPeriod = app.modalCurrentSemester;
    let semester = currentStudent.semesters.find(semester => {
        return semester.period == semesterPeriod 
    })
    semester.grades.push(newGrade)
    updateStudent(currentStudent._id, currentStudent)
    app.update()

}


//Delete Methods

function deleteGrade(gradeId) {
    //Get semester from student
    let currentStudent = app.modalCurrentStudent;
    let semesterPeriod = app.modalCurrentSemester;
    let semester = currentStudent.semesters.find(semester => {
        return semester.period == semesterPeriod 
    })

    //Set grades to filteredGrades
    semester.grades = semester.grades.filter(grade => {
        return grade._id != gradeId
    })
    
    app.update()
    updateStudent(currentStudent._id, currentStudent)
}

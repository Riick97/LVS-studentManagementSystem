
function download() {
    let student = app.modalCurrentStudent;
    let data = getData()
    let settings = {
        fileName: `${student.name} - ${student.studentId}`
    }

    console.log('download clicked', data)
    convert(data, settings)
}

function getData() {
    let student = app.modalCurrentStudent;
    let semesters = student.semesters;
    let myData = []

    semesters.forEach(semester => {
        let grades = []
        let sem = {
            sheet: `Semester ${semester.period}`, 
            columns: [
                { label: 'Test', value: 'test' }, // Top level data
                { label: 'Grade', value: row => (row.score + ' ') }, // Run functions
                { label: 'Weight', value: row => (row.weight + ' ') }, // Deep props
            ], 
            content: []
        }
        semester.grades.forEach(grade => {
            grades.push(grade)
            sem.content.push({ test: grade.description, score: grade.score, weight: `${grade.weight} %` })
        })
        let finalGrade = getFinalGrade(grades)
        sem.content.push({test: 'Semester Result', score : finalGrade, weight: ' '})
        myData.push(sem)
    })

    return myData
}

function getFinalGrade(gradesArray) {
    let totalWeightedScore = 0
    let totalWeight = 0

    if (gradesArray.length == 0) {
        return ' '
    }
    
    gradesArray.forEach(grade => {
        totalWeightedScore += (grade.score * grade.weight) 
        totalWeight += parseInt(grade.weight)
    })

    let finalScore = totalWeightedScore / totalWeight

    //Set to AddGradesModal
    return parseFloat(finalScore).toFixed(1);
}


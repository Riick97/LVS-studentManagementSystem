function Navbar(state) {
    this.html = 
    `
    <nav class="navbar">
        <div class="container">
                <div class="lvs-logo"></div>
                <div class="links">
                ${getHomeTab(state)}
                ${getSubjectsTab(state)}
                ${getAdminTab(state)}   
                </div>
                
                <div onclick="logout()" class="logout-icon">
                ${getUserIcon(state)}
                </div>
        </div>
    </nav>
    `

    return this.html
}

function getHomeTab(state) {
    if (state.currentPage == 'Login') return `<a href="#">Home</a>`
    return `<a href="#" onclick="changePage('Home')">Homee</a>`
}

function getSubjectsTab(state) {
    if (state.currentPage == 'Login') return ' '
    if (state.userPermission != 'T' && state.userPermission != 'A') return ' '
    let element = 
    `
    <div class="dropdown">
                    <button class="dropbtn">Subjects</button>
                    <div class="dropdown-content">
                        ${getNavSubjets(state)}
                    </div>
    </div>
    `

    return element
}

function getAdminTab(state) {
    if (state.currentPage == 'Login') return ' '
    if (state.userPermission != 'A') return ' '
    let element = 
    `
            <div class="dropdown">
                    <button class="dropbtn">Administrator</button>
                    <div class="dropdown-content">
                        <a href="#" onclick="changePage('AdminAccounts')">Accounts</a>
                        <a href="#" onclick="changePage('AdminSubjects')">Subjects</a>
                    </div>
            </div>
    `

    return element
}

function getUserIcon(state) {
    if (state.currentPage == 'Login') return ' '
    let element = 
    `
    <img src="./img/Logout.svg" alt="User thumbnail" width="20px" >
    `
    return element
}

function getNavSubjets(state) {
    let elements = [];
    subjects.forEach(subject => {
        if (state.userPermission == 'A' || 
            state.userPermission == 'T' && state.currentUser.subjects.includes(`${subject._id}`))
        elements.push(
            `<a href="#" onclick="changePageSubject(this.id)" id="${subject.name}">${subject.name}</a>`
        )
    })

    return elements.join(" ")
}

function changePageSubject(buttonId) {
    subjects.forEach(subject => {
        if (subject.name == buttonId) {
            app.currentSubject = subject
            return
        }
    })
    changePage('Subjects')
    app.update();
}

function changePage(page) {
    app.currentPage = page
    //window.history.pushState('', `${app.currentPage}`, `/frontend/index.html#${app.currentPage}`)
    app.update();
}

function Title(state) {
    this.html = 
    `
    <section id="page-title-section">
        <div class="container">
            <div class="subject-title-name"><h2>${state.currentSubject.name}</h2></div>
            <div class="subject-description">${state.currentSubject.description}</div>
        </div>
    </section>
    `

    return this.html
}

function WelcomeTitle(state) {
    this.html = 
    `
    <section id="page-title-section">
        <div class="container">
            <div class="subject-name"><h2>Welcome to LVS</h2></div>
            <div class="subject-description">Hello ${state.currentUser.name},
            ${getWelcomeMessage(state)}  
            </div>
        </div>
    </section>
    `

    return this.html
}

function getWelcomeMessage(state) {
    if (state.userPermission == 'T') return 'Welcome to your dashboard'
    if (state.userPermission == 'A') return 'Welcome back'
    if (state.userPermission == 'S') return 'Catch up on the latest courses'
    return 'Unidentified User';
}

function AdminSubjectsTitle(state) {
    this.html = 
    `
    <section id="subject-management-overview">
        <div class="container">
            <div class="subject-name"><h2>Subjects</h2></div>
            <div class="subject-description">Manage Subjects</div>
        </div>
    </section>
    `

    return this.html
}

function AdminAccountsTitle(state) {
    this.html =
    `
    <section id="subject-overview">
        <div class="container">
            <div class="subject-name"><h2>Accounts</h2></div>
            <div class="subject-description">Manage User Accounts</div>
        </div>
    </section>
    `

    return this.html
}

function LoginTitle(state) {
    this.html = 
    `
    <section id="page-title-section">
        <div class="container">
            <div class="subject-name"><h2>LVS </h2></div>
            <div class="subject-description">
            A platform allowing for easier communication and coordination
            </div>
        </div>
    </section>
    `

    return this.html
}

function LoginVideosTitle(state) {
    this.html = 
    `
    <section id="page-title-section">
        <div class="container">
            <div class="subject-name"><h2>Latest Content</h2></div>
        </div>
    </section>
    `

    return this.html
}
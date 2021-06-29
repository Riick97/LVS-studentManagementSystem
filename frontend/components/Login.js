function Login(state) {
    this.html = 
    `
    <section id="login-section">
        <form id="login-form" action="javascript:void(0);" method="POST" onsubmit="validateUser(this)">
            <div class="container">
                <label for="uname"><b>Username</b></label>
                <input minlenth="3" id="login-username" type="text" placeholder="Enter Username" name="uname" value="JohhnyR62" required>

                <label for="psw"><b>Password</b></label>
                <input minlenth="3" id="login-password" type="password" placeholder="Enter Password" name="psw" value="admin123" required>
                    
                <button type="submit">Login</button>

                <span class="psw">Not a member yet? <a href="#">Sign up</a></span>
            </div>
        </form>
    </section>
    `

    return this.html
}

// "JohhnyR62" "admin123"
// "John52" "JHaley52"
// "username.username" "pasword"

function validateUser() {
    //event.preventDefault()
    let form = document.querySelector("#login-form")
    let username = form.querySelector("#login-username").value;
    let password = form.querySelector("#login-password").value;

    let user = {
        username : username,
        password : password
    }

    axios.post(`/auth/login`, user)
    .then(async (res) => {
        console.log('pressed')
        if (res.status == 200) {
            console.log('user validated')
            console.log({res})
            let data = res.data

            app.token = data.accessToken
            await getInitialData()
            app.currentUser = data.user
            app.userPermission = data.user.permissions
            app.currentPage = 'Home'
            app.update()
            //document.cookie = `token=${token}`
            playLoadingAnimation()
            
        }
    })
    .catch(err => console.log(err))
}



function logout() {
    playLoadingAnimation()
    app.currentPage = 'Login'
    app.currentUser = 'public'
    app.userPermission = 'N'
    app.update();
}



function playLoadingAnimation() {
    document.getElementById("loader").style.display = "block"
    document.getElementById("loader-background").style.display = "block"
    setTimeout(hideLoader, 1000);


    function hideLoader() {
        document.getElementById("loader").style.display = "none"
        document.getElementById("loader-background").style.display = "none"
    }
}

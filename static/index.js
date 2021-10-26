


function loginForm(){
    const fields = [
        { tag: 'input', attributes: { type: 'email', name: 'email', id:"email", placeholder: 'Email' } },
        { tag: 'input', attributes: { type: 'password', name: 'password', id:"password", placeholder: 'Password' } },
        { tag: 'input', attributes: { type: 'submit', value: 'Login' } }
    ]
    const form = document.createElement('form');
    fields.forEach(f => {
        let field = document.createElement(f.tag);
        Object.entries(f.attributes).forEach(([a,v]) => {
            field.setAttribute(a,v)
            form.appendChild(field)
        })
    })
    signUpParent=document.querySelector("#auth")
    signUpParent.appendChild(form)
    form.addEventListener('submit', requestLogin)
}

function registerForm(){
    const fields = [
        { tag: 'input', attributes: { type: 'text', name: 'name', id: 'name', placeholder: 'Username' } },
        { tag: 'input', attributes: { type: 'email', name: 'email', id: 'email', placeholder: 'Email' } },
        { tag: 'input', attributes: { type: 'password', name: 'password', id: "password", placeholder: 'Password' } },
        { tag: 'input', attributes: { type: 'submit', value: 'Create Account' } }
    ]
    const form = document.createElement('form');
    fields.forEach(f => {
        let field = document.createElement(f.tag);
        Object.entries(f.attributes).forEach(([a,v]) => {
            field.setAttribute(a,v)
            form.appendChild(field)
        })
    })
    signUpParent=document.querySelector("#auth")
    signUpParent.appendChild(form)
    form.addEventListener('submit', requestRegistration)
}

function newHabitForm(){
    const fields = [
        { tag: 'input', attributes: { type: 'hidden', name: 'userID', id: 'userID', placeholder: 'Habit Name' } },
        { tag: 'input', attributes: { type: 'text', name: 'habitName', id: "habitName", placeholder: 'Habit Name' } },
        { tag: 'input', attributes: { type: 'text', name: 'goodhabit', id: "goodhabit", placeholder: 'Email' } },
        { tag: 'input', attributes: { type: 'password', name: 'password', id: "password",placeholder: 'Password' } },
        { tag: 'input', attributes: { type: 'submit', value: 'Create Account' } }
    ]
    const form = document.createElement('form');
    fields.forEach(f => {
        let field = document.createElement(f.tag);
        Object.entries(f.attributes).forEach(([a,v]) => {
            field.setAttribute(a,v)
            form.appendChild(field)
        })
    })
    signUpParent=document.querySelector("#auth")
    signUpParent.appendChild(form)
    form.addEventListener('submit', requestRegistration)
}

async function getHabits(){
    let token = localStorage.getItem('token')
    const user = jwt_decode(token);
    let userId = user.userId
    const options = {
        headers: new Headers({'Authorization': localStorage.getItem('token')}),
    }
    response = await fetch(`http://localhost:3000/habits/${userId}`,options)
    habits = await response.json()
    if (habits.err) {
        logout()
    }
    await habits.map(r => renderHabit(r))
    console.log(habits);
}

function renderHabit(data){
    let habitHolder = document.querySelector("#habits");
    let habitParent = document.createElement("div");
    let habitName = document.createElement("p");
    habitParent.setAttribute("class","container");
    let habitRow = document.createElement("div");
    habitRow.setAttribute("class","row");
    let habitBootstrap = document.createElement("div")
    habitBootstrap.setAttribute("class","col-md-3 col-sm-6");
    let circularProgress = document.createElement('div');
    circularProgress.setAttribute("class","circular-progress-1")
    circularProgress.style.setProperty('--percentage', `${data.quantity * (360/data.target)}deg`)
    
    habitName.innerText = data.name;
    let habitQuantity = document.createElement("p");
    habitQuantity.innerText= data.quantity;
    habitId = data._id;  
    circularProgress.addEventListener("click", (e) => {
        e.preventDefault()
        console.log(habitId);
    })
    circularProgress.append(habitName);
    habitBootstrap.append(circularProgress);
    habitRow.append(habitBootstrap);
    habitParent.append(habitRow);
    habitHolder.append(habitParent)
}



function loadUserArea(){
    buttonParent = document.querySelector("#auth");
    buttonParent.style.display = "none";
    habitParent = document.querySelector("#habits");
    habitParent.style.display = "none";
    userArea = document.createElement("div");
    userArea.setAttribute("id","userArea")
    userName = document.createElement("p");
    userName.setAttribute("id", "userName");
    userName.innerText = localStorage.getItem("username");
    userEmail = document.createElement("p");
    userEmail.setAttribute("id", "userEmail");
    userEmail.innerText = localStorage.getItem("userEmail");
    changePassword = document.createElement("button");
    changePassword.setAttribute("id", "changePassword");
    changePassword.innerText = "Change Password"
    changePassword.addEventListener("click", (e) => {
        e.preventDefault()
        changePass()
    })
    logoutButton = document.createElement("button");
    logoutButton.setAttribute("id", "logoutButton");
    logoutButton.innerText ="Log Out"
    logoutButton.addEventListener("click", (e) => {
        e.preventDefault()
        logout()
    })
    userArea.append(userName, userEmail, changePassword, logoutButton);
    userAreaParent =document.querySelector("#user");
    userAreaParent.appendChild(userArea);

}



function getToken(){
    token = localStorage.getItem("token");
    if(!token){
        signInButton = document.createElement("button");
        signInButton.setAttribute("id", "signInButton");
        signInButton.innerText = "Sign In";
        registerButton = document.createElement("button");
        registerButton.setAttribute("id", "registerButton");
        registerButton.innerText = "Register";
        backButton = document.createElement("button");
        backButton.setAttribute("id", "backButton");
        backButton.innerText = "Back";
        backButton.style.display = "none";
        signInButton.addEventListener("click", (e) => {
            e.preventDefault()
            signInButton.style.display = "none";
            registerButton.style.display = "none";
            backButton.style.display = "block";
            loginForm(e)});
        registerButton.addEventListener("click", (e) => {
            e.preventDefault()
            signInButton.style.display = "none";
            registerButton.style.display = "none";
            backButton.style.display = "block"
            registerForm(e)});
        backButton.addEventListener("click", (e) =>{
            e.preventDefault()
            window.location.reload();
        })

        buttonParent = document.querySelector("#auth");
        buttonParent.appendChild(signInButton);
        buttonParent.appendChild(registerButton);
        buttonParent.appendChild(backButton);

    } else {
        document.querySelector("#welcome").style.display = "none";
        let userButton = document.createElement("button");
        userButton.innerText = localStorage.getItem("username");
        let buttonParent = document.querySelector("#auth")
        buttonParent.appendChild(userButton);
        userButton.addEventListener('click', (e) =>{
            e.preventDefault()
            loadUserArea()});
        getHabits();
    }
}

function incrementHabit(){


}

function areaReload(section){
    while(section.firstChild) {
        section.firstChild.remove()
    }
}


async function changePass(){
    section = document.querySelector("#userArea")
    areaReload(section);
    const fields = [
        { tag: 'input', attributes: { type: 'password', name: 'currentPassword', id:"currentPassword", placeholder: 'Password' } },
        { tag: 'input', attributes: { type: 'password', name: 'newPassword', id:"newPassword", placeholder: 'Password' } },
        { tag: 'input', attributes: { type: 'password', name: 'verifyNewPassword', id:"verifyNewPassword", placeholder: 'Password' } },
        { tag: 'input', attributes: { type: 'submit', value: 'Change Password' } }
    ]
    const form = document.createElement('form');
    fields.forEach(f => {
        let field = document.createElement(f.tag);
        Object.entries(f.attributes).forEach(([a,v]) => {
            field.setAttribute(a,v)
            form.appendChild(field)
        })
    })
    
    section.appendChild(form)
    form.addEventListener('submit', async(e)=>{
        if(e.target.newPassword.value === e.target.verifyNewPassword.value){
            e.preventDefault()
            try{
                const options = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json','Authorization': localStorage.getItem('token')},
                    body: JSON.stringify(Object.fromEntries(new FormData(e.target)))
                }
                const response = await fetch(`http://localhost:3000/user/changePassword`, options)
                const data = await response.json()
                if (!data.success) { throw new Error('Could not change Password'); }
                window.location.reload();
            } catch (err) {
                console.warn(err);
            }
        }
    })
}


getToken();
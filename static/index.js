


function loginForm(){
    const fields = [
        { tag: 'input', attributes: { type: 'email', name: 'email', placeholder: 'Email' } },
        { tag: 'input', attributes: { type: 'password', name: 'password', placeholder: 'Password' } },
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
        { tag: 'input', attributes: { type: 'text', name: 'username', placeholder: 'Username' } },
        { tag: 'input', attributes: { type: 'email', name: 'email', placeholder: 'Email' } },
        { tag: 'input', attributes: { type: 'password', name: 'password', placeholder: 'Password' } },
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
        { tag: 'input', attributes: { type: 'text', name: 'username', placeholder: 'Username' } },
        { tag: 'input', attributes: { type: 'email', name: 'email', placeholder: 'Email' } },
        { tag: 'input', attributes: { type: 'password', name: 'password', placeholder: 'Password' } },
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


function getToken(){
    token = localStorage.getItem("token");
    if(!token){
        signInButton = document.createElement("button");
        signInButton.setAttribute("id", "signInButton");
        signInButton.innerText = "Sign In";
        registerButton = document.createElement("button");
        registerButton.setAttribute("id", "registerButton");
        registerButton.innerText = "Register";
        BackButton = document.createElement("button");
        BackButton.setAttribute("id", "BackButton");
        BackButton.innerText = "Back";
        BackButton.style.display = "none";
        signInButton.addEventListener("click", (e) => {
            e.preventDefault()
            signInButton.style.display = "none";
            registerButton.style.display = "none";
            BackButton.style.display = "block";
            loginForm(e)});
        registerButton.addEventListener("click", (e) => {
            e.preventDefault()
            signInButton.style.display = "none";
            registerButton.style.display = "none";
            BackButton.style.display = "block"
            registerForm(e)});
        BackButton.addEventListener("click", (e) =>{
            e.preventDefault()
            window.location.reload();
        })

        buttonParent = document.querySelector("#auth");
        buttonParent.appendChild(signInButton);
        buttonParent.appendChild(registerButton);
        buttonParent.appendChild(BackButton);

    } else {
        let logoutButton = document.createElement("button");
        logoutButton.innerText = "Log Out";
        let buttonParent = document.querySelector("#auth")
        buttonParent.appendChild(logoutButton);
        logoutButton.addEventListener('click', (e) =>{
            e.preventDefault()
            logout()});
        getHabits();
    }
}

function incrementHabit(){


}
getToken();



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

async function getHabits(){
    let userId = localStorage.getItem('userid')
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
    habitName.innerText = data.name;
    let habitFrequency = document.createElement("p");
    habitFrequency.innerText= data.frequency;
    habitParent.append(habitName,habitFrequency);
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
        signInButton.addEventListener("click", (e) => {
            e.preventDefault()
            signInButton.style.display = "none";
            registerButton.style.display = "none";
            loginForm(e)});
        registerButton.addEventListener("click", (e) => {
            e.preventDefault()
            signInButton.style.display = "none";
            registerButton.style.display = "none";
            registerForm(e)});
        buttonParent = document.querySelector("#auth");
        buttonParent.appendChild(signInButton);
        buttonParent.appendChild(registerButton);
    } else {
        getHabits();
    }
}


getToken();
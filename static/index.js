


function loginForm(){
    const fields = [
        { tag: 'input', attributes: { type: 'email', name: 'email', id:"email", placeholder: 'Email' } },
        { tag: 'input', attributes: { type: 'password', name: 'password', id:"password", placeholder: 'Password' } },
        { tag: 'input', attributes: { type: 'submit', value: 'Login' } }
    ]
    const form = document.createElement('form');
    form.setAttribute('id','loginForm')
    fields.forEach(f => {
        let field = document.createElement(f.tag);
        Object.entries(f.attributes).forEach(([a,v]) => {
            field.setAttribute(a,v)
            form.appendChild(field)
        })
    })
    signUpParent=document.querySelector("#auth")
    signUpParent.appendChild(form)
    form.style.marginTop = "20px"
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
    form.setAttribute("id","registerForm")
    fields.forEach(f => {
        let field = document.createElement(f.tag);
        Object.entries(f.attributes).forEach(([a,v]) => {
            field.setAttribute(a,v)
            form.appendChild(field)
        })
    })
    signUpParent=document.querySelector("#auth")
    signUpParent.prepend(form)
    form.style.order = 1;
    form.style.marginTop = "20px";
    form.addEventListener('submit', requestRegistration)
}

function newHabitForm(){
    

    const fields = [
        { tag: 'input', attributes: { type: 'hidden', name: 'userID', id: 'userID', placeholder: 'Habit Name' } },
        { tag: 'input', attributes: { type: 'text', name: 'habitName', id: "habitName", placeholder: 'Habit Name' } },
        { tag: 'input', attributes: { type: 'text', name: 'quantity', id:"quantity", placeholder: 'Quantity'}},
        { tag: 'input', attributes: { type: 'text', name: 'units', id:"units", placeholder: 'Units'}},
        { tag: 'input', attributes: { type: 'submit', id:"create", value: 'Create Habit' } }
        
    ]
    const form = document.createElement('form');
    form.setAttribute("id", "newHabitForm")
    fields.forEach(f => {
        let field = document.createElement(f.tag);
        Object.entries(f.attributes).forEach(([a,v]) => {
            field.setAttribute(a,v)
            form.appendChild(field)
        })
    })

    newHabitFormParent=document.querySelector("#newHabitFormParent")
    let backButton = document.createElement("button");
    backButton.setAttribute("id", "backToHabits");
    backButton.setAttribute("class","backButton");
    backButton.textContent = "Back";
    backButton.addEventListener("click", (e) =>{
        e.preventDefault()
        areaReload(newHabitFormParent);
        let habitParent = document.querySelector("#habits")
        habitParent.style.display = "flex";
        
    })
    
    newHabitFormParent.append(backButton, form)
    form.addEventListener('submit', addNewHabit)
}

async function getHabits(){
    let token = localStorage.getItem('token')
    const user = jwt_decode(token);
    let userId = user.userId
    const options = {
        headers: new Headers({'Authorization': localStorage.getItem('token')}),
    }
    response = await fetch(`http://localhost:3000/habits/user/${userId}`,options)
    habits = await response.json()
    if (habits.err) {
        logout()
    }
    console.log(habits);
    let habitGrid = document.createElement("div")
    let habitGridParent = document.querySelector("#habits")
    habitGrid.setAttribute("id", "habitGrid");
    habitGridParent.append(habitGrid);
    await habits.map(r => renderHabit(r))
    if (habits.length < 6){
        let newHabitButton = document.createElement('button')
        newHabitButton.textContent  = "Add New Habit"
        newHabitButton.setAttribute("id","newHabitButton")
        let habitParent = document.querySelector("#habits")
        newHabitButton.addEventListener("click", (e) => {
            e.preventDefault()
            let userarea = document.querySelector("#user")
            userarea.style.display = "none";
            habitParent.style.display = "none";
            newHabitForm()
        })
        habitGrid.append(newHabitButton)
    }
    console.log(habits);
}

function renderHabit(data){
    let habitHolder = document.querySelector("#habitGrid");
    let habitParent = document.createElement("div");
    let habitName = document.createElement("p");
    habitParent.setAttribute("class","container");
    let habitRow = document.createElement("div");
    habitRow.setAttribute("class","row");
    let habitBootstrap = document.createElement("div")
    habitBootstrap.setAttribute("class","col-md-3 col-sm-6");
    let circularProgress = document.createElement('div');
    circularProgress.setAttribute("class","circular-progress-1");
    habitId = data._id;  
    circularProgress.setAttribute("id",habitId);
    const created_date = new Date();
    const date = `${created_date.getDate()}/${created_date.getMonth()}/${created_date.getFullYear()}`
    let completedAmount = data.history[date]
    if (!completedAmount){
        completedAmount = 0;
    }
    let circlePercentage = completedAmount *(360/data.quantity)
    circularProgress.style.setProperty('--percentage', `${completedAmount *(360/data.quantity)}deg`)
    let streakNumber = calcStreaks(data)
    let streak = document.createElement('p')
    streak.setAttribute("class","streak")
    streak.textContent = `Streak: ${streakNumber}`;
    if(!streakNumber){
        streak.style.display = "none";
    }
    habitName.setAttribute("id", data.habitName)
    habitName.setAttribute("class","habitName")
    habitName.textContent = data.habitName;
    let habitQuantity = document.createElement("p");
    habitQuantity.innerText= data.quantity;

    //Add buttons:
    let plusButton = document.createElement("button");
    plusButton.setAttribute("class", "plusButton")
    plusButton.setAttribute("id",habitId)
    plusButton.textContent = "+";
    plusButton.addEventListener("click", (e) => {
        console.log(plusButton.id);
        let habitid = plusButton.id;
        e.preventDefault()
        if (circlePercentage < 360){
            incrementHabit(habitid)
        } else {
            habitName.innerText = "Habit completed for today"
            setTimeout(()=>{habitName.innerText=habitName.id}, 2000)
        }
    })

    let minusButton = document.createElement("button");
    minusButton.setAttribute("class", "minusButton")
    minusButton.setAttribute("id",habitId)
    minusButton.textContent = "-";
    minusButton.addEventListener("click", (e)=>{
        let habitid= minusButton.id;
        e.preventDefault()
        if(circlePercentage >0){
            decrementHabit(habitid)
        }
    })

    let deleteButton = document.createElement("button");
    deleteButton.setAttribute("class", "deleteButton");
    deleteButton.setAttribute("id",habitId)
    deleteButton.textContent = "🗑️";
    deleteButton.addEventListener("click", (e)=>{
        let habitid = deleteButton.id;

        e.preventDefault();
        deleteHabit(habitid);
    })
    circularProgress.append(habitName, streak,minusButton, deleteButton, plusButton);
    habitBootstrap.append(circularProgress);
    habitRow.append(habitBootstrap);
    habitParent.append(habitRow);
    habitHolder.append(habitParent)

    
}



async function addNewHabit(e){
    e.preventDefault()
    try {
        let token = localStorage.getItem('token')
        let user = jwt_decode(token);
        let userID = user.userId;
        e.target.userID.value = userID;
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token')},
            body: JSON.stringify(Object.fromEntries(new FormData(e.target)))
        }
        const r = await fetch(`http://localhost:3000/habits/`, options)
        
        let section = document.querySelector("#habits")
        areaReload(section);
        let form = document.querySelector("#newHabitFormParent")
        areaReload(form);
        form.style.display= "none"

        section.style.display = "flex";
        getToken();
    }catch(err){
        console.log(err);
    }
}

async function incrementHabit(habitID){
    const options = {
        method: 'PATCH',
        headers: {"Authorization": localStorage.getItem('token')}
    }
    let response = await fetch(`http://localhost:3000/habits/habit/${habitID}/up`,options)
    let habits = await response.json()
    if (habits.err) {
        console.warn(err);
    }
    habitHolder = document.querySelector("#habits")
    areaReload(habitHolder);
    getToken();
}
async function decrementHabit(habitID){
    const options = {
        method: 'PATCH',
        headers: {"Authorization": localStorage.getItem('token')}
    }
    response = await fetch(`http://localhost:3000/habits/habit/${habitID}/down`,options)
    habits = await response.json()
    if (habits.err) {
       console.warn(err);
    }
    habitHolder = document.querySelector("#habits")
    areaReload(habitHolder);
    getToken();
}

async function deleteHabit(habitID){
    const options = {
        method: 'DELETE',
        headers: {"Authorization": localStorage.getItem('token')}
    }
    let response = await fetch(`http://localhost:3000/habits/habit/${habitID}`,options)
    let r = response.json()
    if(r.err){
        console.warn(err);
    }
    habitHolder = document.querySelector("#habits")
    areaReload(habitHolder);
    getToken();
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
    backButton = document.createElement("button");
    backButton.setAttribute("class", "backButton");
    backButton.innerText = "Back";
    userAreaParent =document.querySelector("#user");
    backButton.addEventListener("click", (e) =>{
        e.preventDefault()
        
        areaReload(userAreaParent);
        habitParent.style.display = "flex";

    })
    userArea.append(userName, userEmail, changePassword, logoutButton, backButton);
    userAreaParent.appendChild(userArea);

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
    backButton = document.createElement("button");
    backButton.setAttribute("class", "backButton");
    backButton.innerText = "Back";
    backButton.addEventListener("click", (e) =>{
        e.preventDefault()
        section = document.querySelector("#userArea");
        areaReload(section);
        buttonParent.style.display = "block";
        habitParent.style.display = "block";

    })
    userArea.append(userName, userEmail, changePassword, logoutButton, backButton);
    userAreaParent =document.querySelector("#user");
    userAreaParent.appendChild(userArea);

}



function getToken(){
    token = localStorage.getItem("token");
    if(!token){
        let signInButton = document.createElement("button");
        signInButton.setAttribute("id", "signInButton");
        signInButton.textContent = "Sign In";
        let registerButton = document.createElement("button");
        registerButton.setAttribute("id", "registerButton");
        registerButton.textContent = "Register";
        let backButton = document.createElement("button");
        backButton.setAttribute("id", "backButton");
        backButton.textContent = "Back";
        backButton.style.display = "none";
        backButton.style.order=2;
        let title = document.createElement('h1')
        title.textContent = "Welcome to HabTrac";
        
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
            let auth = document.querySelector("#auth");
            areaReload(auth);
            getToken();
        })

        buttonParent = document.querySelector("#auth");
        buttonParent.appendChild(title);
        buttonParent.appendChild(signInButton);
        buttonParent.appendChild(registerButton);
        buttonParent.appendChild(backButton);

    } else {
        document.querySelector("#auth").style.display = "none";
        document.querySelector("#user").style.display = "none";
        let userButton = document.createElement("button");
        userButton.textContent = localStorage.getItem("username");
        userButton.setAttribute("class", "userButton")
        let buttonParent = document.querySelector("#habits")
        buttonParent.appendChild(userButton);
        userButton.addEventListener('click', (e) =>{
            e.preventDefault()
            document.querySelector("#user").style.display = "block";
            loadUserArea()});
        getHabits();
    }
}



function areaReload(section){
    while(section.firstChild) {
        section.firstChild.remove()
    }
}


async function changePass(){
    section = document.querySelector("#userArea")
    areaReload(section);
    backButton = document.createElement("button");
    backButton.innerText = "Back";
    backButton.setAttribute("class", "back");
    backButton.addEventListener("click", (e) => {
        e.preventDefault()
        section = document.querySelector("#userArea")
        areaReload(section);
        loadUserArea();
    })
    section.append(backButton);
    const fields = [
        { tag: 'input', attributes: { type: 'password', name: 'currentPassword', id:"currentPassword", placeholder: 'Current Password' } },
        { tag: 'input', attributes: { type: 'password', name: 'newPassword', id:"newPassword", placeholder: 'New Password' } },
        { tag: 'input', attributes: { type: 'password', name: 'verifyNewPassword', id:"verifyNewPassword", placeholder: 'Confirm New Password' } },
        { tag: 'input', attributes: { type: 'hidden', name: 'userid', id:"userid" } },
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
                let token = localStorage.getItem('token')
                const user = jwt_decode(token);
                let userId = user.userId;
                e.target.userid.value = userId;
                const options = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json','Authorization': localStorage.getItem('token')},
                    body: JSON.stringify(Object.fromEntries(new FormData(e.target)))
                }
                const response = await fetch(`http://localhost:3000/users/changePassword`, options)
                const data = await response.json()
                if (!data.success) { throw new Error('Could not change Password'); }
                window.location.reload();
            } catch (err) {
                console.warn(err);
            }
        }
    })
}


function calcStreaks(data) {
    let flag = 1
    let quantity = data.quantity; //need to access this from the habit object
    let today = new Date()
    let days = 86400000 //number of milliseconds in a day
    let counter = 0;
    let habit = data.history;
    while(flag === 1){
    let previousDay = new Date(today - (1*days))
    let previousDate = `${previousDay.getDate()}/${previousDay.getMonth()}/${previousDay.getFullYear()}`
    if(habit[previousDate] >= quantity){
        counter ++
        today = previousDay
    } else{
        flag = 0;
        console.log(counter)
        return counter
    }
    }
}


getToken();
const form = document.getElementById('registration');

form.addEventListener('submit', addUser)

async function addUser(e) {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    const email = e.target.email.value;
    const details  = {
        username, 
        password, 
        email}
    const methods = {
        method: "POST",
        body: JSON.stringify(details),
        headers: {"Content-Type": "application/json"}
    };
    try {
        let response = await fetch("http://localhost:3000/INSERTCORRECTPATH")
        let jsonData = await response.json()
        console.log(jsonData)
    } catch (error) {
        console.log(error);
    }

}
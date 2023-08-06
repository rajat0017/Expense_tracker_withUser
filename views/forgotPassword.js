const forgotbtn = document.getElementById('forgotPass');

forgotbtn.addEventListener('click', forgotPassword);

async function forgotPassword() {
    const email = document.getElementById('email').value
    let obj = {
        email: email
    }
    const response = await axios.post("http://localhost:3000/called/password/forgotpassword", obj);
    alert(response.data.message);
    window.location.href = 'signup.html';
}
const forgotbtn = document.getElementById('forgotPass');

forgotbtn.addEventListener('click', forgotPassword);

async function forgotPassword(e) {
    e.preventDefault();
    const email = document.getElementById('email').value
    let obj = {
        email: email
    }
    const response = await axios.post("http://localhost:3000/password/forgotpassword", obj);
    alert(response.data.message);
}
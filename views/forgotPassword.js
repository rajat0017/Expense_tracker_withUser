const forgotbtn = document.getElementById('forgotPass');

forgotbtn.addEventListener('click', forgotPassword);

async function forgotPassword(e) {
    e.preventDefault();
    const email = document.getElementById('email').value
    let obj = {
        email: email
    }
    const response = await axios.post("http://http://16.16.185.160/password/forgotpassword", obj);
    alert(response.data.message);
}
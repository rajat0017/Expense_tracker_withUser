const btn = document.getElementById('signup');

btn.addEventListener('click', postuser);

var form = document.getElementById('form');

async function postuser(e) {
    e.preventDefault();
    try {
        var name = document.getElementById('name');
        var email = document.getElementById('email');
        var password = document.getElementById('password');
        var id = document.getElementById('id');
        let obj = {
            id: id.value,
            name: name.value,
            email: email.value,
            password: password.value
        }
        await axios.post("http://localhost:3000/user", obj);
        window.location.href = 'http://127.0.0.1:5501/views/login.html';
    }
    catch (err) {
        if(err.response.status==409){
          form.innerHTML += `<div style="color:red;">User Already Exist !</div>`;
        }
        else{
            form.innerHTML += `<div style="color:red;">All Fields are Mandatory</div>`;
          }
    }

}
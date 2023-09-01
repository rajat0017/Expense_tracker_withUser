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
        await axios.post("http://16.16.185.160:3000/user", obj);
        alert('User Created Succesfully')
        window.location.href = './login.html';
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
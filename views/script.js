const btn = document.getElementById('signup');

btn.addEventListener('click', postuser);

function postuser(e){
    e.preventDefault();
    var name = document.getElementById('name');
    var email = document.getElementById('email');
    var phone = document.getElementById('phone');
    var password = document.getElementById('password');
    let obj={
        name:name.value,
        email:email,
        phone:phone,
        password:password
    }
     axios.post("")
}
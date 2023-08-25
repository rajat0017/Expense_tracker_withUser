const btn = document.getElementById('login');

var form = document.getElementById('form');

btn.addEventListener('click', loginrequest);

async function loginrequest(e){
      e.preventDefault();
      try{
        var email= document.getElementById('email');
        var password= document.getElementById('password');
        let obj = {
           email:email.value,
           password:password.value
        }
        const response = await axios.post("http://13.49.64.209:3000/login",obj);
        if(response.status==200){
          alert(response.data.message);
          localStorage.setItem('token', response.data.token);
          window.location.href = './expense.html';
        } 
      }
      catch(err){
        if(err.response.status==400){
          form.innerHTML += `<div style="color:red;">User not authorized</div>`;
        }
        else if(err.response.status==404){
          form.innerHTML += `<div style="color:red;">User not found</div>`;
        }
        else{
          form.innerHTML += `<div style="color:red;">User not Found</div>`;
        }
      }
}
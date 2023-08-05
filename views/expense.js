const btn = document.getElementById('submit');

const form = document.getElementById('expenseForm');

btn.addEventListener('click', addexpense);

function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

window.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');
  const decodedToken = parseJwt(token);
  const premiumUser= decodedToken.ispremiumuser;
  if(premiumUser==true){
    premiumbtn();
    showleaderboard();
  }
  axios.get("http://localhost:3000/getExpense", {headers : {"Authorization":token}})
    .then((response) => {
      response.data.allExpense.forEach((ele) => {
        showonscreen(ele);
      })
    })
    .catch((err) => {
      console.log(err);
    })
})

function addexpense(e) {
  e.preventDefault()
  const id = document.getElementById('id').value;
  const expense = parseFloat(document.getElementById('expense').value);
  const catagory = document.getElementById('catagory').value;
  const description = document.getElementById('description').value;
  if (expense === '' || catagory === '' || description === '') {
    return alert('enter all details')
  }

  let obj = {
    id: id,
    expense: expense,
    catagory: catagory,
    description: description,
  }
  const token = localStorage.getItem('token');
  axios.post("http://localhost:3000/addexpense", obj, {headers : {"Authorization":token}});
  showonscreen(obj)

}

function showonscreen(e) {

  const expenselist = document.getElementById('expenseList');
  const expenseItem = document.createElement('div');
  expenseItem.className='expense-item';
  expenseItem.innerHTML = `Amount : ${e.expense}<br>Description : ${e.description}<br>Catagory : ${e.catagory}<hr>`;
  expenselist.appendChild(expenseItem);
 
  const deletebtn = document.createElement('button');
  deletebtn.textContent = 'Delete';
  deletebtn.className = 'delete-btn';
  deletebtn.addEventListener('click', () => {
    const token = localStorage.getItem('token');
    axios.delete(`http://localhost:3000/deleteExpense/${e.id}`,{headers : {"Authorization":token}});
    expenselist.removeChild(expenseItem);
});

  expenseItem.appendChild(deletebtn);

}

document.getElementById('rzp-button1').onclick= async function(e){
  const token = localStorage.getItem('token');
  const response = await axios.get('http://localhost:3000/purchase/premiummembership', {headers : {"Authorization":token}})
  console.log(response);
  var options = 
  {
    "key" : response.data.key_id,
    "order_id" : response.data.order.id,
    "handler" : async function (response) {
      const res = await axios.post('http://localhost:3000/purchase/updatetransactionstatus', {
        order_id: options.order_id,
        payment_id: response.razorpay_payment_id,
      }, {headers :{"Authorization":token}})
      premiumbtn();
      alert('you are a premium User Now')
      showleaderboard();
      localStorage.setItem('token', res.data.token)

    }
  };
  const rzp1 = new Razorpay(options);
  rzp1.open();
  e.preventDefault();

  rzp1.on('payment.failed', function(response){
    console.log(response)
    alert('something went wrong');
  })
}

function premiumbtn(){
  const updatebtn= document.getElementById('rzp-button1')
  updatebtn.textContent='Premium User';
  updatebtn.style.backgroundColor='green';
  updatebtn.style.color='white';
  updatebtn.disabled = true;
}

function showleaderboard(){
  const inputElement = document.createElement("input");
  inputElement.type = "button";
  inputElement.className='leaderboard';
  inputElement.value = 'Show Leaderboard'
  inputElement.onclick = async()=> {
    const token= localStorage.getItem('token')
    const userLeaderboardArray = await axios.get('http://localhost:3000/premium/showLeaderboard', {headers : {"Authorization":token}})
    console.log(userLeaderboardArray.data)
    var leaderboardElem = document.getElementById('leaderboard')
    leaderboardElem.innerHTML+=`<h2>LeaderBoard</h2>`
    userLeaderboardArray.data.forEach((userDetails)=> {
      leaderboardElem.innerHTML+=`<li>Name : ${userDetails.name}, Total Expense : ${userDetails.totalExpense}</li>`
    })
  }
   document.getElementById("message").appendChild(inputElement)
}
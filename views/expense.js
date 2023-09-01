const btn = document.getElementById('submit');

const form = document.getElementById('expenseForm');

btn.addEventListener('click', addexpense);
const token = localStorage.getItem('token');

let expensesPerPage ;
let currentPage = 1;
let totalExpenses = 0;


function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

window.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('token');
  const decodedToken = parseJwt(token);
  const premiumUser= decodedToken.ispremiumuser;
  if(premiumUser==true){
    premiumbtn();
    showleaderboard();
    download();
    getDownloads();
  }
  let savedExpensesPerPage = localStorage.getItem('expensesPerPage');
  if(!savedExpensesPerPage) {
    savedExpensesPerPage = 5;
}
  // if (savedExpensesPerPage) {
  //   expensesPerPage = parseInt(savedExpensesPerPage);

  // }
  try {
    const response = await axios.get("http://16.16.185.160:3000/getExpenses?page=1", {
      headers: {
        "Authorization": token,
        "rows": savedExpensesPerPage
      }
    });

    expensesData = response.data.expenses;
    totalExpenses = expensesData.length;
    updatePagination();

    showExpensesForPage(currentPage);
  } catch (err) {
    console.log(err);
  }
});

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
  axios.post("http://16.16.185.160:3000/addexpense", obj, {headers : {"Authorization":token}});
  showonscreen(obj)

}


function showonscreen(e) {
  const expenselist = document.getElementById('expenseList');

  if (expenselist) {
    const expenseItem = document.createElement('div');
    expenseItem.className = 'expense-item';
    expenseItem.innerHTML = `Amount: ${e.expense}<br>Description: ${e.description}<br>Category: ${e.catagory}<hr>`;

    const deletebtn = document.createElement('button');
    deletebtn.textContent = 'Delete';
    deletebtn.className = 'delete-btn';
    deletebtn.addEventListener('click', () => {
      const token = localStorage.getItem('token');
      axios.delete(`http://16.16.185.160:3000/deleteExpense/${e.id}`, { headers: { "Authorization": token } });
      expenselist.removeChild(expenseItem);
    });

    expenseItem.appendChild(deletebtn);
    expenselist.appendChild(expenseItem);
  } else {
    console.log('Expense list element not found.');
  }
}


document.getElementById('rzp-button1').onclick= async function(e){
e.preventDefault();
const token = localStorage.getItem('token');
try{
  const response = await axios.get('http://16.16.185.160:3000/purchase/premiummembership', {headers : {"Authorization":token}})
  var options = 
  {
    "key" : response.data.key_id,
    "order_id" : response.data.order.id,
    "handler" : async function (response) {
      const res = await axios.post('http://16.16.185.160:3000/purchase/updatetransactionstatus', {
        order_id: options.order_id,
        payment_id: response.razorpay_payment_id,
      }, {headers :{"Authorization":token}})
      premiumbtn();
      alert('you are a premium User Now')
      showleaderboard();
      download();
      localStorage.setItem('token', res.data.token)
    }
  };
  const rzp1 = new Razorpay(options);
  rzp1.open();
  e.preventDefault();

  rzp1.on('payment.failed', function(response){
    console.log(response)
    alert('something went wrong');
  })}
  catch(err){
    console.log(err);
  }
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
    const userLeaderboardArray = await axios.get('http://16.16.185.160:3000/premium/showLeaderboard', {headers : {"Authorization":token}})
    console.log(userLeaderboardArray.data)
    var leaderboardElem = document.getElementById('leaderboard')
    leaderboardElem.innerHTML+=`<h2>LeaderBoard</h2>`
    userLeaderboardArray.data.forEach((userDetails)=> {
      leaderboardElem.innerHTML+=`<li>Name : ${userDetails.name}, Total Expense : ${userDetails.totalExpense}</li>`
    })
  }
   document.getElementById("message").appendChild(inputElement)
}
 
 function download(){
  const inputEle = document.createElement("input");
  inputEle.type = "button";
  inputEle.className='download';
  inputEle.value = 'Download File'
  inputEle.onclick = async()=> {
  const token = localStorage.getItem('token');
  try{
    const response = await axios.get('http://16.16.185.160:3000/user/download', { headers: {"Authorization" : token} })
    if(response.status === 200){
      var a = document.createElement("a");
      a.href = response.data.fileURL;
      a.download = 'myexpense.csv';
      a.click();
  }
}
  catch(err){
    console.log(err);
  }
  }
document.getElementById("downloadexpense").appendChild(inputEle)
}

async function getDownloads(){
    try {
        const downloads = document.getElementById('previousDownload');
        const response = await axios.get('http://16.16.185.160:3000/user/get-downloads', {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        });
        downloads.innerHTML = '';

        response.data.downloads.forEach(download => {
            downloads.innerHTML += `<li>
                <a href="${download.fileUrl}">${download.date}</a>
            </li>`;
        });

    } catch (error) {
        console.log(error);
    }

}

async function showExpensesForPage(page) {

  const token = localStorage.getItem('token');
  let savedExpensesPerPage = localStorage.getItem('expensesPerPage');
  if(!savedExpensesPerPage) {
    savedExpensesPerPage = 5;
} 
  try {
    const response = await axios.get(`http://16.16.185.160:3000/getExpenses?page=${page}`, {
      headers: { Authorization: token ,
        "rows": savedExpensesPerPage}
    });
    const expenseList = document.getElementById('expenseList');

    expenseList.innerHTML = '';
    
    const expensesToShow = response.data.expenses;
    
    expensesToShow.forEach((ele) => {
      showonscreen(ele);
    });
    if(expensesToShow.length<10){
      const nextPageBtn = document.getElementById('nextPageBtn');
      nextPageBtn.disabled = true;
    }
    
    currentPage = page; 
    updatePagination();
  } catch (err) {
    console.log(err);
  }
}


function updatePagination() {
  const prevPageBtn = document.getElementById('prevPageBtn');
  const nextPageBtn = document.getElementById('nextPageBtn');
  const currentPageSpan = document.getElementById('currentPage');

  currentPageSpan.textContent = `Page ${currentPage}`;
  prevPageBtn.disabled = currentPage === 1;
  nextPageBtn.disabled = expensesPerPage < totalExpenses;
  
  
}

document.getElementById('prevPageBtn').addEventListener('click', (e) => {
  if (currentPage > 1) {
    currentPage--;
    showExpensesForPage(currentPage);
    updatePagination();
  }
  e.preventDefault()
});

document.getElementById('nextPageBtn').addEventListener('click', (event) => {

  currentPage = currentPage + 1;
  showExpensesForPage(currentPage);
  updatePagination();
  event.preventDefault();
});

function updateExpensesPerPage(newExpensesPerPage) {
  expensesPerPage = newExpensesPerPage;
  localStorage.setItem('expensesPerPage', expensesPerPage);
  // window.location.reload();
}


document.getElementById('expensesPerPageDropdown').addEventListener('change', (e) => {
  e.preventDefault()
  const newExpensesPerPage = parseInt(e.target.value);
  updateExpensesPerPage(newExpensesPerPage);
  showExpensesForPage(currentPage);
});.0
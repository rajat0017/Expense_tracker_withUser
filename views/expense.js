const btn = document.getElementById('submit');

btn.addEventListener('click', addexpense);

window.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');
  axios.get("http://localhost:3000/getExpense", {headers : {"Authorization":token}})
    .then((response) => {
      response.data.allUsers.forEach((ele) => {
        showonscreen(ele);
        totalexpense = ele.totalexpense;
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


const btn = document.getElementById('submit');

btn.addEventListener('click', addexpense);

let totalexpense = 0;

window.addEventListener('DOMContentLoaded', () => {
  axios.get("http://localhost:3000/getExpense")
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
  totalexpense += expense;
  if (expense === '' || catagory === '' || description === '') {
    return alert('enter all details')
  }

  let obj = {
    id: id,
    expense: expense,
    catagory: catagory,
    description: description,
    totalexpense: totalexpense
  }
  axios.post("http://localhost:3000/addexpense", obj);
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
    axios.delete(`http://localhost:3000/deleteExpense/${e.id}`);
    expenselist.removeChild(expenseItem);
});

  expenseItem.appendChild(deletebtn);

  const finalExpense = document.getElementById('totalexpense');
  finalExpense.textContent = `Total Expense: Rs.${e.totalexpense}`;
}


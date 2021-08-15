const budget_input_btn = document.getElementById('app_input-budget__btn');
const expense_input_btn = document.getElementById('app_input-expense__btn');
const budget_input_text = document.getElementById('budget');
const expense_name_input = document.getElementById('expense_name');
const expense_value_input = document.getElementById('expense_amount');

const budget_output_value_h2  = document.getElementById('budget_value');
const expense_output_value_h2 = document.getElementById('expense_value');
const balance_output_value_h2 = document.getElementById('balance_value');

const expense_detail_div = document.getElementById('expense_detail');

let expense_list = [];
let expense_id = 0;
let expense_value = 00;
let budget_value = 00;

budget_input_btn.addEventListener('click', () => {budgetInput()});
expense_input_btn.addEventListener('click', () => {expenseInput()});


function budgetInput() {
    budget_value = parseInt(budget_input_text.value); 

    modifyBudgetOutput();

    budget_input_text.value = '';
}

function expenseInput() {
    if(!(expense_name_input.value.length < 1 || expense_value_input.value.length < 1)) {
        expense_list.push({
            id: expense_id, 
            title: expense_name_input.value, 
            value: parseInt(expense_value_input.value)
        });

        expense_id += 1;
        expense_value += parseInt(expense_value_input.value);

        modifyBudgetOutput();
        expense_detail_div.innerHTML = "";
        expenseDetail();

        expense_name_input.value = '';
        expense_value_input.value = '';
    }
}

function modifyBudgetOutput(budget=budget_value, expense=expense_value) {
    budget_output_value_h2.textContent = budget;
    expense_output_value_h2.textContent = expense;

    balance_output_value_h2.textContent = calculateBalance(budget, expense);
}

function calculateBalance(budget) {
    let total = 0;
    for(let i=0; i<expense_list.length; i++) {
        total += expense_list[i].value;
    }
    let balance = budget - total;
    return balance;
}

function expenseDetail() {
    expense_list.map(item => {
        expense_detail_div.innerHTML += `<div id = "item-${item.id}">
            <p>${item.title}</p>
            <p>${item.value}</p>
            <div>
                <button class="${item.id} edit_expense" onclick="editExpense(${item.id})">Edit</button>
                <button class="${item.id} delete_expense" onclick="deleteExpense(${item.id})">Delete</button>
            </div>
        </div>`
    });
}

function editExpense(id) {
    const expense_clicked = document.getElementById(`item-${id}`);
    const expense_detail = expense_clicked.getElementsByTagName('p');

    expense_name_input.value = expense_detail[0].innerText;
    expense_value_input.value = expense_detail[1].innerText;

    expense_value -= parseInt(expense_detail[1].innerText);

    expense_list = expense_list.filter(item => item.id != id)
    expense_detail_div.innerHTML = '';
    expenseDetail();
    modifyBudgetOutput();
    console.log(expense_list);
}

function deleteExpense(id) {
    const expense_clicked = document.getElementById(`item-${id}`);
    const expense_detail = expense_clicked.getElementsByTagName('p');

    expense_value -= parseInt(expense_detail[1].innerText);

    expense_list = expense_list.filter(item => item.id != id)

    expense_detail_div.innerHTML = '';
    expenseDetail();
    modifyBudgetOutput();
}
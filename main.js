//INPUTS
const dayInput = document.getElementById('day_input');
const monthInput = document.getElementById('month_input');
const yearInput = document.getElementById('year_input');

//OUTPUTS
const dayOutput = document.getElementById('day_output');
const monthOutput = document.getElementById('month_output');
const yearOutput = document.getElementById('year_output');

//FORM ELEMENT
const form = document.querySelector('form');

//ADDING THE SUBMIT EVENTLISTENER TO FORM
form.addEventListener('submit', handleSubmit);

const date = new Date();
let day = date.getDate();
let month = 1 + date.getMonth();
let year = date.getFullYear();

const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function validate() {
    const inputs = document.querySelectorAll('input');
    let validator = true;
    inputs.forEach((i) => {
        const parent = i.parentElement;
        if (!i.value) {
            i.style.borderColor = "hsl(0, 60%, 45%)";
            parent.style.color = "red";
            parent.querySelector('small').innerText = "This field is required.";
            validator = false;
        } else if (monthInput.value > 12 || monthInput.value < 0) {
            document.querySelector('#month_text').style.color = "red";
            monthInput.style.borderColor = "hsl(0, 60%, 45%)";
            monthInput.parentElement.querySelector('small').innerText = "Must be a valid month.";
            validator = false;
        } else if (dayInput.value > 31 || dayInput.value < 0) {
            document.querySelector('#day_text').style.color = "red";
            dayInput.style.borderColor = "hsl(0, 60%, 45%)";
            dayInput.parentElement.querySelector('small').innerText = "Must be a valid day.";
            validator = false;
        } else {
            i.style.borderColor = "black";
            parent.querySelector('small').innerText = "";
            validator = true;
        }
    })
    return validator;
}

function handleSubmit(e) {
    e.preventDefault();
    if (validate()) {
        if (dayInput.value > day) {
            day = day + months[month-1];
            month = month - 1;
        }
        if (monthInput.value > month) {
            month = month + 12;
            year = year - 1;
        }

        const d = day - dayInput.value;
        const m = month - monthInput.value;
        const y = year - yearInput.value;

        dayOutput.innerHTML = d;
        monthOutput.innerHTML = m;
        yearOutput.innerHTML = y;
    }
}
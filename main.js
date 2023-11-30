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
let currentDay = date.getDate();
let currentMonth = 1 + date.getMonth();
let currentYear = date.getFullYear();

const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function validate() {
    const inputs = document.querySelectorAll('input');
    let validator = true;
    inputs.forEach((i) => {
        const parent = i.parentElement;
        if (!i.value) {
            i.style.borderColor = "hsl(0, 60%, 45%)";
            parent.style.color = "red";
            parent.querySelector('small').innerText = "This field is required";
            validator = false;
        } else if (monthInput.value > 12 || monthInput.value < 0) {
            monthError();
            monthInput.parentElement.querySelector('small').innerText = "Must be a valid month";
            validator = false;
        } else if (dayInput.value > 31 || dayInput.value < 0) {
            dayError();
            dayInput.parentElement.querySelector('small').innerText = "Must be a valid day";
            validator = false;
        } else if (yearInput.value > currentYear ) {
            yearError();
            yearInput.parentElement.querySelector('small').innerText = "Must be in the past";
            validator = false;
        } else if (yearInput.value == currentYear && monthInput.value > currentMonth) {
            monthError();
            monthInput.parentElement.querySelector('small').innerText = "Must be in the past";
            validator = false;
        } else if (yearInput.value == currentYear && monthInput.value == currentMonth && dayInput.value > currentDay ) {
            dayError();
            dayInput.parentElement.querySelector('small').innerText = "Must be in the past";
            validator = false;
        } else if (dayInput.value > months[monthInput.value - 1]) {
            if(monthInput.value == 2 && dayInput.value == 29 && (yearInput.value % 4) == 0){
                validator = true;
                return validator;
            }
            dayError();
            dayInput.parentElement.querySelector('small').innerText = "Must be a valid date";
            validator = false;
        } else {
            i.style.borderColor = "black";
            parent.querySelector('small').innerText = "";
            validator = true;
        }
    })
    return validator;
}

//HANDLING ERRORS
function dayError() {
    document.querySelector('#day_text').style.color = "red";
    dayInput.style.borderColor = "hsl(0, 60%, 45%)";
}

function monthError() {
    document.querySelector('#month_text').style.color = "red";
    monthInput.style.borderColor = "hsl(0, 60%, 45%)";
}

function yearError() {
    document.querySelector('#year_text').style.color = "red";
    yearInput.style.borderColor = "hsl(0, 60%, 45%)";
}

//SUBMIT
function handleSubmit(e) {
    e.preventDefault();
    if (validate()) {
        if (dayInput.value > currentDay) {
            currentDay = currentDay + months[currentMonth-1];
            currentMonth = currentMonth - 1;
        }

        if (monthInput.value > currentMonth) {
            currentMonth = currentMonth + 12;
            currentYear = currentYear - 1;
        }

        const d = currentDay - dayInput.value;
        const m = currentMonth - monthInput.value;
        const y = currentYear - yearInput.value;

        // ANIMATING THE DISPLAY
        let dd = dayOutput;
        let mm = monthOutput;
        let yy = yearOutput;        
        function animate(i,t){
            setTimeout(function() { t.innerHTML = i; }, 100 * i)
        }

        for(let i=0; i <= y; i++) {
            animate(i,yy);
        }

        for(let i=0; i <= m; i++) {
            animate(i,mm);
        }
        
        for(let i=0; i <= d; i++) {
            animate(i,dd);
        }        
    }
}

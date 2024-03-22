import throttle from 'lodash.throttle';

const FORM_STATE="feedback-form-state";
const formEl= document.querySelector('.feedback-form');

formEl.addEventListener('input', throttle(onImputChange,500));
formEl.addEventListener('submit',onFormSubmit);


const formData = {};

populateForm();

function onFormSubmit(event) {

    event.preventDefault();
    console.log(formData);
    formEl.reset();
    localStorage.removeItem(FORM_STATE); 
      
}

function onImputChange(event) {
     
    formData[event.target.name]=event.target.value;
    localStorage.setItem(FORM_STATE, JSON.stringify(formData));
    console.log(formEl.email.value);
    console.log(formEl.message.value);
    
}


function populateForm() {

    const storageData=JSON.parse(localStorage.getItem(FORM_STATE));
   
    if (storageData) {
        console.log(storageData);
        formEl.email.value=storageData.email;
        formEl.message.value=storageData.message;
    }
}

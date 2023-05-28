import "@babel/core";
import { login, reset, signUp } from './auth.js';
import { disableLicense } from './licenses.js';

//DOM elements
const loginForm = document.querySelector('form.login');
const signupForm = document.querySelector('form.signUp');
const resetPasswdForm = document.querySelector('form.reset');
const deleteLicenseBtns = document.querySelectorAll('button#deleteVectorBtn');


if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.querySelector('form.login input#email').value;
        const passwd = document.querySelector('form.login input#passwd').value;

        login(email, passwd);
    })
}
if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.querySelector('form.signUp input#name').value;
        const email = document.querySelector('form.signUp input#email').value;
        const passwd = document.querySelector('form.signUp input#passwd').value;

        signUp(name, email, passwd);
    })
}
if (resetPasswdForm) {
    resetPasswdForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.querySelector('form.reset input#email').value;
        const passwd = document.querySelector('form.reset input#passwd').value;

        reset(email, passwd);
    })
}

if (deleteLicenseBtns) {
    for (var i = 0; i < deleteLicenseBtns.length; i++) {
        deleteLicenseBtns[i].addEventListener('click', (e) => {
            const targetElement = e.target;
            if (targetElement.tagName === 'IMG') {
                // Find the nearest button parent element
                var buttonElement = targetElement.closest('button');

                // Access the properties/attributes of the button element
                var buttonValue = buttonElement.value;

                // Do something with the button value
                disableLicense(buttonValue);
            }
        })
    }
}
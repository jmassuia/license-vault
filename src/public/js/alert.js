export const hideAlert = () => {
    const el = document.querySelector(".error");
    if (el) el.parentElement.removeChild(el);
};

export const showAlert = (title, message) => {
    hideAlert();

    //Creating alerts
    const markup = `<div class="error"><div class="error__title"><h2 class="heading-secondary heading-secondary--error">${title}</h2><h2 class="error__emoji">😢 🤯 </h2></div><div class="error__msg">${message}</div></div>`;
    document.querySelector("body").insertAdjacentHTML("afterbegin", markup);

    //Hiding alerts after 5s
    window.setTimeout(hideAlert, 5000);
};
// Cores de Formatação
const red = "#ff0037";
const redImg = "invert(100%) brightness(40%) sepia(100%) saturate(7500%)";
const green = "#00aaa7";
const greenImg = "invert(100%) grayscale(100%) brightness(40%) sepia(100%) hue-rotate(130deg) saturate(200%) contrast(1.3)";
const white = "rgba(255, 255, 255, 0.75)";
const trueWhite = "rgb(255, 255, 255)";
const whiteImg = "invert(100%)";
const grey = "rgb(150,150,150)";
const greyImg = "invert(100%) grayscale(100%) brightness(70%)";

// Utilitarios de Formatação
var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{1,})+$/;

// Código principal
let body = document.body;
let email = document.getElementById('inu');
let password = document.getElementById('inp');
let button = document.getElementById('button');
let checkbox = document.getElementById('checkbox');
let label = document.getElementById('lu');
let imgCheckbox = document.getElementById('img');

email.addEventListener('focus', customFocus);
email.addEventListener('input', customValidate);
email.addEventListener('focusout', customFocusOut);

password.addEventListener('focus', customFocus);
password.addEventListener('input', customValidate);
password.addEventListener('focusout', customFocusOut);

button.addEventListener('click', buttonRipple);

checkbox.addEventListener('click', changeVisibility);

document.querySelector("form")
    .addEventListener("submit", event => {
        event.preventDefault();

        const validEmail = email.value.match(mailformat);
        const validPass = password.value.length > 0;

        if (email.value.length == 0 && password.value.length == 0) {
            emptyFields();
        }
        else if (validEmail && validPass) {
            sendForm();
        }
    });

// Focus 
function customFocus(event) {
    const field = event.target;

    let div = document.getElementById(field.type == 'email' ? 'span1' : 'span2');
    let span = div.getElementsByTagName('span');

    span = span[0].innerText.length;

    if (field.type == "email" && span < 1) {
        const error = verifyErrors(field);
        const message = customMessage(field, error);
        customColor('lu', 'iu', 'inu', field, 'green');
        setCustomMessage(field);
    }
    else if (field.type == "password" && span < 1) {
        const error = verifyErrors(field);
        const message = customMessage(field, error);
        customColor('lp', 'ip', 'inp', field, 'green');
        setCustomMessage(field);
    }
};

// Validation
function customValidate(event) {
    const field = event.target;

    const error = verifyErrors(field);

    if (email.value.length != 0) {
        label.style.transform = "translateY(-18px)";
        label.style.fontSize = "0.8em";
    }
    else {
        label.style.transform = "";
        label.style.fontSize = "";
        label.style.letterSpacing = "";
    }

    if (error) {
        const message = customMessage(field, error);

        if (message == "E-mail não pode ser vazio" || message == "E-mail não válido") {
            customColor('lu', 'iu', 'inu', field, 'red');
            setCustomMessage(field, message);
        }
        else if (message == "Senha não pode ser vazia") {
            customColor('lp', 'ip', 'inp', field, 'red');
            setCustomMessage(field, message);
        }
    }
    else {
        if (field.type == "email" && email.value.match(mailformat)) {
            customColor('lu', 'iu', 'inu', field, 'green');
            setCustomMessage(field);
        }
        if (field.type == "password" && password.value.length > 0) {
            customColor('lp', 'ip', 'inp', field, 'green');
            setCustomMessage(field);
        }
    }
}

function verifyErrors(field) {
    let foundError = false;

    for (let error in field.validity) {
        // se não for customError
        // então verifica se tem erro
        if (field.validity[error] && !field.validity.valid) {
            foundError = error;
        }
    }
    return foundError;
}

// FocusOut
function customFocusOut(event) {
    let target = event.target.type;
    const field = event.target;

    if (field.type == "email") {
        if (email.value.match(mailformat)) {
            customColor('lu', 'iu', 'inu', field, 'white');
        }
        else if (email.value.length == 0) {
            const error = verifyErrors(field);
            const message = customMessage(field, error);
            customColor('lu', 'iu', 'inu', field, 'red');
            setCustomMessage(field, message);
        }

    }
    if (field.type == "password") {
        if (password.value.length > 0) {
            customColor('lp', 'ip', 'inp', field, 'white');
        }
        else if (password.value.length == 0) {
            const error = verifyErrors(field);
            const message = customMessage(field, error);
            customColor('lp', 'ip', 'inp', field, 'red');
            setCustomMessage(field, message);
        }
    }
}

// Comportamento da animação
function addShakeAnimation(label) {
    label.classList.add("shakeAnimation");
}

function removeShakeAnimation(label) {
    label.classList.remove("shakeAnimation");
    label.offsetHeight;
}

// Comportamento das cores
function customColor(labelID, imgID, inputID, field, color) {
    let label = document.getElementById(labelID);
    let imgForm = document.getElementById(imgID);
    let input = document.getElementById(inputID);

    if (color == "red") {
        label.style.color = red;
        imgForm.style.filter = redImg;
        input.style.caretColor = red;
        field.style.borderColor = red;

        addShakeAnimation(label);
        if (field.type == "password")
            imgCheckbox.style.filter = redImg;
    }
    else if (color == "green") {
        label.style.color = green;
        imgForm.style.filter = greenImg;
        input.style.caretColor = green;
        field.style.borderColor = green;

        if (field.type == "password")
            imgCheckbox.style.filter = greenImg;
    }
    else if (color == "white") {
        label.style.color = white;
        imgForm.style.filter = whiteImg;
        input.style.caretColor = white;
        field.style.borderColor = white;
        field.style.borderBottomStyle = "solid";

        removeShakeAnimation(label);

        if (field.type == "password") {
            imgCheckbox.style.filter = whiteImg;
            password.style.color = trueWhite;
        }
        else {
            email.style.color = trueWhite;
        }
    }
    else {
        label.style.color = grey;
        imgForm.style.filter = greyImg;
        input.style.caretColor = grey;
        field.style.borderColor = grey;
        field.style.borderBottomStyle = "dashed";

        if (field.type == "password") {
            imgCheckbox.style.filter = greyImg;
            password.style.color = grey;
        }
        else {
            email.style.color = grey;
        }
    }
}

// Mensagem customizadas
function customMessage(field, typeError) {
    const messages = {
        password: {
            valueMissing: "Senha não pode ser vazia"
        },
        text: {
            valueMissing: "Senha não pode ser vazia"
        },
        email: {
            valueMissing: "E-mail não pode ser vazio",
            typeMismatch: "E-mail não válido"
        },
    }

    return messages[field.type][typeError];
}

function setCustomMessage(field, message) {
    let spanError;

    if (field.id == "inu")
        spanError = document.getElementById("span1").parentNode.querySelector("span.error");
    else
        spanError = document.getElementById("span2").parentNode.querySelector("span.error");

    if (message) {
        spanError.classList.add("active");
        spanError.innerHTML = message;
    } else {
        spanError.classList.remove("active");
        spanError.innerHTML = "";
    }
}

// Troca da Visibilidade Checkbox
function changeVisibility() {
    if (password.type === "password") {
        password.type = "text";
        imgCheckbox.src = "visibility.png";
    }
    else {
        password.type = "password";
        imgCheckbox.src = "visibility_off.png";
    }
}

// Envio do formulario
function sendForm() {
    customColor('lu', 'iu', 'inu', email, 'grey');
    customColor('lp', 'ip', 'inp', password, 'grey');

    queryButtonAnimation();
}

function emptyFields() {
    email.focus();
    password.focus();
    password.blur();

    console.log("Não Valido");
}

function buttonRipple(event) {
    const hiddenH = document.getElementById('hiddenH');

    let x = event.target.offsetLeft + 55;
    let y = event.target.offsetTop + 23;

    let ripples = document.createElement('span');

    ripples.style.left = x + 'px';
    ripples.style.top = y + 'px';

    this.appendChild(ripples);

    setTimeout(() => {
        ripples.remove();
    }, 1000);
}

async function queryButtonAnimation() {
    button.textContent = "";

    let span = document.createElement('span');
    button.appendChild(span);

    setTimeout(query, 1000 * 3);
}

function query() {
    if (button.children.length > 0)
        button.removeChild(button.lastElementChild);
    button.textContent = 'Login';

    customColor('lu', 'iu', 'inu', email, 'white');
    customColor('lp', 'ip', 'inp', password, 'white');


    let div = document.getElementById('errorMessage');

    errorSpan(div);
}

function errorSpan(div) {
    let divChild = div.children.length;

    let span = document.createElement('span');

    span.innerHTML = "Usuário não encontrado";
    span.style.color = trueWhite;
    span.style.backgroundColor = "#ff0037";
    span.style.border = "none";
    span.style.borderRadius = "5px";
    span.style.padding = "10px";
    span.style.height = "40px";
    span.style.marginTop = "10px"

    span.style.transition = "all 1s ease-out";

    div.appendChild(span);

    if (divChild >= 0) {
        setTimeout(function () {
            span.style.color = trueWhite;
            span.style.backgroundColor = "#00AAA7";
        }, 1000 * 2);
        if (divChild == 2) {
            div.removeChild(div.firstElementChild);
        }
        else {
            setTimeout(function () {
                div.removeChild(div.firstElementChild);
            }, 1000 * 3);
        }
    }
}

/* register.js */

let form = document.getElementById("register-form");
let inputs = document.getElementsByTagName('input');
let submitBtn = document.getElementById("register-submit-btn");
let registerMessageField = document.getElementById("register-message");

/************ all input fields **************/
let usernameField = document.getElementById("username");
let emailField = document.getElementById("email");
let passwordField = document.getElementById("password");
let passwordConfirmationField = document.getElementById("passwordConfirmation");

/***********/
let ajaxTest = document.getElementById('ajaxTest');
//note, the origin its based of the html file, not the JS
const path = "php/insertUser.php";
const loginpath = "login.html";









form.addEventListener('submit', (e)=>{
    e.preventDefault();

    //password and confirmation are equal
    if( passwordField.value == passwordConfirmationField.value ) {
        disableAllInputs();    
        passwordConfirmationField.parentElement.classList.remove("wrong");
        addFormMessage("Sending", "sending");
        let username = usernameField.value.toLowerCase();
        //let email = emailField.value.toLowerCase();
        let password = passwordField.value;
        

        //username. email, password;
        //sendTodb( username, email, password );
        sendTodb( username, password );
    }
    else {
        passwordConfirmationField.parentElement.classList.add("wrong");
    }
   
});




//not so important functions HERE <---
{

    function clearAllInputs() {
        for(i=0; i<inputs.length; i++) {
            inputs[i].value = "";
        }
        submitBtn.value = "Register";
    }
    
    function disableAllInputs() {
        for( i=0; i<inputs.length; i++) {
            inputs[i].setAttribute('disabled', 'disabled');
        }
    }
    
    function enableAllInputs() {
        for( i=0; i<inputs.length; i++) {
            inputs[i].removeAttribute("disabled");
        }
    }
    
    function addFormMessage(text, atrr) {
        registerMessageField.textContent = text;
        registerMessageField.setAttribute("status", atrr);
        //messageField.classList.add(className);
    }
    
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
//HERE


async function sendTodb( username, password ) {
    console.log('sendTodb');
    const phpRequest = String(await( insertToDB( username, password ) )) ;
    console.log( phpRequest );

    switch( phpRequest ) {
        case "PHP: User inserted into the database": 
        addFormMessage( "User Added", "in" );
        sleep(1500);
        window.location.href = loginpath;
        break;
        
        case "PHP: USERNAME ALREADY EXISTS": 
        addFormMessage("Userame Already Taken", "wrong"); 
        enableAllInputs();
        break;
        
        case "PHP: EMAIL ALREADY IN USE":
            addFormMessage("Email Already In Use", "wrong");
            enableAllInputs();
            break;
        }
}



//username, email, password
async function insertToDB( username, password ) {
    return new Promise( (resolve, reject) =>{
        let xhr = new XMLHttpRequest();
        xhr.open( 'POST', path, true );
        xhr.setRequestHeader( 'Content-type',
        'application/x-www-form-urlencoded' );

        xhr.onload = function() {
            if( this.status == 200 ) {
                resolve( this.responseText );
            }
        }
        xhr.send( "username="+username+ "&password="+password );
    } );
}
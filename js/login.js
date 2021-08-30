let loginForm = document.getElementById("login-form");
let userInput = document.getElementById("username");
let passwordInput = document.getElementById("password");

let loginFormMessage = document.getElementById("login-message");
let loginInputs = loginForm.getElementsByTagName("input");
const path = "php/login.php";


loginForm.addEventListener( 'submit', (e)=>{
    e.preventDefault();
    addFormMessage("sending", "sending");
    disableAllInputs();
    //console.log(userInput.value, passwordInput.value);
    checkIfUserExists( userInput.value, passwordInput.value );
} );



function checkIfUserExists( username, password ) {
    let xhr = new XMLHttpRequest();
    xhr.open( 'POST', path, true );
    xhr.setRequestHeader( 'Content-type',
    'application/x-www-form-urlencoded' );

    xhr.onload = function() {
        if( this.status == 200 ) {
            dataRecieved( this.responseText);
        }
    };
    xhr.send( "username="+username+"&password="+password );
}

let dataRecieved = function(text) {
    console.log(text);
    switch( String(text) ) {
        case "logged successfully":
            addFormMessage( text, "correct" );
            break;
        default:
            addFormMessage( text, "wrong" );
            enableAllInputs();
    }
}

{ //not so important functions

    function addFormMessage(text, attr) {
        loginFormMessage.textContent = text;
        loginFormMessage.setAttribute('status', attr);
    }
    
    function disableAllInputs() {
        for( i=0; i<loginInputs.length; i++) {
            loginInputs[i].setAttribute('disabled', 'disabled');
        }
    }
    
    function enableAllInputs() {
        for( i=0; i<loginInputs.length; i++) {
            loginInputs[i].removeAttribute("disabled");
        }
    }

}
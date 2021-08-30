const header_teamplate_dir = `html_elements/header.html`;

window.addEventListener('load', () => {
    let request = new XMLHttpRequest();
    request.open( 'GET', header_teamplate_dir , true );
    request.onload = function() {
        if( this.status >= 200 && this.status <400) {
            addToPage(this.response);
        } else {
            console.log( `error: ${this.status}` );
        }
    };
    request.send();    
});

const header = document.getElementById("page-header");



function addToPage(content) {
    header.innerHTML = content;
}



function displayHeaderList() {
    const headerList = document.getElementById("header-list");
    const headerBtn = document.getElementById("header-toggle-btn");
    
    headerList.classList.toggle("show");
    headerBtn.classList.toggle("show");
}

//close when headerlist when clicked outside of the list or the btn.

document.addEventListener('click', (e) => {
    const headerList = document.getElementById("header-list");
    const headerBtn = document.getElementById("header-toggle-btn");

//if closest is not used it has certain problems with the box
    if( e.target == headerList || e.target.closest("#header-toggle-btn")) {
        return;
    } else {
        headerList.classList.remove("show");
        headerBtn.classList.remove("show");
    }
});
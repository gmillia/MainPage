const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {

    $(".container").addClass("right-panel-active");
    //container.classList.add("right-panel-active");
    //$(".signInModelContent")[0].style.background = "red";
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});
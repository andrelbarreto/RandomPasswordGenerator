// Setting all variables including the ones with selectable characters for numbers, letters (uppercase or lowercase) and special chars

var clipboard = new Clipboard('.copy');
var slider = document.querySelector("#length");


var lowercase = "abcdefghijklmnopqrstuvwxyz",
  uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers = "0123456789",
  punctuatioin = "!@#$%^&*()_+~`|}{[]:;?><,./-=",
  lowercaseInput = document.getElementById("lowercase"),
  uppercaseInput = document.getElementById("uppercase"),
  punctuationInput = document.getElementById("punctuation"),
  numbersInput = document.getElementById("numbers"),
  lengthInput = document.getElementById("length"),
  passwordFeild = document.getElementById("pass-field"),
  generateButton = document.getElementById("generate"),
  copyButton = document.getElementById("copy"),
  plength,
  userPassword,
  passwordCharSet;
 

// creating a function that checks which chars were selected and generates random password based on it

function generate() {
  userPassword = "";
  passwordCharSet = "";
  if (lowercaseInput.checked) {
    passwordCharSet += lowercase;
  }
  if (uppercaseInput.checked) {
    passwordCharSet += uppercase;
  }
  if (punctuationInput.checked) {
    passwordCharSet += punctuation;
  }
  if (numbersInput.checked) {
    passwordCharSet += numbers;
  }
  plength = Number(lengthInput.value);
 
  for (let i = 0; i < plength; i++) {
    userPassword += passwordCharSet.charAt(
      Math.floor(Math.random() * passwordCharSet.length)
    );
  }
  if (userPassword == "") {
    let alertbox = document.getElementById('alert');
    alertbox.innerHTML = "Please select an option before generating"
    alertbox.classList.add('fail');
    setTimeout(function(){ 
      alertbox.classList.remove('fail');
    }, 3000);
  } else {
    passwordFeild.innerHTML = userPassword;
  }
  copyButton.setAttribute("data-clipboard-text", userPassword)
}
generateButton.addEventListener("click", generate);
 
// copy password to clipboard
clipboard.on('success', function(e) {
    console.info('Action:', e.action);
    console.info('Text:', e.text);
    console.info('Trigger:', e.trigger);
    let alertbox = document.getElementById('alert');
    alertbox.innerHTML = "Copied!"
    alertbox.classList.add('success');
    setTimeout(function(){ 
      alertbox.classList.remove('success');
    }, 3000);
    
    e.clearSelection();
});
 
// If copy fails on first attempt
clipboard.on('error', function(e) {
    console.error('Action:', e.action);
    console.error('Trigger:', e.trigger);
  let alertbox = document.getElementById('alert');
    alertbox.innerHTML = "Try select the text to copy"
    alertbox.classList.add('fail');
    setTimeout(function(){ 
      alertbox.classList.remove('fail');
    }, 3000);
});

/* 

   //An earlier draft with simpler function to copy password to clipboard, please look that it works in case the clipboard / alertbox and other library calls I made for this exercise  were not supposed to be used since I learned it later
   function CopytoClipboard(){
        document.getElementById("display").select();
        document.execCommand("Copy");
        alert("Password copied to clipboard");
**/

// Check slider to show exact length of password chosen live on the page
slider.addEventListener("change", function(){

  var currentLength = slider.value;

  var len = document.getElementById("len")

  len.textContent = currentLength;

})

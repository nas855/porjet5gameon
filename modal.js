function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

const closeModal=document.querySelector('.close')
const content=document.querySelector('.content')
const bground=document.querySelector('.bground')
const modalBody=document.querySelector('.modal-body')

//Retrieve the "location" input which is checked (if there is one)
const locationInputs = document.querySelectorAll('input[name="location"]');
console.log(locationInputs)

// listen to the event on the radio-type input checkbox
locationInputs.forEach((input) => {
  input.addEventListener("click", () => {
    console.log(input.value);
  });
});

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
  content.style.display= "block"; 
}

// close modal event
closeModal.addEventListener("click", close);

// close modal form
function close() {
  content.style.display= "none";
  modalbg.style.display="none";
}



// validation form
function validate () {
  const firstname = document.forms["reserve"]["first"]
  const lastname = document.forms["reserve"]["last"]
  const email = document.forms["reserve"]["email"]
  const birthdate = document.forms["reserve"]["birthdate"]
  const quantity = document.forms["reserve"]["quantity"]

  //Retrieve the "location" input which is checked (if there is one)
  const locationChecked = document.querySelector('input[name="location"]:checked');
  // acceptation the terms of use.
  const accept= document.querySelector('input[id="checkbox1"]:checked')
  
  

  if (!/^[a-zA-Z]{2,}$/.test(firstname.value.trim()) ) {
    alert ('Veuillez entrer 2 caractères ou plus pour le champ du prénom');
    firstname.focus();
    return false;  
  }
  
  if (!/^[a-zA-Z]{2,}$/.test(lastname.value.trim()) ) { 
    alert('Veuillez entrer 2 caractères ou plus pour le champ du nom'); 
    lastname.focus();        
    return false;
  }
  
  if ( !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value) ) {
    alert("Mettez une adresse email valide."); 
    email.focus(); 
    return false;     
  }

 
  
  if (!/^([0-9]{4})-([0-9]{2})-([0-9]{2})$/.test(birthdate.value)) {

    alert("Vous devez entrer votre date de naissance."); 
    birthdate.focus();        
    return false;
  }
  
  if ( quantity.value=='' || 99 < quantity.value || quantity.value < 0  ) {
    alert("Mettez un chiffre entre 0 et 99."); 
    quantity.focus();        
    return false;
  }
  
  if (!locationChecked) {   
    alert("Vous devez choisir une option."); 
    return false;
  }
  if (!accept){
    alert ("Vous devez vérifier que vous acceptez les termes et conditions'")
    return false;
  }
   
  return true ;
 
}






function result (event) {
  if (validate ()==true){

//make window modal black
const erase1=document.querySelectorAll('.text-control')
const erase2=document.querySelectorAll('label')

erase1.forEach((element)=>element.style.opacity= "0")
for (const erase of  erase2 ) {
  console.log(erase.style.opacity="0")
 }

// transform text  "c'est parti" in "FERMER"
 const transformText = document.querySelector('input[value="C\'est parti"]')
 transformText.setAttribute("value", "supprimer");

// text :"" Merci pour votre inscription"
let b = document.body;
let p1 = document.getElementById('email');
let newP = document.createElement('p');

newP.textContent = 'Merci pour votre inscription';
newP.style.textAlign="center";

p1.insertAdjacentElement('afterend', newP)

event.preventDefault()

}
}


const btnSubmit =document.querySelector('.btn-submit')
btnSubmit.addEventListener("click", result);






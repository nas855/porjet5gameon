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
const input = document.querySelector('input')

//Retrieve the "location" input which is checked (if there is one)
const locationInputs = document.querySelectorAll('input[name="location"]');
console.log(locationInputs)



// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
  content.style.display= "block"; 
  closeValidate ()
 

}

// close modal event
closeModal.addEventListener("click", close);

// close modal form
function close() {
  content.style.display= "none";
  modalbg.style.display="none";
  
}



// Fonction générique pour afficher un message d'erreur
function showError(element, errorMessage, errorId) {
  const errorExist = document.getElementById(errorId);
  if (!errorExist) {
    let newP = document.createElement('p');
    newP.textContent = errorMessage;
    newP.style.color = "red";
    newP.style.fontSize = '12px';
    if (!element.style.border) { // Vérifie si la bordure n'est pas déjà définie
      element.style.border='2px red solid';
    }
    newP.id = errorId;
    element.parentNode.insertAdjacentHTML('afterend', newP.outerHTML);
    newP.classList.add('error-message');
  }
}

// Fonction générique pour masquer un message d'erreur
function hideError(element, errorId) {
  const errorExist = document.getElementById(errorId);
  if (errorExist) {
    errorExist.remove();
    element.style.border = ''; // Supprime l'effet de bordure rouge
  }
}

// First name verification
function firstname() {
  const firstname = document.forms["reserve"]["first"];
  const errorId = 'error-firstname';
  if (!/^[a-zA-Z]{2,}$/.test(firstname.value.trim())) {
    showError(firstname, 'Veuillez entrer 2 caractères ou plus pour le champ du prénom', errorId);
    return false;
  } else {
    hideError(firstname, errorId);
    return true;
  }
  
}

// Last name verification
function lastname() {
  const lastname = document.forms["reserve"]["last"];
  const errorId = 'error-lastname';
  if (!/^[a-zA-Z]{2,}$/.test(lastname.value.trim())) {
    showError(lastname, 'Veuillez entrer 2 caractères ou plus pour le champ du nom', errorId);
    return false;
  } else {
    hideError(lastname, errorId);
    return true;
  }
}


// Email verification
function email() {
  const email = document.forms["reserve"]["email"];
  const errorId = 'error-email';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    showError(email, 'Mettez une adresse email valide.', errorId);
    return false;
  } else {
    hideError(email, errorId);
    return true;
  }
}

// birthdate verifcation

function birthdate() {
  const birthdate = document.forms["reserve"]["birthdate"];
  const errorId = 'error-birthdate';

  // Vérifier si la date est vide
  if (birthdate.value.trim() === '') {
    showError(birthdate, 'Veuillez entrer votre date de naissance.', errorId);
    return false;
  }

  // Vérifier si le format de date est correct
  const dateArray = birthdate.value.split('-'); // Date au format "aaaa-mm-jj"
  const day = parseInt(dateArray[2]);
  const month = parseInt(dateArray[1]) - 1; // Mois commence à partir de 0 dans les objets Date de JavaScript
  const year = parseInt(dateArray[0]);

  // Vérifier si la date est valide
  const dateObject = new Date(year, month, day);
  const formattedDate = `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`; // Format "aaaa-mm-jj"
  const currentDate = new Date();
  const minYear = 1900; // Année minimale autorisée
  const maxYear = currentDate.getFullYear(); // Année maximale autorisée
  if (formattedDate !== birthdate.value || dateObject > currentDate || year < minYear || year > maxYear) {
    showError(birthdate, `Veuillez entrer une date de naissance valide au format aaaa-mm-jj et comprise entre ${minYear} et ${maxYear}.`, errorId);
    return false;
  } else {
    hideError(birthdate, errorId);
    return true;
  }
}

// quantity verification
function quantity() {
  const quantity = document.forms["reserve"]["quantity"];
  const errorId = 'error-quantity';
  if (quantity.value === '' || 99 < quantity.value || quantity.value < 0)  {
    showError(quantity, 'Mettez un chiffre entre 0 et 99.', errorId);
    return false;
  } else {
    hideError(quantity, errorId);
    return true;
  }
}



//btn radio

function locationChecked() {
  const locationInputs = document.querySelectorAll('input[name="location"]');
  return Array.from(locationInputs).some((input) => input.checked);
  
}

function validateLocation() {
  const errorId = 'error-location';
  const errorElement = document.getElementById(errorId);

  if (!locationChecked()) {
    if (!errorElement) { // Vérifier si le message d'erreur n'est pas déjà présent
      const newP = document.createElement('p');
      newP.textContent = 'Vous devez choisir une option.';
      newP.style.color = "red";
      newP.style.fontSize = '12px';
      newP.id = errorId; // Ajouter un ID à l'élément pour le retrouver facilement
      document.querySelector('#checkbox1').insertAdjacentElement('afterend', newP);
    }
    return false;
  } else {
    if (errorElement) {
      errorElement.remove(); // Supprimer le message d'erreur s'il existe
    }
    
    return true;
  }
}

// checkbox "conditions d'utilisation"
let errorPresent = false; // Variable pour suivre l'état de l'erreur

function accept() {
  const acceptCheckbox = document.querySelector('input[id="checkbox1"]');
  const errorId = 'error-acceptCheckbox';

  if (!acceptCheckbox.checked && !errorPresent) { // Vérifier si la case n'est pas cochée et si l'erreur n'est pas déjà présente
    errorPresent = true; // Mettre à jour l'état de l'erreur
    const newP = document.createElement('p');
    newP.textContent = 'Vous devez vérifier que vous acceptez les termes et conditions';
    newP.style.color = "red";
    newP.style.fontSize = '12px';
    newP.id = errorId; // Ajouter un ID à l'élément pour le retrouver facilement
    document.querySelector('#checkbox2').insertAdjacentElement('beforebegin', newP);
    return false;
  } else if (acceptCheckbox.checked && errorPresent) { // Vérifier si la case est cochée et si l'erreur est présente
    errorPresent = false; // Mettre à jour l'état de l'erreur
    const errorElement = document.getElementById(errorId);
    if (errorElement) {
      errorElement.remove(); // Supprimer le message d'erreur s'il existe
    }
  }
  return acceptCheckbox.checked;
}



let newP = document.createElement('p');


function validate(event) {
  if ( firstname() && lastname() && email() && birthdate() && quantity() &&  validateLocation() && accept() ) {

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
let p2=document.getElementById('birthdate')
let newP = document.createElement('p');
newP.id = 'newP'
// 'votre inscription'
newP.textContent = 'votre inscription ';
newP.style.textAlign="center";
p1.insertAdjacentElement('afterend', newP)

// 'Merci pour'
 const newP2=document.createElement('p')
newP2.textContent='Merci pour'
newP2.style.textAlign="center";
newP2.id = 'newP2'
p1.insertAdjacentElement('afterend', newP2)

event.preventDefault()
   
     return true
  } else {
    return false;
  }
}


const btnSubmit =document.querySelector('.btn-submit')
btnSubmit.addEventListener("click", validate);


// fermeture avec la croix apres validation du formulaire:
//remise a zero lorsque l'on lance la fenetre modal apres validation du formulaire.
function closeValidate () {
  const erase1=document.querySelectorAll('.text-control')
  const erase2=document.querySelectorAll('label')
    erase1.forEach((element)=>element.style.opacity= "1")
for (const erase of  erase2 ) {
  console.log(erase.style.opacity="1")
 }

 const newP = document.getElementById('newP');

 if (newP) {
   newP.remove();
 }

 const newP2 = document.getElementById('newP2');
if (newP2) {
  newP2.remove();
}
 const form= document.querySelector('form')
 form.reset()

// réinitialiser le bouton

const transformText = document.querySelector('input[value="supprimer"]');
if (transformText) {
  transformText.setAttribute("value", "C'est parti");
  console.log(transformText)
}
}

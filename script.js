//form
const form = document.getElementById("form");
//btnImageUpload
const btnImageUpload = document.getElementById("image-upload");
//inputs
const inputName = document.getElementById("name");
const inputLastName = document.getElementById("lastname");
const inputIdNumber = document.getElementById("idnumber");
const radioBtnPerson = document.getElementById("person");
const radioBtnCompany = document.getElementById("company");
const errorMsg = document.querySelectorAll(".error");
//url image
let uploadedImage = "";


form.addEventListener("submit", e => {
  e.preventDefault();

  checkInputs();
});


function checkInputs() {
  let correct = 0;

  if (inputName.value === "") {
    errorMsg[0].textContent = "Wprowadź imię";
  } else {
    errorMsg[0].textContent = "";
    correct++;
  }
  if (inputLastName.value === "") {
    errorMsg[1].textContent = "Wprowadź nazwisko";
  } else {
    errorMsg[1].textContent = "";
    correct++;
  }

  if (radioBtnPerson.checked) {
    if (verifyPESEL(inputIdNumber.value)) {
      errorMsg[2].textContent = "";
      correct++;
    } else {
      errorMsg[2].textContent = "Nieprawidłowy numer PESEL";
    }
  }

    if (radioBtnCompany.checked) {
      if (verifyNip(inputIdNumber.value)) {
        errorMsg[2].textContent = "";
        correct++;
      } else {
        errorMsg[2].textContent = "Nieprawidłowy numer NIP";
      }
    }
    
    if(correct >= 3){
      sendForm();
    }
  }

//send data
function sendForm() {
  //https://reqbin.com/echo/post/json
  const url = "https://localhost:60001/Contractor/Save";
  const data = [];
  
  data.push({
    image: uploadedImage === "" ? null : uploadedImage,
    name: inputName.value,
    lastName: inputLastName.value,
    idNumber: inputIdNumber.value,
    pesel: radioBtnPerson.checked,
    NIP: radioBtnCompany.checked,
  });

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then(status => {
      console.log("Success:", status);
    })
    .catch(error => {
      alert('Nie znaleziono metody zapisu');
      errorMsg[3].textContent = "Nie znaleziono metody zapisu";
    });

  resetInputValues();
}

//function reset input values
function resetInputValues() {
  inputName.value = "";
  inputLastName.value = "";
  inputIdNumber.value = "";
}

//placeholder PESEL/NIP
document.querySelectorAll(".form__radio").forEach(radio => {
  radio.addEventListener("change", () => {
    if (radio.id === "person") {
      document.getElementById("idnumber").placeholder = "PESEL";
    } else {
      document.getElementById("idnumber").placeholder = "NIP";
    }
  });
});

//Upload photo
btnImageUpload.addEventListener("change", function () {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    uploadedImage = reader.result;
    reader.readAsDataURL
    document.querySelector(
      ".form__photo"
    ).style.backgroundImage = `url(${uploadedImage})`;
  });
  reader.readAsDataURL(this.files[0]);
  document.querySelector(".form__add-photo").textContent = "Zmień zdjęcie";
});

// function verifyPESEL
function verifyPESEL(pesel) {
  if (typeof pesel !== "string") return;

  let weight = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
  let sum = 0;
  let controlNumber = parseInt(pesel.substring(10, 11));

  for (let i = 0; i < weight.length; i++) {
    sum += parseInt(pesel.substring(i, i + 1)) * weight[i];
  }
  sum = sum % 10;
  return (10 - sum) % 10 === controlNumber;
}

//function verifyNIP
function verifyNip(nip) {
  if (typeof nip !== "string") return false;

  nip = nip.replace(/[\ \-]/gi, "");

  let weight = [6, 5, 7, 2, 3, 4, 5, 6, 7];
  let sum = 0;
  let controlNumber = parseInt(nip.substring(9, 10));
  let weightCount = weight.length;
  for (let i = 0; i < weightCount; i++) {
    sum += parseInt(nip.substr(i, 1)) * weight[i];
  }
  return sum % 11 === controlNumber;
}

resetInputValues();

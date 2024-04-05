//Gathering all dom elements start
const themeButton = document.querySelector("#theme-button");
const body = document.querySelector("body");
const codeForm = document.querySelector(".code-form");
const showMessage = document.querySelector(".show-message");
const codeValue = document.querySelector("#code-input");
const nameValue = document.querySelector("#name-input");
const userName = document.querySelector("#user-name");
const submitButton = document.querySelector("#submit-button");
const labels = document.querySelectorAll(".label");
//Gathering all dom elements end

//THME OPERATION STARTS
themeButton.addEventListener("click", changeTheme);
//THME OPERATION ENDS
//CODE form operation starts
codeForm.addEventListener("submit", decryptCode);
//codeValue.addEventListener("")
//CODE form operation ends
//SHOS MESSAGE operation starts

//SHOS MESSAGE operation ends

//THEME FUNCTION STARTS

function changeTheme() {

  const themeArr = [
    "https://img.freepik.com/free-photo/blue-paper-red-flower-petals_23-2148031526.jpg?size=626&ext=jpg&uid=R143827644&ga=GA1.1.407465969.1712125518&semt=ais",
    "https://img.freepik.com/free-photo/red-rose-with-white-card_1150-6925.jpg?w=900",
    "https://growgreencapital.co.in/wp-content/uploads/2023/05/con-12.jpeg",
  ];
  // const themeArr = [
  //   'url("https://pronoyc11.github.io/secrete-message/images/BluePaper.jpg")',
  //   'url("https://pronoyc11.github.io/secrete-message/images/rose-bg.jpg")',
  //   'url("https://pronoyc11.github.io/secrete-message/images/TelephoneBg.jpg")',
  // ];
  let style = getComputedStyle(body);
  // let codeFormStyle = getComputedStyle(codeForm)
  // let colorValue = codeFormStyle.backgroundColor ;
  // console.log(colorValue); url("images/BluePaper.jpg")
  let urlValue = style.getPropertyValue("background-image").slice(5,-2);

  let themeIndex = themeArr.indexOf(urlValue);

  if (themeIndex === themeArr.length - 1) {
    body.style.backgroundImage = `url("${themeArr[0]}")`;
  } else {
    let str = `url("${themeArr[themeIndex + 1]}")`;
    body.style.backgroundImage = str;
  }
  if (urlValue === themeArr[1]) {
    codeForm.style.backgroundColor = "#84C3CA";
    labels[0].style.color = "";
    labels[1].style.color = "";
  } else if(urlValue === themeArr[0]) {
    codeForm.style.backgroundColor = "#990423";
    console.log(labels)
    labels[0].style.color = "#fff";
    labels[1].style.color = "#fff";
  }else{
    codeForm.style.backgroundColor = "";
    labels[0].style.color = "";
    labels[1].style.color = "";

  }
 
}
//THEME FUNCTION ENDS
//CODE Decryption function starts
function encryptMsg(str) {
  let popedArr = str.trim().split(" ");
  let num = popedArr.pop();
  let strArr = popedArr.map((elm, index) => {
    elm = elm.split("");
    for (let i = 0; i < elm.length; i++) {
      if ((i + 1) % 2 === 0) {
        switch (elm[i]) {
          case "a":
            elm[i] = "y";
            break;
          case "A":
            elm[i] = "Y";
            break;
          case "b":
            elm[i] = "z";
            break;
          case "B":
            elm[i] = "Z";
            break;
          case " ":
            break;
          case ",":
            elm[i] = ",";
            break;
          case "!":
            elm[i] = "!";
            break;
          case "?":
            elm[i] = "?";
            break;
          default:
            elm[i] = String.fromCharCode(elm[i].charCodeAt(0) - 2);
        }
      } else if ((i + 1) % 2 !== 0) {
        if (elm[i] === "z") {
          elm[i] = "b";
        } else if (elm[i] === "Z") {
          elm[i] = "B";
        } else if (elm[i] === " ") {
        } else if (elm[i] === "y") {
          elm[i] = "a";
        } else if (elm[i] === "Y") {
          elm[i] = "A";
        } else if (elm[i] === ",") {
          elm[i] = ",";
        } else if (elm[i] === "?") {
          elm[i] = "?";
        } else if (elm[i] === "!") {
          elm[i] = "!";
        } else {
          elm[i] = String.fromCharCode(elm[i].charCodeAt(0) + 2);
        }
      }
    }
    elm = elm.join("");
    return elm;
  });

  if (num.length === 4) {
    if (Number(num)) {
      if (
        parseInt(num[0]) + parseInt(num[1]) === 10 &&
        parseInt(num[2]) + parseInt(num[3]) === 10
      ) {
        return strArr.join(" ");
      } else {
        return "Invalid numeric code!!";
      }
    } else {
      return "Numeric value invalid!";
    }
  } else {
    return "Please put the code appropriately.";
  }
}

//console.log(encryptMsg("g jqtg wqs! 9182"))
//console.log(encryptMsg("g jqtg wqs! ukjn wqs kcptw kg? 9182"));

function decryptCode(e) {
  e.preventDefault();
  submitButton.setAttribute("disabled", null);
  let text = showMessage.lastElementChild;
  userName.innerHTML = `Dear ${nameValue.value.trim().toLowerCase()},`;
  text.innerHTML = "";
  let message = encryptMsg(codeValue.value).split("");

  let i = 0;

  let intervalId = setInterval(() => {
    if (i < message.length) {
      text.innerHTML += message[i] === " " ? " " : message[i];
      i++;
    } else {
      clearInterval(intervalId);
      submitButton.removeAttribute("disabled");
    }
    console.log();
  }, 100);

  //  text.innerHTML = codeValue.value;
}
//CODE Decryption function ends

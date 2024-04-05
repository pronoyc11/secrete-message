//Gathering all dom elements start
const themeButton = document.querySelector("#theme-button");
const body = document.querySelector("body");
const codeForm = document.querySelector(".code-form");
const showMessage = document.querySelector(".show-message");
const codeValue = document.querySelector("#code-input");
const nameValue = document.querySelector("#name-input");
const userName = document.querySelector("#user-name");
//Gathering all dom elements end

//THME OPERATION STARTS
themeButton.addEventListener("click", changeTheme);
//THME OPERATION ENDS
//CODE form operation starts
codeForm.addEventListener("submit",decryptCode);
//codeValue.addEventListener("")
//CODE form operation ends
//SHOS MESSAGE operation starts

//SHOS MESSAGE operation ends

//THEME FUNCTION STARTS

function changeTheme() {
    const themeArr = [
      'url("/images/BluePaper.jpg")',
      'url("/images/rose-bg.jpg")',
      'url("/images/TelephoneBg.jpg")',
    ];
  let style = getComputedStyle(body);
  // let codeFormStyle = getComputedStyle(codeForm)
  // let colorValue = codeFormStyle.backgroundColor ;
  // console.log(colorValue);
  let urlValue = style.getPropertyValue("background-image").slice(26);

  let themeIndex = themeArr.indexOf(`url("${urlValue}`);
  if (themeIndex === themeArr.length - 1) {
      body.style.backgroundImage = themeArr[0];
    } else {
        body.style.backgroundImage = themeArr[themeIndex + 1];
    }
    if (`url("${urlValue}` === themeArr[1]) {
      codeForm.style.backgroundColor = "#C6DBC6";
      
    } else {
      codeForm.style.backgroundColor = "";
    }

}
//THEME FUNCTION ENDS
//CODE Decryption function starts
function encryptMsg(str){

    let popedArr = str.trim().split(' ') ;
    let num = popedArr.pop();
    let strArr = popedArr.map((elm,index)=>{
      elm = elm.split("");
      for(let i = 0 ; i < elm.length ; i ++){
    
        if((i+1)%2===0){
          switch (elm[i]) {
            case "a":
              elm[i] = "y";
              break;
            case "A":
              elm[i] = "Y";
              break;
            case "b":
              elm[i] = "z"
              break;
            case "B":
              elm[i] = "Z";
              break;
            case " ":
              break;
            case ",":
              elm[i] = "," ;
              break;
            case "!":
              elm[i] = "!";
              break;
            case "?":
              elm[i] = "?";
              break;
            default:
              elm[i] = String.fromCharCode(elm[i].charCodeAt(0)-2);
          }
          
        }else if((i+1)%2!== 0){
    if(elm[i]=== "z"){
      elm[i] = "b";
    }else if(elm[i] === "Z"){
      elm[i] = "B"
    }else if(elm[i]=== " "){
    
    }else if(elm[i]=== "y"){
    elm[i] = 'a' ;
    }else if(elm[i] === "Y"){
       elm[i] = "A";
    }else if(elm[i] === ","){
        elm[i] = ","
    }else if(elm[i] === "?"){
      elm[i] = "?"
    }else if(elm[i] === "!"){
      elm[i] = "!"
    }
    else{
      elm[i] = String.fromCharCode(elm[i].charCodeAt(0)+2);
    }
    
          
        }
     
      }
      elm = elm.join("");
      return elm;
    })
    
    if(num.length === 4){
      if(Number(num)){
           if(parseInt(num[0]) + parseInt(num[1]) === 10 && parseInt(num[2]) + parseInt(num[3]) === 10){
            return strArr.join(" ") ;
           }else{
            return "Invalid numeric code!!";
           }
      }else{
         return "Numeric value invalid!";
      }
    }else{
      return "Please put the code appropriately.";
    }
    }
    
    //console.log(encryptMsg("g jqtg wqs! 9182"))
    //console.log(encryptMsg("g jqtg wqs! ukjn wqs kcptw kg? 9182"));





function decryptCode(e){
    e.preventDefault();
  
     let text = showMessage.lastElementChild;
     userName.innerHTML = `Dear ${nameValue.value.trim().toLowerCase()},`
     text.innerHTML = "";
     let message = encryptMsg(codeValue.value).split("");

     let i = 0 ;
    
       let intervalId =  setInterval(()=>{
            if(i<message.length){
           text.innerHTML +=  message[i] === " "? " ":message[i] ;
           i++ ;}
           else {
            clearInterval(intervalId);
           }
           console.log()
        },100)
    
    //  text.innerHTML = codeValue.value;
    
}
//CODE Decryption function ends

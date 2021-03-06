// pwd manager js
// DOM Classes
const wrapper = document.querySelector(".wrapper");
const newDiv = document.getElementsByClassName("new");
const cancelEdit = document.querySelector(".cancelEdit");
const newWrapper = document.getElementsByClassName("newWrapper");
const body = document.querySelector("body");
const icons = document.getElementsByClassName("iconWrapper");
const quick = document.getElementsByClassName("quick");
// Add/Edit Modal
const modal = document.querySelector(".modal");
const modInputs = document.querySelectorAll(".modalWrapper input");
const modalWrapper = document.querySelector(".modalWrapper");
const modalUsername = document.querySelector(".modalUsername");
const modalWeb = document.querySelector(".modalWeb");
const modalPwd = document.querySelector(".modalPwd");
const modalKey = document.querySelector(".modalKey");
const modalId = document.querySelector(".modalId");
const modalh3 = document.querySelector(".modalh3");
const dupModal = document.querySelector(".duplicateModal");
const submitEdit = document.querySelector(".submitEdit");
const editWrapper = document.querySelector(".editWrapper");
const divHead = document.getElementsByClassName("divHead");
// Edit Inputs
const editUsr = document.querySelector("#editUsr");
const editWeb = document.querySelector("#editWeb");
const editPwd = document.querySelector("#editPwd");
const editKey = document.querySelector("#editKey");
// Delete
const deleteModal = document.querySelector(".deleteModal");
// Buttons
const btn = document.querySelector(".searchbtn");
const input = document.querySelector(".searchInput");
const remove = document.querySelector(".remove");
const btnDiv = document.querySelector(".btnDiv").children;
const add = document.querySelector(".add");
const show = document.querySelector(".show");
const hide = document.querySelector(".hide");
const edit = document.querySelector(".edit");
const deletebtn = document.querySelector(".delete");
const cancel = document.querySelector(".modalCancel");
const submit = document.querySelector(".modalSubmit");
const generate = document.querySelector(".modalGenerate");
let chars = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
let numbers = [1,2,3,4,5,6,7,8,9,0];
let specChars = ["!","@","#","$","%","^","&","*"];
let useSpecChars = true;
let useNumbers = true;




												// functions
// click off modals to close them (by clicking on their wrapper)
function clickOfftoClose(className) {
  let div = document.querySelector(`${className}`);
  // click off modal to close it
  div.addEventListener("click", e => {
    // hide modal if clicked off
    if (e.target != div) {
    	// lets you click in the div to use it
      e.stopPropagation();
    } else {
      div.style.display = "none";
    }
  });
}
// end clickOfftoClose function
// add click event to each delete button
function addClickEventDelete(className) {
  let node = document.getElementsByClassName(`${className}`);
  for (let i = 0; i < node.length; i++) {
    node.item(i).addEventListener("click", e => {
      console.log(newWrapper[i]);
      let innerUsr = newDiv[i].childNodes[3].childNodes[1].textContent;
      let innerWeb = newDiv[i].childNodes[3].childNodes[3].textContent;
      let innerPwd = newDiv[i].childNodes[3].childNodes[5].textContent;
      let innerKey = newDiv[i].childNodes[3].childNodes[7].textContent;
      let innerId = newDiv[i].childNodes[3].childNodes[9].textContent;
      let topOff = node.item(i).offsetTop;
      let yes = document.querySelector(".deleteYes");
      let no = document.querySelector(".deleteNo");
      deleteModal.style.display = "block";
      yes.addEventListener('click', ()=>{
      	let url = `/api/${innerId}`;
        // delete request
        axios.delete(url);
        console.log(`you deleted the entry for the website ${innerWeb}`);
        deleteModal.style.display = 'none';
        // workaround
        window.location.reload();
      })
      no.addEventListener('click', ()=>{
      	deleteModal.style.display = 'none';
      })
    });
  }
}
// end add click event to each delete button
// add click event to the Edit button
function addClickEventEdit() {
  let edit = document.getElementsByClassName("edit");
 // add the click event per edit button instance
  for (let i = 0; i < edit.length; i++) {
    edit.item(i).addEventListener("click", e => {
// define the input values to populate for editing
      let innerUsr = newDiv[i].childNodes[3].childNodes[1].textContent;
      let innerWeb = newDiv[i].childNodes[3].childNodes[3].textContent;
      let innerPwd = newDiv[i].childNodes[3].childNodes[5].textContent;
      let innerKey = newDiv[i].childNodes[3].childNodes[7].textContent;
      let innerId = newDiv[i].childNodes[3].childNodes[9].textContent;
      let topOff = window.pageYOffset + 190;
      
// stop propagation for the edit button to not bubble up
      // e.stopPropagation();
// build editable div
      editWrapper.style.display = "flex";
      editUsr.value = innerUsr;
      editWeb.value = innerWeb;
      editPwd.value = innerPwd;
      editKey.value = innerKey;
      editId.value = innerId;
// set position for modal to open in view
      editWrapper.style.top = `${topOff}px`;
// add animation classes
      newWrapper[i].classList.remove("bounceIn", "delay-1s");
      editWrapper.classList.remove("bounceOutUp");
      newWrapper[i].classList.add("animated", "bounceOut");
      editWrapper.classList.add("animated", "bounceInUp");
// submit edits button
      submitEdit.addEventListener("click", () => {
// get api data
        axios.get("/api").then(res => {
          let datas = res.data;
// check to see if it matches the internal id
          datas.forEach(data => {
            if (innerId === data._id) {
              let url = `/api/${innerId}`;
              let val = {
                username: editUsr.value,
                website: editWeb.value,
                pwd: editPwd.value,
                keyword: editKey.value
              };
// put changes to the specified id
              axios
                .put(url, val)
                .then(() => {
                  newWrapper[i].classList.remove("bounceOut");
                  editWrapper.classList.remove("bounceInUp");
                  newWrapper[i].classList.add("bounceIn" , "delay-1s");
                  editWrapper.classList.add("bounceOutUp");
                  setTimeout(()=>{
                    editWrapper.style.display = "none";
                    displayAll();
                  }, 2100)
                  
                  // window.location.reload();
                })
                .catch(err => {
                  console.log(err);
                });
            }
          });
        });
      });
// cancel button
      cancelEdit.addEventListener("click", e => {
        newWrapper[i].classList.remove("bounceOut");
        editWrapper.classList.remove("bounceInUp");
        newWrapper[i].classList.add("bounceIn" , "delay-1s");
        editWrapper.classList.add("bounceOutUp");
        setTimeout(()=>{
          editWrapper.style.display = "none";
// without removing "animated" it will break adding the scale class
          newWrapper[i].classList.remove("animated");
          editWrapper.classList.remove("animated");
        }, 2100)
      });
    });
  }
}
// end click event to the edit button function
function quickLooks(){
  const quickLook = document.getElementsByClassName("quickLook");
  const newDiv = document.getElementsByClassName("new");
// get all quicklook icons
  for(let i = 0; i < quickLook.length; i++){
// add event listeners to each
    quickLook[i].addEventListener('mouseover',(e)=>{
        newDiv[i].classList.toggle("unblur");
        icons[i].classList.toggle("fade");
        divHead[i].style.opacity = "0";
    })
    quickLook[i].addEventListener('mouseout', ()=>{
      newDiv[i].classList.toggle("unblur");
      icons[i].classList.toggle("fade");
      divHead[i].style.opacity = "1";
    })
    quickLook[i].addEventListener('click', ()=>{
      newWrapper[i].classList.toggle("scale");
      divHead[i].classList.toggle("hidden");
      newDiv[i].classList.toggle("color");
      // change icons on click
      if(quick[i].textContent === 'remove_red_eye'){
        quick[i].textContent = 'arrow_back';
      } else {
        quick[i].textContent = 'remove_red_eye';
      }
    })
  }
}
// end quickLook functionality
// validation check function
function validationCheck(text) {
  // check to see if there is a value to search for and alert some text
  if (!input.value) {
    alert(`${text}`);
    return;
  }
}
// end validation check function
// duplicate div delete function
function divDelete(className) {
  let items = document.querySelectorAll(`${className}`);
  // clear out any existing divs from duplicate div modal
  items.forEach(item => {
    item.remove();
  });
}
// end duplicate div delete
// checkValue function
function checkValue(val, data) {
  // make the keywords an array (for the index of check)
  let keyword = data.keyword.split(" ");
  console.log("checking value");
  return (
    data.username === val.value ||
    keyword.indexOf(val.value) > 0 ||
    data.website === val.value ||
    data.pwd === val.value ||
    data._id === val.value
  );
}
// end checkValue function

// displayAll function
function displayAll() {
// hide existing results/the last child of the wrapper element
  divDelete(".newWrapper");

  axios
    .get("/api")
    .then(res => {
      res.data.forEach(entry => {
        // display results
        let div = `<div class="newWrapper">
              <p class="divHead">${entry.keyword}</p>
              <div class=new>
                <div class="labels">
                  <h4>Username</h4>
                  <h4>Website</h4>
                  <h4>Password</h4>
                  <h4>Keywords</h4>
                </div>
                <div class="data">
                  <p class=userh2>${entry.username}</p>
              <p class=website><a href=${entry.website}>${entry.website}</a></p>
              <p class="pwd">${entry.pwd}</p>
              <p class=keyword>${entry.keyword}</p>
              <p class=_id hidden="true">${entry._id}</p>
                </div>
            </div>
            <div class=iconWrapper>
              <span class="quickLook"><i class="material-icons md-55 quick">remove_red_eye</i></span>
              <span class="edit"><i class="material-icons md-55">edit</i></span>
              <span class="delete"><i class="material-icons md-55">delete</i></span>
            </div>
            </div>`;
        wrapper.insertAdjacentHTML("beforeend", div);
      });
    })
    // handle errors
    .catch(err => {
      console.log(err);
    });
  // get node list and addEventListeners to each
  setTimeout(() => {
    addClickEventEdit();
    addClickEventDelete("delete");
    quickLooks();
  }, 100);
}
// end displayAll function

// display matching entries function
function displayMatch(query) {
  // hide any existing results
  divDelete(".newWrapper");
  // get the api and return the results
  axios
    .get("/api")
    .then(res => {
      res.data.forEach(entry => {
        // display results
        // let keyword = entry.keyword.split(" ");
        // check for the input to match database entry
        if (checkValue(query, entry)) {
          let div = `<div class="newWrapper">
              <p class="divHead">${entry.keyword}</p>
              <div class=new>
                <div class="labels">
                  <h4>Username</h4>
                  <h4>Website</h4>
                  <h4>Password</h4>
                  <h4>Keywords</h4>
                </div>
                <div class="data">
                  <p class=userh2>${entry.username}</p>
              <p class=website><a href=${entry.website}>${entry.website}</a></p>
              <p class="pwd">${entry.pwd}</p>
              <p class=keyword>${entry.keyword}</p>
              <p class=_id hidden="true">${entry._id}</p>
                </div>
            </div>
            <div class=iconWrapper>
              <span class="quickLook"><i class="material-icons md-55 quick">remove_red_eye</i></span>
              <span class="edit"><i class="material-icons md-55">edit</i></span>
              <span class="delete"><i class="material-icons md-55">delete</i></span>
            </div>
            </div>`;
          wrapper.insertAdjacentHTML("beforeend", div);
        }
      });
    })
    .catch(err => {
      console.log(err);
    });
  // get node list and addEventListeners to each
  setTimeout(() => {
    addClickEventDelete("delete");
    addClickEventEdit("edit");
    quickLooks();
  }, 100);
}
// end displayMatch function
// pwdGenerator function
function pwdGenerator(charset, length){
  let array = [];
  let times = 0;
console.log(useSpecChars, useNumbers);
  if(useSpecChars && useNumbers){
    console.log("use both");
    let newArr = charset.concat(numbers).concat(specChars);
    console.log(newArr);
    while(times < length){
     array.push(newArr[Math.floor(Math.random() * newArr.length)]);
     times ++;
    }
    console.log(array);
    return array;
  } else if(useSpecChars && !useNumbers){
    console.log("only using spec chars");
    let newArr = charset.concat(specChars);
    while(times < length){
     array.push(newArr[Math.floor(Math.random() * newArr.length)]);
     times ++;
    }
    console.log(array);
    return array;
  } else if(useNumbers && !useSpecChars){
    let newArr = charset.concat(numbers);
    while(times < length){
     array.push(newArr[Math.floor(Math.random() * newArr.length)]);
     times ++;
    }
    console.log(array);
    return array;
  } else {
    // do math.random times the number of the length
    while(times < length){
     array.push(charset[Math.floor(Math.random() * charset.length)]);
     times ++;
    }
    console.log(array);
    return array;  
} 
}
// end generator function
											// end functions

											// Buttons

// input for search
input.addEventListener("keypress", e => {
  displayMatch(input);
  divDelete(".newWrapper");
});
// Search button
btn.addEventListener("click", () => {
  divDelete(".newWrapper");
  validationCheck("You must enter a value first.")
  displayMatch(input);
});
// show all entries/show all button
show.addEventListener("click", () => {
  divDelete(".newWrapper");
  displayAll();
});
// hide all entries
hide.addEventListener("click", () => {
  divDelete(".newWrapper");
});
// click off to close "add" modal
clickOfftoClose(".modalWrapper");

// add button
add.addEventListener("click", () => {
  divDelete(".newWrapper");
// change header
  modalh3.textContent = "Add Your Account Here!";
// show modal to enter new information
  modalWrapper.style.display = "block";
  modal.style.display = "flex";
// clear modal inputs
  modInputs.forEach(input => {
    input.value = "";
  });
// submit addition
  submit.addEventListener("click", () => {
    let modalUsername = document.querySelector(".modalUsername");
    let modalWeb = document.querySelector(".modalWeb");
    let modalPwd = document.querySelector(".modalPwd");
    let modalKey = document.querySelector(".modalKey");

// post action
    axios.post("/api", {
      username: modalUsername.value,
      website: modalWeb.value,
      pwd: modalPwd.value,
      keyword: modalKey.value
    });
// confirm submission
    let confDiv = (`
    	<div class="confDiv animateIn">
			<p><strong>Username</strong> ${modalUsername.value}</p>
			<p><strong>Website</strong> ${modalWeb.value}</p>
			<p><strong>Password</strong> ${modalPwd.value}</p>
			<p>with<strong>Keywords</strong> ${modalKey.value}
			has been posted successfully.</p>
		</div>`);
    wrapper.insertAdjacentHTML("beforeend", confDiv);
// hide modal
    modalWrapper.style.display = "none";
// show confirmation modal
    setTimeout(() => {
      divDelete(".confDiv");
      // workaround
      window.location.reload();
    }, 5000);
  });
  cancel.addEventListener("click", () => {
    modalWrapper.style.display = "none";
  });
});
generate.addEventListener('click', ()=>{
  let generateDiv = 
  `<div class="genDiv">
    <h4>Pwd Generator</h4>
    <i class="material-icons close">close</i>
      <hr>
      <label>Length</label>
      <input class="length" type="number" min="1" max="20">
      <br>
      <input class="specChar" type="checkbox" checked="true">
      <span class="specText">Use Special Characters?</span>
      <br>
      <input id="secCheck"class="numCheck" type="checkbox" checked="true">
      <span class="specText">Use numbers?</span>
      <br>
      <label>password:</label>
      <input class="result" disabled="true" type="text">
      <br>
      <button class="getPwd">Generate!</button>
  </div>
  `
  modal.insertAdjacentHTML("beforeend", generateDiv);
    
  let getPwd = document.querySelector(".getPwd");
  let long = document.querySelector(".length");
  let result = document.querySelector(".result");
  let genDiv = document.querySelector(".genDiv");
  let close = document.querySelector(".close");
  let numCheck = document.querySelector(".numCheck");
  let specChar = document.querySelector(".specChar");
  close.addEventListener('click', ()=>{
    divDelete(".genDiv");
    // long.value = "";
    // getPwd.value = "";
  })
  specChar.addEventListener("change", ()=>{
    if(specChar.checked){
      useSpecChars = true;
      console.log("use them");
    } else {
      useSpecChars = false;
      console.log("dont use them");
    }
  })
  numCheck.addEventListener("change", ()=>{
    if(numCheck.checked){
      useNumbers = true;
      console.log("use them");
    } else {
      useNumbers = false;
      console.log("dont use them");
    }
  })
  
  getPwd.addEventListener('click', ()=>{
    // console.log(long.value);
    // console.log(chars);
   result.value = pwdGenerator(chars,long.value).join("");

  })
})
// pwdGenerator(3);














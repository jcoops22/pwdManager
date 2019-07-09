// pwd manager js
// DOM Classes
let wrapper = document.querySelector(".wrapper");
let newDiv = document.getElementsByClassName("new");
let cancelEdit = document.querySelector(".cancelEdit");
let newWrapper = document.getElementsByClassName("newWrapper");
// Add/Edit Modal
let modal = document.querySelector(".modal");
let modInputs = document.querySelectorAll(".modalWrapper input");
let modalWrapper = document.querySelector(".modalWrapper");
let modalUsername = document.querySelector(".modalUsername");
let modalWeb = document.querySelector(".modalWeb");
let modalPwd = document.querySelector(".modalPwd");
let modalKey = document.querySelector(".modalKey");
let modalId = document.querySelector(".modalId");
let modalh3 = document.querySelector(".modalh3");
let dupModal = document.querySelector(".duplicateModal");
let editWrapper = document.querySelector(".editWrapper");
let submitEdit = document.querySelector(".submitEdit");
// Edit Inputs
let editUsr = document.querySelector("#editUsr");
let editWeb = document.querySelector("#editWeb");
let editPwd = document.querySelector("#editPwd");
let editKey = document.querySelector("#editKey");
// Delete
let deleteModal = document.querySelector(".deleteModal");
// Buttons
let btn = document.querySelector(".searchbtn");
let input = document.querySelector("input");
let remove = document.querySelector(".remove");
let add = document.querySelector(".add");
let show = document.querySelector(".show");
let hide = document.querySelector(".hide");
let edit = document.querySelector(".edit");
let deletebtn = document.querySelector(".delete");
let cancel = document.querySelector(".modalCancel");
let themes = document.querySelector(".themes");
let submit = document.querySelector(".modalSubmit");


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
        // avoid doing this
        window.location.reload();
      })
      no.addEventListener('click', ()=>{
      	deleteModal.style.display = 'none';
      })
    });
  }
}
// add click event to each delete button
// add click event to the Edit button
function addClickEventEdit(className) {
  let node = document.getElementsByClassName(`${className}`);

 // add the click event per edit button instance
  for (let i = 0; i < node.length; i++) {
    node.item(i).addEventListener("click", e => {
// define the input values to populate for editing
      let innerUsr = newDiv[i].childNodes[3].childNodes[1].textContent;
      let innerWeb = newDiv[i].childNodes[3].childNodes[3].textContent;
      let innerPwd = newDiv[i].childNodes[3].childNodes[5].textContent;
      let innerKey = newDiv[i].childNodes[3].childNodes[7].textContent;
      let innerId = newDiv[i].childNodes[3].childNodes[9].textContent;
      let topOff = node.item(i).offsetTop;
// stop propagation for the edit button to not bubble up
      e.stopPropagation();
// let selected = e.target.parentElement;
      editWrapper.style.display = "flex";
      editUsr.value = innerUsr;
      editWeb.value = innerWeb;
      editPwd.value = innerPwd;
      editKey.value = innerKey;
      editId.value = innerId;

// set position for modal to open in view
      editWrapper.style.top = `${topOff - 140}px`;
// add animation classes
      newWrapper[i].classList.remove("animateBackIn");
      newWrapper[i].classList.add("animateOut");
      newWrapper[i].style.visibility = "hidden";
      node.item(i).style.display = "none";
      editWrapper.classList.add("animateIn");
      editWrapper.classList.remove("animateOut");

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
              console.log(val);
// put changes to the specified id
              axios
                .put(url, val)
                .then(() => {
                  console.log(`You updated the entry for ${innerUsr}`);
                  node.item(i).style.display = "inline-block";
                  editWrapper.style.display = "none";
                  editWrapper.classList.remove("animateIn");
                  editWrapper.classList.add("animateOut");
                  newWrapper[i].style.visibility = "visible";
                  newWrapper[i].classList.remove("animateOut");
                  newWrapper[i].classList.add("animateBackIn");
                  displayAll();
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
        node.item(i).style.display = "inline";
        editWrapper.style.display = "none";
        editWrapper.classList.remove("animateIn");
        editWrapper.classList.add("animateOut");
        newWrapper[i].style.visibility = "visible";
        newWrapper[i].classList.remove("animateOut");
        newWrapper[i].classList.add("animateBackIn");
        // setTimeout(()=>{
        // history.go(0);
        // window.location.reload()
        // 	displayAll();
        // }, 2000)
      });
    });
  }
}
// end click event to the edit button function
// validation check function
function validationCheck(text) {
  // check to see if there is a value to search for and alert some text
  if (!input.value) {
    // could turn this in to a modal in refactoring
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
// modalShowandHide function
function modalShowandHide(element) {
  element.style.visibility = "hidden";
  console.log("timeout worked");
}
// end modalShowandHide
// clear input
function clearInput() {
  if (input.value != "") {
    input.value = "";
  }
}
// end clear input function
// checkValue function
function checkValue(val, data) {
  // make the keywords an array (for the index of check)
  let keyword = data.keyword.split(" ");
  return (
    data.username === val.value ||
    keyword.indexOf(val.value) > 0 ||
    data.website === val.value ||
    data.pwd === val.value ||
    data._id === val.value
  );
  console.log("check value ran");
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
        			<span class="divHead">${entry.keyword}</span>
        			<div class=new>
        				<div class="labels">
        					<h4>Username</h4>
        					<h4>Website</h4>
        					<h4>Password</h4>
        					<h4>Keywords</h4>
        				</div>
        				<div class="data">
        					<p class=userh2>${entry.username}</p>
							<p class=website>${entry.website}</p>
							<p class=pwd>${entry.pwd}</p>
							<p class=keyword>${entry.keyword}</p>
							<p class=_id hidden="true">${entry._id}</p>
        				</div>
  					</div>
  					<button class="edit">Edit</button>
  					<button class="delete">Delete</button>
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
    // addClickEvent('newWrapper');
    addClickEventEdit("edit");
    addClickEventDelete("delete");
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
        			<div class=new>
        				<div class="labels">
        					<h4>Username</h4>
        					<h4>Website</h4>
        					<h4>Password</h4>
        					<h4>Keywords</h4>
        				</div>
        				<div class="data">
        					<p class=userh2>${entry.username}</p>
							<p class=website>${entry.website}</p>
							<p class=pwd>${entry.pwd}</p>
							<p class=keyword>${entry.keyword}</p>
							<p class=_id hidden="true">${entry._id}</p>
        				</div>
  					</div>
  					<button class="edit">Edit</button>
  					<button class="delete">Delete</button>
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
  }, 100);
}
// end displayMatch function
											// end functions

											// Buttons

// input "button"
input.addEventListener("keypress", e => {
  divDelete(".new");
  if (e.which == 13) {
    validationCheck("You must enter a value to search for.");
    displayMatch(input);
  }
});
// Search button
btn.addEventListener("click", () => {
  divDelete(".new");
  validationCheck("You must enter a value first.")
  displayMatch(input);
});

// show all entries/show all button
show.addEventListener("click", () => {
  divDelete(".new");
  displayAll();
});
hide.addEventListener("click", () => {
  divDelete(".newWrapper");
});
// click off to close add modal
clickOfftoClose(".modalWrapper");

// add button
add.addEventListener("click", () => {
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
      window.location.reload();
    }, 4000);
  });
  cancel.addEventListener("click", () => {
    modalWrapper.style.display = "none";
  });
});


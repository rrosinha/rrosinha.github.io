window.onload = init;

let cm;

function init(){
  showIntroSect();

  cm = new ContactManager();
	
  //cm.addTestData();
  cm.printContactsToConsole();
}

/* Function for the onclick event listeners */
function deleteContact(ev){
	var elem = ev.target;
	var i = elem.dataset.index;
	console.log(elem);
	console.log(i);
	cm.removeByIndex(i);
	cm.save();
	showAllSect();
}

function instructions(){
	var dataSection = document.querySelector("#mainContent");
  dataSection.innerHTML = "";
}

function showIntroSect(){
  var dataSection = document.querySelector("#mainContent");
  dataSection.innerHTML = "";
  dataSection.innerHTML = "<h2>Introduction</h2>" + 
    "<p>Hi, this is my atempt at the optional project presented in module 5</p>" +
     "<p>I will try to improve on the Contact Manager application that was developed in section 5.5 by trying to: <p>" + 
        "<ul>" + 
          "<li>Add some fields to the contact;</li>" + 
          "<li>Improve the page presentation by aplying more CSS styles;</li>" + 
          "<li>Improve the HTML structure of the page;</li>" + 
          "<li>Try to find new functionalities to add to the application (???).</li>" + 
        "</ul>";
}

function showAllSect(){
	cm.sort();
  cm.displayContactsAsATable("mainContent");
}

function showInsertSect(){
  var dataSection = document.querySelector("#mainContent");
  dataSection.innerHTML = "<h2>Insert a contact</h2>" + 
        "<label for=\"name\">Name : </label><input type=\"text\" id=\"name\" required><br>" + 
        "<label for=\"#email\">Email : </label><input type=\"email\" id=\"email\" required><br>" + 
        "<label for=\"#facebook\">FaceBook Link : </label><input type=\"text\" id=\"facebook\" required><br>" + 
        "<label for=\"#linkedin\">Linkedin Link : </label><input type=\"text\" id=\"linkedin\" required><br>" + 
        "<br>" + 
        "<button onclick=\"saveContactToList()\">Add new Contact</button>" + 
				"<p id=\"alert\"></p>";
}

function showSearchSect(){
  var dataSection = document.querySelector("#mainContent");
  dataSection.innerHTML = "";
}

function showDeleteSect(){
  var dataSection = document.querySelector("#mainContent");
  dataSection.innerHTML = "";
}

function formSubmitted() {
	// Get the values from input fields
	let name = document.querySelector("#name");
  	let email = document.querySelector("#email");
	let newContact = new Contact(name.value, email.value);
	cm.add(newContact);
	
	// Empty the input fields
	name.value = "";
	email.value = "";
	
	// refresh the html table
	cm.displayContactsAsATable("contacts");
	
	// do not let your browser submit the form using HTTP
	return false;
}

function emptyList() {
	cm.empty();
  	cm.displayContactsAsATable("contacts");
}

function loadList() {
	cm.load();
  //	cm.displayContactsAsATable("contacts");
}

function saveList(){
	cm.saveList();
}

function saveContactToList(){
	let cont = new Contact();

	let frmName = document.querySelector("#name");
	let frmEmail = document.querySelector("#email");
	let frmFacebook = document.querySelector("#facebook");
	let frmLinkedin = document.querySelector("#linkedin");
	let warning = document.querySelector("#alert");
	warning.innerHTML = "";

	cont.name = frmName.value;
	cont.email = frmEmail.value;
	cont.facebook = frmFacebook.value;
	cont.linkedin = frmLinkedin.value;

	cm.add(cont);
	
	frmName.value = "";
	frmEmail.value = "";
	frmFacebook.value = "";
	frmLinkedin.value = "";

	cm.save();
	cm.sort();
	warning.innerHTML = "Contact added to List ! <br>Contacts list saved !<br>Contacts list sorted!";	
}

/* classes */
class Contact {
	constructor(name, email, facebook, linkedin) {
		this.name = name;
		this.email = email;
    this.facebook = facebook;
    this.linkedin = linkedin;
	}
}

class ContactManager {
	constructor() {
		// when we build the contact manager, it
		// has an empty list of contacts
		this.listOfContacts = [];
	}
	
	addTestData() {
		var c1 = new Contact("Jimi Hendrix", "jimi@rip.com", "facebook", "LinkeDin");
    var c2 = new Contact("Robert Fripp", "robert.fripp@kingcrimson.com", "facebook", "LinkeDin");
    var c3 = new Contact("Angus Young", "angus@acdc.com", "facebook", "LinkeDin");
    var c4 = new Contact("Arnold Schwarzenneger", "T2@terminator.com", "facebook", "LinkeDin");
		
		this.add(c1);
		this.add(c2);
		this.add(c3);
		this.add(c4);
		
		// Let's sort the list of contacts by Name
		this.sort();
	}
	
	// Will erase all contacts
	empty() {
		this.listOfContacts = [];
	}
	
	add(contact) {
		this.listOfContacts.push(contact);
	}
	
	removeByIndex(index){
		this.listOfContacts.splice(index, 1);
	}

	remove(contact) {
		for(let i = 0; i < this.listOfContacts.length; i++) { 
			var c = this.listOfContacts[i];

			if(c.email === contact.email) {
				// remove the contact at index i
				this.listOfContacts.splice(i, i);
				// stop/exit the loop
				break;
			}
		}
	}
	
	sort() {
		// As our array contains objects, we need to pass as argument
		// a method that can compare two contacts.
		// we use for that a class method, similar to the distance(p1, p2)
		// method we saw in the ES6 Point class in module 4
		// We always call such methods using the name of the class followed
		// by the dot operator
		this.listOfContacts.sort(ContactManager.compareByName);
	}
	
	// class method for comparing two contacts by name
	static compareByName(c1, c2) {
		// JavaScript has builtin capabilities for comparing strings
		// in alphabetical order
		if (c1.name < c2.name)
     		return -1;
		
    	if (c1.name > c2.name)
     		return 1;
  
    	return 0;
	}
	
	printContactsToConsole() {
		this.listOfContacts.forEach(function(c) {
			console.log(c.name);
		});
	}
	
	load() {
		if(localStorage.contacts !== undefined) {
			// the array of contacts is savec in JSON, let's convert
			// it back to a reak JavaScript object.
			this.listOfContacts = JSON.parse(localStorage.contacts);
		}
	}
	
	save() {
		// We can only save strings in local Storage. So, let's convert
		// ou array of contacts to JSON
		localStorage.contacts = JSON.stringify(this.listOfContacts);
	} 
	
  displayContactsAsATable(idOfContainer) {
  // empty the container that contains the results
    let container = document.querySelector("#" + idOfContainer);
    container.innerHTML = "";

  
    if(this.listOfContacts.length === 0) {
      container.innerHTML = "<p>No contacts to display! Press \"Load contacts\" or begin inserting contacts</p>";
      // stop the execution of this method
      return;
    }

    let displayTable = document.querySelector("#mainContent");

    displayTable.innerHTML = "<table>" + 
          "<caption>" + 
          "<p>Contacts registered in application</p>" + 
          "</caption>" + 
          "<thead>" + 
          "<tr><th>Index</th><th>Name</th><th>Email</th><th>Facebook Page</th><th>Linkedin Page</th><th>Delete</th></tr>" + 
          "</thead>" + 
          "<tbody>";
    
    let tableBody = document.querySelector("tbody");

    // creates and populate the table with users
    //var table = document.createElement("table");
        
    // iterate on the array of users
    this.listOfContacts.forEach(function(currentContact, i) {
      // creates a row
      var row = tableBody.insertRow();
      
      row.innerHTML = "<td>" + i + "</td>" + 
              "<td>" + currentContact.name + "</td>" + 
              "<td>" + currentContact.email + "</td>" + 
              "<td><a href=\"" + currentContact.facebook + "\" target=\"_blank\">Link</td>" + 
              "<td><a href=\"" + currentContact.linkedin + "\" target=\"_blank\">Link</td>" +
							"<td class=\"delete\" onclick=\"deleteContact(event);\" data-index=\"" + i + "\">X</td>" ;
    });

    displayTable.innerHTML += "</tbody>" + 
          "<tfoot>" + 
          "<tr><td colspan=\"4\">There are " + cm.listOfContacts.length + " contacts registered</td></tr>" + 
          "</tfoot>" + 
          "</table>";

    // adds the table to the div
    //container.appendChild(table);
  }
}
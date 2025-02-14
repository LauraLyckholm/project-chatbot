"use strict"
// VARIABLES THAT POINT TO SELECTED DOM ELEMENTS
const chat = document.getElementById('chat');
const form = document.getElementById('name-form');
const submitBtn = document.getElementById('submit-btn');
const inputField = document.getElementById('name-input');
let soundEffect = new Audio('assets/pop.mp3'); // Sound effect to the chat

// GLOBAL VARIABLES
let userAnswer = ""; // stores users answer in a variable globally for use anywhere
let selectedGenre = ""; // stores selected genre in a variable globally for use anywhere

// GLOBAL OBJECTS
// Stores the different movie-choices in an object for easier handling further down.
const oldiesObject = {
  Action: [
    "Die Hard (1988)",
    "Indiana Jones and the Last Crusade (1989)",
    "Terminator 2: Judgment Day (1991)",
    "Lethal Weapon (1987)",
    "RoboCop (1987)"
  ],
  Comedy: [
    "Ferris Bueller's Day Off (1986)",
    "Back to the Future (1985)",
    "The Princess Bride (1987)",
    "Planes, Trains & Automobiles (1987)",
    "Beetlejuice (1988)"
  ],
  Drama: [
    "The Shawshank Redemption (1994)",
    "Schindler's List (1993)",
    "Pulp Fiction (1994)",
    "Forrest Gump (1994)",
    "The Silence of the Lambs (1991)"
  ]
};

const newbiesObject = {
  Action: [
    "Mad Max: Fury Road (2015)",
    "John Wick: Chapter 3 - Parabellum (2019)",
    "Avengers: Endgame (2019)",
    "Spider-Man: No Way Home (2021)",
    "Dune (2021)"
  ],
  Comedy: [
    "Jojo Rabbit (2019)",
    "Borat Subsequent Moviefilm (2020)",
    "The French Dispatch (2021)",
    "Free Guy (2021)",
    "Don't Look Up (2021)"
  ],
  Drama: [
    "Joker (2019)",
    "1917 (2019)",
    "Nomadland (2020)",
    "The Trial of the Chicago 7 (2020)",
    "The Power of the Dog (2021)"
  ]
};

// FUNCTIONS
// This function will add a chat bubble in the correct place based on who the sender is
const showMessage = (message, sender) => {
  // For adding a sound effect to the bot
  // the if statement checks if the sender is 'user' and if that's the case it inserts an html section inside the chat with the posted message
  if (sender === 'user') {
    //soundEffect.play(); // I removed the sound effect here, it felt more logical to only show it when the Bot answers. 
    chat.innerHTML += `
      <section class="user-msg">
        <div class="bubble user-bubble">
          <p>${message}</p>
        </div>
        <img src="assets/user.png" alt="User" />  
      </section>
    `
    // the else if statement checks if the sender is a bot and if that's the case it inserts an html senction inside the chat with the posted message
  } else if (sender === 'bot') {
    soundEffect.play();
    chat.innerHTML += `
      <section class="bot-msg">
        <img src="assets/bot.png" alt="Bot" />
        <div class="bubble bot-bubble">
          <p>${message}</p>
        </div>
      </section>
    `
  };
  // This little thing makes the chat scroll to the last message when there are too many to be shown in the chat box
  chat.scrollTop = chat.scrollHeight;
}

const showTypingIndicator = () => {
  addTypingIndicatorHtml(); // Creates the HTML for the typing indicator
  insertStyle(typingStyle); // Adds styling to the typing-indicator
  chat.scrollTop = chat.scrollHeight; // Scroll to the bottom to show the indicator
};

const removeTypingIndicator = () => {
  const typingIndicator = document.querySelector('.typingIndicatorContainer');
  if (typingIndicator) {
    typingIndicator.remove();
  }
};

const sayHello = () => {
  // here we call the function showMessage, that we declared earlier with the argument "Hello there, What's your name?" for message, and the argument "bot" for sender
  showMessage(
    "Hi there! 👋 I'm your Movie Tips Assistant. What's your name?", 'bot'
  )
};

/* ------------- Function to create buttons ------------- */
const createButtons = (btnOneText, buttonIdOne, btnTwoText, buttonIdTwo) => {
  // Creates two new buttons in the HTML, one for yes and one for no.
  form.innerHTML += `
  <button class="answer-btn" id="${buttonIdOne}" type="submit" value="yes">${btnOneText}</button>
  <button class="answer-btn" id="${buttonIdTwo}" type="submit" value="no">${btnTwoText}</button>
`
  // This is where the "code" argument is replaced with the actual code
  insertStyle(`
    .answer-btn {
      width: 100%;
  }`
  );
};

/* ------------- Function to create select interface ------------- */
// The same parameters are used for creating the id's, but since I want these in lowercase, the method toLowerCased is used.
const createSelectMenu = (option1, option2, option3) => {
  form.innerHTML += `
      <select class="select-menu" id="room-type" name="room-type">
        <option value="" disabled selected>👇 Select a genre</option>
        <option value="${option1.toLowerCase()}">${option1}</option>
        <option value="${option2.toLowerCase()}">${option2}</option>
        <option value="${option3.toLowerCase()}">${option3}</option>
      </select>
  `

  // This is where the "code" argument is replaced with the actual code
  insertStyle(
    `.select-menu {
        box-sizing: border-box;
        border: none;
        border-radius: 4px;
        background: #EFEDEF;
        color: #CD4F5C;
        padding: 16px;
        font-size: 16px;
        font-family: 'Montserrat';
        font-weight: 600;
        line-height: 26px;
        flex: 1;
        -webkit-appearance: none;
        appearance: none;
      }`
  );
}

/* ------------- Function to create a list element ------------- */
const createList = (listID, headingText) => {
  chat.innerHTML +=
    `<section class="bot-msg">
      <img src="assets/bot.png" alt="Bot" />
        <div class="bubble bot-bubble">
          <p>${headingText}</p>
          <ul id="${listID}"></ul>
        </div>
    </section>
`
}

/* ------------- Function to create a typing indicator divs in html ------------- */
const addTypingIndicatorHtml = () => {
  chat.innerHTML +=
    `<div class="typingIndicatorContainer">
      <div class="typingIndicatorBubble">
        <div class="typingIndicatorBubbleDot"></div>
        <div class="typingIndicatorBubbleDot"></div>
        <div class="typingIndicatorBubbleDot"></div>
      </div>
    </div>
    `
}

/* ------------- Function for adding style ------------- */
/* Creates a function called style, that takes "code" as a parameter. A style-element is created and stored in a variable called "style". The "code" (placeholder for the code - the actual code is added in the argument of an other function) is then added into the style-element by using innerHTML. The style element is then appended into the element "head".*/
function insertStyle(code) {
  var style = document.createElement('style');
  style.innerHTML = code;
  document.getElementsByTagName("head")[0].appendChild(style);
};

/* --------------------------------------- */
// Here I decided to add the "code" into a variable instead of straight into the argument of insertStyle, for a cleaner code since there is a LOT of it :) 
const typingStyle = `.typingIndicatorContainer {
    display: flex;
    flex: none;
    align-items: flex-end;
    margin: $spacing4 0;
  }
  
  .typingIndicatorBubble {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 52px;
    height: 40px;
    margin: 0px 8px;
    background-color: #EFEDEF;
    border-radius: 12px;
  }
  
  .typingIndicatorBubbleDot {
    width: 4px;
    height: 4px;
    margin-right: 4px;
    background-color: #CD4F5C;
    border-radius: 50%;
    animation-name: bounce;
    animation-duration: 1.3s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }
  
  .typingIndicatorBubbleDot:first-of-type {
    margin: 0px 4px;
  }
  
  .typingIndicatorBubbleDot:nth-of-type(2) {
    animation-delay: 0.15s;
  }
  
  .typingIndicatorBubbleDot:nth-of-type(3) {
    animation-delay: 0.3s;
  }
  
  @keyframes bounce {
    0%,
    60%,
    100% {
      transform: translateY(0);
    }
    30% {
      transform: translateY(-4px);
    }
  }
  `;

/* ------------- FIRST INTERACTION ------------- */
// "clickingPreventsDefault" prevents the default form from submitting
// Function to send the form. It runs the function showMessage, so that whatever the user has typed in is shown in the user part of the bot. 
const submitForm = (clickingPreventsDefault) => {
  clickingPreventsDefault.preventDefault();
  // gets the text (value) written in the input field and stores it in a the global variable userAnswer
  userAnswer = inputField.value;
  showMessage(`${userAnswer}`, 'user');
  // clears the inputfield after enter is pressed or the submit button has been clicked
  inputField.value = "";
  showTypingIndicator(); // Display the typing indicator
  setTimeout(() => removeTypingIndicator(), 2000);
  setTimeout(() => greetUser(), 2000);

};

/* ------------- SECOND INTERACTION ------------- */
const greetUser = () => {
  // First of all, the bot checks for an input, if it is NOT empty, it will ask if the user wants a movie tip.
  if (userAnswer !== "") {
    // Once the user has entered their name, they are shown a greeting message. The field and button in the form are removed to make room for yes and no buttons, which are then inserted with the createButtons function.
    showMessage(`Nice to meet you ${userAnswer}! Would you like a movie tip for tonight 😃?`, 'bot');
    inputField.remove();
    submitBtn.remove();
    OptInQuestion();
  } else {
    showMessage(`Please enter a name so that I can assist you with a hint of personal touch! 🤓`, 'bot');
  }
};

/* ------------- THIRD INTERACTION ------------- */
const OptInQuestion = () => {
  createButtons("Yes 😍", "btn-one", "No 👎", "btn-two");
  // stores buttons-elements in variables.
  let btnOne = document.getElementById("btn-one");
  let btnTwo = document.getElementById("btn-two");

  // This peace of code (and the one below) handle what will happen when clicking one of the buttons.
  btnOne.addEventListener("click", () => {
    showMessage("Yes 😍", "user"); // A duplicate of what is written in the button as a message in the chat from the user
    setTimeout(() => showMessage(`Amazing! What genre would you be interested in? 🍿`, "bot"), 2000); // An answer from the bot, with a follow-up question
    btnOne.remove(); // Yes-button gets removed to make room for the select with options that comes further down
    btnTwo.remove(); // No-button gets removed to make room for the select with options that comes further down
    showTypingIndicator(); // Display the typing indicator
    setTimeout(() => removeTypingIndicator(), 2000);
    setTimeout(() => chooseGenre(), 1999) // Here I put 999 milliseconds, otherwise the selectdropdown was palced above the text to choose genre. This needed to come just a millisecond before for everything to look good!
  })

  btnTwo.addEventListener("click", () => {
    showMessage("No 👎", "user");
    setTimeout(() => showMessage(`I understand, I hope you'll have an amazing night!`, "bot"), 1000);
    btnOne.remove();
    btnTwo.remove();
    showTypingIndicator(); // Display the typing indicator
    setTimeout(() => removeTypingIndicator(), 2000);
    setTimeout(() => endChat(), 2000)
  })
};

/* ------------- FOURTH INTERACTION ------------- */
// Creates the select dropdown with different genre-options
const chooseGenre = () => {
  createSelectMenu("Action", "Comedy", "Drama");
  // Declares a varaible for the select element to be used when getting the text content of it further down
  const selectDropDown = document.querySelector('.select-menu');
  chat.scrollTop = chat.scrollHeight; // Scroll to the bottom to show the indicator

  // Function to check what genre the user has chosen.
  const checkValue = () => {
    // This variable needs to be inside of the checkValue function, if it's outside of it, the code hasn't had time to "store" the value yet, and therefore it returns an error
    const genre = selectDropDown[selectDropDown.selectedIndex].text;
    selectedGenre = genre; // selectedGenre is the same as genre

    const optionInteraction = () => {
      showMessage(`${genre}`, "user");
      showTypingIndicator(); // Display the typing indicator
      setTimeout(() => removeTypingIndicator(), 2000);
      setTimeout(() => showMessage(`${genre} is a great choice! Would you like to see an oldie but a goodie, or a newer movie?`, "bot"), 2000);
      selectDropDown.value = " ";
      setTimeout(() => selectDropDown.remove(), 2000);
    }

    optionInteraction();
    setTimeout(() => createButtons("🧓🏻", "btn-one", "🍼", "btn-two"), 2000);
    setTimeout(() => oldieOrNewbie(), 2000);
  }
  selectDropDown.addEventListener("change", checkValue); // on the change of a select option, the code for checkValue is invoked.

};

/* ------------- FIFTH INTERACTION ------------- */
// Lets user select from an old movie or a new movie
function oldieOrNewbie() {
  const oldie = document.getElementById("btn-one");
  const newbie = document.getElementById("btn-two");

  // This part is for the older movies.
  oldie.addEventListener("click", () => {
    showMessage("Oldie please 🧓🏻", "user");
    // The selectedGenre retrieves the oldies list that we want to display, based on the users answer
    const oldiesByGenre = oldiesObject[selectedGenre];

    // If the selected genre is in the list it displays an answer to the user, otherwise it sends an error
    if (oldiesByGenre) {
      showTypingIndicator(); // Display the typing indicator
      setTimeout(() => removeTypingIndicator(), 2000);
      setTimeout(() => showMessage(`Of course ${userAnswer}! Here is a list of movies for you to choose from 🥰`, "bot"), 2000);
      setTimeout(() => showOldies(oldiesByGenre), 3000);
    } else {
      showMessage(`I'm sorry, but there are no oldies available for the selected genre.`, "bot");
    }
    oldie.remove();
    newbie.remove();
    setTimeout(() => endChat(), 5000);
  });

  // This part is for the newer movies.
  newbie.addEventListener("click", () => {
    showMessage("Newbie please 🍼", "user");
    const newbiesByGenre = newbiesObject[selectedGenre];

    if (newbiesByGenre) {
      showTypingIndicator(); // Display the typing indicator
      setTimeout(() => removeTypingIndicator(), 2000);
      setTimeout(() => showMessage(`Of course ${userAnswer}! Here is a list of movies for you to choose from 🥰`, "bot"), 2000);
      setTimeout(() => showOldies(newbiesByGenre), 3000);
    } else {
      showMessage(`I'm sorry, but there are no oldies available for the selected genre.`, "bot");
    }
    oldie.remove();
    newbie.remove();
    setTimeout(() => endChat(), 5000);
  });
};

/* ------------- SIXT INTERACTION ------------- */
// Shows a list of films based on the selected genre and old/new movie
function showOldies(oldies) {
  createList("my-list", "The top 5 best movies based on your wishes:");
  const list = document.getElementById("my-list");

  for (let i = 0; i < oldies.length; ++i) {
    let li = document.createElement('li');
    li.innerText = oldies[i];
    list.appendChild(li);
  }
  // Scroll the last item into view
  const lastListItem = list.lastChild;
  lastListItem.scrollIntoView();
}

function showNewbies(newbies) {
  createList("my-list", "The top 5 best movies based on your wishes:");
  const list = document.getElementById("my-list");

  for (let i = 0; i < newbies.length; ++i) {
    let li = document.createElement('li');
    li.innerText = newbies[i];
    list.appendChild(li);
  }
  // Scroll the last item into view
  const lastListItem = list.lastChild;
  lastListItem.scrollIntoView();
}

/* ------------- END INTERACTION ------------- */
// An extra message for when the user chooses to end the chat.
const endChat = () => {
  setTimeout(showMessage(`Press <b>CMD+R</b> to get a new tip, or feel free to close down the window when ever you are ready to pop the pop-corn 🤓`, "bot"), 1000);
  form.remove(); // all form elements are removed to make the chat look closed
};

// EVENT LISTENERS
submitBtn.addEventListener("click", submitForm);

// MISC
// The greeting function will be called one second after the website is loaded.
setTimeout(sayHello, 1000);
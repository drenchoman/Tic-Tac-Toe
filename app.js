const Controller = (() => {
  let placement = false;

  const player1 = {
    name: "",
    marker: "",
  }

  const player2 = {
    name: "",
    marker: "",
  }

  const initGame = () => {

    GameBoard.makeRows();
    GameBoard.highlightSquare();

  }

  const playerToggle = () => {
    player1Turn = !player1Turn;
  }


  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]


  const checkWinner = (playerMark) => {
    board = GameBoard.getBoard();
    return winConditions.some(function(threeInARow) {
      return threeInARow.every(function(square) {
        return board[square].textContent === playerMark;
      });
    });
  }

  const checkDraw = () => {
    board = GameBoard.getBoard();
    return board.every(function(square, x) {
      square = ""
      return board[x].textContent != square
    })
  };

  const turnIndicator = () => {
    if (player1Turn === true) {
      SelectorDOM.mainTitle.textContent = (Controller.player1.name + "'s turn")
    } else if (player1Turn === false) {
      SelectorDOM.mainTitle.textContent = (Controller.player2.name + "'s turn");
    }
  }
  const displayWinner = () => {
    if (player1Turn === true) {
      if(placement === false){
          SelectorDOM.mainTitle.textContent = (Controller.player2.name + " wins!")
          console.log("test1")
          return

      }
      SelectorDOM.mainTitle.textContent = (Controller.player1.name + " wins!")
      console.log(placement)
    } else if (player1Turn === false) {
      SelectorDOM.mainTitle.textContent = (Controller.player1.name + " wins!")
      console.log("test3")
    }
  }

  const computerPlay = () => {
        let choices = GameBoard.getBoard().map((square, index) => {
            if (square.textContent != "") {
                return false;
            } else {
                return index;
            }
        })
        choices = choices.filter(item => {
            return item !== false;
        })
        const selection = Math.floor(Math.random() * choices.length);
        Controller.addAiSelection(choices, selection);
        Controller.placementToggle();

      };

    const checkAI = () => {
      if( Controller.player2.name === "AI BOB" ){
        return true
      }

    }
    const placementToggle = () => {
      placement = !placementToggle

  }

    const addAiSelection = (x, y) => {
      console.log(x[y])
      z = x[y]
      board = GameBoard.getBoard()
    if (Controller.player2.name === "AI BOB"){
      board[z].classList.add("red");
      board[z].textContent = Controller.player2.marker;


    }
  }


  return {
    player1,
    player2,
    playerToggle,
    checkWinner,
    checkDraw,
    initGame,
    turnIndicator,
    displayWinner,
    computerPlay,
    checkAI,
    addAiSelection,
    placementToggle,

  }
})();


const GameBoard = (() => {
  const board = [];
  const getBoard = () => {
    return board;
  }

  const makeRows = () => {
    wrapper.style.setProperty('--grid-rows', 3);
    wrapper.style.setProperty('--grid-cols', 3);
    for (c = 0; c < (3 * 3); c++) {
      let cell = document.createElement("div");
      cell.innerText = ("");
      board.push(cell);
      wrapper.appendChild(cell).className = "square";
    };

  }
// This is a mess, sorry!
  const highlightSquare = () => {
    let square = document.querySelectorAll(".square");
    square.forEach(item => {
      item.addEventListener("click", event => {
          if (player1Turn === true) {
            if (item.classList.contains("green") || item.classList.contains("red")) {
              return
            } if (player1Turn === true && Controller.checkAI() === true){
              item.classList.add("green");
              item.textContent = Controller.player1.marker
              if (Controller.checkWinner("X") === true) {
                Controller.displayWinner();
                GameBoard.endGame();
              } else if (Controller.checkWinner("O") === true){
                Controller.displayWinner();
                GameBoard.endGame();

              } else if (Controller.checkDraw() === true){
                SelectorDOM.mainTitle.textContent = "It's a draw!"
                GameBoard.endGame();

              } else {
              Controller.computerPlay();
              Controller.playerToggle();
            }
            }
            item.classList.add("green");
            item.textContent = Controller.player1.marker
            Controller.playerToggle();
            Controller.turnIndicator();

          }
          else if (player1Turn === false) {
            if (item.classList.contains("green") || item.classList.contains("red")) {
              return
            }
            item.classList.add("red");
            item.textContent = Controller.player2.marker
            Controller.playerToggle();
            Controller.turnIndicator()
          }
          if (Controller.checkWinner("X") === true) {
            Controller.displayWinner();
            GameBoard.endGame();
          } else if (Controller.checkWinner("O") === true) {
            Controller.displayWinner();
            GameBoard.endGame();
          } else if (Controller.checkDraw() === true) {
            SelectorDOM.mainTitle.textContent = "It's a draw!"
            GameBoard.endGame();
          }

        }



      )

    })
  }

  const freezeBoard = () => {
    let square = document.querySelectorAll(".square");
    square.forEach(item => {
      item.classList.add("notarget")

    })
  };

  const clearBoard = () => {
    let playAgain = SelectorDOM.playAgain;
    playAgain.addEventListener("click", event => {
      let square = document.querySelectorAll(".square");
      square.forEach(item => {
        item.classList.remove(...item.classList);
        item.textContent = "";
        item.classList.add("square")
        GameBoard.highlightSquare();

      })
      if( Controller.checkAI()=== true){
        console.log("Ai selected")
        Controller.computerPlay();
        player1Turn = true;
        Controller.turnIndicator()
      } else {
      player1Turn = true;
      Controller.turnIndicator()
    }
    })
  }
const resetBoard = () => {
  let reset = SelectorDOM.reset;
  reset.addEventListener("click", event => {
    let square = document.querySelectorAll(".square");
    square.forEach(item => {
      item.classList.remove(...item.classList);
      item.textContent = "";
      item.classList.add("square")
    SelectorDOM.sS.style.display = "flex";
    SelectorDOM.playAgain.style.display = "none"
    SelectorDOM.reset.style.display = "none"
    wrapper.style.display = "none";
    SelectorDOM.mainHeader.style.display = "none";

    // Alternatively can use location.reload(); to refresh browser
  })
})
}

  const showButton = () => {
    SelectorDOM.playAgain.style.display = "inline-block"
    SelectorDOM.reset.style.display = "inline-block"

  };

const endGame = () => {
  GameBoard.freezeBoard();
  GameBoard.showButton();
  GameBoard.clearBoard();
  GameBoard.resetBoard();
};

  return {
    makeRows,
    highlightSquare,
    getBoard,
    freezeBoard,
    clearBoard,
    showButton,
    resetBoard,
    endGame,

  };


})();
Controller.initGame();
// p1machine left for if I eve r want to add AI vs AI

const SelectorDOM = (() => {
  const wrapper = document.getElementById("wrapper")
  const titleDiv = document.createElement("div")
  const header = document.createElement("h1")
  const pTitle = document.createElement("h2")
  const pTitle2 = document.createElement("h2")
  const playerSelection = document.createElement("div")
  const selectorDiv = document.createElement("div");
  const selectorDiv2 = document.createElement("div");
  const p1Human = document.createElement("button")
  const p2Human = document.createElement("button")
  // const p1Machine = document.createElement("button");
  const p2Machine = document.createElement("button");
  const markerDiv = document.createElement("div");
  const mTitle = document.createElement("h2");
  const mTitle2 = document.createElement("h2");
  const markerSelection = document.createElement("div")
  const markerDisplay = document.createElement("div")
  const markerDisplay2 = document.createElement("div")
  const p1Marker1 = document.createElement("button");
  const p1Marker2 = document.createElement("button");
  const p2Marker1 = document.createElement("button");
  const p2Marker2 = document.createElement("button");
  const playDiv = document.createElement("div");
  const play = document.createElement("button")
  const mainHeader = document.querySelector(".header");
  const mainTitle = document.querySelector(".header h1");
  const sS = document.querySelector(".sS")
  const pButtons = selectorDiv.getElementsByClassName("btn");
  const pButtons2 = selectorDiv2.getElementsByClassName("btn");
  const mButtons = markerDisplay.getElementsByClassName("btn");
  const mButtons2 = markerDisplay2.getElementsByClassName("btn");
  const playAgain = document.querySelector(".play")
  const reset = document.querySelector(".reset")

  const createDOM = () => {

    // Class Lists
    titleDiv.classList.add("selectorScreen");
    markerDiv.classList.add("markerDiv");
    markerDisplay.classList.add("markerDisplay");
    markerDisplay2.classList.add("markerDisplay2");
    p1Marker1.classList.add("btn");
    p1Marker1.value = "X";
    p1Marker2.classList.add("btn");
    p1Marker2.value = "O";
    p2Marker1.classList.add("btn");
    p2Marker1.value = "X";
    p2Marker2.classList.add("btn");
    p2Marker2.value = "O";
    playDiv.classList.add("playDiv")
    playerSelection.classList.add("playerSelection")
    selectorDiv.classList.add("selectorDiv");
    selectorDiv2.classList.add("selectorDiv2");
    markerSelection.classList.add("markerSelection");
    p1Human.classList.add("btn");
    p1Human.value = "Player One"
    // p1Machine.classList.add("btn");
    // p1Machine.value = "AI Steve"
    p2Human.classList.add("btn");
    p2Human.value = "Player Two"
    p2Machine.classList.add("btn");
    p2Machine.value = "AI BOB"
    play.classList.add("playButton");

    // Add text content

    header.textContent = "Make your selection!";
    pTitle.textContent = "Player One";
    pTitle2.textContent = "Player Two";
    p1Human.textContent = "Human";
    p2Human.textContent = "Human";
    // p1Machine.textContent = "AI";
    p2Machine.textContent = "AI";
    mTitle.textContent = "Marker Selector";
    mTitle2.textContent = "Marker Selector";
    p1Marker1.textContent = "X";
    p1Marker2.textContent = "O";
    p2Marker1.textContent = "X";
    p2Marker2.textContent = "O";
    play.textContent = "Play!";

    // Append Elements

    sS.appendChild(titleDiv)
    titleDiv.appendChild(pTitle)
    titleDiv.appendChild(pTitle2)
    selectorDiv.appendChild(p1Human);
    // selectorDiv.appendChild(p1Machine);
    selectorDiv2.appendChild(p2Human);
    selectorDiv2.appendChild(p2Machine);
    playerSelection.appendChild(selectorDiv);
    playerSelection.appendChild(selectorDiv2);
    sS.appendChild(playerSelection);
    sS.appendChild(markerDiv);
    markerDisplay.appendChild(p1Marker1);
    markerDisplay.appendChild(p1Marker2);
    markerDisplay2.appendChild(p2Marker1);
    markerDisplay2.appendChild(p2Marker2);
    markerSelection.appendChild(markerDisplay);
    markerSelection.appendChild(markerDisplay2);
    sS.appendChild(markerSelection);
    sS.appendChild(playDiv);
    markerDiv.appendChild(mTitle);
    markerDiv.appendChild(mTitle2);
    playDiv.appendChild(play);
    sS.insertBefore(header, titleDiv)


  }


  return {
    createDOM,
    pButtons,
    pButtons2,
    mButtons,
    mButtons2,
    mainHeader,
    sS,
    mainTitle,
    playAgain,
    reset,
    wrapper
  }
})();
SelectorDOM.createDOM();


const PlayerSelection = (() => {
  const playB = document.querySelector(".playButton");
  let playerSelect = document.querySelectorAll("div.playerSelection button");
  let markerSelect = document.querySelectorAll("div.markerSelection button");

  const addHighlight = (buttons, className) => {
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", function() {
        let current = document.getElementsByClassName(className)
        if (current.length > 0) {
          current[0].className = current[0].className.replace(className, "");

        }
        this.className += className


      });

    }
  }
  const revealBoard = () => {
    playB.addEventListener("click", revealBoard => {
        if (configPlayer(playerSelect)) {
          if (configMarker(markerSelect)) {
            wrapper.style.display = "grid";
            SelectorDOM.mainHeader.style.display = "flex";
            SelectorDOM.sS.style.display = "none";
            if( Controller.checkAI()=== true){
              console.log("Ai selected")
              Controller.computerPlay();
              player1Turn = true;
              Controller.turnIndicator()
            } else {
            player1Turn = true;
            Controller.turnIndicator()
          }

        }
        }
        console.log("Test works")

      }

    )
  }
  const configPlayer = (player) => {

    for (i = 0; i < player.length; i++) {
      let node = player[i];
      let selection = node.value;

      if (node.classList.contains("active")) {
        player1 = selection

      } else if (node.classList.contains("active2")) {
        player2 = selection
      }

    }
    if (typeof player1 === "undefined" || typeof player2 === "undefined") {
      alert("Please select a player!")
      return false
    }


    Controller.player1.name = player1;
    Controller.player2.name = player2;
    return true


  }

  const configMarker = (marker) => {

    for (i = 0; i < marker.length; i++) {
      let node = marker[i];
      let selection = node.value;

      if (node.classList.contains("active3")) {
        mark1 = selection

      } else if (node.classList.contains("active4")) {
        mark2 = selection
      }

    }
    if (typeof mark1 === "undefined" || typeof mark2 === "undefined") {
      alert("Please select both markers")
      return false
    } else if (mark1 === mark2) {
      alert("You can't both have the same marker! Pick again!")
      return false
    }
    Controller.player1.marker = mark1;
    Controller.player2.marker = mark2;
    return true
  };

  return {
    addHighlight,
    revealBoard,
  }
})();
PlayerSelection.addHighlight(SelectorDOM.pButtons, " active");
PlayerSelection.addHighlight(SelectorDOM.pButtons2, " active2");
PlayerSelection.addHighlight(SelectorDOM.mButtons, " active3");
PlayerSelection.addHighlight(SelectorDOM.mButtons2, " active4");
PlayerSelection.revealBoard();

// Welcome screen creation to selector screen

const TitleScreenDOM = (() => {
  const selectorScreen = () => {
    const welcome = document.querySelector(".welcome")
    const welcomeTitle = document.createElement("h1")
    welcomeTitle.classList.add("welcomeTitle")
    welcomeTitle.textContent = "Tic-Tac-Toe!"
    welcome.appendChild(welcomeTitle)
    const welcomeButton = document.createElement("button")
    welcomeButton.classList.add("welcomeButton")
    welcomeButton.textContent = "Start"
    welcome.appendChild(welcomeButton)
    const welcomeButt = document.querySelector(".welcomeButton")
    welcomeButt.addEventListener("click", e => {
      SelectorDOM.sS.style.display = "flex";
      welcome.style.display = "none";
    })
  }
  return{
    selectorScreen,
  }

})()
TitleScreenDOM.selectorScreen();

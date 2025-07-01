 
var errors = 0;
var cardList = [
    "darkness",
    "double",
    "fairy",
    "fighting",
    "fire",
    "grass",
    "lighting",
    "metal",
    "psychic",
    "water",
]


var cardSet;
var board = [];
var rows = 4;
var columns =5;

var card1Selected;
var card2Selected;

window.onload = function() {
    shuffleCards();
    startGame();
    $("#ol").html(`<center><div id="inst"><h3>Welcome !</h3>Instructions For Game<br/><br/><li>Make pairs of similiar blocks by flipping them.</li><li>To flip a block you can click on it.</li><li>If two blocks you clicked are not similar, they will be flipped back.</li><p style="font-size:18px;">Click one of the following mode to start the game.</p></div><button onclick="start(3, 4)">3 x 4</button> <button onclick="start(4, 4)" style="w">4 x 4</button><button onclick="start(4, 5)">4 x 5</button><button onclick="start(5, 6)">5 x 6</button><button onclick="start(6, 6)">6 x 6</button></center>`);
}

function shuffleCards() {
    cardSet = cardList.concat(cardList); //two of each card
    console.log(cardSet);
    //shuffle
    for (let i = 0; i < cardSet.length; i++) {
        let j = Math.floor(Math.random() * cardSet.length); //get random index
        //swap
        let temp = cardSet[i];
        cardSet[i] = cardSet[j];
        cardSet[j] = temp;
    }
    console.log(cardSet);
}


function startGame() {
    //Timer and moves
    min=0, sec=0, moves=0;
    $("#time").html("Time: 00:00");
    $("#moves").html("Moves: 0");
    time = setInterval(function() {
      sec++;
      if(sec==60) {
          min++; sec=0;
      }
      if(sec<10) 
          $("#time").html("Time: 0"+min+":0"+sec);
      else 
        $("#time").html("Time: 0"+min+":"+sec);
    }, 1000);
    rem=r*l/2, noItems=rem;
    mode = r+"x"+l;
    //arrange the board 4x5
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            let cardImg = cardSet.pop();
            row.push(cardImg); //JS

            // <img id="0-0" class="card" src="water.jpg">
            let card = document.createElement("img");
            card.id = r.toString() + "-" + c.toString();
            card.src = cardImg + ".jpg" ;
            card.classList.add("card");
            card.addEventListener("click", selectCard);
            document.getElementById("board").append(card);
            
        }
        board.push(row);
    }

    console.log(board);
    set
    Timeout(hideCards, 1000);

    //Creating table
    $("table").html("");
    var n=1;
    for (var i = 1;i<=r;i++) {
        $("table").append("<tr>");
        for (var j = 1;j<=l;j++) {
            $("table").append(`<td id='${n}' onclick="change(${n})"><div class='inner'><div class='front'></div><div class='back'><p>${items[n-1]}</p></div></div></td>`);
            n++;
          }
          $("table").append("</tr>");
    }

    //Hiding instructions screen
    $("#ol").fadeOut(500);
}
 

function hideCards() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let card = document.getElementById(r.toString() + "-" + c.toString());
            card.src = "back.webp";
        }
    }
}

function selectCard() {

    if (this.src.includes("back")) {
        if (!card1Selected) {
            card1Selected = this;

            let coords = card1Selected.id.split("-"); //"0-1" -> ["0", "1"]
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);

            card1Selected.src = board[r][c] + ".jpg";
        }
        else if (!card2Selected && this != card1Selected) {
            card2Selected = this;

            let coords = card2Selected.id.split("-"); //"0-1" -> ["0", "1"]
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);

            card2Selected.src = board[r][c] + ".jpg";
            setTimeout(update, 1000);
        }
    }

}

function update() {
    //if cards aren't the same, flip both back
    if (card1Selected.src != card2Selected.src) {
        card1Selected.src = "back.webp";
        card2Selected.src = "back.webp";
        errors += 1;
        document.getElementById("errors").innerText = errors;
    }

    card1Selected = null;
    card2Selected = null;
}

//Function for flipping blocks
function change(x) {
    //Variables
    let i = "#"+x+" .inner";
    let f = "#"+x+" .inner .front";
    let b = "#"+x+" .inner .back";
    
    //Dont flip for these conditions
    if (turn==2 || $(i).attr("flip")=="block" || ppID==x) {}
    
    //Flip
    else {
      $(i).css(t, flip);
      if (turn==1) {
        //This value will prevent spam clicking
        turn=2;
        
        //If both flipped blocks are not same
        if (pre!=$(b).text()) {
           setTimeout(function() {
              $(pID).css(t, flipBack);
              $(i).css(t, flipBack);
              ppID=0;
           },1000);
        }
        
        //If blocks flipped are same
        else {
            rem--;
            $(i).attr("flip", "block");
            $(pID).attr("flip", "block");
        }
        
        setTimeout(function() {
           turn=0;
           //Increase moves
           moves++;
           $("#moves").html("Moves: "+moves);
        },1150);
        
      }
      else {
        pre = $(b).text();
        ppID = x;
        pID = "#"+x+" .inner";
        turn=1;
      }
      
      //If all pairs are matched
      if (rem==0) {
            clearInterval(time);
            if (min==0) {
                time = `${sec} seconds`;
            }
            else {
                time = `${min} minute(s) and ${sec} second(s)`;
            }
            setTimeout(function() {
                $("#ol").html(`<center><div id="iol"><h2>Congrats!</h2><p style="font-size:23px;padding:10px;">You completed the ${mode} mode in ${moves} moves. It took you ${time}.</p><p style="font-size:18px">Comment Your Score!<br/>Play Again ?</p><button onclick="start(3, 4)">3 x 4</button> <button onclick="start(4, 4)" style="w">4 x 4</button><button onclick="start(4, 5)">4 x 5</button><button onclick="start(5, 6)">5 x 6</button><button onclick="start(6, 6)">6 x 6</button></div></center>`);
                $("#ol").fadeIn(750);
            }, 1500);
      }
    }
  }
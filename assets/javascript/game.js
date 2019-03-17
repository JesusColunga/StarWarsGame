/* game.js            */
/* Star Wars RPG Game */
/* 16/Mar/2019        */


// GLOBAL VARIABLES
// =======================================================================================
var imagesPath = "assets/images/";


// OBJECTS
// =======================================================================================
var character1 = {
        name:                     "Ahsoka",
        image:                    "Ahsoka_Disney_INFINITY.png",
        originalHP:               120,
        healthPoints:             120,
        originalAP:               8,
        attackPower:              8,
        counterAttackPower:       23,
        enabled:                  true
    };
var character2 = {
        name:                     "Mace Windu",
        image:                    "star_wars_revenge_of_the_sith_mace_windu_png_by_metropolis_hero1125_dcanbdi-250t.png",
        originalHP:               100,
        healthPoints:             100,
        originalAP:               10,
        attackPower:              10,
        counterAttackPower:       25,
        enabled:                  true
    };
var character3 = {
        name:                     "Luke Skywalker",
        image:                    "star-wars-luke-skywalker-png-2.png",
        originalHP:               150,
        healthPoints:             150,
        originalAP:               12,
        attackPower:              12,
        counterAttackPower:       27,
        enabled:                  true
    };
var character4 = {
        name:                     "Yoda",
        image:                    "yodacw3principal.png",
        originalHP:               180,
        healthPoints:             180,
        originalAP:               14,
        attackPower:              14,
        counterAttackPower:       29,
        enabled:                  true
    };

var characters = [character1, character2, character3, character4];

var game = {
    userCharacter   : null,   // "Your Character", pointer to "characters" array
    enemies         : [],     // "Enemies Available to Attack", array of pointers to "characters" array
    defender        : null,   // "Defender", pointer to "characters" array
    wins            : 0,      // Number of times the usar has won
    loses           : 0,      // Number of times the usar has lost
    usrCharSelected : false,
    started         : false,
    attacking       : false,  // When attack mode is enabled.
    usrCharOrigAP   : 0,      // User Character original Attack Power

    ////////// ////////// //////////     Visual area     ////////// ////////// //////////
    createImage: function (indexChar, area) {
        var image = $("<img>");
        image.attr ("src", imagesPath + characters [indexChar].image);
        image.attr ("class", "characterImage"); 
        image.attr ("alt", characters [indexChar].name);
        return image; 
    }, 

    createImgCrdFooter: function (indexChar) {
        imgCrdFooter = $("<div>");
        imgCrdFooter.attr ("class", "card-footer  bg-transparent  text-right");
        imgCrdFooter.attr ("style", "padding:0px 3px 4px 3px;");
        imgCrdFooter.text ( characters [indexChar].healthPoints );
        return imgCrdFooter;
    },

    createImgCrdBody:   function (indexChar, area) {
        var backgrColor;

        switch (area) {
            case "#row2" : backgrColor = "black" ; break;     // Available Characters (blanco) negro
            case "#row4" : backgrColor = "green" ; break;     // Your Character (blanco) verde
            case "#row6" : backgrColor = "yellow"; break;     // Enemies Available to Attack (rojo) amarillo
            case "#row10": backgrColor = "red"   ; break;     // Defender (negro) rojo
        }

        imgCrdBody = $("<div>");
        imgCrdBody.attr ("class", "card-body  text-center  py-1");
        imgCrdBody.attr ("style", "background:" + backgrColor); 
        imgCrdBody.append (
            game.createImage (indexChar, area) 
        ); 
        return imgCrdBody;
    },

    createImgCrdHeader: function (indexChar) {
        imgCrdHeader = $("<div>");
        imgCrdHeader.attr ("class", "card-header  bg-transparent  text-center");
        imgCrdHeader.attr ("style", "padding:3px 20px 3px 20px;  min-height: 54px;");
        imgCrdHeader.text (characters [indexChar].name);
        return imgCrdHeader;
    },

    createImageCard:    function (indexChar) {
        imageCard = $("<div>");
        imageCard.attr ("class", "card  border-success  mr-3  mb-3  col-2");
        imageCard.attr ("style", "max-width: 9rem;  background: black;")
        imageCard.attr ("id", "imgCard");   
        imageCard.attr ("data-indexArrChars", indexChar);   // Pointer to the position in the array "characters".
        return imageCard;
    },

    showCharacter:      function (area, indexChar) {
        var imageCard;
        var imgCrdHeader;
        var imgCrdBody;
        var imgCrdFooter;

        imageCard    = game.createImageCard     (indexChar);
        imgCrdHeader = game.createImgCrdHeader  (indexChar);
        imgCrdBody   = game.createImgCrdBody    (indexChar, area);
        imgCrdFooter = game.createImgCrdFooter  (indexChar);

        imageCard.append (imgCrdHeader);
        imageCard.append (imgCrdBody);
        imageCard.append (imgCrdFooter); 

        $(area).append (imageCard);
    },
    ////////// ////////// //////////     -----------     ////////// ////////// //////////

    processUserLoses:   function () {
        $("#row12").empty ();
        var msg1 = $("<p>");
        msg1.text ("You have been defeated. GAME OVER !");
        $("#row12").append (msg1);

        $("#row13").empty ();

        disableAttackButton ();
        enableRestartButton ();
    },

    checkNoEnemies:     function () {
        var noEnemies = true;
        for (ct = 0; ct < characters.length; ct ++) {
            if (ct != game.userCharacter) {
                if (characters [ct].enabled) {
                    noEnemies = false;
                }
            }
        }
        return noEnemies;
    },

    msgWonGameOver: function () {
        $("#row12").empty ();
        var msg1 = $("<p>");
        msg1.text ("You Won. GAME OVER !");
        $("#row12").append (msg1);

        $("#row13").empty ();
    },

    msgFightAnotherEnemy: function () {
        $("#row12").empty ();
        var msg1 = $("<p>");
        msg1.text ("You have defeated "                        +
                   characters [game.defender].name             +
                   ", you can choose to fight another enemy."
                   );
        $("#row12").append (msg1);

        $("#row13").empty ();
    },

    processUserWins:    function () {
        $("#row10").empty ();
        disableAttackButton ();
        characters [game.defender].enabled = false;
        if (game.checkNoEnemies ()) {
            game.msgWonGameOver ();
            enableRestartButton ();
        } else {
            game.msgFightAnotherEnemy ();
        }
        game.defender = null;
    },

    reportAttack:       function () {
        $("#row12").empty ();
        var msg1 = $("<p>");
        msg1.text ("You attacked "                             +
                   characters [game.defender].name             +
                   " for "                                     +
                   characters [game.userCharacter].attackPower +
                   " damage."
                   );
        $("#row12").append (msg1);

        $("#row13").empty ();
        var msg2 = $("<p>")
        msg2.text (characters [game.defender].name             +
                   " attacked you back for "                                     +
                   characters [game.defender].counterAttackPower +
                   " damage."
                   );
        $("#row13").append (msg2);
    },

    calculatePoints:    function () {
        characters [game.userCharacter].healthPoints -= characters [game.defender].counterAttackPower;
        characters [game.defender     ].healthPoints -= characters [game.userCharacter].attackPower;
        characters [game.userCharacter].attackPower  += game.usrCharOrigAP;
    },

    processAttack:      function () {
        game.reportAttack ();
        game.calculatePoints ();

        if (characters [game.defender     ].healthPoints < 0) {
            game.processUserWins ();
        } else
        if (characters [game.userCharacter].healthPoints < 0 ) {
            game.processUserLoses ();
        } else {
            $("#row4").empty ();
            game.showCharacter ("#row4", game.userCharacter);

            $("#row10").empty ();
            game.showCharacter ("#row10", game.defender);
        }
    },

    restart:            function () {
        $("#row2").empty ();
        $("#row4").empty ();
        $("#row6").empty ();
        $("#row10").empty ();
        $("#row12").empty ();
        $("#row13").empty ();
        for (ct = 0; ct < characters.length; ct++) {
            characters [ct].healthPoints = characters [ct].originalHP;
            characters [ct].attackPower  = characters [ct].originalAP;
            characters [ct].enabled      = true;
        }
        game.userCharacter   = null;   // "Your Character"
        game.enemies         = [];     // "Enemies Available to Attack"
        game.defender        = null;   // "Defender"
        game.usrCharSelected = false;
        game.attacking       = false;
        disableRestartButton ();
        loadAllCharacters ();   // in row 2
    }

}  // game


// FUNCTIONS (Definition)
// =======================================================================================
function loadAllCharacters () {
    for (ct=0; ct < characters.length; ct++) {
        game.showCharacter ("#row2", ct);
    }
    game.started = true;
}

function showTeams (indexChar) {
    for (ct = 0; ct < characters.length; ct++) {
        if (ct == indexChar) {
            game.showCharacter ("#row4", ct);
            game.userCharacter = ct;
            game.usrCharSelected = true;
            game.usrCharOrigAP = characters [ct].attackPower;
        } else {
            game.showCharacter ("#row6", ct);
            game.enemies.push (ct);
        }
    } 
    $("#row2").empty ();
}  

function enableAttackButton () {
    $("#attackButton").empty ();
    $("#attackButton").append ( '<button type="button" class="btn btn-danger badge-pill">  A t t a c k  </button>' );
    game.attacking = true;
};

function disableAttackButton () {
    $("#attackButton").empty ();
    $("#attackButton").append ( '<button type="button" class="btn btn-dark badge-pill">  A t t a c k  </button>' );
    game.attacking = false;
};

function enableRestartButton () {
    $("#row14").empty ();
    $("#row14").append ( '<button type="button" class="btn btn-primary badge-pill" id="rstBtn"> Restart Game </button>' );
};

function disableRestartButton () {
    $("#row14").empty ();
};


function showDefender (indexChar) {
    $("#row6").empty ();
    $("#row10").empty ();
    $("#row12").empty ();
    $("#row13").empty ();

    for (ct = 0; ct < characters.length; ct++) {
        if ( (ct != game.userCharacter) &&
             (characters [ct].enabled) )  {
            if (ct == indexChar) {
                game.showCharacter ("#row10", ct);
                game.defender = ct;
            } else {
                game.showCharacter ("#row6", ct);
            }
        }
    }

    enableAttackButton ();
}


// FUNCTION CALLS (Execution)
// =======================================================================================
$(document).ready(function() {
    if (game.started === false) {
        loadAllCharacters ();   // in row 2
    }

    $("#row2").on ("click", "#imgCard", function () {
        if (game.usrCharSelected === false) {
            showTeams ( $(this).attr ("data-indexArrChars") );      // Send index in the array of characters
        }  
    });

    $("#row6").on ("click", "#imgCard", function () {
        if (game.defender === null) {
            showDefender ( $(this).attr ("data-indexArrChars") );   // Send index in the array of characters
        }
    });

    $("#attackButton").on ("click", function () {
        if (game.attacking) {
            game.processAttack ();
        }
    });

    $("#row14").on ("click", "#rstBtn", function () {
        game.restart ();
    });

}); // document.ready

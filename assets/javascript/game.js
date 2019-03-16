/* game.js            */
/* Star Wars RPG Game */
/* 15/Mar/2019        */

// GLOBAL VARIABLES
// =======================================================================================
var imagesPath = "assets/images/";

// OBJECTS
// =======================================================================================
var character1 = {
        name:                     "Ahsoka",
        image:                    "Ahsoka_Disney_INFINITY.png",
        healthPoints:             120,
        attackPower:              8,
        counterAttackPower:       23
    };
var character2 = {
        name:                     "Mace Windu",
        image:                    "star_wars_revenge_of_the_sith_mace_windu_png_by_metropolis_hero1125_dcanbdi-250t.png",
        healthPoints:             100,
        attackPower:              10,
        counterAttackPower:       25
    };
var character3 = {
        name:                     "Luke Skywalker",
        image:                    "star-wars-luke-skywalker-png-2.png",
        healthPoints:             150,
        attackPower:              12,
        counterAttackPower:       27
    };
var character4 = {
        name:                     "Yoda",
        image:                    "yodacw3principal.png",
        healthPoints:             180,
        attackPower:              14,
        counterAttackPower:       29
    };

var characters = [character1, character2, character3, character4];

var game = {
    userCharacter   : null,   // "Your Character"
    enemies         : [],     // "Enemies Available to Attack"
    defender        : null,   // "Defender"
    wins            : 0,      // Number of times the usar has won
    loses           : 0,      // Number of times the usar has lost
    usrCharSelected : false,
    started         : false,

    showCharacter1: function (area, character) {
        var image = $("<img>");
        image.attr ("src", imagesPath + character.image);
        image.attr ("class", "characterImage");
        image.attr ("alt", character.name);
        image.attr ("data-area", area);   // Is the place on screen where character will be shown.
        $(area).append (image);
    },

    createImage: function (charImage, charName, area) {
        var image = $("<img>");
        image.attr ("src", imagesPath + charImage);
        image.attr ("class", "characterImage");
        image.attr ("alt", charName);
        image.attr ("data-area", area);   // Is the place on screen where character will be shown.
        return image; 
    },

    createImgCrdFooter: function (healthPoints) {
        imgCrdFooter = $("<div>");
        imgCrdFooter.attr ("class", "card-footer  bg-transparent  text-right");
        imgCrdFooter.attr ("style", "padding:0px 3px 4px 3px;");
        imgCrdFooter.text (healthPoints);
        return imgCrdFooter;
    },

    createImgCrdBody:   function (charImage, charName, area) {
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
        /* falta agregar img aqui: imagesPath + character.image */
        imgCrdBody.append (game.createImage (charImage, charName, area) ); 
        return imgCrdBody;
    },

    createImgCrdHeader: function (name) {
        imgCrdHeader = $("<div>");
        imgCrdHeader.attr ("class", "card-header  bg-transparent  text-center");
        imgCrdHeader.attr ("style", "padding:3px 20px 3px 20px;  min-height: 54px;");
        imgCrdHeader.text (name);
        return imgCrdHeader;
    },

    createImageCard:    function () {
        imageCard = $("<div>");
        imageCard.attr ("class", "card  border-success  mr-3  mb-3  col-2");
        imageCard.attr ("style", "max-width: 9rem;  background: black;")
        return imageCard;
    },

    showCharacter:      function (area, character) {
        var imageCard;
        var imgCrdHeader;
        var imgCrdBody;
        var imgCrdFooter;

        imageCard    = game.createImageCard     ();
        imgCrdHeader = game.createImgCrdHeader  (character.name);
        imgCrdBody   = game.createImgCrdBody    (character.image, character.name, area);
        imgCrdFooter = game.createImgCrdFooter  (character.healthPoints );

        imageCard.append (imgCrdHeader);
        imageCard.append (imgCrdBody);
        imageCard.append (imgCrdFooter); 

        $(area).append (imageCard);
    },

    processUserLoses:   function () {
        alert ("user loses");
    },

    processUserWins:    function () {
        alert ("user wins");
        $("#row10").empty ();
    },

    calculatePoints:    function () {
        game.defender.healthPoints      -= game.userCharacter.attackPower;
        game.userCharacter.healthPoints -= game.defender.counterAttackPower;
        game.userCharacter.attackPower  *= 2;
    },

    processAttack:      function () {
        game.calculatePoints ();

        if (game.defender.healthPoints < 0) {
            game.processUserWins ();
        } else
        if (game.userCharacter.healthPoints < 0 ) {
            game.processUserLoses ();
        }
    },

    restart:            function () {
        userCharacter   = null;   // "Your Character"
        enemies         = [];     // "Enemies Available to Attack"
        defender        = null;   // "Defender"
        usrCharSelected = false;
    }


}  // game

// FUNCTIONS (Definition)
// =======================================================================================
function loadAllCharacters () {
    for (ct=0; ct < characters.length; ct++) {
        game.showCharacter ("#row2", characters [ct]);
    }
    game.started = true;
}

function showTeams (altName) {
    for (ct = 0; ct < characters.length; ct++) {
        if (characters [ct].name === altName) {
            game.showCharacter ("#row4", characters [ct]);
            game.userCharacter = characters [ct];
            game.usrCharSelected = true;
        } else {
            game.showCharacter ("#row6", characters [ct]);
            game.enemies.push ( characters [ct]) ;
        }
    }  // for
    $("#row2").empty ();
}  // showTeams

function enableAttackButton () {
    $("#attackButton").empty ();
    $("#attackButton").append ( '<button type="button" class="btn btn-danger badge-pill">  A t t a c k  </button>' );
};

function showDefender (altName) {
    for (ct = 0; ct < characters.length; ct++) {
        if (characters [ct].name === altName) {
            game.showCharacter ("#row10", characters [ct]);
            game.defender = characters [ct];
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

    $("#row2").on ("click", ".characterImage", function () {
        if (game.usrCharSelected === false) {
            showTeams ( $(this).attr ("alt") );   // Send character name
        }  
    });

    $("#row6").on ("click", ".characterImage", function () {
        if (game.defender === null) {
            showDefender ( $(this).attr ("alt") );   // in row 10. Send character name.
        }
    });

    $("#attackButton").on ("click", function () {
        game.processAttack ();
    });

}); // document.ready

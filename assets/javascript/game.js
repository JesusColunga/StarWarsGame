/* game.js            */
/* Star Wars RPG Game */
/* 11/Mar/2019        */

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

    showCharacter: function (area, character) {
        var image = $("<img>");
        image.attr ("src", imagesPath + character.image);
        image.attr ("class", "characterImage");
        image.attr ("alt", character.name);
        image.attr ("data-area", area);   // Is the place on screen where character will be shown.
        $(area).append (image);
    },  // showCharacter

    restart: function () {
        userCharacter   = null;   // "Your Character"
        enemies         = [];     // "Enemies Available to Attack"
        defender        = null;   // "Defender"
        usrCharSelected = false;
    }

}  // game

// FUNCTIONS
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
}  // showTeams

function showDefender (altName) {
    alert ("algo anda mal por aqui");
    for (ct = 0; ct < characters.length; ct++) {
        if (characters [ct].name === altName) {
            game.showCharacter ("#row10", characters [ct]);
            game.defender = characters [ct];
        }
    }
}


// FUNCTION CALLS (Execution)
// =======================================================================================
$(document).ready(function() {
    if (game.started === false) {
        loadAllCharacters ();   // in row 2
    }

    $(".characterImage").on ("click", function () {
        console.log ("data=" + 
               $(this).attr ("data-area") +
               "  /  alt= " +
               $(this).attr ("alt")
               );
        if ($(this).attr ("data-area") == "#row2") {
            if (game.usrCharSelected === false) {
                showTeams ( $(this).attr ("alt") );   // Send character name
            }  // if
        } else
        if ($(this).attr ("data-area") == "#row6") {
            alert ("algo anda mal por aca");
            showDefender ( $(this).attr ("alt") );   // in row 10. Send character name.
        } else {
            alert ("ultimo else");
        }

    });        // on click

}); // document.ready

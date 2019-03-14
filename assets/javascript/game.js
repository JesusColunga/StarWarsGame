/* game.js            */
/* Star Wars RPG Game */
/* 12/Mar/2019        */

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
    },

    showCharacter2: function (area, character) {
/*        $(area).append ('

<div class="card text-white bg-dark mb-3" style="max-width: 18rem;">
  <div class="card-header">Header</div>
  <div class="card-body">
    <h5 class="card-title">Dark card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
</div>
        '); */
    },

    processUserLoses: function () {
        alert ("user loses");
    },

    processUserWins: function () {
        alert ("user wins");
        $("#row10").empty ();
    },

    calculatePoints: function () {
        game.defender.healthPoints      -= game.userCharacter.attackPower;
        game.userCharacter.healthPoints -= game.defender.counterAttackPower;
        game.userCharacter.attackPower  *= 2;
    },

    processAttack: function () {
        game.calculatePoints ();

        if (game.defender.healthPoints < 0) {
            game.processUserWins ();
        } else
        if (game.userCharacter.healthPoints < 0 ) {
            game.processUserLoses ();
        }
    },

    restart: function () {
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

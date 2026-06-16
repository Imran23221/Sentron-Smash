/* =========================
   SENTRON SMASH ULTIMATE
   GAME.JS PART 1
========================= */

const canvas =
    document.getElementById(
        "gameCanvas"
    );

const ctx =
    canvas.getContext("2d");

/* =========================
   SCREENS
========================= */

const mainMenu =
    document.getElementById(
        "mainMenu"
    );

const characterSelect =
    document.getElementById(
        "characterSelect"
    );

const mapSelect =
    document.getElementById(
        "mapSelect"
    );

const gameScreen =
    document.getElementById(
        "gameScreen"
    );

const victoryScreen =
    document.getElementById(
        "victoryScreen"
    );

/* =========================
   BUTTONS
========================= */

const playBtn =
    document.getElementById(
        "playBtn"
    );

const controlsBtn =
    document.getElementById(
        "controlsBtn"
    );

const nextBtn =
    document.getElementById(
        "toMapSelect"
    );

const startBattleBtn =
    document.getElementById(
        "startBattleBtn"
    );

const playAgainBtn =
    document.getElementById(
        "playAgainBtn"
    );

/* =========================
   HUD
========================= */

const p1NameText =
    document.getElementById(
        "p1Name"
    );

const p2NameText =
    document.getElementById(
        "p2Name"
    );

/* =========================
   GAME STATE
========================= */

const Game = {

    p1Character: null,

    p2Character: null,

    selectedMap: null,

    player1: null,

    player2: null,

    stage: null,

    running: false,

    currentPlayerSelect: 1

};

/* =========================
   HELPERS
========================= */

function hideAllScreens() {

    document
        .querySelectorAll(".screen")
        .forEach(screen => {

            screen.classList.remove(
                "active"
            );

        });

}

function showScreen(screen) {

    hideAllScreens();

    screen.classList.add(
        "active"
    );

}

/* =========================
   PLAY BUTTON
========================= */

playBtn.addEventListener(
    "click",
    () => {

        showScreen(
            characterSelect
        );

    }
);

/* =========================
   CONTROLS BUTTON
========================= */

controlsBtn.addEventListener(
    "click",
    () => {

        alert(

`PLAYER 1

A = Left
D = Right
W = Jump
F = Attack
G = Special

PLAYER 2

← = Left
→ = Right
↑ = Jump
/ = Attack
. = Special`

        );

    }
);

/* =========================
   CHARACTER SELECT
========================= */

const fighterCards =
    document.querySelectorAll(
        ".fighterCard"
    );

fighterCards.forEach(card => {

    card.addEventListener(
        "click",
        () => {

            const fighter =
                card.dataset.fighter;

            if (
                Game.currentPlayerSelect === 1
            ) {

                Game.p1Character =
                    fighter;

                p1NameText.textContent =
                    Fighters[
                        fighter
                    ].name;

                Game.currentPlayerSelect =
                    2;

                alert(
                    "Choose Player 2"
                );

            }
            else {

                Game.p2Character =
                    fighter;

                p2NameText.textContent =
                    Fighters[
                        fighter
                    ].name;

            }

        }
    );

});

/* =========================
   NEXT BUTTON
========================= */

nextBtn.addEventListener(
    "click",
    () => {

        if (
            !Game.p1Character ||
            !Game.p2Character
        ) {

            alert(
                "Choose both fighters first."
            );

            return;
        }

        showScreen(
            mapSelect
        );

    }
);

/* =========================
   MAP SELECT
========================= */

const mapCards =
    document.querySelectorAll(
        ".mapCard"
    );

mapCards.forEach(card => {

    card.addEventListener(
        "click",
        () => {

            document
                .querySelectorAll(
                    ".mapCard"
                )
                .forEach(m => {

                    m.classList.remove(
                        "selected"
                    );

                });

            card.classList.add(
                "selected"
            );

            Game.selectedMap =
                card.dataset.map;

        }
    );

});

/* =========================
   START MATCH
========================= */

startBattleBtn.addEventListener(
    "click",
    () => {

        if (
            !Game.selectedMap
        ) {

            alert(
                "Select a stage."
            );

            return;
        }

        startGame();

    }
);

/* =========================
   START GAME
========================= */

function startGame() {

    Game.stage =
        new Stage(
            Game.selectedMap
        );

    const mapData =
        Maps[
            Game.selectedMap
        ];

    Game.player1 =
        new Fighter(
            Game.p1Character,
            mapData.spawn1.x,
            mapData.spawn1.y,
            1
        );

    Game.player2 =
        new Fighter(
            Game.p2Character,
            mapData.spawn2.x,
            mapData.spawn2.y,
            2
        );

    Game.running = true;

    showScreen(
        gameScreen
    );

    requestAnimationFrame(
        gameLoop
    );

}

/* =========================
   GAME LOOP
========================= */

function gameLoop() {

    if (
        !Game.running
    ) {

        return;
    }

    update();

    render();

    requestAnimationFrame(
        gameLoop
    );

}

/* =========================
   UPDATE
========================= */

function update() {

    Game.player1.update();

    Game.player2.update();

}

/* =========================
   RENDER
========================= */

function render() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    Game.stage.draw(
        ctx
    );

    Game.player1.draw(
        ctx
    );

    Game.player2.draw(
        ctx
    );

}
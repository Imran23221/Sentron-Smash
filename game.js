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

/* =========================
   GAME.JS PART 2
   CONTROLS + PHYSICS
========================= */

const keys = {};

/* =========================
   INPUT
========================= */

window.addEventListener(
    "keydown",
    (e) => {

        keys[e.key] = true;

        // P1 Jump
        if (e.key === "w") {
            Game.player1?.jump();
        }

        // P2 Jump
        if (e.key === "ArrowUp") {
            Game.player2?.jump();
        }

        // P1 Attack
        if (e.key === "f") {
            basicAttack(
                Game.player1,
                Game.player2
            );
        }

        // P2 Attack
        if (e.key === "/") {
            basicAttack(
                Game.player2,
                Game.player1
            );
        }

        // P1 Special
        if (e.key === "g") {
            Game.player1?.useSpecial(
                Game.player2,
                Game
            );
        }

        // P2 Special
        if (e.key === ".") {
            Game.player2?.useSpecial(
                Game.player1,
                Game
            );
        }

    }
);

window.addEventListener(
    "keyup",
    (e) => {

        keys[e.key] = false;

    }
);

/* =========================
   PHYSICS
========================= */

const GRAVITY = 0.8;
const MAX_FALL_SPEED = 18;

/* =========================
   BASIC ATTACK
========================= */

function basicAttack(
    attacker,
    victim
) {

    if (
        !attacker ||
        !victim
    ) {
        return;
    }

    const dx =
        Math.abs(
            attacker.x -
            victim.x
        );

    const dy =
        Math.abs(
            attacker.y -
            victim.y
        );

    if (
        dx < 80 &&
        dy < 100
    ) {

        victim.takeDamage(
            attacker.data.attackDamage
        );

        const direction =
            attacker.x <
            victim.x
                ? 1
                : -1;

        victim.applyKnockback(
            direction * 4,
            -5
        );

    }

}

/* =========================
   MOVEMENT
========================= */

function handleMovement() {

    const p1 =
        Game.player1;

    const p2 =
        Game.player2;

    if (!p1 || !p2)
        return;

    /* PLAYER 1 */

    if (keys["a"]) {

        p1.vx = -p1.speed;

        p1.facing = -1;

    }
    else if (
        keys["d"]
    ) {

        p1.vx = p1.speed;

        p1.facing = 1;

    }
    else {

        p1.vx *= 0.8;

    }

    /* PLAYER 2 */

    if (
        keys["ArrowLeft"]
    ) {

        p2.vx =
            -p2.speed;

        p2.facing = -1;

    }
    else if (
        keys["ArrowRight"]
    ) {

        p2.vx =
            p2.speed;

        p2.facing = 1;

    }
    else {

        p2.vx *= 0.8;

    }

}

/* =========================
   PHYSICS UPDATE
========================= */

function updatePhysics(
    fighter
) {

    fighter.vy +=
        GRAVITY;

    if (
        fighter.vy >
        MAX_FALL_SPEED
    ) {

        fighter.vy =
            MAX_FALL_SPEED;

    }

    fighter.x +=
        fighter.vx;

    fighter.y +=
        fighter.vy;

    checkPlatformCollision(
        fighter,
        Game.stage
    );

    /* STAGE BOUNDS */

    if (
        fighter.x < 0
    ) {

        fighter.x = 0;
    }

    if (
        fighter.x >
        canvas.width -
        fighter.width
    ) {

        fighter.x =
            canvas.width -
            fighter.width;
    }

}

/* =========================
   KO CHECK
========================= */

function checkKO(
    fighter
) {

    if (
        fighter.y >
        1200
    ) {

        fighter.stocks--;

        fighter.damage = 0;

        const spawn =
            fighter.player === 1
                ? Maps[
                    Game.selectedMap
                  ].spawn1
                : Maps[
                    Game.selectedMap
                  ].spawn2;

        fighter.x =
            spawn.x;

        fighter.y =
            spawn.y;

        fighter.vx = 0;
        fighter.vy = 0;

        if (
            fighter.stocks <= 0
        ) {

            endGame(
                fighter.player === 1
                    ? Game.player2
                    : Game.player1
            );
        }
    }

}

/* =========================
   HUD UPDATE
========================= */

function updateHUD() {

    document.getElementById(
        "hudP1Name"
    ).textContent =
        Game.player1.name;

    document.getElementById(
        "hudP2Name"
    ).textContent =
        Game.player2.name;

    document.getElementById(
        "hudP1Damage"
    ).textContent =
        Math.floor(
            Game.player1.damage
        ) + "%";

    document.getElementById(
        "hudP2Damage"
    ).textContent =
        Math.floor(
            Game.player2.damage
        ) + "%";

    document.getElementById(
        "hudP1Stocks"
    ).textContent =
        "⭐".repeat(
            Game.player1.stocks
        );

    document.getElementById(
        "hudP2Stocks"
    ).textContent =
        "⭐".repeat(
            Game.player2.stocks
        );

}

/* =========================
   WIN SCREEN
========================= */

function endGame(
    winner
) {

    Game.running =
        false;

    document.getElementById(
        "winnerText"
    ).textContent =
        winner.name +
        " WINS!";

    showScreen(
        victoryScreen
    );

}

/* =========================
   REPLACE UPDATE()
========================= */

function update() {

    handleMovement();

    Game.player1.update();
    Game.player2.update();

    updatePhysics(
        Game.player1
    );

    updatePhysics(
        Game.player2
    );

    checkKO(
        Game.player1
    );

    checkKO(
        Game.player2
    );

    updateHUD();

}
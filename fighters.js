/* =========================
   SENTRON SMASH ULTIMATE
   FIGHTERS.JS
========================= */

const Fighters = {

    gojo: {

        id: "gojo",

        name: "Gojo",

        color: "#06b6d4",

        speed: 6,

        jumpPower: 13,

        weight: 1.0,

        attackDamage: 8,

        specialDamage: 30,

        specialName: "Hollow Purple",

        description:
            "A massive purple energy sphere that devastates opponents.",

        useSpecial(user, enemy, game) {

            game.effects.push({

                type: "hollowPurple",

                x: user.x,

                y: user.y + 30,

                vx: user.facing * 14,

                radius: 70,

                damage: 30,

                owner: user
            });

        }

    },

    michael: {

        id: "michael",

        name: "Michael",

        color: "#10b981",

        speed: 7,

        jumpPower: 13,

        weight: 0.9,

        attackDamage: 7,

        specialDamage: 25,

        specialName: "Volt Blitz",

        description:
            "Electrifies opponents for five seconds.",

        useSpecial(user, enemy, game) {

            enemy.electrified = true;

            enemy.electricTimer = 300;

            game.effects.push({

                type: "lightningBeam",

                x1: user.x,

                y1: user.y,

                x2: enemy.x,

                y2: enemy.y,

                duration: 30
            });

        }

    },

    duke: {

        id: "duke",

        name: "Duke",

        color: "#f59e0b",

        speed: 5,

        jumpPower: 11,

        weight: 1.4,

        attackDamage: 10,

        specialDamage: 35,

        specialName: "Titan Smash",

        description:
            "Shakes the arena and launches enemies.",

        useSpecial(user, enemy, game) {

            game.screenShake = 35;

            enemy.damage += 35;

            enemy.vy = -18;

            enemy.vx = user.facing * 12;

            game.effects.push({

                type: "shockwave",

                x: user.x,

                y: user.y
            });

        }

    },

    elon: {

        id: "elon",

        name: "Elon",

        color: "#ef4444",

        speed: 5.5,

        jumpPower: 12,

        weight: 1.2,

        attackDamage: 9,

        specialDamage: 50,

        specialName: "Asteroid Strike",

        description:
            "Calls a massive asteroid from the sky.",

        useSpecial(user, enemy, game) {

            game.effects.push({

                type: "asteroid",

                x: enemy.x,

                y: -200,

                target: enemy,

                damage: 50
            });

        }

    },

    imran: {

        id: "imran",

        name: "Imran",

        color: "#8b5cf6",

        speed: 6,

        jumpPower: 12,

        weight: 1.0,

        attackDamage: 8,

        specialDamage: 28,

        specialName: "Baruka Slice",

        description:
            "Spikes erupt from the ground beneath enemies.",

        useSpecial(user, enemy, game) {

            game.effects.push({

                type: "spikeField",

                x: enemy.x,

                y: game.groundY,

                damage: 28,

                owner: user
            });

        }

    }

};

/* =========================
   FIGHTER CLASS
========================= */

class Fighter {

    constructor(characterId, x, y, player) {

        const data = Fighters[characterId];

        this.data = data;

        this.player = player;

        this.name = data.name;

        this.color = data.color;

        this.x = x;

        this.y = y;

        this.width = 40;

        this.height = 80;

        this.speed = data.speed;

        this.jumpPower = data.jumpPower;

        this.weight = data.weight;

        this.damage = 0;

        this.stocks = 3;

        this.facing = 1;

        this.vx = 0;

        this.vy = 0;

        this.grounded = false;

        this.canDoubleJump = true;

        this.specialReady = true;

        this.specialCooldown = 0;

        this.electrified = false;

        this.electricTimer = 0;
    }

    takeDamage(amount) {

        this.damage += amount;

    }

    applyKnockback(forceX, forceY) {

        const scale =
            1 + (this.damage / 100);

        this.vx +=
            (forceX * scale) / this.weight;

        this.vy +=
            (forceY * scale) / this.weight;
    }

    jump() {

        if (this.grounded) {

            this.vy = -this.jumpPower;

            this.grounded = false;

        }
        else if (this.canDoubleJump) {

            this.vy =
                -this.jumpPower * 0.85;

            this.canDoubleJump = false;
        }

    }

    useSpecial(enemy, game) {

        if (!this.specialReady)
            return;

        this.data.useSpecial(
            this,
            enemy,
            game
        );

        this.specialReady = false;

        this.specialCooldown = 300;
    }

    update() {

        if (
            this.specialCooldown > 0
        ) {

            this.specialCooldown--;

            if (
                this.specialCooldown <= 0
            ) {

                this.specialReady = true;
            }
        }

        if (
            this.electrified &&
            this.electricTimer > 0
        ) {

            this.electricTimer--;

            if (
                this.electricTimer % 30 === 0
            ) {

                this.damage += 2;
            }

            if (
                this.electricTimer <= 0
            ) {

                this.electrified = false;
            }
        }

    }

    draw(ctx) {

        ctx.save();

        ctx.fillStyle =
            this.color;

        ctx.fillRect(
            this.x,
            this.y,
            this.width,
            this.height
        );

        ctx.fillStyle =
            "#ffffff";

        ctx.fillRect(
            this.x + 10,
            this.y + 15,
            6,
            6
        );

        ctx.fillRect(
            this.x + 24,
            this.y + 15,
            6,
            6
        );

        ctx.restore();

    }

}
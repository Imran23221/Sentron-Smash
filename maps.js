/* =========================
   SENTRON SMASH ULTIMATE
   MAPS.JS
========================= */

const Maps = {

    battlefield: {

        id: "battlefield",

        name: "Battlefield",

        background: "#1e293b",

        spawn1: {
            x: 300,
            y: 300
        },

        spawn2: {
            x: 900,
            y: 300
        },

        platforms: [

            {
                x: 250,
                y: 550,
                width: 780,
                height: 20
            },

            {
                x: 400,
                y: 420,
                width: 160,
                height: 15
            },

            {
                x: 720,
                y: 420,
                width: 160,
                height: 15
            },

            {
                x: 560,
                y: 320,
                width: 160,
                height: 15
            }

        ]

    },

    lava: {

        id: "lava",

        name: "Lava Core",

        background: "#3f0d0d",

        spawn1: {
            x: 260,
            y: 260
        },

        spawn2: {
            x: 920,
            y: 260
        },

        platforms: [

            {
                x: 180,
                y: 540,
                width: 900,
                height: 20
            },

            {
                x: 350,
                y: 390,
                width: 180,
                height: 15
            },

            {
                x: 760,
                y: 390,
                width: 180,
                height: 15
            }

        ]

    },

    hyperion: {

        id: "hyperion",

        name: "Hyperion Station",

        background: "#111827",

        spawn1: {
            x: 280,
            y: 250
        },

        spawn2: {
            x: 900,
            y: 250
        },

        platforms: [

            {
                x: 220,
                y: 520,
                width: 850,
                height: 20
            },

            {
                x: 280,
                y: 370,
                width: 150,
                height: 15
            },

            {
                x: 850,
                y: 370,
                width: 150,
                height: 15
            },

            {
                x: 565,
                y: 250,
                width: 150,
                height: 15
            }

        ]

    },

    skyTemple: {

        id: "skyTemple",

        name: "Sky Temple",

        background: "#0f172a",

        spawn1: {
            x: 250,
            y: 220
        },

        spawn2: {
            x: 950,
            y: 220
        },

        platforms: [

            {
                x: 170,
                y: 540,
                width: 950,
                height: 20
            },

            {
                x: 270,
                y: 420,
                width: 180,
                height: 15
            },

            {
                x: 820,
                y: 420,
                width: 180,
                height: 15
            },

            {
                x: 540,
                y: 300,
                width: 180,
                height: 15
            }

        ]

    },

    voidArena: {

        id: "voidArena",

        name: "Void Arena",

        background: "#050505",

        spawn1: {
            x: 350,
            y: 250
        },

        spawn2: {
            x: 850,
            y: 250
        },

        platforms: [

            {
                x: 320,
                y: 520,
                width: 640,
                height: 20
            }

        ]

    }

};

/* =========================
   MAP CLASS
========================= */

class Stage {

    constructor(mapId) {

        this.data =
            Maps[mapId];

        this.platforms =
            this.data.platforms;

        this.background =
            this.data.background;

        this.name =
            this.data.name;
    }

    draw(ctx) {

        ctx.fillStyle =
            this.background;

        ctx.fillRect(
            0,
            0,
            1280,
            720
        );

        for (
            let platform
            of this.platforms
        ) {

            ctx.fillStyle =
                "#334155";

            ctx.fillRect(
                platform.x,
                platform.y,
                platform.width,
                platform.height
            );

            ctx.strokeStyle =
                "#94a3b8";

            ctx.lineWidth = 2;

            ctx.strokeRect(
                platform.x,
                platform.y,
                platform.width,
                platform.height
            );
        }
    }

}

/* =========================
   COLLISION HELPERS
========================= */

function checkPlatformCollision(
    fighter,
    stage
) {

    fighter.grounded = false;

    for (
        let platform
        of stage.platforms
    ) {

        const feet =
            fighter.y +
            fighter.height;

        const nextFeet =
            feet +
            fighter.vy;

        const insideX =
            fighter.x +
            fighter.width >
            platform.x &&
            fighter.x <
            platform.x +
            platform.width;

        const landing =
            feet <= platform.y &&
            nextFeet >= platform.y;

        if (
            insideX &&
            landing
        ) {

            fighter.y =
                platform.y -
                fighter.height;

            fighter.vy = 0;

            fighter.grounded =
                true;

            fighter.canDoubleJump =
                true;

            return;
        }
    }
}
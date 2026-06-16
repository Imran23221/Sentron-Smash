/* =========================
   SENTRON SMASH ULTIMATE
   EFFECTS.JS
========================= */

class Particle {

    constructor(
        x,
        y,
        vx,
        vy,
        color,
        size,
        life
    ) {

        this.x = x;
        this.y = y;

        this.vx = vx;
        this.vy = vy;

        this.color = color;

        this.size = size;

        this.life = life;
        this.maxLife = life;
    }

    update() {

        this.x += this.vx;
        this.y += this.vy;

        this.life--;
    }

    draw(ctx) {

        const alpha =
            this.life /
            this.maxLife;

        ctx.save();

        ctx.globalAlpha =
            alpha;

        ctx.fillStyle =
            this.color;

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );

        ctx.fill();

        ctx.restore();
    }

}

class EffectManager {

    constructor() {

        this.effects = [];
        this.particles = [];

        this.shakeAmount = 0;
    }

    add(effect) {

        this.effects.push(effect);
    }

    addParticle(
        x,
        y,
        color,
        count
    ) {

        for (
            let i = 0;
            i < count;
            i++
        ) {

            this.particles.push(

                new Particle(
                    x,
                    y,

                    Math.random() * 8 - 4,

                    Math.random() * 8 - 4,

                    color,

                    3 +
                    Math.random() * 4,

                    30
                )

            );
        }
    }

    update(game) {

        for (
            let i =
                this.effects.length - 1;
            i >= 0;
            i--
        ) {

            const effect =
                this.effects[i];

            switch (
                effect.type
            ) {

                case "hollowPurple":

                    effect.x +=
                        effect.vx;

                    this.addParticle(
                        effect.x,
                        effect.y,
                        "#9333ea",
                        2
                    );

                    if (
                        effect.x <
                        -100 ||
                        effect.x >
                        1400
                    ) {

                        this.effects.splice(
                            i,
                            1
                        );
                    }

                    break;

                case "lightningBeam":

                    effect.duration--;

                    if (
                        effect.duration <= 0
                    ) {

                        this.effects.splice(
                            i,
                            1
                        );
                    }

                    break;

                case "shockwave":

                    effect.radius =
                        (effect.radius || 0)
                        + 10;

                    if (
                        effect.radius > 180
                    ) {

                        this.effects.splice(
                            i,
                            1
                        );
                    }

                    break;

                case "asteroid":

                    effect.y += 18;

                    if (
                        effect.y >=
                        effect.target.y
                    ) {

                        effect.target.damage +=
                            effect.damage;

                        effect.target.applyKnockback(
                            15,
                            -20
                        );

                        this.addParticle(
                            effect.target.x,
                            effect.target.y,
                            "#f97316",
                            50
                        );

                        this.effects.splice(
                            i,
                            1
                        );
                    }

                    break;

                case "spikeField":

                    effect.life =
                        (effect.life || 60)
                        - 1;

                    if (
                        effect.life <= 0
                    ) {

                        this.effects.splice(
                            i,
                            1
                        );
                    }

                    break;
            }
        }

        for (
            let i =
                this.particles.length - 1;
            i >= 0;
            i--
        ) {

            const particle =
                this.particles[i];

            particle.update();

            if (
                particle.life <= 0
            ) {

                this.particles.splice(
                    i,
                    1
                );
            }
        }

        if (
            this.shakeAmount > 0
        ) {

            this.shakeAmount *= 0.9;
        }
    }

    draw(ctx) {

        for (
            let effect
            of this.effects
        ) {

            switch (
                effect.type
            ) {

                /* =================
                   HOLLOW PURPLE
                ================= */

                case "hollowPurple":

                    ctx.save();

                    let glow =
                        ctx.createRadialGradient(
                            effect.x,
                            effect.y,
                            5,
                            effect.x,
                            effect.y,
                            90
                        );

                    glow.addColorStop(
                        0,
                        "#ffffff"
                    );

                    glow.addColorStop(
                        0.3,
                        "#d8b4fe"
                    );

                    glow.addColorStop(
                        1,
                        "rgba(147,51,234,0)"
                    );

                    ctx.fillStyle =
                        glow;

                    ctx.beginPath();

                    ctx.arc(
                        effect.x,
                        effect.y,
                        90,
                        0,
                        Math.PI * 2
                    );

                    ctx.fill();

                    ctx.restore();

                    break;

                /* =================
                   LIGHTNING
                ================= */

                case "lightningBeam":

                    ctx.save();

                    ctx.strokeStyle =
                        "#fde047";

                    ctx.lineWidth = 8;

                    ctx.beginPath();

                    ctx.moveTo(
                        effect.x1,
                        effect.y1
                    );

                    ctx.lineTo(
                        effect.x2,
                        effect.y2
                    );

                    ctx.stroke();

                    ctx.restore();

                    break;

                /* =================
                   SHOCKWAVE
                ================= */

                case "shockwave":

                    ctx.save();

                    ctx.strokeStyle =
                        "#f59e0b";

                    ctx.lineWidth = 6;

                    ctx.beginPath();

                    ctx.arc(
                        effect.x,
                        effect.y,
                        effect.radius,
                        0,
                        Math.PI * 2
                    );

                    ctx.stroke();

                    ctx.restore();

                    break;

                /* =================
                   ASTEROID
                ================= */

                case "asteroid":

                    ctx.save();

                    ctx.fillStyle =
                        "#78716c";

                    ctx.beginPath();

                    ctx.arc(
                        effect.x,
                        effect.y,
                        45,
                        0,
                        Math.PI * 2
                    );

                    ctx.fill();

                    ctx.restore();

                    break;

                /* =================
                   SPIKES
                ================= */

                case "spikeField":

                    ctx.save();

                    ctx.fillStyle =
                        "#8b5cf6";

                    for (
                        let x =
                            effect.x - 80;
                        x <=
                            effect.x + 80;
                        x += 20
                    ) {

                        ctx.beginPath();

                        ctx.moveTo(
                            x,
                            effect.y
                        );

                        ctx.lineTo(
                            x + 10,
                            effect.y - 60
                        );

                        ctx.lineTo(
                            x + 20,
                            effect.y
                        );

                        ctx.fill();
                    }

                    ctx.restore();

                    break;
            }
        }

        for (
            let particle
            of this.particles
        ) {

            particle.draw(ctx);
        }
    }

    startShake(
        amount = 20
    ) {

        this.shakeAmount =
            amount;
    }

    getShakeOffset() {

        if (
            this.shakeAmount <= 0
        ) {

            return {
                x: 0,
                y: 0
            };
        }

        return {

            x:
                Math.random() *
                this.shakeAmount -
                this.shakeAmount / 2,

            y:
                Math.random() *
                this.shakeAmount -
                this.shakeAmount / 2
        };
    }

}

const Effects =
    new EffectManager();
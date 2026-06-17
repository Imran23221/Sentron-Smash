const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

class Fighter {
    constructor(name, x, y) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 100;
        this.health = 100;
        this.isSpecialActive = false;
    }

    // Logic for Special Moves
    useSpecial() {
        this.isSpecialActive = true;
        if (this.name === "Duke") this.titanSmash();
        if (this.name === "Michael") this.vaultBlitz();
        if (this.name === "Imran") this.verucaSlice();
        if (this.name === "Gojo") this.hollowPurple();
    }

    titanSmash() {
        console.log("Duke: Titan Smash activated! Shaking platform...");
        // Code to trigger camera shake and apply velocity to enemies
    }
    
    vaultBlitz() {
        console.log("Michael: Vault Blitz! Charging lightning...");
        // Logic for electric status effect (5s duration)
    }

    verucaSlice() {
        console.log("Imran: Veruca Slice! Spikes emerging...");
    }

    hollowPurple() {
        console.log("Gojo: Hollow Purple! Unleashing destruction...");
    }
}

// Initialization
const players = [
    new Fighter("Duke", 200, 400),
    new Fighter("Michael", 800, 400)
];

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw platforms
    ctx.fillStyle = "#444";
    ctx.fillRect(0, 450, 1024, 126);

    // Draw characters
    players.forEach(p => {
        ctx.fillStyle = p.name === "Duke" ? "blue" : "yellow";
        ctx.fillRect(p.x, p.y, p.width, p.height);
    });

    requestAnimationFrame(gameLoop);
}

gameLoop();
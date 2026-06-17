// physics.js - Core movement and collision logic

const gravity = 0.7;

function updatePhysics(player) {
    // Apply gravity
    player.velocityY += gravity;
    player.y += player.velocityY;

    // Floor collision (Assuming the platform is at y=450)
    if (player.y + player.height >= 450) {
        player.y = 450 - player.height;
        player.velocityY = 0;
        player.isGrounded = true;
    } else {
        player.isGrounded = false;
    }

    // Screen boundaries
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
}

function checkCollision(rect1, rect2) {
    return (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
    );
}

// Function to handle the "fling" effect from Duke's Titan Smash
function applyKnockback(player, forceX, forceY) {
    player.velocityX = forceX;
    player.velocityY = forceY;
}
// input.js - Handling Keyboard Controls

const keys = {
    // Player 1 (e.g., WASD)
    w: { pressed: false },
    a: { pressed: false },
    d: { pressed: false },
    s: { pressed: false }, // Special for Player 1
    
    // Player 2 (e.g., Arrow Keys)
    ArrowUp: { pressed: false },
    ArrowLeft: { pressed: false },
    ArrowRight: { pressed: false },
    ArrowDown: { pressed: false } // Special for Player 2
};

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        // Player 1 controls
        case 'w': keys.w.pressed = true; break;
        case 'a': keys.a.pressed = true; break;
        case 'd': keys.d.pressed = true; break;
        case 's': 
            // Trigger special move for Player 1
            players[0].useSpecial(); 
            break;

        // Player 2 controls
        case 'ArrowUp': keys.ArrowUp.pressed = true; break;
        case 'ArrowLeft': keys.ArrowLeft.pressed = true; break;
        case 'ArrowRight': keys.ArrowRight.pressed = true; break;
        case 'ArrowDown': 
            // Trigger special move for Player 2
            players[1].useSpecial(); 
            break;
    }
});

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'w': keys.w.pressed = false; break;
        case 'a': keys.a.pressed = false; break;
        case 'd': keys.d.pressed = false; break;
        case 'ArrowUp': keys.ArrowUp.pressed = false; break;
        case 'ArrowLeft': keys.ArrowLeft.pressed = false; break;
        case 'ArrowRight': keys.ArrowRight.pressed = false; break;
    }
});
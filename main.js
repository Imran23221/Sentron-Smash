// main.js - Orchestrates the game flow and Map Selection

const gameState = {
    current: 'MENU', // MENU, PLAYING
    selectedMap: 'Arena_1',
    maps: {
        Arena_1: { background: '#222', platformColor: '#444' },
        Sky_Temple: { background: '#87CEEB', platformColor: '#DAA520' },
        Void_Realm: { background: '#1A0033', platformColor: '#4B0082' }
    }
};

function drawMap() {
    const map = gameState.maps[gameState.selectedMap];
    canvas.style.backgroundColor = map.background;
    ctx.fillStyle = map.platformColor;
    ctx.fillRect(0, 450, 1024, 126); // The platform
}

function update() {
    if (gameState.current === 'MENU') {
        // Draw Menu Text
        ctx.fillStyle = "white";
        ctx.font = "40px Arial";
        ctx.fillText("Sentron Smash", 380, 200);
        ctx.fillText("Select Map: Press 1, 2, or 3", 300, 300);
        ctx.fillText("Current: " + gameState.selectedMap, 380, 350);
    } else if (gameState.current === 'PLAYING') {
        drawMap();
        // Update players...
    }
    requestAnimationFrame(update);
}

// Input for Map Selection
window.addEventListener('keydown', (e) => {
    if (gameState.current === 'MENU') {
        if (e.key === '1') gameState.selectedMap = 'Arena_1';
        if (e.key === '2') gameState.selectedMap = 'Sky_Temple';
        if (e.key === '3') gameState.selectedMap = 'Void_Realm';
        if (e.key === 'Enter') gameState.current = 'PLAYING';
    }
});

update();
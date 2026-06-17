// effects.js - Special Move Implementation

const SpecialEffects = {
    triggerTitanSmash: (player) => {
        console.log(`${player.name} shakes the platform!`);
        // Logic: Apply upward velocity (fling) to enemies nearby
        // Logic: Screen shake effect (adjusting canvas transform)
    },

    triggerVaultBlitz: (target) => {
        console.log(`Vault Blitz hitting ${target.name}!`);
        target.isElectrified = true;
        let duration = 0;
        const interval = setInterval(() => {
            target.health -= 2; // Damage over time
            duration++;
            if (duration >= 5) {
                target.isElectrified = false;
                clearInterval(interval);
            }
        }, 1000);
    },

    triggerVerucaSlice: (platformY) => {
        console.log("Spikes emerging!");
        // Logic: Spawn spikes at platformY and check collision with enemies
    },

    triggerHollowPurple: (origin) => {
        console.log("Hollow Purple fired!");
        // Logic: Draw large purple orb and move it forward on canvas
    }
};
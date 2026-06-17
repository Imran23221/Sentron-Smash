// characterController.js - Connects input to gameplay logic

class CharacterController {
    constructor(fighterInstance, config) {
        this.fighter = fighterInstance;
        this.config = config; // Uses the characterData we defined earlier
    }

    update() {
        // Handle horizontal movement based on physics
        this.move();
        
        // Check if character is electrified (from Michael's Vault Blitz)
        if (this.fighter.isElectrified) {
            this.drawElectricSparks();
        }
    }

    move() {
        // Logic for walking speed based on character weight
        let speed = 5 / this.config.weight; 
        // ... (Logic to be expanded for keyboard movement)
    }

    drawElectricSparks() {
        // Visual effect for Michael's Vault Blitz
        ctx.strokeStyle = "yellow";
        ctx.strokeRect(this.fighter.x - 5, this.fighter.y - 5, this.fighter.width + 10, this.fighter.height + 10);
    }

    executeSpecial(target) {
        console.log(`Executing ${this.config.special} on ${target.name}`);
        
        switch (this.config.special) {
            case "Titan Smash":
                SpecialEffects.triggerTitanSmash(this.fighter);
                break;
            case "Vault Blitz":
                SpecialEffects.triggerVaultBlitz(target);
                break;
            case "Veruca Slice":
                SpecialEffects.triggerVerucaSlice(this.fighter.y);
                break;
            case "Hollow Purple":
                SpecialEffects.triggerHollowPurple(this.fighter);
                break;
        }
    }
}
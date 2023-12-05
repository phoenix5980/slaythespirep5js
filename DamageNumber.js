class DamageNumber {//That will appear when player/enemy is hit
    constructor(x, y, damage) {
        this.x = x;
        this.y = y;
        this.damage = damage;
        this.opacity = 255; 
    }

    display() {
        fill(255, 0, 0, this.opacity); 
        textSize(100);
        textAlign(CENTER, CENTER);
        text(this.damage, this.x, this.y);
        
        this.y -= 2; 
        this.opacity -= 5; 
    }
}
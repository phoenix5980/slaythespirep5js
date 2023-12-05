class Particle {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.velocity = createVector(random(-1, 1), random(-1, 1));
        this.lifespan = 255;
    }

    update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.lifespan -= 5;
    }

    display() {
        noStroke();
        fill(255, this.lifespan);
        ellipse(this.x, this.y, this.size);
    }

    isDead() {
        return this.lifespan < 0;
    }
}
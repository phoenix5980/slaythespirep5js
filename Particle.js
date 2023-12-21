class Particle {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.xSpeed = random(-1, 1);
        this.ySpeed = random(-1,-2);
        this.alpha = 255;
        this.img = random([img_fire1, img_fire2]); // Randomly choose an image
        this.size = random(20, 40);
    }

    update() {
        this.position += this.velocity ;
        this.lifespan -= 4; // Adjust for faster or slower fade
    }

    moveAndDisplay() {
        tint(255, 150, 0, this.lifespan); // Apply orange tint and alpha
        image(this.img, this.position.x, this.position.y, this.size, this.size);
        noTint(); // Reset tint for other drawings
    }

    isDead() {
        return this.lifespan <= 0;
    }
}

class ParticleSystem {
    constructor(x, y) {
        this.origin = createVector(x, y);
        this.particles = [];
    }

    addParticle() {
        this.particles.push(new Particle(this.origin.x, this.origin.y));
    }

    run() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            let p = this.particles[i];
            p.update();
            p.moveAndDisplay();
            if (p.isDead()) {
                this.particles.splice(i, 1);
            }
        }
    }
}

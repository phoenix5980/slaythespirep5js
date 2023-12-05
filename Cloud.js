class Cloud {
    constructor(img, x, y, speed) {
        this.img = img;
        this.x = x;
        this.y = y;
        this.speed = speed;

        // Set the initial position outside the canvas based on speed direction
        if (this.speed > 0) {
            this.x = -this.img.width;
        } else {
            this.x = width;
        }
    }

    display() {
        image(this.img, this.x, this.y);
    }

    move() {
        this.x += this.speed;

        // When the cloud goes off the canvas, reset its position
        if (this.speed > 0 && this.x > width) {
            this.x = -this.img.width;
            this.y = random(height);
        } else if (this.speed < 0 && this.x + this.img.width < 0) {
            this.x = width;
            this.y = random(height);
        }
    }
}
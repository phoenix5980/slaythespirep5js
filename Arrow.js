class Arrow { //arrow when drag the card
    constructor(startX, startY,cardtype) {
        this.startX = startX;
        this.startY = startY;
        this.cardtype = cardtype;
    }
    update() {
        mouseX = mouseX;
        mouseY = mouseY;
        this.distance = dist(this.startX, this.startY, mouseX, mouseY);
    }
    display() {
        push();
        translate(this.startX, this.startY);
        //translate(mouseX, mouseY);
        let angle = atan2(mouseY - this.startY, mouseX - this.startX);
        let numberOfArrowBodies = this.distance / img_arrowbody.height*4;
        for (let i = 0; i < numberOfArrowBodies; i++) {
            let x = lerp(0, mouseX - this.startX, i / numberOfArrowBodies);
            let y = lerp(0, mouseY - this.startY, i / numberOfArrowBodies);// + sin(PI * (i / numberOfArrowBodies)) * 50; // Adding a bending effect
            push();
            translate(x, y);
            rotate(angle+PI/2);
            for (let enemy of enemies) {
                if (this.cardtype == "Attack"){
                    if (mouseIsOver(enemy, 1)) {
                        tint(255, 0, 0); // Applying a red tint
                    }
                } else if (mouseIsOver(player, 1)) {
                    tint(0, 255, 0); // Applying a green tint
                }
            }
            imageMode(CENTER);
            image(img_arrowbody, 0, 0, img_arrowbody.width/2, img_arrowbody.height/2);
            if (i==numberOfArrowBodies-1) {
                image(img_arrowhead, 0, 0);
            }
            pop();
        }
        pop();
        noTint();
        // Reset tint before drawing the arrowhead
        push();
        for (let enemy of enemies) {
            if (this.cardtype == "Attack"){
                if (mouseIsOver(enemy, 1)) {
                    tint(255, 0, 0); // Applying a red tint
                }
            } else if (mouseIsOver(player, 1)) {
                tint(0, 255, 0); // Applying a green tint
            }
        }
        imageMode(CENTER);
        translate(mouseX, mouseY);
        rotate(angle+PI/2);
        image(img_arrowhead, 0, -20, img_arrowhead.width/2, img_arrowhead.height/2);
        pop();
    }
}
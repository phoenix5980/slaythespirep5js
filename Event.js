// Event data structure
class Event {
    constructor(title, description, options, optionFeedbacks, eventImage) {
      this.title = title;
      this.description = description;
      this.options = options; // This should be an array of option objects
      this.optionFeedbacks = optionFeedbacks;
      this.eventImage = eventImage;
      this.selectedOptionIndex = -1;
    }
  
    // Display event function
    display() {
      // Display the event background
      // Display the event panel
      imageMode(CENTER);
      image(img_eventPanel, width / 2, height / 2);
      // Display the event title
      fill("gold");
      textSize(50);
      stroke(0);
      strokeWeight(5);
      text(this.title, width / 4, height/2 - 325);
      // Display the event image
      image(this.eventImage, width / 2 - 500, height / 2+50);
      // Display the event description
      fill(255);
      textSize(30);
      text(this.description, width / 2 - 125, height/4 + 50, 900, 500);
      // Display the options
      imageMode(CORNER);
      this.options.forEach((option, index) => {
        let buttonImage = option.enabled ? img_enabledButton : img_disabledButton;
        let optionButtonY = height / 2 - 100 + index * 80;
        image(buttonImage, width / 2 - 125, optionButtonY);
        strokeWeight(4);
        fill(255);
        text(option.text, width / 2 - 80, optionButtonY+50);
        fill(0,255,0);
        text(option.description, width / 2 + 100, optionButtonY+50);
        if (option.penalty){
            strokeWeight(3);
            fill(255,0,0);
            text(option.penalty, width / 2 + 425, optionButtonY+50);
        }
      });
      if (this.selectedOptionIndex !== -1) {
        this.displayFeedback();
      } else {
        // Regular display code
      }
    }
  
    // Function to handle option selection
    selectOption(index) {
        if (this.selectedOptionIndex === -1 && this.options[index].enabled) { // Make sure this is the first selection
          this.selectedOptionIndex = index; // Mark the selected option
          let option = this.options[index];
          option.action(); // Execute the option's action
          this.description = this.optionFeedbacks[index].text; // Update the description with feedback
          /*let animation = this.optionFeedbacks[index].animation;
          if (animation) {
            animation(); // Play animation if exists
          }*/
          // Replace the options with just a [Leave] option
          this.options = [{
            text: "[Leave]",
            enabled: true,
            description: "You left the "+this.title,
            penalty: null,
            action: () => this.leaveEvent()
          }];
          this.hasLeft = false;
        }else if (this.selectedOptionIndex !== -1 && index === this.options.length - 1 && !this.hasLeft) {
            this.options[index].action(); // This should call leaveEvent
            this.hasLeft = true; // Set the flag to true so it doesn't trigger again
        }
      }
      leaveEvent() {
        //if (!this.hasLeft) { // Check if the leave event has already been triggered
          eventNo++;
          this.selectedOptionIndex = -1; // Reset the selected option index
          eventTransitionActive = false;
          gameState = "map";
          let currentFloorY = calculateY(floor);
          mapY = height - currentFloorY - floorHeight*2;
          this.hasLeft = true; // Ensure that the leave event isn't triggered again
        //}
    }
    displayFeedback() {
        //console.log("Displaying feedback for the selected option.");
    }
  }

  
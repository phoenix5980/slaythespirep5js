# slaythespirep5js
A p5.js version of the game Slay the Spire.

1. **Initialization:**
   - Load essential assets such as background images, logos, and music for the start screen.
   - Define global variables and constants like player stats, game state, and turn mechanics.

2. **Preloading:**
   - Preload essential assets(title images/music/font/clouds) to ensure they are available before the start screen.

3. **Setup:**
   - Set up the canvas.
   - Initialize clouds for the start screen.
   - Show 'Loading...'
   - Load remaining assets.
   - Show 'Play!'
   - Initialize player and enemy positions.

4. **Game Loop (draw function):**
   - gamestate == "startScreen":
     - Display the start screen.
     - Play and loop the titlemusic.
   - gamestate == "playing":
     - Display the playing screen.
     - Use timing to track diffrent state of 1 turn in game(TURN_START, PLAYER_TURN, ENEMY_TURN), execute corresponding actions:
       - **TURN_START:**
         - Deal cards to the player.
       - **PLAYER_TURN:**
         - Display the player's current hand of cards.
         - Allow the player to drag cards and display the dragging animation.
       - **ENEMY_TURN:**
         - Execute the enemy’s actions.

5. **Event Handlers:**
   - **Mouse Pressed:**
     - If on the start screen, check if the play button is clicked.
     - If playing, check if a card or entity is clicked.
   - **Mouse Released:**
     - Check if a card was dragged and released on a valid target.
   - **Mouse Is Over:** 🔴HAVE ISSUES
     - Check if the mouse is over a specified entity.

6. **Game Mechanics:**
   - **Displaying:**
     - Display different game elements like the top panel, current hand, end turn button, etc.
   - **Card Mechanics:**
     - Initialize the deck.
     - Deal cards.
     - Draw a card.
     - Play a card.
   - **Turn Mechanics:**
     - Manage player and enemy turns.
     - Display turn start animations.

7. **Entities:**
   - **Player:**
     - Display the player with animations.
     - Execute player actions like attacking and blocking. 🔴UNIMPLEMENTED
   - **Enemy:**
     - Display the enemy with animations.
     - Execute enemy actions like attacking and buffing.🔴UNIMPLEMENTED

8. **Utilities:**
   - Various utility functions and mechanics like displaying the HP bar, handling dragging, displaying energy, and so on.

9. **Classes:**
   - Define various classes like Player, Enemy, and Card to manage game entities and their behaviors.

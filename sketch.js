let titleBackground;
let battleBackground;
let titleLogo;
let bar;
let titleMusic;
let battleMusic;
let RestFireDry;
let sfx_BattleStart;
let sfx_BlockAtk;
let sfx_CardReject;
let sfx_CardSelect;
let sfx_DefenseBreak;
let sfx_EndTurn;
let sfx_EnemyTurn;
let sfx_FastAtk;
let sfx_FastBlunt;
let sfx_GainDefense = [];
let sfx_HeavyAtk;
let sfx_HeavyBlunt;
let sfx_IronClad_Atk = [];
let sfx_PlayerTurn = [];
let sfx_Victory;
let sfx_Gold;
let sfx_buff;
let AmbienceMusic;
let sfx_GameOver;
let font;
let keyslots;
let panelHeart;
let panelGoldBag;
//let ironcladGIF;
let img_ironclad = [];
let img_neow = [];
let idx_ironclad = 0;
let img_ironclad_corpse;
let img_cultist_rally = [];
let img_cultist_waving = [];
let img_jawworm = [];
let img_strike;
let img_defend;
let img_bash;
let img_arrowhead;
let img_arrowbody;
let img_framecorner;
let img_speechBubble;
let img_slash;
let img_floor;
let img_potion_placeholder;
let idx_cultist = 0;
let attack_intent = [];
let buff_intent;
let playerX = 220;
let playerY = 450;
let enemyX = 1000;
let enemyY = 450;
let money = 99;
let maxEnergy = 3;
let Energy = maxEnergy;
let img_Energy = [];
let img_noEnergy = [];
let endTurnButton;
let endTurnButtonGlow;
let img_proceedButton;
let img_rewardScreenSheet;
let img_rewardListItemPanel;
let img_selectBanner;
let img_Gold;
let img_eventPanel;
let img_enabledButton;
let img_disabledButton;
let img_block;
let img_cancelButton;
let img_countCircle;
let img_deckButton;
let img_discardButton;
let img_vulnerable;
let img_tipt1;
let img_tipt2;
let img_tipt3;
let img_shoulder;
let img_fire1;
let img_fire2;
let deck = [];
let deckInitialized = false;
let drawPile = deck;
let discardPile = [];
let currentHand = [];
let HandSize = 5;
let potions = [];
let relics = ["BurningBlood"];
let character = "Ironclad";
let player_name = "Phoenix";
let level = 1;
let floor = 0;
let turn = 1;
let numofCardtoDeal = 5;
let numofPotionSlots = 3;
let cloudImages = [];
let cloudObjects = [];
let dragging = false;
let draggingCard = null;
let selectedCard = null;
let bubble = null;
let prevMouseX = null;
let prevMouseY = null;
let angle = 0;
let player;
//let enemy;
let enemies = [];
let numofEnemies = 1;
let arrow;
let currentFloor = 1;
let cards = [];
let rewards = [];
let options = [];
let currentEvent = null;
let gameState = "startScreen";
//let gameState = "tutorial";
//let gameState = "battle";
//let gameState = "event";
//let gameState = "campfire";
let playerSize = 2;
let cardScale = 0.3;
//TURN MECHANICS
const TURN_START = 0;
const PLAYER_TURN = 1;
const ENEMY_TURN = 2;
const REWARD_SCREEN = 3;
const GAME_OVER = 4;
let timing = TURN_START;
let turnNumber = 0;
let attackAnimationDelay = 200;
let currentAttackingEnemyIndex = 0;
let attackDelayTimer = 0;
let attackDelayDuration = 60; // Number of frames to wait between attacks
let slashAnimationTimer = 0;
let slashAnimationDuration = 15; // Number of frames the slash will be visible
let allrewardsCollected = false;
let rewardScreenVisible = false;
let showBubble = false;
let bubbleTimer = 0;
let bubbleText = "";
let gameover = false;
let neowEvent;
let goldenShrineEvent;
let theClericEvent;
let bigFishEvent;
let eventData;
let isCardBeingPlayed = false;
let eventEnabled = true;
let showDiscardOverlay = false;
let showDrawPileOverlay = false;
let showMapOverlay = false, showDeckOverlay = false, showSettingsOverlay = false, nodeWidth = 100, nodeHeight = 100, xOffset=600, yOffset=600;
let mapTop, mapMid, mapBot; // Variables to hold the map images
let mapY = 128; // Y position of the map (for vertical scrolling)
let icons = [];
let bossIcons = [];
let mapData;
let canSelectNextFloor = false;
let seed1 = 673465884448;
let seed2 = 123456789;
let seed;
let currentAct = 1;
let currentBoss = 'hexaghost';
let firstTimePlay = true;
let tipNo = 1;
let clickCooldown = 0;
let selectedNodes = [];
let currentPlayerNode = null;
let clicked = false;
let eventTransitionActive = false;
let eventTransitionStartTime = 0;
const eventTransitionDuration = 1000;
let eventNo = 0;
let fire = [];
let img_smith;
let img_sleep;


const bossPosition = {x: 960, y: 400};
const floorHeight = 150;
const discardButtonX = 1800;
const discardButtonY = 950;
const discardButtonWidth = 128;
const discardButtonHeight = 128;
const cancelButtonX = 0 ;
const cancelButtonY = 880;
const countCircleDiameter = 128;
const EndTurnButtonX = 1550;
const EndTurnButtonY = 850;
const buttonMap = { x: 1600, y: 0, width: 100, height: 100 };
const buttonDeck = { x: 1700, y: 0, width: 100, height: 100 };
const buttonSettings = { x: 1800, y: 0, width: 100, height: 100 }
const INITIAL_PATHS = 2; // At least two distinct starting points
const legend = {
EventRoom: "Unknown",
ShopRoom: "Merchant",
TreasureRoom: "Treasure",
RestRoom: "Rest",
MonsterRoom: "Enemy",
MonsterRoomElite: "Elite"
};
const cardData = {
    "Strike": {type: "Attack", damage: 6, block: 0, description: "Deal 6 damage.", cost: 1, effect: null},
    "Defend": {type: "Skill", damage: 0, block: 5, description: "Gain 5 Block.", cost: 1, effect: (player)=>{
        player.addBlock(5);
    }},
    "Bash": {type: "Attack", damage: 8, block: 0, description: "Deal 8 damage.          Apply 2 Vulnerable", cost: 2, effect:(enemy)=>  {enemy.addVulnerable(2);} },
    // Add more cards here
  };
const enemyData = {
    "Cultist": {name: "Cultist", maxhp:8, basicdamage: 6, strength: 0, block: 0, weak: 0, intent: "attack", status: 0, damage: 6, width:340, height:340, image: img_cultist_rally, frames:262},
    "Jaw Worm": {name: "Jaw Worm", maxhp: 4, basicdamage: 11, strength: 0, block: 0, weak: 0, intent: "attack", status: 0, damage: 6, width:340, height:340, image: img_jawworm, frames:94},
    "Red Louse": {name: "Red Louse", maxhp: 10, basicdamage: 5, strength: 0, block: 0, weak: 0, intent: "attack", status: 0, damage: 6, width:340, height:340},
    "Green Louse": {name: "Green Louse", maxhp: 11, basicdamage: 5, strength: 0, block: 0, weak: 0, intent: "attack", status: 0, damage: 6, width:340, height:340},
    "Acid Slime": {name: "Acid Slime", maxhp: 8, basicdamage: 3, strength: 0, block: 0, weak: 0, intent: "attack", status: 0, damage: 6, width:340, height:340},
    "Spike Slime": {name: "Spike Slime", maxhp: 10, basicdamage: 5, strength: 0, block: 0, weak: 0, intent: "attack", status: 0, damage: 6, width:340, height:340}
    }
const act1Encounters = [
    { name: "Cultist", enemies: ["Cultist"], probability: 0.75 },
    { name: "Jaw Worm", enemies: ["Jaw Worm"], probability: 0.25 },
    { name: "2 Louses", enemies: ["Red Louse"], probability: 0 },//["Red Louse","Green Louse"]
    { name: "small slimes", enemies: ["Acid Slime"], probability: 0}//["Acid Slime","Spike Slime"]
];
const boss ={
    "Hexaghost": {name: "Hexaghost", maxhp: 250, basicdamage: 6, strength: 0, block: 0, weak: 0, intent: "attack", status: 0, damage: 6, width:340, height:340}
}
let essentialAssetsLoaded = false;
let allAssetsLoaded = false;

function preload() {
    // Load essential assets
    titleBackground = loadImage('assets/images/titlebackground.jpg');
    titleLogo = loadImage('assets/images/titlelogo.png');
    title1 = loadImage('assets/images/title1.png');
    titleMusic = loadSound('assets/audio/music/MenuTheme.ogg');
    AmbienceMusic = loadSound('assets/audio/music/Ambience.ogg');
    RestFireDry = loadSound('assets/audio/music/RestFireDry.ogg');
    BossMusic = loadSound('assets/audio/music/Boss.ogg');
    font = loadFont('assets/fonts/Kreon-Regular.ttf');
    eventData = loadJSON('assets/data/events.json');
    for (let i = 1; i <= 3; i++) {
        cloudImages.push(loadImage(`assets/images/cloud${i}.png`));
    }
    if (playerSize == 2){
        playerX = 100;
        playerY = 220;
        for (let i = 0; i <= 59; i++) {
            img_ironclad.push(loadImage(`assets/images/PNGs/ironclad_60f_2x/${i}.png`));
        }
    }else{        
        for (let i = 0; i <= 59; i++) {
            img_ironclad.push(loadImage(`assets/images/PNGs/ironclad_60f/${i}.png`));
        }
    }
    for (let i = 0; i <= 79; i++) {
        img_neow.push(loadImage(`assets/images/PNGs/neow_idle_80f/${i}.png`));
    }
    for (let i = 0; i <= 261; i++) {
        img_cultist_rally.push(loadImage(`assets/images/PNGs/cultist_rally_262f/${i}.png`));
    }
    for (let i = 0; i <= 130; i++){
        img_cultist_waving.push(loadImage(`assets/images/PNGs/cultist_waving_131f/${i}.png`));
    }
    for (let i = 0; i <= 93; i++){
        img_jawworm.push(loadImage(`assets/images/PNGs/jawworm_94f/${i}.png`));
    }
    for (let i = 1; i <= 4; i++){
        sfx_GainDefense.push(loadSound(`assets/audio/sfx/GainDefense_RR${i}.ogg`));
    }
    for (let i = 1; i <= 3; i++){
        sfx_IronClad_Atk.push(loadSound(`assets/audio/sfx/IronClad_Atk_RR${i}.ogg`));
    }
    for (let i = 1; i <= 5; i++){
        sfx_PlayerTurn.push(loadSound(`assets/audio/sfx/PlayerTurn_${i}.ogg`));
    }
    battleMusic = loadSound('assets/audio/music/Level1-1.ogg');
    sfx_BattleStart = loadSound('assets/audio/sfx/BattleStart.ogg');
    sfx_BlockAtk = loadSound('assets/audio/sfx/BlockAtk.ogg');
    sfx_CardReject = loadSound('assets/audio/sfx/CardReject.ogg');
    sfx_CardSelect = loadSound('assets/audio/sfx/CardSelect.ogg');
    sfx_DefenseBreak = loadSound('assets/audio/sfx/DefenseBreak.ogg');
    sfx_EndTurn = loadSound('assets/audio/sfx/EndTurn.ogg');
    sfx_EnemyTurn = loadSound('assets/audio/sfx/EnemyTurn.ogg');
    sfx_FastAtk = loadSound('assets/audio/sfx/FastAtk.ogg');
    sfx_FastBlunt = loadSound('assets/audio/sfx/FastBlunt.ogg');
    //sfx_GainDefense = loadSound('assets/audio/sfx/GainDefense_RR2.ogg');
    sfx_HeavyAtk = loadSound('assets/audio/sfx/HeavyAtk.ogg');
    sfx_HeavyBlunt = loadSound('assets/audio/sfx/HeavyBlunt.ogg');
    //sfx_IronClad_Atk = loadSound('assets/audio/sfx/IronClad_Atk_RR1.ogg');
    //sfx_PlayerTurn = loadSound('assets/audio/sfx/PlayerTurn_1.ogg');
    sfx_Victory = loadSound('assets/audio/sfx/Victory.ogg');
    sfx_Gold = loadSound('assets/audio/sfx/Gold.ogg');
    sfx_buff = loadSound('assets/audio/sfx/Buff.ogg');
    sfx_GameOver = loadSound('assets/audio/sfx/GameOver.ogg');
    mapTop = loadImage('assets/images/map/mapTop.png');
    mapMid = loadImage('assets/images/map/mapMid.png');
    mapBot = loadImage('assets/images/map/mapBot.png');
    mapLegend = loadImage('assets/images/map/legend2.png');
    icons.EventRoom = loadImage('assets/images/map/event.png');
    icons.ShopRoom = loadImage('assets/images/map/shop.png');
    icons.TreasureRoom = loadImage('assets/images/map/chest.png');
    icons.RestRoom = loadImage('assets/images/map/rest.png');
    icons.MonsterRoom = loadImage('assets/images/map/monster.png');
    icons.MonsterRoomElite = loadImage('assets/images/map/elite.png');
    bossIcons.heart = loadImage('assets/images/map/boss/heart.png');
    bossIcons.hexaghost = loadImage('assets/images/map/boss/hexaghost.png');
    bossIcons.guardian = loadImage('assets/images/map/boss/guardian.png');
    bossIcons.slime = loadImage('assets/images/map/boss/slime.png');
    bossIcons.champ = loadImage('assets/images/map/boss/champ.png');
    bossIcons.collector = loadImage('assets/images/map/boss/collector.png');
    bossIcons.automaton = loadImage('assets/images/map/boss/automaton.png');
    bossIcons.awakened = loadImage('assets/images/map/boss/awakened.png');
    bossIcons.timeeater = loadImage('assets/images/map/boss/timeeater.png');
    bossIcons.donu = loadImage('assets/images/map/boss/donu.png');
    battleBackground = loadImage('assets/images/battlebackground.png');
    essentialAssetsLoaded = true;
    console.log("Essential assets loaded");
}
function loadRemainingAssets() {
    // Load all other assets
    //background(titleBackground);
    bar = loadImage('assets/images/topPanel/bar.png');
    panelHeart = loadImage('assets/images/topPanel/panelHeart.png');
    keyslots = loadImage('assets/images/topPanel/key_slots.png');
    panelGoldBag = loadImage('assets/images/topPanel/panelGoldBag.png');
    buff_intent = loadImage('assets/images/intent/buff1.png');
    endTurnButton = loadImage('assets/images/combat/endTurnButton.png');
    endTurnButtonGlow = loadImage('assets/images/combat/endTurnButtonGlow.png');
    red_card = loadImage('assets/images/cards/red_card.png');
    red_cost = loadImage('assets/images/cards/red_cost.png');
    ribbon = loadImage('assets/images/cards/ribbon.png');
    frame = loadImage('assets/images/cards/frame.png');
    img_strike = loadImage('assets/images/cards/strike.png');
    img_defend = loadImage('assets/images/cards/defend.png');
    img_bash = loadImage('assets/images/cards/bash.png');
    img_arrowhead = loadImage('assets/images/combat/reticleArrow.png');
    img_arrowbody = loadImage('assets/images/combat/reticleBlock.png');
    img_framecorner = loadImage('assets/images/combat/reticleCorner.png');
    img_speechBubble = loadImage('assets/images/combat/speechBubble.png');
    img_slash = loadImage('assets/images/combat/slash.png');
    img_floor = loadImage('assets/images/topPanel/floor.png');
    img_gold = loadImage('assets/images/reward/gold.png');
    img_rewardScreenSheet = loadImage('assets/images/reward/rewardScreenSheet.png');
    img_rewardListItemPanel = loadImage('assets/images/reward/rewardListItemPanel.png');
    img_selectBanner = loadImage('assets/images/reward/selectBanner.png');
    img_ironclad_corpse = loadImage('assets/images/PNGs/ironclad_corpse.png')
    img_proceedButton = loadImage('assets/images/reward/proceedButton.png');
    img_eventPanel = loadImage('assets/images/event/eventPanel.png');
    img_goldShrine = loadImage('assets/images/event/goldShrine.jpg');
    img_Cleric = loadImage('assets/images/event/cleric.jpg');
    img_bigFish = loadImage('assets/images/event/fishing.jpg');
    img_enabledButton = loadImage('assets/images/event/enabledButton.png');
    img_disabledButton = loadImage('assets/images/event/disabledButton.png');
    img_block = loadImage('assets/images/combat/block.png');
    img_potion_placeholder = loadImage('assets/images/potion/potion_placeholder.png');
    img_cancelButton = loadImage('assets/images/topPanel/cancelButton.png');
    img_countCircle = loadImage('assets/images/topPanel/countCircle.png');
    img_deckButton = loadImage('assets/images/topPanel/deckButton.png');
    img_discardButton = loadImage('assets/images/topPanel/discardButton.png');
    img_map = loadImage('assets/images/topPanel/map.png');
    img_deck = loadImage('assets/images/topPanel/deck.png');
    img_settings = loadImage('assets/images/topPanel/settings.png');
    img_vulnerable = loadImage('assets/images/combat/vulnerable.png');
    img_tipt1 = loadImage('assets/images/tip/t1.png');
    img_tipt2 = loadImage('assets/images/tip/t2.png');
    img_tipt3 = loadImage('assets/images/tip/t3.png');
    img_fire1 = loadImage('assets/images/fire1.png');
    img_fire2 = loadImage('assets/images/fire2.png');
    img_shoulder = loadImage('/assets/spine/newironclad/shoulder.png');
    img_campfire = loadImage('/assets/images/campfire.png');
    img_smith = loadImage('/assets/images/campfire/smith.png');
    img_sleep = loadImage('/assets/images/campfire/sleep.png');
    mapData1 = loadJSON('assets/maps/673465884448_Act1.json');
    mapData2 = loadJSON('assets/maps/123456789_Act1.json');
    
    //ironcladGIF = loadImage('assets/images/new_Ironclad.gif');
    for (let i = 1; i <= 6; i++){
        img_Energy.push(loadImage(`assets/images/energy/red/layer${i}.png`));
    }
    for (let i = 1; i <= 5; i++){
        img_noEnergy.push(loadImage(`assets/images/energy/red/noEnergy/layer${i}d.png`));
    }
    for (let i = 1; i <= 7; i++){
        attack_intent.push(loadImage(`assets/images/intent/attack/attack_intent_${i}.png`));
    }
    allAssetsLoaded = true;
    console.log("All assets loaded");
}
function setup() {
    createCanvas(1920,1080);
    pixelDensity(1);
    outputVolume(0.2);
    playMusic(AmbienceMusic);
    if (essentialAssetsLoaded) {
        displayStartScreen("Loading...");
        // Load the remaining assets
    }
    for (let i = 0; i < 2; i++) {
        let img = random(cloudImages);
        cloudObjects.push(new Cloud(img, random(width), random(height), random([-1, 1])));
    }
    loadRemainingAssets();
    if (Math.random() < 0.5) {
        seed = seed1;
        mapData = mapData1;
    } else {
        seed = seed2;
        mapData = mapData2;
    }
    initializeDeck();
    proceedButtonX = width - 500;
    proceedButtonY = height - 500;
    longMap = createGraphics(mapTop.width, mapTop.height + mapMid.height + mapBot.height);
    longMap.image(mapTop, 0, 0);
    longMap.image(mapMid, 0, mapTop.height);
    longMap.image(mapBot, 0, mapTop.height + mapMid.height);
    player = new Player(playerX, playerY);
    startBattle();
    goldenShrineEvent = new Event(
        "Golden Shrine",
        "Before you lies an elaborate shrine to an ancient spirit.",
        [
          { text: "[Pray]", enabled: true, description: "Gain 100 Gold", penalty: null, action: () => { money += 100; sfx_Gold.play();  } },
          { text: "[Desecrate]", enabled: true, description: "Gain 275 Gold", penalty: "Become Cursed - Regret", action: () => { money += 275; sfx_Gold.play(); } },
          { text: "[Leave]", enabled: true, description: "Nothing happens.", penalty: null, action: () => { /* Do nothing */ } }
        ],
        [
            {text: "As your hand touches the shrine, gold rains from the ceiling showering you in riches."},
            {text: "Each time you strike the shrine, gold pours forth again and again!",
            textline2: "As you pocket the riches, something weighs heavily on you."},
            {text: "You ignore the shrine.", animation: null}
        ],
        img_goldShrine);
    theClericEvent = new Event(
        "The Cleric",
        "Hello friend! I am Cleric! Are you interested in my services?!",
        [
          { text: "[Heal]", enabled: true, description: "Lose 35 Gold. Heal 25% of your Max HP", penalty: null, action: () => { money -= 35; healHP(int(player.maxhp*0.25));sfx_buff.play();  } },
          { text: "[Purify]", enabled: true, description: "Lose 50 Gold. Remove a card from your deck.", penalty: null, action: () => { money -= 50; choosetoRemove(); } },
          { text: "[Leave]", enabled: true, description: "Nothing happens.", penalty: null, action: () => { /* Do nothing */ } }
        ],
        [
            {text: "A warm golden light envelops your body and dissipates. 'Have a good day!' Cleric said."},
            {text: "A cold blue flame envelops your body and dissipates."},
            {text: "You don't trust Cleric, so you leave.", animation: null}
        ],
        img_Cleric);
    bigFishEvent = new Event(
        "Shop",
        "Welcome to the shop! Currently your offers are a banana, a donut, and a box",
        [
          { text: "[Banana]", enabled: true, description: "50 Gold. Heal 1/3 of your max HP.", penalty: null, action: () => { money -= 50; healHP(int(player.maxhp*0.33));sfx_buff.play();  } },
          { text: "[Donut]", enabled: true, description: "75 Gold. Max HP +10.", penalty: null, action: () => { money -= 75; addMaxHP(10);sfx_buff.play();  } },
          { text: "[Box]", enabled: true, description: "100 Gold. Receive a Relic.", penalty: null, action: () => { money -= 100; getRandomRelic(); } }
        ],
        [
            {text: "You bought the banana. It is nutritious and slightly magical, healing you."},
            {text: "You bought the donut. It really hits the spot! Your Max HP increases."},
            {text: "You bought the box. Inside you find a relic!", animation: null}
        ],
        img_bigFish);
}

function draw() {
    //console.log(timing);
    if (clickCooldown > 0) {
        clickCooldown--;
    }
    pixelDensity(1);
    handleGameState();
    if (arrow) {
        arrow.display(); // Display the arrow if it exists
    }
    if (showMapOverlay) {
        displayMapOverlay();
    }
    if (showDeckOverlay) {
        displayDeckOverlay();
    }
    if (showSettingsOverlay) {
        displaySettingsOverlay();
    }
    updateAndDrawSlash();
    if (gameState != "startSceen" && deckInitialized){
        displaytopPanel();
    }
}
function handleGameState(){
    switch(gameState){
        case "startScreen":
            displayStartScreen();
            break;
        case "tutorial":
            showTutorial();
            break;
        case "map":
            showMapOverlay = true;
            //handleMapClicking();
            break;
        case "battle":
            displayPlayingScreen();
            handleTurns();
            break;
        case "event":
            displayEventScreen();
            handleEvent();
            break;
        case "shop":
            displayShopScreen();
            handlePurchase();
            break;
        case "campfire":
            displayCampfire();
            break;
    }
}
function handleTurns() {
    switch (timing) {
        case TURN_START:
            beginTurn();
            break;
        case PLAYER_TURN:
            playerTurnActions();
            break;
        case ENEMY_TURN:
            enemyTurnActions();
            break;
    }
}
function handlePurchase(){
    
}

function beginTurn() {
    turnNumber++;
    console.log("Turn", turnNumber, "Starts");
    dealCards(numofCardtoDeal);
    player.block = 0;
    for (let enemy of enemies){
        enemy.decrementVulnerable();
    }
    player.decrementVulnerable();
    
    timing = PLAYER_TURN;
    for (let enemy of enemies){
        enemy.TurnTaken = false;
    }
}

function playerTurnActions() {
    showTurnStartAnimation(timing);
    handleCardDragging();
    /*text("MouseX "+int(mouseX), 200, 150);
    text("MouseY "+int(mouseY), 200, 200);
    text("Mouse over Player= "+mouseIsOver(player,1), 300, 250);
    text("Mouse over Enemy= "+mouseIsOver(enemies,1), 300, 300);*/
}
function healHP(healAmount){
    if (player.hp+healAmount < player.maxhp){
        player.hp += healAmount;
    }else{
        player.hp = player.maxhp;
    }
}
function addMaxHP(addAmount){
    player.maxhp += addAmount;
    player.hp += addAmount;
}
function enemyTurnActions() {
    showTurnStartAnimation(timing);
    for (enemy of enemies){
        enemy.block = 0;
    }
    console.log("Enemy Turn");
    // Check if the current enemy has finished its attack and delay timer has elapsed
    if (attackDelayTimer <= 0) {
        let currentEnemy = enemies[currentAttackingEnemyIndex];
        if (!currentEnemy.TurnTaken) {
            currentEnemy.takeTurn(player);
            attackDelayTimer = attackDelayDuration; // Reset the delay timer after an attack
        }

        // Move to the next enemy
        currentAttackingEnemyIndex++;
        if (currentAttackingEnemyIndex >= enemies.length) {
            // If all enemies have taken their turn, reset for the next round
            currentAttackingEnemyIndex = 0;
            timing = TURN_START;
            player.energy = maxEnergy;
        }
    } else {
        // If we're still waiting, decrease the delay timer
        attackDelayTimer--;
    }
    checkForGameOver();
}
function displayStartScreen() {
    background(titleBackground);
    image(title1, width / 2 - title1.width / 2, height / 2 - title1.height / 2);
    let tx = "Loading...";
    if (allAssetsLoaded) {
        tx = "Play!"
        for (let cloud of cloudObjects) {
            cloud.display();
            cloud.move();
        }
    }
    image(titleLogo, width / 2 - titleLogo.width / 2, height / 4);
    fill(255);
    textFont(font);
    textSize(100);
    stroke(0);
    strokeWeight(5);
    textAlign(CENTER, CENTER);
    text(tx, width / 2, height - height / 5);
    playMusic(titleMusic);
    //playMusic(AmbienceMusic);
}

function displayPlayingScreen() {
    background(battleBackground);
    textAlign(LEFT, BASELINE);
    //displaytopPanel();
    titleMusic.stop();
    playMusic(battleMusic);
    rewardsCollected = false;
    player.display();
    for (let enemy of enemies){
        enemy.display();
    }
    drawDiscardButton();
    drawDiscardOverlay();
    if (!showDiscardOverlay){
    if (timing === PLAYER_TURN) {
        displayCurrentHand();
        drawSpeechBubble();
    }
        displayEndTurnButton();
        handleEndTurnButton();
    }
    if (timing === REWARD_SCREEN){
        drawRewardScreen();
        drawProceedButton();
    }
    if (timing === GAME_OVER){
        gameover = true;
        textSize(100);
        textAlign(CENTER, CENTER);
        text("GAMEOVER!", width/2, height/2);
        drawReturntoTitleButton();
    }
    // Turn actions (Attack, End Turn, etc.)
    //displayTurnActions();
}

function displayEventScreen(){
    noTint();
    background("#7A6A4F");
    if (millis() - eventTransitionStartTime > eventTransitionDuration) {
        eventTransitionActive = false;
    }
    //displaytopPanel();
    switch(eventNo){
        case 0:currentEvent = goldenShrineEvent; break;
        case 1:currentEvent = theClericEvent; break;
        case 2:currentEvent = bigFishEvent; break;
    }
    currentEvent.display();
    }
    

function displayShopScreen(){
    noTint();
    background("#7A6A4F");
    if (millis() - eventTransitionStartTime > eventTransitionDuration) {
        eventTransitionActive = false;
    }
    currentEvent = bigFishEvent;
    currentEvent.display();
}

function displayCampfire(){
    titleMusic.stop();
    battleMusic.stop();
    playMusic(RestFireDry);
    noTint();
    background(0); // Set a background color, if needed

  // Calculate the center crop of the battleBackground
  let srcX = battleBackground.width / 3;
  let srcY = battleBackground.height / 3;
  let srcW = battleBackground.width / 2; // Crop width
  let srcH = battleBackground.height / 2; // Crop height

  // Destination rectangle
  let destX = 0;
  let destY = 0;
  let destW = width;
  let destH = height;

  // Draw the cropped image
    image(battleBackground, destX, destY, destW, destH, srcX, srcY, srcW, srcH);
    image(img_campfire, width/2, height/2);
    image(img_shoulder, 0, 1080-1136);
    runFire();
    image(img_sleep, 600,200);
    text("Rest", 700, 440);
    image(img_smith, 1000,200);
    text("Smith", 1100, 440);
    textSize(50);
    text("What to do?", 800, 200);
    textSize(25);
    textAlign(CENTER, CENTER);
    text("Heal for 30% of your Max HP("+int(player.maxhp*0.3)+").", 720, 470);
    text("Upgrade a card in your deck.", 1160, 470);
}
function handleRestOptions(){
// Assuming img_sleep and img_smith have width and height properties
let sleepArea = {
    x: 600,
    y: 200,
    width: img_sleep.width,
    height: img_sleep.height
};

let smithArea = {
    x: 1000,
    y: 200,
    width: img_smith.width,
    height: img_smith.height
};
if (mouseX >= sleepArea.x && mouseX <= sleepArea.x + sleepArea.width &&
    mouseY >= sleepArea.y && mouseY <= sleepArea.y + sleepArea.height) {
    // The mouse click is within the sleep image
    console.log("Sleep option selected");
    healHP(int(player.maxhp*0.3));
    sfx_buff.play();
    gameState = "map";
    let currentFloorY = calculateY(floor);
    mapY = height - currentFloorY - floorHeight*2;
    battleMusic.play();

}
else if (mouseX >= smithArea.x && mouseX <= smithArea.x + smithArea.width &&
         mouseY >= smithArea.y && mouseY <= smithArea.y + smithArea.height) {
    // The mouse click is within the smith image
    console.log("Smith option selected");
    // Handle smith option logic here
}
}
function runFire() {
    fire = new ParticleSystem(width* 3 / 4, height / 2 + 50);
    fire.addParticle();
    fire.run();
}

function displayMapOverlay(){
    noTint();
    // Cover the screen with a semi-transparent background
    fill(0, 0, 0, 150);
    rect(0, 128, width, height-128);
    image(longMap, 0, mapY);
    textSize(30);
    noStroke();
    textAlign(CENTER, CENTER);
    if (floor == 0){
        text("Select a Black Room", width*3/4, height*9/10);
    }else{
        text("Select a Black Room on the path", width*3/5, height*9/10);
    }
    if (mapData) {
        drawMapPathsAndRooms(mapData);
    }
    /*grid.forEach((row, rowIndex) => {
        row.forEach((node, columnIndex) => {
            // Skip empty nodes
            if (node.type === RoomType.EMPTY) return;

            // Calculate the position of the node on the map
            let nodeX = calculateNodeXPosition(columnIndex, rowIndex);
            let nodeY = calculateNodeYPosition(rowIndex) + mapY; // Include mapY for vertical scrolling

            // Render the node
            drawNode(node, nodeX, nodeY);
        });
    });*/
    displayLegend();
    if (mouseIsPressed){
        handleMapScrolling();
    }

}
function displayLegend() {
    let legendX = 1700;
    let legendYStart = 500;
    let yOffset = 60;
    push();
    textAlign(CENTER);
    fill(0);
    imageMode(CENTER);
    image(mapLegend, legendX, legendYStart);
    let y = legendYStart-100;
    textSize(60);
    noStroke();
    text("Legend", legendX, y - 80);
    for (let roomType in icons) {
        textSize(40);
        tint(0);
        noStroke();
        image(icons[roomType], legendX-100, y, 100, 100);
        text(legend[roomType], legendX + 50, y-10);
        y += yOffset;
    }
    pop();
}
function drawSelectedNodeCircle(x, y) {
    push();
    stroke(255, 0, 0); // Red color for the circle
    strokeWeight(3); // Stroke weight for the circle
    noFill(); // No fill for the circle
    ellipse(x + 64, y + 64, 80, 80); // Draw the circle
    pop();
}


function selectNode(node) {
    if (!isSelectedNode(node)) {
        selectedNodes.push(node);
    }
}
function isSelectedNode(node) {
    return selectedNodes.some(selected => selected.x === node.x && selected.y === node.y);
}
function canSelectNode(node) {
    if (currentPlayerNode === null) return true;
    return mapData.edges.some(edge => 
        (edge.src_x === currentPlayerNode.x && edge.src_y === currentPlayerNode.y && edge.dst_x === node.x && edge.dst_y === node.y) ||
        (edge.dst_x === currentPlayerNode.x && edge.dst_y === currentPlayerNode.y && edge.src_x === node.x && edge.src_y === node.y)
    );
}
function getRandomEncounter(encounters) {
    let totalProbability = encounters.reduce((acc, encounter) => acc + encounter.probability, 0);
    let random = Math.random() * totalProbability;
    for (let encounter of encounters) {
        if (random < encounter.probability) {
            return encounter;
        }
        random -= encounter.probability;
    }
    return null;
}
function startBattle() {
    timing = TURN_START;
    const encounter = getRandomEncounter(act1Encounters);
    enemies = []; // Clear existing enemies
    for (let enemyType of encounter.enemies) {
        console.log(enemyType);
        enemies.push(new Enemy(enemyType,enemyX, enemyY));//enemyX+i*340
    }
}

function drawMapPathsAndRooms(mapData) {
    push();
    stroke(100);
    strokeWeight(5);
    mapData.edges.forEach(edge => {
        let srcX = calculateX(edge.src_x);
        let srcY = mapY + calculateY(edge.src_y);
        let dstX = calculateX(edge.dst_x);
        let dstY = mapY + calculateY(edge.dst_y);

        line(srcX, srcY, dstX, dstY);
    });
    let bossPosX = bossPosition.x;
    let bossPosY = bossPosition.y + mapY;
    // Draw the nodes (rooms)
    noStroke();
    mapData.nodes.forEach(node => {
        noStroke();
        let x = calculateX(node.x)-64;
        let y = mapY + calculateY(node.y)-64;
        if (node.y === 14) { // Draw lines to boss floor
            stroke(100);
            strokeWeight(5);
            let roomX = calculateX(node.x);
            let roomY = mapY + calculateY(node.y);
            line(roomX, roomY, bossPosX, bossPosY+120);
        }
        if (icons[node.class]) {
            if (node.y === floor) {
                tint(0);
            }
            image(icons[node.class], x, y);
            noTint();
        }
        if (isSelectedNode(node)) {
            drawSelectedNodeCircle(calculateX(node.x) - 64, mapY + calculateY(node.y) - 64);
        }
    });    
    if (bossIcons[currentBoss]) {
        image(bossIcons[currentBoss], bossPosX - bossIcons[currentBoss].width / 2, bossPosY - bossIcons[currentBoss].height / 2);
    }
    pop();
}
function calculateX(gridX) {
    return gridX * floorHeight + 500;
}
function calculateY(gridY) {
    return 2800 - gridY * floorHeight;
}         

// Unused
function getRoomColor(roomClass) {
    switch (roomClass) {
        case 'MonsterRoom':
            return color(255, 0, 0); // Red for Monster Room
        case 'EventRoom':
            return color(0, 255, 0); // Green for Event Room
        case 'ShopRoom':
            return color(0, 0, 255); // Blue for Shop Room
        case 'RestRoom':
            return color(255, 255, 0); // Yellow for Rest Room
        // Add other cases as necessary
        default:
            return color(128); // Default color
    }
}
function displayDeckOverlay(){
    noTint();
    fill(0, 0, 0, 150);
    rect(0, 0, width, height);
}
function displaySettingsOverlay(){
    noTint();
    fill(0, 0, 0, 150);
    rect(0, 0, width, height);
}


function handleEvent(){
    //goldenShrineEvent.selectOption(selectedOptionIndex);
}
function playMusic(music) {
    if (music.isPlaying() == false) { //Avoid music repeating
        //setVolume(0.2);
        music.play();
        music.loop();
    }
}
function isInside(x, y, button) {
    return x > button.x && x < button.x + button.width && y > button.y && y < button.y + button.height;
}
function toggleMapOverlay() {
    let currentFloorY = calculateY(floor);
    mapY = height - currentFloorY - floorHeight*2;
    showMapOverlay = !showMapOverlay;
}
function toggleDeckOverlay() {
    showDeckOverlay = !showDeckOverlay;
}
function toggleSettingsOverlay() {
    showSettingsOverlay = !showSettingsOverlay;
}
function hideMapOverlay() {
    showMapOverlay = false;
}
function hideDeckOverlay() {
    showDeckOverlay = false;
}
function hideSettingsOverlay() {
    showSettingsOverlay = false;
}
function onNodeSelected(node) {
    if (canSelectNode(node)) {
        selectNode(node);
        currentPlayerNode = node; // Update the player's current position
        console.log("Node selected:", node);
        switch (node.class) {
            case "MonsterRoom":
                if (firstTimePlay){
                    gameState = "tutorial";
                    hideMapOverlay();
                }else{
                    startBattle();
                    gameState = "battle";
                    toggleMapOverlay();
                    floor ++;
                }
                break;
            case "MonsterRoomElite":
                startBattle();
                gameState = "battle";
                toggleMapOverlay();
                floor ++;
                break;
            case "EventRoom":
                gameState = "event";
                eventTransitionActive = true;
                eventTransitionStartTime = millis();
                toggleMapOverlay();
                floor ++;
                break;
            case "ShopRoom":
                gameState = "shop";
                //gameState = "event";
                eventTransitionActive = true;
                eventTransitionStartTime = millis();
                toggleMapOverlay();
                floor ++;
            case "RestRoom":
                gameState = "campfire";
                eventTransitionActive = true;
                eventTransitionStartTime = millis();
                toggleMapOverlay();
                floor ++;
        }
    }
}
function firstTimeMapSelection(){
    gameState = "map";
    let currentFloorY = calculateY(floor);
    mapY = height - currentFloorY - floorHeight*2;
    textSize(100);
    text("Select a Starting Room", width, height);
}
function showTutorial(){
    if (tipNo == 4){
        firstTimePlay = false;
        gameState = "battle";
        floor = 1;
        tipNo = 1;
        return;
    }
    background(25,31,34);
    let tipImage;
    switch (tipNo){
        case 1: tipImage = img_tipt1; break;
        case 2: tipImage = img_tipt2; break;
        case 3: tipImage = img_tipt3; break;
    }
    let textXPos = width/2;
    image(tipImage, width/4-tipImage.width/2, height/2-tipImage.height/2);
    noTint();
    fill(255);
    textSize(100);
    textAlign(CENTER, CENTER);
    text("Tutorial", width/2, height/8);
    textSize(40);
    textAlign(LEFT, CENTER);
    if (tipNo == 1){
        text("Defeat enemies by playing cards from your hand!", textXPos, height/3);
        text("Cards require Energy to play.", textXPos, height/3+100);
        text("Once you are out, End your turn.", textXPos, height/3+150);
        text("At the start of your turn, new cards are", textXPos, height/3+300);
        text("drawn and your Energy is replenished.", textXPos, height/3+350);
    }else if (tipNo == 2){
        text("Play defensive cards to gain Block", textXPos, height/3);
        text("when enemies are about to attack you.", textXPos, height/3+50);
        text("Block reduces incoming attack damage but ", textXPos, height/3+200);
        text("wears off at the start of your next turn", textXPos, height/3+250);
    }else if (tipNo == 3){
        text("During your turn, you can observe an", textXPos, height/3);
        text("enemy's Intent above them", textXPos, height/3+50);
        text("If an enemy is intent on attacking you", textXPos, height/3+200);
        text("be sure to gain some Block!", textXPos, height/3+250);
    }
    drawProceedButton();
    //handleProceedButton();
}
function mousePressed() {
    if (clickCooldown > 0) {
        return;
    }
    clicked = true;
    if (gameState !== "startScreen") {
            if (gameState === "map" && showMapOverlay) {
                mapData.nodes.forEach(node => {
                    let x = calculateX(node.x);
                    let y = mapY + calculateY(node.y);
                    if (dist(mouseX, mouseY, x, y) < 10) {
                        onNodeSelected(node);
                        selectNode(node);
                    }
                });
            }
        // Check for top panel button clicks
        if (isInside(mouseX, mouseY, buttonMap)) {
            toggleMapOverlay();
            hideDeckOverlay();
            hideSettingsOverlay();
        } else if (isInside(mouseX, mouseY, buttonDeck)) {
            hideMapOverlay();
            toggleDeckOverlay();
            hideSettingsOverlay();
        } else if (isInside(mouseX, mouseY, buttonSettings)) {
            hideMapOverlay();
            hideDeckOverlay();
            toggleSettingsOverlay();
        }
    }
    if (gameState === "startScreen") {
        let d = dist(mouseX, mouseY, width / 2, height - height / 5);
        if (d < 100) { // Assuming the button has an approximate "radius" of 100
            if (firstTimePlay){
                firstTimeMapSelection();
            }else {
                gameState = "neow";
                let currentFloorY = calculateY(floor);
                mapY = height - currentFloorY - floorHeight*2;
            }
            //gameState = "battle";
        }
    } else if (gameState ==="tutorial"){
        handleProceedButton();
    } else if (gameState === "battle"){
        // If a card is clicked, select it and highlight it
        if (timing === PLAYER_TURN) {
            if (mouseX > discardButtonX && mouseX < discardButtonX + discardButtonWidth &&
                mouseY > discardButtonY && mouseY < discardButtonY + discardButtonHeight) {
              toggleDiscardOverlay();
            } else if (showDiscardOverlay) {
              // Check if the mouse click is within the bounds of the return button
              if (mouseX > cancelButtonX && mouseX < cancelButtonX + img_cancelButton.width && mouseY > cancelButtonY && mouseY < cancelButtonY + img_cancelButton.height) {
                toggleDiscardOverlay();
              }
            } 
        for (let card of currentHand) {
            if (mouseIsOver(card,cardScale)) {
                card.isSelected = true; 
                selectedCard = card;
                //console.log("Mouse pressed");
                return; 
            } else {
                card.isSelected = false; 
            }
        }
        // If an entity is clicked and a card is selected, try to play the card
        if (selectedCard) {
            for (let enemy of enemies) {
                if (mouseIsOver(enemy,1) && selectedCard.type === "Attack") {
                    console.log("Enemy is targeted");
                    enemy.isTargeted = true; // Highlight the targeted enemy
                    //playCard(selectedCard, enemy);
                } else if (mouseIsOver(player,1) && selectedCard.type !== "Attack") {
                    player.isTargeted = true; // Highlight the targeted player
                    //playCard(selectedCard, player);
                }
            }
            selectedCard.isSelected = false; // Unhighlight the card after trying to play it
            selectedCard = null;
        } else {
            // If no card is selected, unhighlight the entities
            for (let enemy of enemies) {
                enemy.isTargeted = false;
            }
            player.isTargeted = false;
        }

    }
        if (timing === REWARD_SCREEN){
            player.energy = maxEnergy;
            returncurrentHand();
            handleRewardClick();
            handleProceedButton();
        }
        if (timing === GAME_OVER){
            handleReturntoTitleButton();
        }
    } else if (gameState === "event" || gameState === "shop"){
        if (eventTransitionActive) {
            return; // Ignore clicks during the transition
        }
        let optionHeight = img_enabledButton.height;
        let optionYStart = height / 2 - 100;
        let optionXStart = width / 2 - 125;
        let optionWidth = img_enabledButton.width;
      
        currentEvent.options.forEach((option, index) => {
          let optionY = optionYStart + index * optionHeight;

          if (
            mouseX > optionXStart &&
            mouseX < optionXStart + optionWidth &&
            mouseY > optionY &&
            mouseY < optionY + optionHeight
          ) {// Check if the option is enabled before selecting it
            if (option.enabled) {
              currentEvent.selectOption(index);
            }
          }
        });
    } else if (gameState === "campfire"){
        handleRestOptions();
    }clickCooldown = 15;
}
function mouseReleased() {
    if (draggingCard) {
        for (let enemy of enemies) {
            if (mouseIsOver(enemy,1) && draggingCard.type === "Attack") {
                console.log(draggingCard);
                playCard(draggingCard, enemy);
            }
        }
        if (mouseIsOver(player,1) && draggingCard.type !== "Attack") {
            console.log(draggingCard);
            playCard(draggingCard, player);
        }
        draggingCard.isSelected = false;
        dragging = false;
        draggingCard = null;
        selectedCard = null;
        arrow = null;
    }
    if (clicked){
        clicked = false;
        
    }
}
function mouseIsOver(entity, scaleFactor) {
    let scaledMouseX = mouseX / scaleFactor;
    let scaledMouseY = mouseY / scaleFactor;

    if (scaledMouseX > entity.x && scaledMouseX < entity.x + entity.width &&
        scaledMouseY > entity.y && scaledMouseY < entity.y + entity.height) {
        //console.log("Mouse is over the entity");
        //console.log(entity);
        //console.log(entity.x,entity.y,entity.width,entity.height);
        return true;
    }
    //console.log("NOT OVER");

    return false;
}
function handleCardDragging() {
    if (mouseIsPressed) {
        if (!dragging && draggingCard === null) {
            for (let card of currentHand) {
                if (mouseIsOver(card,cardScale)) {//0.5 is the scale factor of the card
                    dragging = true;
                    draggingCard = card;
                    if (player.energy >0){
                        //if (draggingCard.type === 'Attack') { // Create arrow when an Attack card is dragged
                            arrow = new Arrow(mouseX, mouseY,card.type);
                        //}break;
                    }
                }
            }
        }else if (arrow) {
            arrow.update(); // Update arrow position if an Attack card is being dragged
        }
    } else {
        if (dragging) {
            dragging = false;
            draggingCard = null;
        }
    }
}

function handleMapScrolling() {
    if (mouseY > 128) {
        mapY += mouseY - pmouseY;
        mapY = constrain(mapY, -longMap.height + height, 128);
    }
}
function blockAnimation(entity) {
    push();
    // Position the block image slightly to the left of the HP bar
    let blockImageX = entity instanceof Player ? entity.x + 320 : entity.x + 70;
    let blockImageY = entity instanceof Player ? entity.y + 565 : entity.y + 320;
  
    // Draw the block image
    image(img_block, blockImageX, blockImageY);
  
    // Play a block gain sound effect
    random(sfx_GainDefense).play();
    pop();
  }
  
  function displayHPbar(entity, x, y, maxHP) {
    push();
    // Background bar
    strokeWeight(0);
    fill(0,0,0, 100); // some transparency
    rect(x, y, 200, 7);
    
    // Health bar
    let HPbarLength = map(entity.hp, 0, maxHP, 0, 200); 
    fill(255,0,0);
    if (entity.block > 0){
        fill(0,0,255);
    }
    rect(x, y, HPbarLength, 7); 
  
    // Display the HP text
    fill(255);
    stroke(0);
    strokeWeight(2);
    textSize(25);
    textFont(font);
    text(`${entity.hp}/${maxHP}`, x + 75, y + 12);
  
    // If the entity has block, display the block image next to the HP bar
    if (entity.block > 0) {
      tint("blue");
      image(img_block, x - 30, y - 30);
      textAlign(CENTER,CENTER);
      textSize(25);
      text(entity.block, x, y);
    }
    if (entity.vulnerable > 0) {
        image(img_vulnerable, x, y + 15, 32,32); // Adjust the x and y values as needed
        textSize(16);
        text(entity.vulnerable, x+20, y + 40);
      }
    pop();
  }
  

//unused
function drawFormattedText(x, y, formattedText) {
    let segments = formattedText.split("#");
    let currentX = x;
  
    for (let segment of segments) {
      if (segment.startsWith("y")) {
        fill(255, 255, 0); // Yellow
        segment = segment.substring(1); // Remove the color code character
      } else if (segment.startsWith("r")) {
        fill(255, 0, 0); // Red
        segment = segment.substring(1);
      } else if (segment.startsWith("g")) {
        fill(0, 255, 0); // Green
        segment = segment.substring(1);
      } else if (segment.startsWith("b")) {
        fill(0, 0, 255); // Blue
        segment = segment.substring(1);
      } else {
        fill(255); // Default color (white)
      }
  
      text(segment, currentX, y);
      currentX += textWidth(segment); // Update x position for the next segment
    }
  }
  
function initializeDeck() {
    for (let i = 0; i < 5; i++) {
        deck.push(new Card(img_strike,"Strike", "Attack"));
    }
    for (let i = 0; i < 4; i++) {
        deck.push(new Card(img_defend,"Defend", "Skill"));
    }
    deck.push(new Card(img_bash,"Bash", "Attack"));
    shuffle(deck, true);
    deckInitialized = true;
}
function drawCard() {
    if (deck.length > 0) {
        let card = deck.pop();
        currentHand.push(card);
    }else{
        reshuffleDiscardPile();
        drawCard();
    }
}
function choosetoRemove(){

}
function getRandomRelic(){

}
function dealCards(numCards) {
    for (let i = 0; i < numCards; i++) {
        if (deck.length === 0) {
            reshuffleDiscardPile();
        }
        currentHand.push(deck.pop());
    }
}
function reshuffleDiscardPile() {
    while (discardPile.length > 0) {
        let randomIndex = int(random(discardPile.length));
        deck.push(discardPile.splice(randomIndex, 1)[0]);
    }
}

function playCard(card, entity) {
    console.log("playCard called with:", card, "ID:", Math.random());
    if (isCardBeingPlayed) {
        console.log("Card play is already in progress.");
        return;
    }
    if (player.energy < card.cost) {
        showSpeechBubble("Not enough Energy", 3000);
        console.log("Not enough Energy");
        return;
    }
    isCardBeingPlayed = true;
    switch(card.type) {
        case "Attack":
            if (entity instanceof Enemy) {
                player.attack(entity, card);
                if (card.effect){
                    card.effect(entity);
                }
            }
            break;
        case "Skill":
            if (entity instanceof Player) {
                card.effect(entity);
            }
            break;
    }
    // Move the card to the discard pile and remove it from the current hand
    discardPile.push(card);
    const index = currentHand.indexOf(card);
    if (index > -1) {
        currentHand.splice(index, 1);
    }

    // Reduce player's energy
    player.energy -= card.cost;
    //console.log("Enemy HP: ", entity.hp);
    //console.log("Player Energy: ", player.energy);
    isCardBeingPlayed = false;
}
function drawDiscardButton(){
    //imageMode(CENTER);
    image(img_discardButton, discardButtonX, discardButtonY);
    image(img_countCircle, discardButtonX-40, discardButtonY+25);
    fill(255);
    textSize(30);
    text(discardPile.length, discardButtonX+15, discardButtonY+95);
}
function drawDiscardOverlay() {
    if (showDiscardOverlay) {
      // Dim the background
      fill(0, 0, 0, 150); // Semi-transparent black
      noStroke();
      rect(0, 128, width, height-128);
  
      push();
      scale(cardScale);
      let spaceBetweenCards = 800; // More space between cards
      let cardsPerRow = 5;
      let startingX = 1200;
      let row = 0;
      for (let i = 0; i < discardPile.length; i++) {
        let card = discardPile[i];
        let cardX = startingX + (i % cardsPerRow) * spaceBetweenCards;
        let cardY = 800 + row * (3200 * cardScale);
        if (i > 0 && i % cardsPerRow === 4) {
          row++; // Increment the row counter after every 5 cards
        }
        card.display(cardX, cardY);
      }
      pop();
  
      // Draw the informational text
      fill(255);
      textSize(30);
      textAlign(CENTER, BOTTOM);
      text("Cards here are shuffled into your draw pile when it runs out of cards", width/2, height-50);
  
      image(img_cancelButton, cancelButtonX, cancelButtonY);
      fill(255); // White color for text
      textSize(50);
      text("Return", cancelButtonX+125, cancelButtonY+100);
    }
  }
function toggleDiscardOverlay() {
    showDiscardOverlay = !showDiscardOverlay;
}
function showdiscardPile() {
}
function showSpeechBubble(text, duration) {
    bubbleText = text;
    showBubble = true;
    bubbleTimer = duration / 1000 * 60
}
function drawSpeechBubble() {
    if (showBubble && bubbleTimer > 0) {
        image(img_speechBubble, player.x + 500, player.y - 100); // Adjust x and y position as needed
        fill(255,0,0); // Bubble text color
        textSize(35); // Bubble text size
        textAlign(CENTER, CENTER);
        text(bubbleText, player.x + 750, player.y + 150); // Text position inside the bubble

        bubbleTimer--;
        if (bubbleTimer <= 0) {
            showBubble = false;
        }
    }
}
function playerAttackAnimation(player, enemy) {
    // Move player sprite to the right to simulate an attack
    player.moveRight();
  
    // After a delay (which should be timed with the attack), show the slash effect
    setTimeout(() => {
      // Trigger the slash animation over the enemy
      triggerSlashAnimation(enemy);
    }, attackAnimationDelay / 2);
  
    // After another delay, move player back to the original position
    setTimeout(() => {
      player.moveBack();
    }, attackAnimationDelay);
  }
  
  function enemyAttackAnimation(enemy, player) {
    // Move enemy sprite to the left to simulate an attack
    enemy.moveLeft();
  
    // After a delay (which should be timed with the attack), show the slash effect
    setTimeout(() => {
      // Trigger the slash animation over the player
      triggerSlashAnimation(player);
    }, attackAnimationDelay / 2);
  
    // After another delay, move enemy back to the original position
    setTimeout(() => {
      enemy.moveBack();
    }, attackAnimationDelay);
  }
  
  function triggerSlashAnimation(entity) {
    //console.log("Slash!");
    slashAnimationTimer = slashAnimationDuration;
    // Store the enemy position for the slash animation, adjusted to be centered
    slashPositionX = entity.x + entity.width / 2;
    //console.log(entity.x, entity.y, entity.width, slashPositionX);
    slashPositionY = entity.y + entity.height / 2;  // Play the corresponding sound based on who is attacking
    if (entity instanceof Enemy) {
      random(sfx_IronClad_Atk).play();
    } else if (entity instanceof Player) {
      sfx_FastAtk.play();
    }
  }
  
  function updateAndDrawSlash() {
    //console.log("Updating and drawing slash");
    if (slashAnimationTimer > 0) {
      drawSlash(slashPositionX, slashPositionY);
      slashAnimationTimer--;
    }
  }
  
  function drawSlash(targetX, targetY) {
    //console.log(`Drawing slash at (${targetX}, ${targetY})`);
    push();
    translate(targetX, targetY);
    //rotate(3 * PI / 4); // or rotate(-PI / 4) depending on image orientation
    imageMode(CENTER);
    // Reset tint if necessary or remove if not needed
    // tint("silver");
    image(img_slash, 0, 0);
    pop();
  }
  
function checkForDefeat(enemy) {
    if (enemy.hp <= 0) {
        //Play defeat animation
        enemy.fadeOut();
        console.log("Enemy defeated");
        // Remove the enemy from the array
        enemies.splice(enemies.indexOf(enemy), 1);
    }
}
function checkForWin(){
    if (enemies.length === 0) {
        //Play victory sound
        sfx_Victory.play();
        console.log("You win!");
        timing = REWARD_SCREEN;
        rewards = [20];
        turnNumber = 0;
    }
}
function checkForGameOver() {
    if (player.hp <= 0) {
        //Play defeat animation
        console.log("Game Over!");
        timing = GAME_OVER;
        battleMusic.stop();
        sfx_GameOver.play();
    }
}

function returnToTitle() {
    console.log("Resetting game and returning to title screen.");
    gameState = "startScreen";    
    gameover = false;
    battleMusic.stop();
    titleMusic.play();
    timing = TURN_START;
    player = new Player(playerX, playerY);
    cards = [];
    enemies = [];
    deck = [];
    discardPile = [];
    currentHand = [];
    floor = 1;
    turnNumber = 0;
    initializeDeck();
}
function drawReturntoTitleButton(){
    push();
    fill(128);
    noStroke();
    rectMode(CENTER);
    rect(width/2, height/2+400, 300, 100);
    fill(255);
    textSize(50);
    textAlign(CENTER, CENTER);
    text("Return to Title", width/2, height/2+400);
    pop();
    battleMusic.stop();
}
function handleReturntoTitleButton(){
    if (mouseX > width/2-150 && mouseX < width/2+150 &&
        mouseY > height/2+350 && mouseY < height/2+450){
        returnToTitle();
    }

}
function drawRewardScreen() {
    push();
    fill(0, 150);
    noStroke();
    rect(0,128,width,height-128);
    drawRewardSheet(rewards);
    pop();
}
function drawRewardSheet(rewards) {
    push();
    imageMode(CENTER);
    image(img_rewardScreenSheet, width/2, height/2);
    for (let i = 0; i < rewards.length; i++){
        let rewardX = width/2;
        let rewardY = height/2 + 100 * (i - 1);
        displayReward(rewards[i], rewardX, rewardY);
    }
    image(img_selectBanner, width/2, height/2-300);
    textSize(50);
    textAlign(CENTER, CENTER);
    text("Loot!",width/2, height/2-320);
    pop();
    drawProceedButton();
}
function displayReward(reward, x, y) {
    push();
    imageMode(CENTER);
    fill(255);
    tint('silver');
    image(img_rewardListItemPanel, x, y);
    noTint();
    image(img_gold, x-180, y);
    textSize(40);
    textAlign(CENTER, CENTER);
    text(reward+" Gold", x, y);
    pop();
}
function handleRewardClick() {
    if (timing === REWARD_SCREEN) {
        for (let i = 0; i < rewards.length; i++) {
            let rewardX = width / 2;
            let rewardY = height / 2 + 100 * (i - 1);

            // Check if the mouse is within the bounds of the reward panel image
            if (mouseX > rewardX - img_rewardListItemPanel.width / 2 &&
                mouseX < rewardX + img_rewardListItemPanel.width / 2 &&
                mouseY > rewardY - img_rewardListItemPanel.height / 2 &&
                mouseY < rewardY + img_rewardListItemPanel.height / 2) {
                
                // Play the gold sound
                sfx_Gold.play();

                // Increase the money by the reward amount
                money += rewards[i];

                // Remove the reward from the rewards array
                rewards.splice(i, 1);

                // Break the loop after handling a click to avoid multiple rewards being claimed at once
                break;
            }
        }
    }
}

function handleProceedButton() {
    if (mouseX > proceedButtonX && mouseX < proceedButtonX + img_proceedButton.width &&
        mouseY > proceedButtonY && mouseY < proceedButtonY + img_proceedButton.height) {
        // The mouse is within the proceed button area, go to the next event
       //floor ++;
        if (firstTimePlay){
            tipNo ++;
        }else{
            gameState = "map";
            let currentFloorY = calculateY(floor);
            mapY = height - currentFloorY - floorHeight*2;
        }
        //clickCooldown = 60;
        
    }
  }

function drawProceedButton() {
    // Update the button's appearance based on whether rewards have been collected
    push();
    //if (rewardsCollected) {
      //tint(255); // Full opacity
    //} else {
      //tint(255, 126); // Half opacity
    //}
    let proceedButtonText;
    if (rewards.length === 0){
        proceedButtonText = "Proceed";
    }else proceedButtonText = "Skip Rewards";
    if (firstTimePlay){
        proceedButtonText = "Next";
        if (tipNo == 3){
            proceedButtonText = "I'm Ready!";
        }
    }
    image(img_proceedButton, proceedButtonX, proceedButtonY);
    textSize(35);
    textAlign(CENTER, CENTER);
    text(proceedButtonText, proceedButtonX+250, proceedButtonY+250);
    proceedButtonVisible = true; // The button is now visible
    pop();
  }

function highlightTarget(entity, scaleFactor) {
    push();
    let x = entity.x;
    let y = entity.y;
    let w = entity.width;
    let h = entity.height;
    // Top-left corner
    image(img_framecorner, x - img_framecorner.width, y - img_framecorner.height);
    // Top-right corner
    image(img_framecorner, x + w, y - img_framecorner.height);
    // Bottom-left corner
    image(img_framecorner, x - img_framecorner.width, y + h);
    // Bottom-right corner
    image(img_framecorner, x + w, y + h);
    pop();
}

function displaytopPanel(){
    //fill(255,255);
    imageMode(CORNER);
    image(bar, 0, 0);
    image(keyslots, 30, 0);
    textAlign(LEFT, BASELINE);
    textSize(30);
    fill("#ff474c");
    stroke(0);
    strokeWeight(3);
    text(`${player.hp}/${player.maxhp}`, 370, 48);
    fill(255);
    textFont(font);
    stroke(100);
    strokeWeight(1);
    textSize(30);
    text(player_name, 100, 31);
    textSize(20);
    text("the "+character, 100, 56);
    image(panelHeart, 300, 5);
    image(panelGoldBag, 500, 5);
    fill('gold');
    textSize(30);
    stroke(0);
    text(money, 565, 48);
    for (let i = 0; i < numofPotionSlots; i++){
        image(img_potion_placeholder, 650+i*50, 0);
    }
    image(img_floor, 1000, 0);
    text(`${floor}`, 1060, 48);
    image(img_map, 1600, 0);
    image(img_deck, 1700, 0);
    text(`${deck.length}`, 1750, 60);
    image(img_settings, 1800, 0);
}
function displayEnergy(Energy,maxEnergy){//circular stacking images, also rotating if energy>0
    push();
    translate(200, height - 250);
    imageMode(CENTER);
    if (Energy == 0){
        for (let i = 0; i < 5; i++){
            image(img_noEnergy[i], 0, 0);
        }
    }else{
        for (let i = 0; i < 5; i++){
            image(img_Energy[i], 0, 0);
            rotate(angle);
        }
    }
    if (angle == 360){
        angle = 0;
    }else angle += 0.01;
    pop();
    imageMode(CENTER);
    image(img_Energy[5], 200, height - 250);
    imageMode(CORNER);
    fill(255);
    textFont(font);
    textSize(40);
    stroke("darkred");
    strokeWeight(3);
    text(`${Energy}/${maxEnergy}`, 170, height - 235);
}
function displayEndTurnButton(){
    if (timing === REWARD_SCREEN || timing === GAME_OVER) {
        return;
    }
    let buttonImage = (player.energy > 0) ? endTurnButton : endTurnButtonGlow;
    let buttonText = (timing === PLAYER_TURN) ? "End Turn" : "Enemy Turn";
    push();
    if (timing === ENEMY_TURN){
        tint(128);
    }else {
        noTint();
    }
    image(buttonImage, EndTurnButtonX, EndTurnButtonY);
    textSize(35);
    textAlign(CENTER, CENTER);
    imageMode(CORNER);
    fill(255);
    noStroke();
    text(buttonText, EndTurnButtonX+125, EndTurnButtonY+125);
    pop();
}

function handleEndTurnButton() {
    if (timing != PLAYER_TURN) {
        return;
    }
    let buttonWidth = endTurnButton.width;
    let buttonHeight = endTurnButton.height;
    if (mouseX >= EndTurnButtonX && mouseX <= EndTurnButtonX + buttonWidth &&
        mouseY >= EndTurnButtonY && mouseY <= EndTurnButtonY + buttonHeight) {
        if (mouseIsPressed) {
            discardcurrentHand();
            timing = ENEMY_TURN;
        }
    }
}
function discardcurrentHand(){
    while (currentHand.length > 0) {
        // Animation of moving remaining cards in currentHand to discardPile
        discardPile.push(currentHand.pop());
    }
}
function returncurrentHand(){
    while (currentHand.length > 0) {
        // Animation of moving remaining cards in currentHand to discardPile
        deck.push(currentHand.pop());
    }
}
function displayintent(entity, x, y, intent, damage){//a bouncing intent icon on enemy's head
    push();
    let bounceSpeed = 0.05; // Adjust the speed of the bounce
    let bounceHeight = 10; // Adjust the height of the bounce
    let intentY = y - (Math.sin(frameCount * bounceSpeed) * bounceHeight);
    let intentX = x;
    if (intent == "attack"){
        if (damage<=4){
            image(attack_intent[0], intentX, intentY);
            text(`${damage}`, intentX-5, intentY);
        }else if (damage<=9){
            image(attack_intent[1], intentX, intentY);
        }else if (damage<=14){
            image(attack_intent[2], intentX, intentY);
        }else if (damage<=19){
            image(attack_intent[3], intentX, intentY);
        }else if (damage<=24){
            image(attack_intent[4], intentX, intentY);
        }else if (damage<=29){
            image(attack_intent[5], intentX, intentY);
        }else{
            image(attack_intent[6], intentX, intentY);
        }
        text(`${damage}`, intentX+30, intentY+90);
    }
    if (intent == "buff"){
        image(buff_intent, intentX+20, intentY+40);
    }
    pop();
}
function showTurnStartAnimation(timing){
    textSize(50);
    fill(255);
    textFont(font);
    stroke(100);
    strokeWeight(1);
    textAlign(CENTER, CENTER);
    if (timing == PLAYER_TURN && showDiscardOverlay == false){
        text(`Turn ${turnNumber} Player Turn`, width/2, 200);   
    }else if (timing == ENEMY_TURN){
        text(`Turn ${turnNumber} Enemy Turn`, width/2, 200); 
    }else if (timing == REWARD_SCREEN){
        //text(`Loot!`, width/2, 200); 
    }
}
function displayRelics(){

}
function displayCurrentHand() {
    push();
    scale(cardScale);
    let spaceBetweenCards = currentHand[0].width;
    let startingX = 1500;
    for (let i = 0; i < currentHand.length; i++){
        let cardX = startingX + i * spaceBetweenCards;
        currentHand[i].display(cardX,2800);
    }
    pop();
    //console.log(currentHand);
    //currentHand[0].display();
}


  
  function shuffleDiscardIntoDrawPile() {
      drawPile = discardPile;
      discardPile = [];
      // Shuffle the drawPile
      drawPile = shuffle(drawPile);
  }

  class Player {
    constructor(x,y) {
        this.maxhp = 80;
        this.hp = 80;
        this.maxenergy = 3;
        this.energy = 3;
        this.strength = 0;
        this.block = 0;
        this.weak = 0;
        this.x = x;
        this.y = y;
        this.height = img_ironclad[0].height;
        this.width = img_ironclad[0].width;
        this.isTargeted = false;
        this.vulnerable = 0;
    }
    //failed to extract Spine Animation from the original assets of Slay the Spire
    //so use https://naganeko.pages.dev/chibi-gif/ to convert spine data to PNG sequence
    //transparent GIFs are not supported by this workflow, so use PNG sequence instead
    display() { 
      //ironcladGIF = createImg('assets/images/new_Ironclad.gif');
      //ironcladGIF.position(100, 100);
        //Energy = 0;
        if (gameover){
            image(img_ironclad_corpse, this.x, this.y);
        }else{
            image(img_ironclad[idx_ironclad], this.x, this.y);
            if (idx_ironclad >= 59){
                idx_ironclad = 0;
            }else idx_ironclad ++;
            if (playerSize == 2){
                displayHPbar(player,this.x+350, this.y+575, this.maxhp);
            }else {
                displayHPbar(player,this.x+120, this.y+330, this.maxhp);
            }
            displayEnergy(this.energy,this.maxenergy);
        }
    }
    attack(enemy, card){
        playerAttackAnimation(player,enemy);
        let damageThisCard = card.damage + this.strength - enemy.block;
        if (enemy.vulnerable > 0) {
            damageThisCard =  Math.floor((card.damage + this.strength) * 1.5) - enemy.block;
        }
        // Ensure damage does not go below 0
        damageThisCard = Math.max(0, damageThisCard);
        if (enemy.block>0){
            if (damageThisCard == 0){ 
                enemy.block -= card.damage + this.strength;
                sfx_BlockAtk.play();
            }else {
                enemy.block = 0;
                sfx_DefenseBreak.play();
            }
        }
        enemy.hp -= damageThisCard;
        checkForDefeat(enemy);
        checkForWin();
    }
    addVulnerable(turns){
        this.vulnerable += turns;
    }
    decrementVulnerable(){
        if (this.vulnerable > 0) {
            this.vulnerable--;
          }
    }
    addBlock(block){
        this.block += block;
        blockAnimation(this,block);
    }
    moveRight(){
        this.x += 10;
    }
    moveBack(){
        this.x -= 10;
    }
    getHit() {
        if (!this.beingHit) { // Only apply the effect if the entity isn't already being hit
            this.beingHit = true;
            
            // Apply push-back effect
            this.x -= 50; // Adjust the push-back distance as needed

            // After a delay, return the entity to its original position
            setTimeout(() => {
                this.x = this.originalX;
                this.beingHit = false;
            }, 300); // Adjust the delay as needed
        }
    }
    defend() {
    }

    useCard(card) {
    }

    usePotion(potion) {
    }

    endTurn() {
    }
}

class Enemy {
    constructor(enemy,x,y) {
      this.x = x;
      this.y = y;
      this.name = enemy;
      this.maxhp = enemyData[enemy].maxhp;
      this.hp = int(this.maxhp);
      this.basicdamage = enemyData[enemy].basicdamage;
      this.strength = enemyData[enemy].strength;
      this.block = 0;
      this.weak = 0;
      this.ritualLayers = 0;
      this.intent = enemyData[enemy].intent;
      this.status = 0; //0 for standby, 1 for attack, 2 for defend 
      this.damage = this.basicdamage + this.strength;
      this.isTargeted = false;
      this.width = enemyData[enemy].width;
      this.height = enemyData[enemy].height;
      this.TurnTaken = false;
      this.opacity = 1;
      this.vulnerable = 0;
      this.image = enemyData[enemy].image;
      this.animationIndex = 0;
      this.animationFrames = enemyData[enemy].frames;
    }
    display(){
        push();
        if (this.opacity < 1) {
            tint(255, this.opacity * 255);  
        }
        /*if (this.status == 1){
            if (this.intent === "incantation"){
                image(img_cultist_waving[idx_cultist], this.x, this.y);
                if (idx_cultist >= 130){
                    idx_cultist = 0;
                }else idx_cultist ++;
            }
        }else{*/
            image(this.image[this.animationIndex], this.x, this.y);
            //console.log(this.animationIndex);
            if (this.animationIndex >= this.animationFrames-1){
                this.animationIndex = 0;
                //console.log("animation reset");
            }else this.animationIndex ++;
        //}
        pop();
        displayHPbar(this,this.x+100, this.y+330, this.maxhp);
        displayintent(this,this.x+100, this.y-20,this.intent,this.damage);
    }
    moveLeft(){
        this.x -= 10;
    }
    moveBack(){
        this.x += 10;
    }
    fadeOut() {
        let fadeInterval = setInterval(() => {
        this.opacity -= 0.05;  // Decrease opacity by 5%
        if (this.opacity <= 0) {
            clearInterval(fadeInterval);  // Stop the interval when fully transparent
            this.opacity = 0;  // Ensure opacity doesn't go below 0
        }
        }, 500); 
    }
    getHit() {
        if (!this.beingHit) { 
            this.beingHit = true;
            // push-back effect
            this.x += 50;
            // After a delay, return to its original position
            setTimeout(() => {
                this.x = this.originalX;
                this.beingHit = false;
            }, 300); 
        }
    }
    addBlock(block){
        this.block += block;
        blockAnimation(this,block);
    }
    addVulnerable(turns){
        this.vulnerable += turns;
    }
    decrementVulnerable(){
        if (this.vulnerable > 0) {
            this.vulnerable--;
          }
    }
    takeTurn(player) {
        //
            if (this.intent === "incantation") {
                this.incantation();
                this.status = 0;
                this.intent = "attack"; // Next action will be attack
        } else {
          this.attack(player);
          this.status = 0;
        }
       //}
    // Applying the Ritual buff at the end of the turn
        this.strength += this.ritualLayers;
    }
  
    incantation() {
      this.ritualLayers += 3;
    }
  
    attack(player) {
        enemyAttackAnimation(this, player);
        // Temporary damage calculation for this attack only
        let damageThisTurn = (this.basicdamage + this.strength) - player.block;
        if (player.vulnerable > 0) {
            damageThisTurn =  Math.floor((this.basicdamage + this.strength) * 1.5) - player.block;
        }
        damageThisTurn = Math.max(0, damageThisTurn);
        if (player.block>0){
            if (damageThisTurn == 0){
                player.block -= this.basicdamage + this.strength;
                sfx_BlockAtk.play();
            }else {
                player.block = 0;
                sfx_DefenseBreak.play();
            }
        }
        // Apply damage to the player
        player.hp -= damageThisTurn;
    
        console.log("-- Enemy attacks for " + damageThisTurn + " damage --");
        // Mark the enemy's turn as taken
        this.status = 0;
        this.TurnTaken = true;
    }
  }
  class Card {
    constructor(img,card,type) {
      this.img = img;
      //this.x = x;
      //this.y = y;
      this.card = card;
      this.type = type;
      const data = cardData[card];
        this.type = data.type;
        this.damage = data.damage;
        this.block = data.block;
        this.description = data.description;
        this.cost = data.cost;
        this.effect = data.effect;
      this.isSelected = false;
      this.width = 300*2;//img.width;
      this.height = 420*2;//img.height;
    }
  
    display(x,y) {
        this.x = x;
        this.y = y;
      // Displaying the card image
      if (player.energy >= this.cost){
        let glowIntensity = 30; 
        for (let i = glowIntensity; i > 0; i--) {
          let alphaValue = map(i, 0, glowIntensity, 0, 100); 
          if (this.isSelected) {
            stroke(0,255,255);
          }else{
            stroke(0, 255, 255, 100-alphaValue);
          }
          strokeWeight(1);
          noFill();
          rect(this.x-i, this.y-i, this.width+2*i, this.height+2*i, 10); // Rounded corners
      }
      }
      image(red_card, this.x, this.y);
      image(this.img, this.x+50, this.y+75);
      image(frame, this.x+40, this.y+110);
      image(ribbon, this.x-25, this.y+10);
      image(red_cost, this.x-50, this.y-50);
      // Displaying the card text
      fill(255);
      stroke(100);
      strokeWeight(5);
      textSize(100);
      textAlign(CENTER,CENTER);
      if (player.energy < this.cost){
        fill(255,0,0);
      }else{
        fill(255);
      }
      text(this.cost, this.x+20, this.y+10);
      textAlign(CENTER, CENTER);
      fill(255);
      textSize(30);
      text(this.type, this.x+300, this.y+450);
      textSize(65);
      text(this.card, this.x+300, this.y+45);
      textSize(50);
      text(this.description, this.x+100, this.y+450, 400, 300); 
    }
}
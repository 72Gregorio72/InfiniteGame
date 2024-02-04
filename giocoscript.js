// Ottieni il riferimento al canvas
var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

let immunityImage = document.getElementById("immunityImage");
immunityImage.style.opacity = 0.3;

let dashImage = document.getElementById("dashImage");
dashImage.style.opacity = 0.3;

function setImmunityImageOn() {
  immunityImage.style.opacity = 1;
}

function setDashImageOn() {
  dashImage.style.opacity = 1;
}

function setDashImageOff() {
  dashImage.style.opacity = 0.3;
}

////////////STORE
let canDash = false;
let ImmunityIsShopped = false;

document.addEventListener("DOMContentLoaded", function() {
  // Aggiungi un gestore di eventi al bottone "Store"
  var storeButton = document.getElementById("storeButton");
  storeButton.addEventListener("click", function() {
    openOverlay();
  });

  // Aggiungi un gestore di eventi al bottone "Life"
  var lifeButton = document.getElementById("lifeButton");
  lifeButton.addEventListener("click", function() {
    buyLife();
  });

  // Aggiungi un gestore di eventi al bottone "Dash"
var dashButton = document.getElementById("dashButton");
dashButton.addEventListener("click", function() {
  setDashAbility();
});

// Aggiunge l'evento di click al bottone
  var button = document.getElementById("immunityButton");
  button.addEventListener("click", function() {
    setImmunity();
  });
  
  // Aggiungi un gestore di eventi al pulsante "Chiudi" nel modulo di dialogo
  var closeButton = document.getElementById("closeButton");
  closeButton.addEventListener("click", function() {
    closeOverlay();
  });

  // Get the speed button reference
  var speedButton = document.getElementById("speedButton");
  // Add a click event listener to the button
  speedButton.addEventListener("click", function () {
      increaseSpeed();
  }, false); 


  // Funzione per aprire il modulo di dialogo in sovraimpressione
  function openOverlay() {
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
  }

  // Funzione per chiudere il modulo di dialogo
  function closeOverlay() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
  }

  function buyLife() {
    if (score >= 15 && lives < 5) {
      score -= 15;
      lives++;
      updateGame();
    } else if(score < 15 && lives < 5){
      alert("Non hai abbastanza monete per acquistare una vita!");
    }
    
    if(lives >= 5){
      alert("Hai raggiunto il limite massimo di vite!");
    }
  }
});

var speedCost = 2;

// Get the reference to the element where you want to display the speed cost
var speedCostElement = document.getElementById("speedCostElement");

// Set the innerHTML of the element to display the speed cost
speedCostElement.innerHTML = "x" + speedCost;

function increaseSpeed() {
  if (score >= speedCost && player.speed <= 6) {
    console.log("Speed");
    player.speed += 0.5;
    score -= speedCost;
    speedCost += 2;
    // Get the reference to the element where you want to display the speed cost
    var speedCostElement = document.getElementById("speedCostElement");

    // Set the innerHTML of the element to display the speed cost
    speedCostElement.innerHTML = "x" + speedCost;
    updateGame();
  } else {
    if(score < speedCost){
      alert("Non hai abbastanza monete per migliorare la velocita!");
    } else if(player.speed >= 6){
      alert("Hai raggiunto il limite massimo di velocità!");
    }  }
}



function setDashAbility() {
  if(score >= 8 && !canDash){
    canDash = true;
    score -= 8;
    setDashImageOn();
  } else if(canDash){
    alert("Hai gia aquistato questo power up!");
  } else if(score < 8){
    alert("Non hai abbastanza monete per comprare l'oggetto dash!")
  }
}

// Funzione che viene chiamata quando il bottone viene premuto
function setImmunity(){
  if(score >= 35){
    ImmunityIsShopped = true;
    score -= 35;
    setImmunityImageOn();
    console.log("Immunità attivata!");
  } else if(ImmunityIsShopped){
    alert("Hai gia aquistato questo power up!");
  } else if(score < 35){
    alert("Non hai abbastanza monete per comprare l'oggetto dash!")
  }
}


////////END STORE


///////////////// DASH
let isDashing = false;
let dWasLast = false;

// Funzione per l'attivazione del dash verso destra
function dashRight() {
  // Verifica se il giocatore può eseguire il dash
  if (!isDashing) {
    // Esegui qui le azioni specifiche per il dash verso destra
    console.log("Dash verso destra!");

    // Imposta lo stato del dash
    isDashing = true;

    // Aggiungi eventuali animazioni o altre logiche specifiche del dash
    // ...
    player.x += 200;

    setDashImageOff();

    // Ripristina lo stato del dash dopo un certo periodo di tempo
    setTimeout(function() {
      isDashing = false;
      setDashImageOn();
    }, 1000); // Durata del dash in millisecondi (esempio: 500 ms)
  }
}

// Funzione per l'attivazione del dash verso sinistra
function dashLeft() {
  // Verifica se il giocatore può eseguire il dash
  if (!isDashing) {
    // Esegui qui le azioni specifiche per il dash verso sinistra
    console.log("Dash verso sinistra!");

    // Imposta lo stato del dash
    isDashing = true;

    // Aggiungi eventuali animazioni o altre logiche specifiche del dash
    // ...
    player.x -= 200;
    setDashImageOff();

    // Ripristina lo stato del dash dopo un certo periodo di tempo
    setTimeout(function() {
      isDashing = false;
      setDashImageOn();
    }, 1000); // Durata del dash in millisecondi (esempio: 500 ms)
  }
}

// Funzione per gestire il tasto premuto
function handleKeyDown(event) {
  const key = event.key.toLowerCase();
  if(canDash){
  if (key === "e") {
      // Il tasto "e" è stato premuto
      console.log("Il tasto 'e' è stato premuto.");
      
      if(dWasLast){
        dashRight();
      } else {
        dashLeft();
      }
    }
  }

  if (key === "f") {
    console.log("Il tasto 'f' è stato premuto.");
    activateImmunity();
  }
}

// Aggiungi l'event listener per il tasto premuto
document.addEventListener("keydown", handleKeyDown);

/////////////END DASH

/////////////IMMUNITY
let isImmune = false;
let canBeActive = false;

function activateImmunity(){
  if(canBeActive && ImmunityIsShopped){
    isImmune = true;
    canBeActive = false;
    player.color = "blue";
    immunityImage.style.opacity = 0.3;
    console.log("Il giocatore è immune alle collisioni per 3 secondi.");
    setTimeout(function() {
      isImmune = false;
      console.log("L'immunità è terminata.");
      player.color = "green";
    }, 3000); // 3000 millisecondi corrispondono a 3 secondi
  }
}


///////////////END IMMUNITY

// Definisci le costanti per la fisica
const gravity = 0.5;
const jumpStrength = 15;

// Imposta la larghezza e l'altezza del canvas
canvas.width = 2000;
canvas.height = 800;

var jumpStartTime = 0; // Istane in cui la barra spaziatrice viene premuta
var jumpDuration = 0; // Durata della pressione della barra spaziatrice

var damageFlashCount = 0; // Numero di lampeggi di danno
var isFlashing = false; // Stato del lampeggio
var flashInterval; // Intervallo di lampeggio

var isJumping = false; // Stato del salto (true se il salto è in corso, false altrimenti)     

// Definisci le variabili del gioco
var player = {
  x: 0,
  y: canvas.height - 64,
  invincible: false,
  canDoubleJump: true,
  width: 32,
  jumps: 0,
  height: 32,
  onGround: false,
  speed: 4,
  color: "green",
  velX: 0,
  velY: 0,
  jumping: false,
  canJump: true,
  currentPlane: 0,
  isTouchingSpikes: false,
};

var score = 0; // Inizializza lo score a 0
var level = 1; // Inizializza il livello a 1
var lives = 3; // Inizializza le vite a 3
var highScore = 0; // Inizializza l'highscore a 0

// Crea l'array dei blocchi, spine e monete per ogni piano
var blocks = [];
var spikes = [];
var coins = [];

function generateNewLevel(){
  if(player.currentPlane % 1 == 0){
    generateRandomLevel();
  } else {
    generateRandomLevel();
  }
}

// Genera un livello casuale per il piano corrente
function generateRandomLevel() {
  canBeActive = true;
  if(ImmunityIsShopped){
    setImmunityImageOn();
  }
  var level = player.currentPlane;
  var currentPlaneBlocks = [];
  var currentPlaneSpikes = [];
  var currentPlaneCoins = [];

  // Calcola la difficoltà in base al livello
  var minDistance = 150 - level * 5; // Diminuisce la distanza minima tra entità
  var minCoinDistance = 40 - level * 2; // Diminuisce la distanza minima tra monete e blocchi
  var coinMargin = 10; // Margine inferiore delle monete rispetto ai blocchi

  // Genera i blocchi casuali
  var numBlocks = 0;
  while (numBlocks < 20) {
    var randomX = Math.random() * (canvas.width - 100) + 50; // Posizione casuale in larghezza
    var randomY = Math.random() * (canvas.height - 200) + 100; // Posizione casuale in altezza
    var randomWidth = Math.random() * 100 + minDistance; // Larghezza casuale
    var block = { x: randomX, y: randomY, width: randomWidth, height: 40 };

    var isOverlapping = false;
    for (var i = 0; i < currentPlaneBlocks.length; i++) {
      var existingBlock = currentPlaneBlocks[i];
      if (
        randomX + randomWidth > existingBlock.x &&
        randomX < existingBlock.x + existingBlock.width &&
        randomY + 20 > existingBlock.y &&
        randomY < existingBlock.y + existingBlock.height
      ) {
        isOverlapping = true;
        break;
      }
    }

    if (!isOverlapping) {
      currentPlaneBlocks.push(block);
      numBlocks++;
    }
  }

  // Genera le spine sopra i blocchi
  for (var i = 0; i < currentPlaneBlocks.length; i++) {
    var block = currentPlaneBlocks[i];
    var randomWidth = Math.random() * 30 + 20; // Larghezza casuale tra 20 e 50
    var randomX = Math.random() * (block.width - randomWidth) + block.x; // Posizione casuale all'interno del blocco
    var randomY = block.y - randomWidth; // Sopra il blocco
    var spike = { x: randomX, y: randomY, width: randomWidth, height: randomWidth };
    currentPlaneSpikes.push(spike);
  }

  // Genera le monete evitando sovrapposizioni con blocchi, spine e altre monete
  var numCoins = 3 + Math.floor(level / 3) + Math.floor(level / 5); // Aumenta il numero di monete ogni 5 livelli
  if (numCoins > 10) {
    numCoins = 10;
  }
  var coinValues = [1, 3, 5]; // Valori punti delle monete disponibili
  var coinTextures = ['images/immagine1.jpg', 'images/img3.jpg', 'images/pixil-frame-0 (4).png']; // Texture per le monete

  for (var i = 0; i < numCoins; i++) {
    var isOverlapping = true;
    var randomX, randomY;

    while (isOverlapping) {
      isOverlapping = false;
      randomX = Math.random() * (canvas.width - 40) + 20; // Posizione casuale in larghezza
      randomY = Math.random() * (canvas.height - 40) + 20; // Posizione casuale in altezza

      // Verifica sovrapposizioni con blocchi
      for (var j = 0; j < currentPlaneBlocks.length; j++) {
        var block = currentPlaneBlocks[j];
        if (
          randomX + 40 > block.x - minDistance &&
          randomX < block.x + block.width + minDistance &&
          randomY + 40 > block.y - minDistance &&
          randomY < block.y + block.height + minDistance
        ) {
          isOverlapping = true;
          break;
        }
      }

      // Verifica sovrapposizioni con spine
      for (var j = 0; j < currentPlaneSpikes.length; j++) {
        var spike = currentPlaneSpikes[j];
        if (
          randomX + 40 > spike.x - minDistance &&
          randomX < spike.x + spike.width + minDistance &&
          randomY + 40 > spike.y - minDistance &&
          randomY < spike.y + spike.height + minDistance
        ) {
          isOverlapping = true;
          break;
        }
      }

      // Verifica sovrapposizioni con altre monete
      for (var j = 0; j < currentPlaneCoins.length; j++) {
        var coin = currentPlaneCoins[j];
        if (
          randomX + 40 > coin.x - minCoinDistance &&
          randomX < coin.x + coin.width + minCoinDistance &&
          randomY + 40 > coin.y - minCoinDistance &&
          randomY < coin.y + coin.height + minCoinDistance
        ) {
          isOverlapping = true;
          break;
        }
      }
    }

    var randomValue = coinValues[i]; // Seleziona il valore punti dalla lista
    var randomTextureIndex = Math.floor(Math.random() * coinTextures.length); // Genera un indice casuale per selezionare la texture
    var randomTexture = coinTextures[randomTextureIndex]; // Seleziona la texture corrispondente all'indice generato
    var coin = { x: randomX, y: randomY - coinMargin, width: 40, height: 40, value: randomValue, texture: randomTexture };
    currentPlaneCoins.push(coin);
  }

  // Aggiorna l'array dei blocchi, delle spine e delle monete
  blocks[player.currentPlane] = currentPlaneBlocks;
  spikes[player.currentPlane] = currentPlaneSpikes;
  coins[player.currentPlane] = currentPlaneCoins;
}

// Inizializza il gioco
function initGame() {
  score = 0;
  lives = 3;  
  player.x = 0;
  player.y = canvas.height - 64;
  generateRandomLevel();
}

// Aggiorna la logica del gioco
function updateGame() {  // Aggiorna la posizione del giocatore
  //dropBlock();
  //console.log(isImmune);
  player.x += player.velX;
  player.y += player.velY;

  // Applica la gravità
  player.velY += gravity;

  // Impedisci al giocatore di uscire dai limiti del canvas
  if (player.x < 0) {
    player.x = 0;
  }
  if (player.x + player.width > canvas.width) {
    player.x = canvas.width - player.width;
  }
  if (player.y < 0) {
    player.y = 0;
  }
  if (player.y + player.height > canvas.height) {
    player.y = canvas.height - player.height;
    player.velY = 0;
    player.canJump = true;
    player.onGround = true;
  }

  if (player.isTouchingSpikes && !player.invincible) {
    player.isTouchingSpikes = false;
    player.invincible = true;
    setTimeout(function () {
      player.invincible = false;
    }, 1000); // Imposta il tempo di invincibilità su 1 secondo (puoi regolare il valore in base alle tue esigenze)
  }

  // Verifica se il giocatore ha preso danno
  if (player.isTouchingSpikes) {
    // Se il player non sta già lampeggiando, inizia il lampeggio
    if (!isFlashing) {
      damageFlashCount = 0; // Resetta il contatore dei lampeggi
      isFlashing = true; // Imposta lo stato del lampeggio a true
      flashInterval = setInterval(flashPlayer, 300); // Avvia il lampeggio ogni 300 millisecondi (0.3 secondi)
    }
  } else {
    // Se il player non sta toccando le spine, interrompi il lampeggio
    stopFlashing();
  }
  
  if (player.onGround) {
    player.canJump = true;
    player.canDoubleJump = true;
  }

  // Verifica collisioni con i blocchi
  var currentPlaneBlocks = blocks[player.currentPlane];
  for (var i = 0; i < currentPlaneBlocks.length; i++) {
    var block = currentPlaneBlocks[i];

    // Verifica collisione laterale
    if (
      player.x + player.width > block.x &&
      player.x < block.x + block.width &&
      player.y + player.height > block.y &&
      player.y < block.y + block.height
    ) {
      // Collisione laterale sinistra
      if (player.velX > 0 && player.x + player.width <= block.x + player.velX) {
        player.x = block.x - player.width;
        player.velX = 0;
      }
      // Collisione laterale destra
      else if (player.velX < 0 && player.x >= block.x + block.width + player.velX) {
        player.x = block.x + block.width;
        player.velX = 0;
      }
    }

    // Verifica collisione superiore
    if (
      player.y + player.height > block.y &&
      player.y < block.y + block.height &&
      player.x + player.width > block.x &&
      player.x < block.x + block.width &&
      player.velY >= 0
    ) {
      player.y = block.y - player.height;
      player.velY = 0;
      player.canJump = true;
      player.onGround = true;
    }
  }

  // Verifica collisioni con le spine
  if(!isImmune){
    var currentPlaneSpikes = spikes[player.currentPlane];
    for (var i = 0; i < currentPlaneSpikes.length; i++) {
      var spike = currentPlaneSpikes[i];

      // Verifica collisione con le spine
      if (
        player.x + player.width > spike.x &&
        player.x < spike.x + spike.width &&
        player.y + player.height > spike.y &&
        player.y < spike.y + spike.height &&
        !player.invincible
      ) {
        player.isTouchingSpikes = true;
        break;
      }
    }
  }
  


  // Verifica collisioni con le monete
  var currentPlaneCoins = coins[player.currentPlane];
  for (var i = 0; i < currentPlaneCoins.length; i++) {
    var coin = currentPlaneCoins[i];

    // Verifica collisione con le monete
    if (
      player.x + player.width > coin.x &&
      player.x < coin.x + coin.width &&
      player.y + player.height > coin.y &&
      player.y < coin.y + coin.height
    ) {
      // Incrementa lo score e rimuovi la moneta
      score++;
      currentPlaneCoins.splice(i, 1);
      break;
    }
  }

   if (currentPlaneCoins.length === 0) {
     // Incrementa il livello corrente
     player.currentPlane++;
    // Genera un nuovo livello
    // Chiamata alla funzione per mostrare il messaggio del livello attuale prima di generare il livello
      generateNewLevel();
     // Resettare la posizione del giocatore
     player.x = 0;
     player.y = canvas.height - 64;
     player.velX = 0;
     player.velY = 0;
     player.canJump = true;
     player.onGround = false;
     player.isTouchingSpikes = false;
   }
  
  // Verifica se il giocatore ha perso una vita
  if (player.isTouchingSpikes && !isImmune) {
    lives--;
  }

  /* Verifica se il giocatore ha raggiunto il traguardo
  if (player.x > canvas.width - player.width) {
    player.currentPlane++;
    player.x = 0;
    generateRandomLevel();
  }*/
}

// Assicurati di aver caricato l'immagine prima di chiamare la funzione drawGame()
var coinImage = document.getElementById("coinImage");
// Disegna gli oggetti del gioco sul canvas
function drawGame() {
  // Pulisci il canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Disegna i blocchi
  var currentPlaneBlocks = blocks[player.currentPlane];
  for (var i = 0; i < currentPlaneBlocks.length; i++) {
    var block = currentPlaneBlocks[i];
    var blockImage = document.getElementById("blockImage");
    context.drawImage(blockImage, block.x, block.y, block.width, block.height);
  }

  // Disegna le spine
  var currentPlaneSpikes = spikes[player.currentPlane];
  for (var i = 0; i < currentPlaneSpikes.length; i++) {
    var spike = currentPlaneSpikes[i];
    var spikeImage = document.getElementById("spikeImage");
    context.drawImage(spikeImage, spike.x, spike.y, spike.width, spike.height);
  }

  /*
  // Disegna i box rossi
  var currentPlaneRedBoxes = redBoxes[player.currentPlane];
  for (var i = 0; i < currentPlaneRedBoxes.length; i++) {
    var redBox = currentPlaneRedBoxes[i];
    context.fillStyle = "red";
    context.fillRect(redBox.x, redBox.y, redBox.width, redBox.height);
  }*/

  // Disegna le monete
  var currentPlaneCoins = coins[player.currentPlane];
  for (var i = 0; i < currentPlaneCoins.length; i++) {
    var coin = currentPlaneCoins[i];
    context.drawImage(coinImage, coin.x, coin.y, coin.width, coin.height);
  }


 // Disegna il player
 if (player.visible) {
  // Se il player è invincibile, disegnalo con un colore diverso (ad esempio, verde)
  if (player.invincible) {
    context.fillStyle = "red";
    
  } else {
    // Se il player è toccato dalle spine, disegnalo di colore rosso
    if (player.isTouchingSpikes) {
      context.fillStyle = "red";
    } else {
      // Altrimenti, disegnalo con il colore normale (ad esempio, blu)
      context.fillStyle = player.color;
    }
  }
  context.fillRect(player.x, player.y, player.width, player.height);
}
  // Disegna il testo delle vite, score, highscore e livello
  context.font = "20px Arial";
  context.fillStyle = "black";
  // Disegna i cuori per le vite rimaste
  var heartImage = document.getElementById("heartImage"); // Immagine di un cuore

  for (var i = 0; i < lives; i++) {
    var heartX = 10 + i * 50; // Posizione orizzontale del cuore
    var heartY = 10; // Posizione verticale del cuore
    context.drawImage(heartImage, heartX, heartY, 40, 40); // Disegna l'immagine del cuore
  }


  context.drawImage(coinImage, 10, 110, 30, 30); // Disegna l'immagine del cuore

  context.fillText("x" + score, 45, 135);
  context.fillText("Level: " + player.currentPlane, 980, 50);
}

// Gestisci l'input del giocatore
function handleInput() {
  // Imposta la velocità orizzontale del giocatore in base ai tasti premuti
  if (keys["ArrowRight"] || keys["d"]) {
    player.velX = player.speed;
    dWasLast = true;
  } else if (keys["ArrowLeft"] || keys["a"]) {
    player.velX = -player.speed;
    dWasLast = false;
  } else {
    player.velX = 0;
  }
  /*
  // Gestisci il salto del giocatore
  if ((keys["Space"] || keys["w"]) && (player.canJump || player.canDoubleJump)) {
    if (player.canDoubleJump) {
      player.velY = -jumpStrength;
      player.canJump = false;
      player.onGround = false;
      jumpStartTime = new Date().getTime();
      jumpDuration = 0;
      isJumping = true;
      player.jumps++;
      if(player.jumps == 10){
        player.canDoubleJump = false;
        player.jumps = 0;
      }
    }
  }*/
}

// Funzione di loop del gioco
function gameLoop() {
  handleInput();
  updateGame();
  drawGame();

  if (lives > 0) {
    requestAnimationFrame(gameLoop);
  } else {
    // Il giocatore ha perso tutte le vite, mostra un messaggio di game over
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = "50px Arial";
    context.fillStyle = "black";
    context.fillText("Game Over", canvas.width / 2 - 100, canvas.height / 2);
  }
}
  
/* Resetta il gioco
function resetGame() {

  player.x = 0;
  player.y = canvas.height - 64;
  player.velX = 0;
  player.velY = 0;
  player.jumping = false;
  player.canJump = true;
  player.onGround = false;
  player.isTouchingSpikes = false;
  player.currentPlane = 0;

  // Genera un nuovo livello
  generateRandomLevel();
}*/

// Funzione per il lampeggio del player
function flashPlayer() {
  // Alterna la visibilità del player
  player.visible = !player.visible;

  // Incrementa il contatore dei lampeggi
  damageFlashCount++;

  // Interrompi il drao dopo 3 lampeggi
  if (damageFlashCount >= 6) {
    stopFlashing();
  }
}

// Funzione per interrompere il lampeggio del player
function stopFlashing() {
  clearInterval(flashInterval); // Interrompi l'intervallo di lampeggio
  player.visible = true; // Riporta la visibilità del player a true
  isFlashing = false; // Imposta lo stato del lampeggio a false
}

// Gestisci gli eventi dei tasti premuti
var keys = {};

document.addEventListener("keydown", function (event) {
  keys[event.key] = true;

  if (event.key == "w" || event.key == 32) {
    if (player.canDoubleJump) {
      player.velY = -jumpStrength;
      player.canJump = false;
      player.onGround = false;
      jumpStartTime = new Date().getTime();
      jumpDuration = 0;
      isJumping = true;
      player.jumps++;
      if(player.jumps == 2){
        player.canDoubleJump = false;
        player.jumps = 0;
      }
    }
  }
});

document.addEventListener("keyup", function (event) {
  keys[event.key] = false;
});

function toggleShop() {
  var shopContainer = document.getElementById('shop-container');
  shopContainer.classList.toggle('hidden');
}

function buyItem(item) {
  // Implementa qui la logica di acquisto dell'oggetto
  console.log('Hai acquistato ' + item);
}


// Aggiungi questa linea dopo aver creato il pulsante "startButton" nella tua pagina HTML
document.getElementById("startButton").addEventListener("click", initGame);

// Inizializza il gioco e avvia il loop del gioco
initGame();
gameLoop();

function openLink(url) {
  window.location.href = url;
}

const leftArrowButton = document.getElementById('leftArrow');
const rightArrowButton = document.getElementById('rightArrow');
//const leftArrowButton = document.getElementById('leftArrow');
let moveLeftInterval
let moveRightInterval

function movePlayerLeft() {
  // Update player's x-coordinate for moving left
  player.x -= player.speed - 1;
}

function movePlayerRight() {
  // Update player's x-coordinate for moving right
  player.x += player.speed - 1;
}

function handleLeftButtonPress() {
  // Clear any existing moveRight interval
  clearInterval(moveRightInterval);

  // Start moving the player left immediately
  movePlayerLeft();

  // Set an interval for moving the player left
  moveLeftInterval = setInterval(movePlayerLeft, 1); // Adjust the interval as needed
}

function handleLeftButtonRelease() {
  // Clear the moveLeft interval when the button is released
  clearInterval(moveLeftInterval);
}

function handleRightButtonPress() {
  // Clear any existing moveLeft interval
  clearInterval(moveLeftInterval);

  // Start moving the player right immediately
  movePlayerRight();

  // Set an interval for moving the player right
  moveRightInterval = setInterval(movePlayerRight, 1); // Adjust the interval as needed
}

function handleRightButtonRelease() {
  // Clear the moveRight interval when the button is released
  clearInterval(moveRightInterval);
}

leftArrowButton.addEventListener('mousedown', handleLeftButtonPress);
leftArrowButton.addEventListener('mouseup', handleLeftButtonRelease);
leftArrowButton.addEventListener('touchstart', handleLeftButtonPress);
leftArrowButton.addEventListener('touchend', handleLeftButtonRelease);

rightArrowButton.addEventListener('mousedown', handleRightButtonPress);
rightArrowButton.addEventListener('mouseup', handleRightButtonRelease);
rightArrowButton.addEventListener('touchstart', handleRightButtonPress);
rightArrowButton.addEventListener('touchend', handleRightButtonRelease);

var jumpArrowButton = document.getElementById("jumpArrow");
jumpArrowButton.addEventListener("click", function() {
  jump();
});

function jump() {
  if (player.canDoubleJump) {
    player.velY = -jumpStrength;
    player.canJump = false;
    player.onGround = false;
    jumpStartTime = new Date().getTime();
    jumpDuration = 0;
    isJumping = true;
    player.jumps++;
    if(player.jumps == 2){
      player.canDoubleJump = false;
      player.jumps = 0;
    }
  }
}

window.addEventListener('resize', () => {
  if (window.innerWidth <= 600) {
    document.body.classList.add('phone-mode');
  } else {
    document.body.classList.remove('phone-mode');
  }
});
const soundUrls = [
'https://www.myinstants.com/media/sounds/bruh.mp3',
'https://www.myinstants.com/media/sounds/wilhelm-scream.mp3',
'https://www.myinstants.com/media/sounds/sad-trombone.mp3',
'https://www.myinstants.com/media/sounds/airhorn.mp3',
'https://www.myinstants.com/media/sounds/oof.mp3',
'https://www.myinstants.com/media/sounds/rimshot.mp3',
'https://www.myinstants.com/media/sounds/fart.mp3',
'https://www.myinstants.com/media/sounds/emotional-damage.mp3',
'https://www.myinstants.com/media/sounds/metal-pipe-falling-sound.mp3',
'https://www.myinstants.com/media/sounds/what-da-dog-doin.mp3',
'https://www.myinstants.com/media/sounds/dun-dun-dunnnnnnnn.mp3',
'https://www.myinstants.com/media/sounds/haha-funny-laugh.mp3',
'https://www.myinstants.com/media/sounds/huh-cat.mp3',
'https://www.myinstants.com/media/sounds/we-do-not-care-tiktok-sound.mp3',
'https://www.myinstants.com/media/sounds/hey-let-her-go.mp3',
'https://www.myinstants.com/media/sounds/valorant-teleporter.mp3',
'https://www.myinstants.com/media/sounds/bad-to-the-bone-meme.mp3',
'https://www.myinstants.com/media/sounds/brain-fart-slowed.mp3',
'https://www.myinstants.com/media/sounds/electric-zoo.mp3',
'https://www.myinstants.com/media/sounds/tik-tok-india.mp3',
'https://www.myinstants.com/media/sounds/chipmunk-laugh.mp3',
'https://www.myinstants.com/media/sounds/duck-toy-sound.mp3',
'https://www.myinstants.com/media/sounds/cartoon-run-take-off.mp3',
'https://www.myinstants.com/media/sounds/slumber-that-brother-gone.mp3',
'https://www.myinstants.com/media/sounds/no-no-wait-wait.mp3',
'https://www.myinstants.com/media/sounds/let-me-in.mp3',
'https://www.myinstants.com/media/sounds/discord-leave.mp3',
'https://www.myinstants.com/media/sounds/discord-notification.mp3',
'https://www.myinstants.com/media/sounds/spongebob-fail.mp3',
'https://www.myinstants.com/media/sounds/roblox-death-sound_1.mp3',
'https://www.myinstants.com/media/sounds/bing-chilling.mp3',
'https://www.myinstants.com/media/sounds/objection.mp3',
'https://www.myinstants.com/media/sounds/mario-bros-warp.mp3',
'https://www.myinstants.com/media/sounds/cow-moo.mp3',
'https://www.myinstants.com/media/sounds/yeet.mp3',
'https://www.myinstants.com/media/sounds/wow-sound-effect.mp3',
'https://www.myinstants.com/media/sounds/minecraft-creeper-hiss.mp3',
'https://www.myinstants.com/media/sounds/among-us-dead-body.mp3',
'https://www.myinstants.com/media/sounds/batman-transition.mp3',
'https://www.myinstants.com/media/sounds/nani.mp3',
'https://www.myinstants.com/media/sounds/avengers-assemble.mp3',
'https://www.myinstants.com/media/sounds/its-over-9000.mp3',
'https://www.myinstants.com/media/sounds/shrek-horn.mp3',
'https://www.myinstants.com/media/sounds/big-chungus.mp3',
'https://www.myinstants.com/media/sounds/epic-sax-guy.mp3'
];

const emojis = ['🌈', '🌟', '✨', '🎉', '💥', '🌀'];

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
console.log("message received", message);
if (message.action === 'start') {
    console.log(`Starting ${message.funLevel} trip `);
    sendResponse({message: "service worker processed the message"});
    start(message.funLevel);
}
return true;
});

async function start(funLevel) {
  const colours = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink'];
  resectEFfects();
    
  // reset all effects
  function resetEffects() {
      activeIntervals.forEach(clearInterval);
      activeIntervals = [];
      activeAnimations.forEach(cancelAnimationFrame);
      activeAnimations = [];
      document.body.style.transform = "";
      document.body.style.opacity = "1";
      document.body.style.fontFamily = "";
      document.body.style.backgroundColor = "";
      document.body.style.color = "";
      document.body.style.transition = "";
      document.querySelectorAll(".emoji, .explosion").forEach((el) => el.remove());
  }

  // effects for all levels
  flyhigh(funLevel);
  setInterval(randomiseCharacters, 3000);

  // effects for business and first-class levels
  if (["Business", "First-Class"].includes(funLevel)) {
    playRandomSound(funLevel);
    spawnEmojis(emojis, funLevel);
    flickeringScreen();
  }

  if (funLevel === "Business") {
    shakyScreen(2);
  } else if (funLevel === "First-Class") {
    shakyScreen(10);
  }

  // effects for first-class
  if (funLevel === "First-Class") {
    movingEmojis(emojis);
    floatImages();
    zoom();
    explode();
  }
}

function flyhigh(funLevel) {
  const colours = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink'];

  setInterval(() => {
      document.body.style.fontFamily = 'Comic Sans MS, Comic Sans, cursive';
      document.body.style.filter = `hue-rotate(${Math.random() * 360}deg) blur(${Math.random() * 2}px)`;

      if (funLevel !== "Economy") {
        document.body.style.backgroundColor = colours[Math.floor(Math.random() * colours.length)];
        document.body.style.color = colours[Math.floor(Math.random() * colours.length)]; 
        document.body.style.filter = `hue-rotate(${Math.random() * 360}deg) blur(${Math.random() * 2}px)`;
      }
    }, funLevel === 'Economy' ? 1000 : funLevel === 'Business' ? 500 : 100);
  }
  
function jumbleWord(word) {
if (word.length <= 3) return word;
const middle = word.slice(1, -1).split('');
for (let i = middle.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [middle[i], middle[j]] = [middle[j], middle[i]];
}
return word[0] + middle.join('') + word[word.length - 1];
}

function shuffleWords(text) {
    return text.split(/\s+/).sort(() => Math.random() - 0.5).join(" ");
}

function randomiseCharacters() {
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    { acceptNode: (node) => node.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT },
    false
  );

  while (walker.nextNode()) {
    const node = walker.currentNode;
    node.nodeValue = shuffleWords(node.nodeValue);
  }
}

function playRandomSound(funLevel) {
  setInterval(() => {
    const audio = new Audio();
    audio.src = soundUrls[Math.floor(Math.random() * soundUrls.length)];
    audio.play(); 
  }, funLevel === "Business" ? 7000 : 3000)
}

function spawnEmojis(emojis, funLevel) {
  setInterval(() => {
    const emoji = document.createElement('div');
    emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    emoji.style.position = 'absolute';
    emoji.style.fontSize = `${Math.random() * 50 + 20}px`;

    function updatePosition() {
      const pageWidth = document.documentElement.scrollWidth;
      const pageHeight = document.documentElement.scrollHeight;
      const randomX = Math.random() * pageWidth;
      const randomY = Math.random() * pageHeight;

      emoji.style.left = `${randomX}px`;
      emoji.style.top = `${randomY}px`;
    }

    updatePosition();

    const moveEmoji = setInterval(updatePosition, 1000);

    emoji.style.animation = 'darting 2s infinite';
    document.body.appendChild(emoji);

    setTimeout(() => emoji.remove(), 5000);
  }, funLevel === 'Business' ? 500 : 10);
}

function movingEmojis(emojis) {
  setInterval(() => {
    const emoji = document.createElement('div');
    emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    emoji.style.position = 'fixed';
    emoji.style.fontSize = `${Math.random() * 50 + 20}px`;

    let posX = Math.random() * window.innerWidth;
    let posY = Math.random() * window.innerHeight;
    
    emoji.style.left = `${posX}px`;
    emoji.style.top = `${posY}px`;

    document.body.appendChild(emoji);

    const speedX = (Math.random() - 0.5) * 5;
    const speedY = (Math.random() - 0.5) * 5;

    function moveEmoji() {
      posX += speedX;
      posY += speedY;

      if (posX < 0 || posX > window.innerWidth - 50) speedX *= -1;
      if (posY < 0 || posY > window.innerWidth - 50) speedY *= -1;
      
      emoji.style.left = `${posX}px`;
      emoji.style.top = `${posY}px`;

      requestAnimationFrame(moveEmoji);
    }

    moveEmoji();

    setTimeout(() => {
      emoji.remove();
    }, 5000);
  }, 500);
}

function shuffleWords(text) {
  return text.replace(/\b(\w{4,})\b/g, (match) => jumbleWord(match));
}

function zoom() {
  let zoomLevel = 1;

  setInterval(() => {
    zoomLevel = Math.random() * 0.2 + 0.9;
    document.body.style.transform = `scale(${zoomLevel})`;
    const randomX = Math.random() * pageWidth;
    const randomY = Math.random() * pageHeight;
    document.body.style.transformOrigin = `${randomX}% ${randomY}%`;
    document.body.style.transition = "transform 1s ease-in-out";
  }, 500);
}

function explode() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes explosion {
      0% { transform: scale(0); opacity: 1; }
      50% { transform: scale(1.5); opacity: 0.8; }
      100% { transform: scale(3); opacity: 0; }
    }

    .explosion {
      position: absolute;
      border-radius: 50%;
      background: radial-gradient(circle, red, orange, yellow, transparent);
      animation: explosion 2s ease-out;
      pointer-events: none;
      z-index: 1000; /* Ensure it appears above other content */
    }
  `;
  document.head.appendChild(style);

  function createExplosion() {
    const explosion = document.createElement('div');
    explosion.classList.add('explosion');

    const size = Math.random() * 200 + 50; 
    explosion.style.width = `${size}px`;
    explosion.style.height = `${size}px`;

    const pageWidth = document.documentElement.clientWidth;
    const pageHeight = document.documentElement.clientHeight;
    const randomX = Math.random() * (pageWidth - size);
    const randomY = Math.random() * (pageHeight - size);

    explosion.style.left = `${randomX}px`;
    explosion.style.top = `${randomY}px`;

    explosion.style.position = 'absolute';

    document.body.appendChild(explosion);

    setTimeout(() => explosion.remove(), 2000);
  }

  function generateExplosions() {
    const randomDelay = Math.random() * 3000 + 1000; 
    setTimeout(() => {
      createExplosion(); 
      generateExplosions(); 
    }, randomDelay);
  }

  generateExplosions();
}

let shakiness;

function shakyScreen(intensity = 5) {

  function shake() {
      let shakeIntensity = intensity + Math.random() * 5
      const offsetX = (Math.random() - 0.5) * intensity * 2; 
      const offsetY = (Math.random() - 0.5) * intensity * 2; 

      document.body.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      document.body.style.transition = "transform 0.05s linear"; 

      shakiness = requestAnimationFrame(shake);
  }

  shakiness = requestAnimationFrame(shake);
  activeAnimations.push(shakiness);
}

function flickeringScreen() {
  function flicker() {
      let flickerChance = Math.random();

      if (flickerChance > 0.9) {
          document.body.style.opacity = "0.7"; 
      } else if (flickerChance > 0.7) {
          document.body.style.opacity = "0.9"; 
      } else {
          document.body.style.opacity = "1"; 
      }

      let randomDelay = Math.random() * 700 + 300;
      setTimeout(flicker, randomDelay);
  }

  flicker();
}

function floatImages() {
    const images = document.querySelectorAll("img");
 
    images.forEach((img) => {
        img.style.position = "absolute";
        img.style.zIndex = "1000"; 
        img.style.transition = "transform 1s linear";  

        let posX = Math.random() * window.innerWidth;  
        let posY = Math.random() * window.innerHeight;
        let speedX = (Math.random() - 0.5) * 5; 
        let speedY = (Math.random() - 0.5) * 5;

        function moveImage() {
            posX += speedX;
            posY += speedY;

            if (posX < 0 || posX > window.innerWidth - img.width) speedX *= -1;
            if (posY < 0 || posY > window.innerHeight - img.height) speedY *= -1;

            img.style.transform = `translate(${posX}px, ${posY}px)`;

            requestAnimationFrame(moveImage);
        }

        moveImage();
    });
}

function customiseCursor() {
    const meowmeow = "data:image/png;base64,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"; 
    document.body.style.cursor = `url(${meowmeow}) 16 16, auto`;
}
customiseCursor();


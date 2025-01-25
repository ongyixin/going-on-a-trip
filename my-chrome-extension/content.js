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
  resetEFfects();

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
    const meowmeow = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAvVBMVEVHcExNV/+DPv9HWv84X/85Xv+dM/+euv99Qv+FPf+GPf88Xf9SVP9GW/+JPP+XN/8jaP+cM/9QVf+TN/85X/+EPv+pLv+UOP80Yf8rZf9cT/+IPP/Wr/8wYf+5J/9jTP+YNv+wK/+yKv+wK/+tuf+MOv+cvv+Jwf8+Xf8tZf9vSP/Isv+4uP9gTf/QsP+NwP91xf+Wvf/Qrf+Iwf+/Jv/FI/+aNf95Q/+IPv9CXP8yYv+ROv+yK/9iTf+nuv/v5nb5AAAANHRSTlMA/Msm+61YBw54OHteF00g/dHYk9vxeWaXaLbeU4e6m/fh+6JnqiaDPVTj2hTMsrZC6TDTDXsUJAAAAhNJREFUeNrt1smWojAYhuEPEBJGFQVny3keq7sZRL3/y+oQrKrWgxatm1rwrEjy5z1Zglwu98C8WpIlPK9RijXwLIldNuulUgdPkg91APPDod7p6I25RPB/zEPBBNM4XBSqsj4jX+e6LM/wQKMggzM6ut6py9UCJ895g+h8JeEesx6GOq5JRr0ahmFVp5DYh2zIoYw75gIboGlh3Y4TQmjPADMUKNJQWRCaEu6YNQVBSOq2kDpl2oJg4AHD1sE1U+ckW7AlZPKWFjDt09pExsBJxS26Pq0pMgcM3GqeFiZeCKj+QkJmTd/CF625WLz5bCs70dfwyfA5ER8IvuX8E9B8Xy1qY9+vgKMtx0IaqoqOqNLLC1pFJIgYqGAUJ0gKVhCMkUJqBTFH4TExECku8y2y+zXZTrUgKVHR0WCp0FSCBFHjT3bFYi/lU0khOa9EKtrLyWYEJYooLsrR2IlUTUGsFrEZK2rR1Q6ELWpgiq2okox62mhLJrt4sIIPVs/jimAUz6uh4rmYnif7ac3rabzQ83ip5xVHy9X+PMKVoquo5bJ7ySnA2FPIe5ts2ixVRtLtxX3PIwBZntt4bOgp2z2ZTgFSLl+2eKl/jDOrd3yjcnTb7dH5PMEn2j8qQHegIAtl0AVWyw252usD7rGLLOiAPfUWe0J8YCGL4XGIW2685/5+RR9A988LuvmfSC6Xy/0kfwGLk01j+3WP8wAAAABJRU5ErkJggg==";
    const style = document.createElement("style");
    style.textContent = `
        * { cursor: url(${meowmeow}) 16 16, auto !important; }
        button, a, input, textarea, select {
            cursor: url(${meowmeow}) 16 16, auto !important;
        }
    `;
    document.head.appendChild(style);
}
customiseCursor();


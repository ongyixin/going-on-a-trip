const soundUrls = [
  "https://www.myinstants.com/media/sounds/bruh.mp3",
  "https://www.myinstants.com/media/sounds/wilhelm-scream.mp3",
  "https://www.myinstants.com/media/sounds/sad-trombone.mp3",
  "https://www.myinstants.com/media/sounds/airhorn.mp3",
  "https://www.myinstants.com/media/sounds/oof.mp3",
  "https://www.myinstants.com/media/sounds/rimshot.mp3",
  "https://www.myinstants.com/media/sounds/fart.mp3",
  "https://www.myinstants.com/media/sounds/emotional-damage.mp3",
  "https://www.myinstants.com/media/sounds/metal-pipe-falling-sound.mp3",
  "https://www.myinstants.com/media/sounds/what-da-dog-doin.mp3",
];

const emojis = ["🌈", "🌟", "✨", "🎉", "💥", "🌀"];

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("message received", message);
  if (message.action === "start") {
    console.log(`Starting ${message.funLevel} trip `);
    sendResponse({ message: "service worker processed the message" });
    start(message.funLevel);
  }
  return true;
});

async function start(funLevel) {
  createEffectsLayer(); 
  setInterval(randomiseCharacters, 3000);

  if (["Business", "First-Class"].includes(funLevel)) {
    playRandomSound(funLevel);
    spawnEmojis(emojis);
    flickeringScreen();
  }

  if (funLevel === "Business") {
    shakyScreen(2);
  } else if (funLevel === "First-Class") {
    shakyScreen(10);
    movingEmojis(emojis);
    floatImages();
    zoom();
    explode();
  }
}

function createEffectsLayer() {
  let effectsLayer = document.getElementById("effects-layer");
  if (!effectsLayer) {
    effectsLayer = document.createElement("div");
    effectsLayer.id = "effects-layer";
    effectsLayer.style.position = "fixed";
    effectsLayer.style.top = "0";
    effectsLayer.style.left = "0";
    effectsLayer.style.width = "100vw";
    effectsLayer.style.height = "100vh";
    effectsLayer.style.pointerEvents = "none";
    effectsLayer.style.zIndex = "9999";
    document.body.appendChild(effectsLayer);
  }
  return effectsLayer;
}

function randomiseCharacters() {
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode: (node) =>
        node.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT,
    },
    false
  );

  while (walker.nextNode()) {
    const node = walker.currentNode;
    node.nodeValue = shuffleWords(node.nodeValue);
  }
}

function shuffleWords(text) {
  return text.replace(/\b(\w{4,})\b/g, (match) => jumbleWord(match));
}

function jumbleWord(word) {
  if (word.length <= 3) return word;
  const middle = word.slice(1, -1).split("");
  for (let i = middle.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [middle[i], middle[j]] = [middle[j], middle[i]];
  }
  return word[0] + middle.join("") + word[word.length - 1];
}

function playRandomSound(funLevel) {
  setInterval(() => {
    const audio = new Audio();
    audio.src = soundUrls[Math.floor(Math.random() * soundUrls.length)];
    audio.play();
  }, funLevel === "Business" ? 7000 : 3000);
}

function spawnEmojis(emojis) {
  let effectsLayer = createEffectsLayer();
  setInterval(() => {
    const emoji = document.createElement("div");
    emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    emoji.style.position = "absolute";
    emoji.style.fontSize = `${Math.random() * 50 + 20}px`;
    emoji.style.left = `${Math.random() * window.innerWidth}px`;
    emoji.style.top = `${Math.random() * window.innerHeight}px`;
    emoji.style.animation = "float 3s infinite alternate";
    effectsLayer.appendChild(emoji);

    setTimeout(() => emoji.remove(), 5000);
  }, 500);
}

function movingEmojis(emojis) {
  let effectsLayer = createEffectsLayer();
  setInterval(() => {
    const emoji = document.createElement("div");
    emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    emoji.style.position = "absolute";
    emoji.style.fontSize = `${Math.random() * 50 + 20}px`;
    let posX = Math.random() * window.innerWidth;
    let posY = Math.random() * window.innerHeight;
    emoji.style.left = `${posX}px`;
    emoji.style.top = `${posY}px`;
    effectsLayer.appendChild(emoji);

    function moveEmoji() {
      posX += (Math.random() - 0.5) * 10;
      posY += (Math.random() - 0.5) * 10;
      emoji.style.transform = `translate(${posX}px, ${posY}px)`;
      requestAnimationFrame(moveEmoji);
    }
    moveEmoji();

    setTimeout(() => emoji.remove(), 5000);
  }, 500);
}

function floatImages() {
  let effectsLayer = createEffectsLayer();
  document.querySelectorAll("img").forEach((img) => {
    let clone = img.cloneNode(true);
    clone.style.position = "absolute";
    clone.style.opacity = "0.7";
    let posX = Math.random() * window.innerWidth;
    let posY = Math.random() * window.innerHeight;
    clone.style.left = `${posX}px`;
    clone.style.top = `${posY}px`;
    effectsLayer.appendChild(clone);

    function moveImage() {
      posX += (Math.random() - 0.5) * 10;
      posY += (Math.random() - 0.5) * 10;
      clone.style.transform = `translate(${posX}px, ${posY}px)`;
      requestAnimationFrame(moveImage);
    }
    moveImage();

    setTimeout(() => clone.remove(), 5000);
  });
}

function zoom() {
  let zoomLevel = 1;
  setInterval(() => {
    zoomLevel = Math.random() * 0.3 + 0.8;
    document.body.style.transform = `scale(${zoomLevel})`;
    document.body.style.transition = "transform 1s ease-in-out";
  }, 5000);
}

function explode() {
  let effectsLayer = createEffectsLayer();
  function createExplosion() {
    const explosion = document.createElement("div");
    explosion.classList.add("explosion");
    explosion.style.position = "absolute";
    explosion.style.width = "100px";
    explosion.style.height = "100px";
    explosion.style.background = "radial-gradient(circle, red, orange, yellow, transparent)";
    explosion.style.left = `${Math.random() * window.innerWidth}px`;
    explosion.style.top = `${Math.random() * window.innerHeight}px`;
    explosion.style.animation = "explosion 2s ease-out";
    effectsLayer.appendChild(explosion);
    setTimeout(() => explosion.remove(), 2000);
  }
  setInterval(createExplosion, 3000);
}

function shakyScreen(intensity = 5) {
  let effectsLayer = createEffectsLayer();
  function shake() {
    const offsetX = (Math.random() - 0.5) * intensity * 2;
    const offsetY = (Math.random() - 0.5) * intensity * 2;
    effectsLayer.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    requestAnimationFrame(shake);
  }
  shake();
}

function flickeringScreen() {
  let effectsLayer = createEffectsLayer();
  function flicker() {
    effectsLayer.style.opacity = Math.random() > 0.5 ? "0.9" : "1";
    setTimeout(flicker, Math.random() * 700 + 300);
  }
  flicker();
}

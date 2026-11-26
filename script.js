
// =====================================
// LOADING SCREEN
// =====================================

window.addEventListener("load", () => {
    setTimeout(() => {
        document.getElementById("loadingScreen").classList.add("hidden");
    }, 1800);
});


// =====================================
// FLOATING HEARTS BACKGROUND
// =====================================

const heartContainer = document.getElementById("floatingHearts");

function createFloatingHeart() {
    const heart = document.createElement("div");
    heart.classList.add("floating-heart");

    const hearts = ["💜", "♡", "💕", "✨", "🌸"];

    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = Math.random() * 100 + "%";
    heart.style.fontSize = (Math.random() * 18 + 12) + "px";
    heart.style.animationDuration = (Math.random() * 6 + 6) + "s";

    heartContainer.appendChild(heart);

    setTimeout(() => heart.remove(), 12000);
}

setInterval(createFloatingHeart, 700);


// =====================================
// PHOTO PREVIEW
// =====================================

function previewPhoto(event, imageId) {
    const file = event.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
        alert("Please select an image file.");
        return;
    }

    const image = document.getElementById(imageId);
    const card = image.closest(".photo-card");

    image.src = URL.createObjectURL(file);
    card.classList.add("has-photo");
}


// =====================================
// YES AND NO BUTTON BEHAVIOR
// =====================================

let noCount = 0;

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const buttonArea = document.getElementById("buttonArea");
const hint = document.getElementById("hint");

const messages = [
    "Are you sure? 🥺",
    "Think about it again! 💜",
    "But I prepared all of this for you! 😭",
    "You're making YES bigger! 😂",
    "Babyyyyy, pleaseee! 💜",
    "Look how big YES is getting!",
    "I'm still hoping for a YES! ♡",
    "One more chance? 🥹",
    "YES is getting bigger and bigger!",
    "Okay, I think you know what to click now! 💗"
];

// Keep both buttons beside each other.
buttonArea.style.display = "flex";
buttonArea.style.alignItems = "center";
buttonArea.style.justifyContent = "center";
buttonArea.style.width = "100%";
buttonArea.style.gap = "12px";
buttonArea.style.overflow = "hidden";

yesBtn.style.flex = "1 1 50%";
noBtn.style.flex = "1 1 50%";

yesBtn.style.minWidth = "0";
noBtn.style.minWidth = "0";

yesBtn.style.boxSizing = "border-box";
noBtn.style.boxSizing = "border-box";

yesBtn.style.whiteSpace = "nowrap";
noBtn.style.whiteSpace = "nowrap";

yesBtn.style.transition =
    "flex-grow 0.5s ease, flex-basis 0.5s ease, font-size 0.5s ease";

noBtn.style.transition =
    "flex-grow 0.5s ease, flex-basis 0.5s ease, font-size 0.5s ease, opacity 0.4s ease, transform 0.4s ease";

function noClicked() {
    noCount++;

    // YES gets a bigger share of the available space.
    const yesShare = Math.min(50 + noCount * 4.5, 100);
    const noShare = 100 - yesShare;

    yesBtn.style.flex = `0 0 ${yesShare}%`;
    noBtn.style.flex = `0 0 ${noShare}%`;

    // YES text grows gradually.
    yesBtn.style.fontSize = `${Math.min(16 + noCount * 0.7, 24)}px`;

    // NO text becomes smaller gradually.
    noBtn.style.fontSize = `${Math.max(16 - noCount * 1.1, 5)}px`;

    // Keep the message inside the question card.
    if (noCount <= messages.length) {
        hint.textContent = messages[noCount - 1];
    } else {
        hint.textContent = "There's only one choice left! 💜";
    }

    createHeartExplosion();

    buttonArea.classList.remove("shake");
    void buttonArea.offsetWidth;
    buttonArea.classList.add("shake");

    // NO pops out when it becomes too small.
    if (noShare <= 8) {
        noBtn.style.transform = "scale(0)";
        noBtn.style.opacity = "0";
        noBtn.style.pointerEvents = "none";

        setTimeout(() => {
            noBtn.style.display = "none";
            yesBtn.style.flex = "1 1 100%";
            yesBtn.style.maxWidth = "100%";
            hint.textContent = "YAY! I knew you'd choose YES! 💜";
        }, 450);
    }
}


// =====================================
// HEART EXPLOSION
// =====================================

function createHeartExplosion() {
    const finalSection = document.getElementById("final");
    const hearts = ["💜", "💕", "💗", "♡", "✨", "🌸"];

    for (let i = 0; i < 12; i++) {
        const particle = document.createElement("div");

        particle.classList.add("heart-particle");
        particle.textContent = hearts[Math.floor(Math.random() * hearts.length)];

        const x = (Math.random() - 0.5) * 400;
        const y = (Math.random() - 0.5) * 400;

        particle.style.setProperty("--x", `${x}px`);
        particle.style.setProperty("--y", `${y}px`);

        particle.style.left = "50%";
        particle.style.top = "50%";

        finalSection.appendChild(particle);

        setTimeout(() => particle.remove(), 1200);
    }
}


// =====================================
// YES BUTTON
// =====================================

function sayYes() {
    buttonArea.style.display = "none";
    hint.style.display = "none";

    const successMessage = document.getElementById("successMessage");

    successMessage.style.display = "block";

    successMessage.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

    for (let i = 0; i < 35; i++) {
        setTimeout(createCelebrationHeart, i * 80);
    }
}


// =====================================
// FINAL CELEBRATION
// =====================================

function createCelebrationHeart() {
    const finalSection = document.getElementById("final");
    const heart = document.createElement("div");

    heart.classList.add("celebration-heart");

    const hearts = ["💜", "💕", "💗", "🌸", "✨", "♡"];

    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = Math.random() * 100 + "%";
    heart.style.animationDuration = (Math.random() * 3 + 3) + "s";

    finalSection.appendChild(heart);

    setTimeout(() => heart.remove(), 6000);
}

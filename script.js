const noTexts = [
    "are you sure?",
    "really sure?",
    "bby please...",
    "pleaaase baby",
    "if you say no again, i'll be really sad :(",
    "i might even cry...",
    'say yes already :" !!!',
    "fine im gonna have to do this myself..."
];

let noIndex = 0;
let yesScale = 1;

const yesBtn = document.getElementById("yes-button");
const noBtn = document.getElementById("no-button");
const buttonsContainer = document.querySelector(".buttons");

// Base sizes
const basePaddingY = 18;
const basePaddingX = 40;
const baseFontSize = 22;

const GAP = 40;

// Can YES grow without overflowing the buttons container?
function canGrowMore() {
    const yesRect = yesBtn.getBoundingClientRect();
    const noRect = noBtn.getBoundingClientRect();

    const maxAllowedWidth =
        buttonsContainer.clientWidth -
        noRect.width -
        GAP;

    return yesRect.width < maxAllowedWidth;
}

noBtn.addEventListener("click", () => {
    // Show current NO text
    noBtn.textContent = noTexts[noIndex];
    noIndex++;

    // Grow YES exponentially (layout-safe)
    if (canGrowMore()) {
        yesScale *= 1.35;

        yesBtn.style.padding = `
            ${basePaddingY * yesScale}px
            ${basePaddingX * yesScale}px
        `;
        yesBtn.style.fontSize = `${baseFontSize * yesScale}px`;
    }

    // AFTER last message has been shown → fullscreen
    if (noIndex >= noTexts.length) {
        setTimeout(() => {
            yesBtn.classList.add("fullscreen");
            noBtn.style.display = "none";
            yesBtn.textContent = "YES ❤️";
        }, 650);
    }
});

yesBtn.addEventListener("click", () => {
    window.location.href = "yes.html";
});

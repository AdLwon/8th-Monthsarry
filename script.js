
const envelope = document.getElementById("envelope");
const openButton = document.getElementById("open-letter");
const letter = document.getElementById("love-letter");
const continueButton = document.getElementById("continue-btn");

const intro = document.getElementById("intro");
const question = document.getElementById("question");
const memories = document.getElementById("memories");

const yesButton = document.getElementById("yes-btn");
const noButton = document.getElementById("no-btn");
const answerArea = document.querySelector(".answer-area");
const reaction = document.getElementById("reaction");

// OPEN THE ENVELOPE
openButton.addEventListener("click", function() {
  envelope.classList.add("opened");

  openButton.disabled = true;
  openButton.textContent = "Opened with love 🩵";

  setTimeout(function() {
    letter.classList.add("show");

    letter.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  }, 700);
});

// GO TO THE QUESTION
continueButton.addEventListener("click", function() {
  intro.classList.add("hidden");
  question.classList.remove("hidden");
});

// MAKE NO ESCAPE
function moveNoButton() {
  const area = answerArea.getBoundingClientRect();
  const yes = yesButton.getBoundingClientRect();
  const noWidth = noButton.offsetWidth;
  const noHeight = noButton.offsetHeight;
  const padding = 8;
  const safeDistance = 35;
  
  const maxX = answerArea.clientWidth - noWidth - padding;
  const maxY = answerArea.clientHeight - noHeight - padding;
  
  const oldX = noButton.offsetLeft;
  const oldY = noButton.offsetTop;
  
  let x, y;
  let attempts = 0;
  
  do {
    x = padding + Math.random() * Math.max(0, maxX - padding);
    y = padding + Math.random() * Math.max(0, maxY - padding);
    attempts++;
  } while (
    attempts < 100 &&
    (
      Math.hypot(x - oldX, y - oldY) < 100 ||
      (
        x < yes.right - area.left + safeDistance &&
        x + noWidth > yes.left - area.left - safeDistance &&
        y < yes.bottom - area.top + safeDistance &&
        y + noHeight > yes.top - area.top - safeDistance
      )
    )
  );
  
  noButton.style.left = x + "px";
  noButton.style.top = y + "px";
  reaction.textContent = "HEHE, TOO SLOW! 😭💗";
}

// Works with phone taps and mouse clicks
noButton.addEventListener("pointerdown", function(event) {
  event.preventDefault();
  moveNoButton();
});

// YES WINS
yesButton.addEventListener("click", function() {
  question.classList.add("hidden");
  memories.classList.remove("hidden");

  memories.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
});
// GO FROM MEMORIES TO THE FINAL LETTER
const finalLetter = document.getElementById("final-letter");
const letterText = `My dearest Honey, 🩵

Happy 8th monthsary, Guppy.

Usahay, maka huna-huna lang ko nga unsa ko ka swerte kay akoy na pilian nimo. Out of all the people I could have met, somehow, I met you. And honestly? That's one of the things I'm most grateful for.

You make ordinary days feel special. Even the smallest conversations with you can become moments I find myself smiling about later.

Our kulitan, random topics kiligan, and even the "in heat" conversations was a precious moments that is important for me.

I may not always find the perfect words to explain how much you mean to me, but I hope I can keep showing you through the little things I do, the time I give you, and the love I choose to give you every day.

Even though nga lagyo kaayo ta and we can't really have our own time together in real life, it doesn't make what I feel for you any less real.

Thank you for being part of my life, Guppy. Thank you for the memories we've made and the ones we are about to make.

If I could choose again, knowing everything I know now, I'd still want to meet you. I'd still want to know you. And I'd still want to see where our story takes us.

I don't need us to be perfect. I just want us to keep learning, growing, laughing, and choosing each other, one day at a time.

Happy 8th Monthsary, my favorite person. Here's to more little moments, more memories, and more reasons to smile because of our achievements.

I love you, Honey. More than this little love letter could ever hold. ♡`;
// DISPLAY THE LETTER
// TYPEWRITER ANIMATION
// TYPEWRITER ANIMATION
const typedLetter = document.getElementById("typed-letter");
let letterIndex = 0;

function typeLetter() {
  if (letterIndex < letterText.length) {
    typedLetter.textContent += letterText.charAt(letterIndex);
    letterIndex++;
    setTimeout(typeLetter, 70);
  }
}
// GO TO THE FINAL LETTER AND START TYPING
document.getElementById("memories-next").addEventListener("click", function() {
  memories.classList.add("hidden");
  finalLetter.classList.remove("hidden");
  
  finalLetter.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
  
  typedLetter.textContent = "";
  letterIndex = 0;
  typeLetter();
});
window.onload = function () {
  setTimeout(hidePreloader, 4500);
};

const preloader = document.querySelector(".preloader");
function hidePreloader() {
  preloader.classList.add("hidden");
  setTimeout(() => {
    preloader.style.display = "none";
  }, 1000);
}

let closePreload = document.querySelector(".preloader button");

closePreload.addEventListener("click", (event) => {
  event.preventDefault();
  preloader.style.display = "none";
});

setTimeout(() => {
  document.querySelector(".preloader p").textContent = "İyi Eğlenceler";
}, 3000);

//Developer Settings
let developerClose = document.querySelector(".developer svg");
let developerText = document.querySelector(".developer span");
let developer = document.querySelector(".developer");
let developerOpen = document.querySelector(".developerOpen");

developerClose.addEventListener("click", () => {
  developer.classList.add("hidden");
});
developerOpen.addEventListener("click", () => {
  developer.classList.remove("hidden");
});

// 4 basamaklı sayıyı rastgele oluşturma
let randomNumber = generateNumber();
developerText.textContent = `Tahmin Edilecek Sayı : ${randomNumber}`;

function generateNumber() {
  return Math.floor(Math.random() * 9000) + 1000;
}

function newNumber() {
  randomNumber = generateNumber();
  document.getElementById("result").innerHTML =
    "Yeni sayı oluşturuldu. Tahmininizi girin.";
  console.log(randomNumber);
  developerText.textContent = `Tahmin Edilecek Sayı : ${randomNumber}`;
}
console.log(randomNumber);

function checkGuess() {
  // Tahmininizi alın
  let guess = document.getElementById("guess").value;

  // Tahmininizi doğrulayın
  if (guess.length !== 4 || isNaN(guess)) {
    document.getElementById("result").innerHTML =
      "Lütfen 4 basamaklı bir sayı girin.";
    return;
  }

  // Tahmininizin sonucunu hesaplayın
  let correct = 0;
  let misplaced = 0;
  for (let i = 0; i < 4; i++) {
    if (guess[i] === randomNumber.toString()[i]) {
      correct++;
    } else if (randomNumber.toString().indexOf(guess[i]) !== -1) {
      misplaced++;
    }
  }

  // Tahmininizin sonucunu gösterin
  var audio = new Audio('winning.wav');
  if (correct === 4) {
    document.getElementById("result").innerHTML =
      "Tebrikler, doğru tahmin ettiniz!";
        audio.play();
  } else {
    // let message = "Tahmininiz " + guess + " yanlış. ";
    let message = "";
    if (correct > 0) {
      message += "+" + correct + " doğru sayı var. ";
    } else {
      message += 0 + " doğru sayı var. ";
    }
    if (misplaced > 0) {
      message += "-" + misplaced + " yanlış yerde sayı var. ";
    } else {
      message += 0 + " yanlış yerde sayı var. ";
    }
    document.getElementById("result").innerHTML = message;
  }
}

function createConfetti() {}

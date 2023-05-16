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
}, 2900);

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
let randomNumber = getRandomUniqueNumber(4);
developerText.textContent = `Tahmin Edilecek Sayı : ${randomNumber}`;

function getRandomUniqueNumber(digits) {
  let randomNumber = "";
  let availableDigits = "0123456789";
  // ilk basamağı 1-9 arasında seç
  const randomIndex = Math.floor(Math.random() * 9) + 1;
  randomNumber += availableDigits[randomIndex];
  availableDigits =
    availableDigits.slice(0, randomIndex) +
    availableDigits.slice(randomIndex + 1);
  // kalan basamakları rastgele seç
  for (let i = 1; i < digits; i++) {
    const randomIndex = Math.floor(Math.random() * availableDigits.length);
    randomNumber += availableDigits[randomIndex];
    availableDigits =
      availableDigits.slice(0, randomIndex) +
      availableDigits.slice(randomIndex + 1);
  }
  return randomNumber;
}

function hasDuplicates(str) {
  return /([0-9]).*?\1/.test(str);
}

function newNumber() {
  let newRandomNumber = getRandomUniqueNumber(4);
  while (hasDuplicates(newRandomNumber) || newRandomNumber[0] === "0") {
    newRandomNumber = getRandomUniqueNumber(4);
  }
  randomNumber = newRandomNumber;
  document.getElementById("result").innerHTML =
    "Yeni sayı oluşturuldu. Tahmininizi girin.";
  console.log(randomNumber);
  developerText.textContent = `Tahmin Edilecek Sayı : ${randomNumber}`;
  logList.innerHTML = "";
  document.getElementById("guess").value = "";
  document.getElementById("guess").disabled = false;
  document.getElementById("check").disabled = false;
}

//Enter tuşu ile etkileşim alın
document.getElementById("guess").addEventListener("keypress", function (event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    checkGuess();
  }
});

if (
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
) {
  var input = document.getElementById("guess");
  input.type = "number"; // sayısal klavyenin açılması için input tipini 'number' olarak ayarlayın
}

function checkGuess() {
  // Tahmininizi alın
  let guess = document.getElementById("guess").value;

  //ilk basamak kontrolü
  if (guess[0] === "0") {
    document.getElementById("result").innerHTML =
      "Lütfen ilk basamakta sıfır olmayan bir sayı girin.";
    document.getElementById("guess").value = "";
    return;
  }

  // Tahmininizi doğrulayın
  if (guess.length !== 4 || isNaN(guess)) {
    document.getElementById("result").innerHTML =
      "Lütfen 4 basamaklı bir sayı girin.";
    document.getElementById("guess").value = "";
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
  var audio = new Audio("winning.wav");
  if (correct === 4) {
    document.getElementById("result").innerHTML =
      "Tebrikler, doğru tahmin ettiniz!";
    document.getElementById("guess").value = "";
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
    document.getElementById("guess").value = "";
  }
  function compareGuess() {
    //Bulunan tahminin rakamlarının aynı olmasını engelle
    // Kontrol edilecek rakamlar
    let uniqueDigits = new Set(guess);

    // Rakamların birbirine eşit olmamasını kontrol edin
    if (uniqueDigits.size !== 4) {
      document.getElementById("result").innerHTML =
        "Lütfen rakamlar birbirinden farklı 4 basamaklı bir sayı girin.";
      document.getElementById("guess").value = "";
      return;
    }

    //Aynı tahmini engelle
    const previousGuesses = Array.from(
      document.querySelectorAll("#logList li")
    ).map((item) => item.innerText.split(" : ")[0]);
    if (previousGuesses.includes(guess)) {
      document.getElementById("result").innerHTML =
        "Bu tahmini daha önce yaptınız. Lütfen farklı bir tahmin girin.";
      document.getElementById("guess").value = "";
      return;
    }

    // Log the guess
    const logListItem = document.createElement("li");
    let logMessage = guess + " : ";
    if (guess === randomNumber.toString()) {
      logMessage +=
        " +" +
        correct +
        " Doğru Tahmin! - Yeni Sayı isteyerek yeni oyuna geçebilirsiniz !";
      document.getElementById("guess").disabled = true;
      document.getElementById("check").disabled = true;
    } else {
      if (correct > 0) {
        logMessage += " +" + correct;
      } else {
        logMessage += " " + 0 + " ";
      }
      if (misplaced > 0) {
        logMessage += " -" + misplaced;
      } else {
        logMessage += " " + 0 + " ";
      }
    }
    logListItem.innerText = logMessage;
    logList.appendChild(logListItem);
  }
  compareGuess();
}

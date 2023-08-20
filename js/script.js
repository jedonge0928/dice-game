const players = document.querySelectorAll(".player");
const scores = document.querySelectorAll(".score");
const currentScores = document.querySelectorAll(".current-score");
const diceImage = document.querySelector(".dice");
const newGameButton = document.querySelector(".btn--new");
const rollButton = document.querySelector(".btn--roll");
const holdButton = document.querySelector(".btn--hold");

let activePlayer = 0;
let currentScore = 0;
let scoresArray = [0, 0];
let isGameActive = true;

function switchPlayer() {
  // 현재 턴의 점수를 0으로 초기화
  currentScore = 0;
  // 현재 턴 플레이어의 현재 점수를 화면에 표시
  currentScores[activePlayer].textContent = currentScore;
  // 현재 턴 플레이어의 클래스에서 'player--active' 클래스를 제거
  players[activePlayer].classList.remove("player--active");
  // 플레이어 번호를 전환(0에서 1로, 1에서 0으로 전환)
  activePlayer = 1 - activePlayer;
  // 다음 턴 플레이어의 클래스에 'player--active' 클래스를 추가.
  players[activePlayer].classList.add("player--active");
}

function rollDice() {
  // 게임이 종료된 경우 함수 실행을 종료
  if (!isGameActive) return;

  // 주사위 값을 1부터 6까지 랜덤하게 생성
  const diceValue = Math.floor(Math.random() * 6) + 1;

  // 생성된 주사위 값에 해당하는 이미지를 표시
  diceImage.src = `./img/dice-${diceValue}.png`;

  // 주사위 값이 1인 경우
  if (diceValue === 1) {
    // 다음 플레이어로 턴을 전환
    switchPlayer();
  } else {
    // 주사위 값이 1이 아니면 현재 플레이어의 현재 점수에 주사위 값을 추가하고 화면에 업데이트
    currentScore += diceValue;
    currentScores[activePlayer].textContent = currentScore;
  }
}

function hold() {
  // 게임이 종료된 경우 함수 실행을 종료
  if (!isGameActive) return;

  // 현재 플레이어의 현재 점수를 누적 점수에 추가하고 화면에 업데이트
  scoresArray[activePlayer] += currentScore;
  scores[activePlayer].textContent = scoresArray[activePlayer];

  // 현재 플레이어의 현재 점수를 0으로 초기화하고 화면에 업데이트
  currentScore = 0;
  currentScores[activePlayer].textContent = currentScore;

  // 현재 플레이어의 누적 점수가 50 이상인 경우
  if (scoresArray[activePlayer] >= 50) {
    // 게임을 종료하고 승리 메시지를 표시
    isGameActive = false;
    document.getElementById(`name--${activePlayer}`).textContent = `Player ${
      activePlayer + 1
    } wins!`;
    diceImage.style.display = "none";
    rollButton.disabled = true;
    holdButton.disabled = true;
  } else {
    // 현재 플레이어를 전환
    switchPlayer();
  }
}

// 'Roll Dice' 버튼에 'rollDice' 함수를 클릭 이벤트 리스너로 등록
rollButton.addEventListener("click", rollDice);

// 'Hold' 버튼에 'hold' 함수를 클릭 이벤트 리스너로 등록
holdButton.addEventListener("click", hold);

// 'New game' 버튼에 익명 함수를 클릭 이벤트 리스너로 등록
newGameButton.addEventListener("click", function () {
  // 게임을 활성화하고 초기 상태로 리셋
  isGameActive = true;
  activePlayer = 0;
  currentScore = 0;
  scoresArray = [0, 0];

  // 모든 플레이어와 점수를 초기화
  players.forEach((player, index) => {
    player.classList.remove("player--active");
    scores[index].textContent = "0";
    currentScores[index].textContent = "0";
    document.getElementById(`name--${index}`).textContent = `Player ${
      index + 1
    }`;
  });

  // 첫 번째 플레이어를 활성화하고 주사위 이미지와 버튼을 초기 상태로 설정
  players[0].classList.add("player--active");
  diceImage.style.display = "block";
  rollButton.disabled = false;
  holdButton.disabled = false;
});

import team from './components/team';
import question from './components/question';
import score from './components/score';

let timer = 5;

const endGame = () => {
  const finalScore = score.get();
  const template = `
    <p>You got ${finalScore} points!</p>
    <div id="leaderboard"></div>
    <p><button onclick="window.location.reload();">Play Again</button></p>
  `;

  document.querySelector(`#facesper`).innerHTML = template;
  
  score.renderLeaderboard();
};

const addBonusTime = () => {
  timer = timer + 2;
};

const updateTimer = () => {
  document.querySelector(`#timer`).innerHTML = timer;

  if (timer > 0) {
    setTimeout(() => {
      timer--;
      updateTimer();
    }, 1000);
  } else {
    endGame();
  }
};

const renderQuestion = () => {
  const person1 = team.random();
  const person2 = team.random();

  const currentQuestion = question(person1, person2);
  currentQuestion.render();
};

const renderGrade = ({ grade, answer }) => {
  const gradeClass = grade ? `grade--success` : `grade--fail`;
  const gradeMessage = grade ? `You're right!` : `Sorry! That was <span class="grade__name">${answer}</span>.`;
  const duration = grade ? 1000 : 2000;
  const gradeEl = document.querySelector(`#grade`);
  const template = `
    <div class="grade ${gradeClass}">
      <p class="grade__message">${gradeMessage}</p>
    </div>
  `;

  gradeEl.innerHTML = template;

  setTimeout(() => {
    gradeEl.innerHTML = ``;
  }, duration);
};

const attachListener = () => {
  document.addEventListener(`facesper:grade`, (e) => {
    score.update(e.detail.grade);
    renderGrade(e.detail);

    if (e.detail.grade) {
      addBonusTime();
    }

    setTimeout(() => {
      renderQuestion();
    }, 100);
  });
};

team.init().then(() => {
  renderQuestion();
  updateTimer();
  attachListener();
});

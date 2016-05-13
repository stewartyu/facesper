import team from './components/team';
import question from './components/question';

let score = 0;
let timer = 30;

const updateScore = (grade) => {
  if (grade) {
    score++;
    timer = timer + 2;
  }

  document.querySelector(`#score`).innerHTML = score;
};

const endGame = () => {
  const template = `
    <p>Awesome! You got ${score} points!</p>
  `;

  document.querySelector(`#facesper`).innerHTML = template;
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
    updateScore(e.detail.grade);
    renderGrade(e.detail);

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

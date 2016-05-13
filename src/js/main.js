import team from './components/team';
import question from './components/question';

let score = 0;

const updateScore = (grade) => {
  if (grade) {
    score++;
  }

  document.querySelector(`#score`).innerHTML = score;
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
  attachListener();
});

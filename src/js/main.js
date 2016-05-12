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

const attachListener = () => {
  document.addEventListener(`facesper:grade`, (e) => {
    updateScore(e.detail.grade);
    renderQuestion();
  });
};

team.init().then(() => {
  renderQuestion();
  attachListener();
});

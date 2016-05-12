import team from './components/team';
import question from './components/question';

const renderQuestion = () => {
  const person1 = team.random();
  const person2 = team.random();

  const currentQuestion = question(person1, person2);
  currentQuestion.render();
};

const attachListener = () => {
  document.addEventListener('facesper:grade', (e) => {
    console.log('facesper:grade', e.detail.grade);

    renderQuestion();
  });
};

team.init().then(() => {
  renderQuestion();
  attachListener();
});

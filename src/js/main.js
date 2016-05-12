import team from './components/team';
import question from './components/question';

const renderQuestion = () => {
  const person1 = team.random();
  const person2 = team.random();

  const currentQuestion = question(person1, person2);
  currentQuestion.render();
};

team.init().then(() => {
  renderQuestion();
});

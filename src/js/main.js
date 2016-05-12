import team from './components/team';
import question from './components/question';

team.list().then((members) => {
  const person1 = team.random(members);
  const person2 = team.random(members);

  const currentQuestion = question(person1, person2);
  currentQuestion.render();
});

import team from './components/team';

team.list().then((members) => {
  const random1 = team.random(members);
  const random2 = team.random(members);

  console.log(random1);
  console.log(random2);
});

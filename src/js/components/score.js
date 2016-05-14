import Firebase from 'firebase';
import _ from 'lodash';

let score = 0;
let leaderboard;
const leaderboardRef = new Firebase(`https://popping-heat-5038.firebaseio.com/scores`);

const renderLeaderboard = () => {
  leaderboardRef.on(`value`, (snapshot) => {
    // convert object to array
    leaderboard = _.transform(snapshot.val(), (result, curScore) => {
      result.push(curScore);
    }, []);
    leaderboard.reverse();

    const template = _.template(`
      <table>
        <% _.forEach(scores, function(score) { %>
        <tr>
          <td><%- score.name %></td>
          <td><%- score.score %></td>
        </tr>
        <% }); %>
      </table>
    `);
    const compiledTemplate = template({ scores: leaderboard });

    document.querySelector(`#leaderboard`).innerHTML = compiledTemplate;
  });
};

const saveScore = ({ name, score }) => {
  const userRef = leaderboardRef.child(name);

  userRef.setWithPriority({ name, score }, score);
};

const update = (grade) => {
  if (grade) {
    score++;
  }
};

const get = () => {
  return score;
};

export default {
  update,
  get,
  saveScore,
  renderLeaderboard,
};

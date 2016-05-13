let score = 0;

const render = () => {
  document.querySelector(`#score`).innerHTML = score;
};

const update = (grade) => {
  if (grade) {
    score++;
  }

  render();
};

const get = () => {
  return score;
};

export default {
  update,
  get,
};

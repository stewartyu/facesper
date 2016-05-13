let score = 0;

const update = (grade) => {
  if (grade) {
    score++;
  }

  document.querySelector(`#score`).innerHTML = score;
};

const get = () => {
  return score;
};

export default {
  update,
  get,
};

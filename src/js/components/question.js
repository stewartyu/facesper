import _ from 'lodash';

export const question = (person1, person2) => {
  const getAnswer = () => {
    return answer;
  };

  const gradeAnswer = (e) => {
    e.preventDefault();

    const buttonValue = e.target.attributes[`data-response`].value === `true`;

    console.log(buttonValue === getAnswer());

    return buttonValue === getAnswer();
  };

  const render = () => {
    const template = `
      <div class="question">
        <p class="question__header">Is this <span class="question__name">${name}</span>?</p>
        <img src="${image}" class="question__image" />
        <button class="question__button js-question__button" data-response="true">Yes</button>
        <button class="question__button js-question__button" data-response="false">No</button>
      </div>
    `;

    document.querySelector(`#facesper`).innerHTML = template;

    const buttons = document.querySelectorAll(`.js-question__button`);

    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener(`click`, gradeAnswer);
    }
  };

  const name = person1.name;
  let image = person1.image;
  let answer = true;

  const random = _.random(0, 1);

  // if 0, the answer will be false and we show the wrong picture
  if (random === 0) {
    image = person2.image;
    answer = false;
  }

  return {
    getAnswer,
    render,
  };
};

export default question;

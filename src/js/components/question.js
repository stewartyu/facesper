import _ from 'lodash';

export const question = (person1, person2) => {
  const name = person1.name;
  let image = person1.image;
  let answer = person1.name;

  const random = _.random(0, 1);

  // if 0, the answer will be false and we show the wrong picture
  if (random === 0) {
    image = person2.image;
    answer = person2.name;
  }

  const dispatchAnswer = (grade, answer) => {
    const event = new CustomEvent(`facesper:grade`, {
      detail: {
        grade,
        answer,
      },
    });

    document.dispatchEvent(event);
  };

  const gradeAnswer = (value) => {
    const buttonValue = value === `true`;
    const grade = buttonValue === (name === answer);

    dispatchAnswer(grade, answer);

    return grade;
  };

  const attachButtonListeners = () => {
    const buttons = document.querySelectorAll(`.js-question__button`);

    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener(`click`, (e) => {
        e.preventDefault();

        gradeAnswer(e.target.attributes[`data-response`].value);
      });
    }
  };

  const render = () => {
    const template = `
      <div class="question">
        <p class="question__header">Is this <span class="question__name">${name}</span>?</p>
        <img src="${image}" class="question__image" />
        <div class="question__button-container">
          <button class="question__button js-question__button" data-response="true">Yes</button>
          <button class="question__button js-question__button" data-response="false">No</button>
        </div>
      </div>
    `;

    document.querySelector(`#facesper`).innerHTML = template;

    attachButtonListeners();
  };

  return {
    render,
  };
};

export default question;

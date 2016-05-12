import 'whatwg-fetch';
import _ from 'lodash';

let members;

const hasDefaultProfilePhoto = (member) => {
  if (!member.profile.image_512) {
    return false;
  }

  return /avatars%2Fava/.test(member.profile.image_512);
};

export const init = () => {
  return fetch(`/team`).then((response) => {
    return response.json();
  }).then((json) => {
    members = _.filter(json.members, (member) => {
      return (`profile` in member) && !member.deleted && !member.is_bot && !hasDefaultProfilePhoto(member);
    });
  });
};

export const random = () => {
  const random = members[_.random(0, members.length)];

  return {
    name: random.profile.real_name_normalized,
    image: random.profile.image_original || random.profile.image_512,
  };
};

export default {
  init,
  random,
};

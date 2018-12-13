import { homeConstants } from '../_constants';

export const homeActions = {
  active,
  inactive,
};

function active(message) {
  return { type: homeConstants.ACTIVE, message };
}

function inactive(message) {
  return { type: homeConstants.INACTIVE, message };
}

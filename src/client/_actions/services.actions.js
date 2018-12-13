import { servicesConstants } from '../_constants';

export const servicesActions = {
  send,
};

function send(message) {
  return { type: servicesConstants.SERVICES, message };
}

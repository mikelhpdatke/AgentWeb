import { dialogsConstants } from '../_constants';

export function dialogs(
  state = { type: dialogsConstants.DIALOGS, message: false },
  action
) {
  switch (action.type) {
    case dialogsConstants.DIALOGS:
      return {
        type: dialogsConstants.DIALOGS,
        message: action.message,
      };
    default:
      return state;
  }
}

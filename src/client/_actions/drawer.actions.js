import { drawerConstants } from "../_constants";
export const drawerActions = {
  opened,
  closed
}

function opened(message) {
  return {type:drawerConstants.OPENED, message}
}

function closed(message) {
  return {type:drawerConstants.CLOSED, message}
}
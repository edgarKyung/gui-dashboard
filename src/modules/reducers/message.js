import { createAction, handleActions } from 'redux-actions';
import { Record, fromJS } from 'immutable';

const ADD_MESSAGE_BOX = 'messageBox/ADD_MESSAGE_BOX';
const REMOVE_MESSAGE_BOX = 'messageBox/REMOVE_MESSAGE_BOX';
const ALL_CLEAR_MESSAGE_BOXES = 'messageBox/ALL_CLEAR_MESSAGE_BOXES';

export const addMessage = createAction(ADD_MESSAGE_BOX);
export const removeMessageBox = createAction(REMOVE_MESSAGE_BOX);
export const clearMessageBoxes = createAction(ALL_CLEAR_MESSAGE_BOXES);

const initialState = {
  messageBoxes: [],
};
const initialRecord = Record(initialState)();

export default handleActions({
  [ADD_MESSAGE_BOX]: (state, { payload }) => {
    const messageBoxes = state.get('messageBoxes');
    messageBoxes.push({
      id: new Date().toLocaleTimeString(),
      ...payload
    })
    return state.set('messageBoxes', messageBoxes);
  },

  [REMOVE_MESSAGE_BOX]: (state, action) => {
    const messageBoxes = state.get('messageBoxes');
    return state.set('messageBoxes', messageBoxes.filter(messageBox => messageBox.id !== action.payload));
  },

  [ALL_CLEAR_MESSAGE_BOXES]: (state, { payload: { excepts = [] } }) => {
    const messageBoxes = state.get('messageBoxes').filter(a => excepts.includes(a.id));
    return state.set('messageBoxes', messageBoxes);
  },

}, initialRecord);

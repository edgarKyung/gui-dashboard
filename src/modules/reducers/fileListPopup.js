import { createAction, handleActions } from 'redux-actions';
import { Record, Map } from 'immutable';
export const SHOW_POPUP = 'SHOW/POPUP';

export const showPopup = createAction(SHOW_POPUP);

const initialState = {
  fileListPopup: {},
  show: false,
  title: 'title',
  type: 'save',
  items: [],
  onClickOk: () => { },
  onClickCancel: () => { },
  onClickClose: () => { },
};
const initialRecord = Record(initialState)();

export default handleActions({
  [SHOW_POPUP]: (state, { payload }) => {
    console.log('asd', payload);
    return state.set('fileListPopup', payload)
  },
  // [SHOW_POPUP]: (state, { payload }) => {
  //     console.log('asd', payload);
  //     return state.set('show', true)
  //     .set('title', payload.title)
  //     .set('type', payload.type)
  //     .set('items', payload.items)
  //     .set('onClickOk', payload.onClickOk)
  //     .set('onClickCancel', payload.onClickCancel)
  //     .set('onClickClose', payload.onClickClose);
  // },
}, initialRecord);
import React, { Component } from 'react';
import { useSelector } from 'react-redux'
import { useActions } from '../services/hooks'

import * as messageBoxActions from '../modules/reducers/message';


import { MessageBoxWrapper } from '../components/organisms';

const MessageBoxWrapperContainer = () => {
  const MessageBoxActions = useActions(messageBoxActions);
  const { messageBoxes } = useSelector((store) => ({
    messageBoxes:store.message.get('messageBoxes')
  }));

  const handleClickButton = (msg, event) => {
    if (msg[event] && typeof msg[event] === 'function') msg[event]();
    MessageBoxActions.removeMessageBox(msg.id);
  };

  const messageBoxList = messageBoxes.map(messageBox => ({
    ...messageBox,
    onClickOkButton: () => handleClickButton(messageBox, 'onClickOkButton'),
    onClickYesButton: () => handleClickButton(messageBox, 'onClickYesButton'),
    onClickNoButton: () => handleClickButton(messageBox, 'onClickNoButton'),
    onClickCloseButton: () => handleClickButton(messageBox, 'onClickCloseButton'),
    onClickCancelButton: () => handleClickButton(messageBox, 'onClickCancelButton'),
    onClickStopButton: () => handleClickButton(messageBox, 'onClickStopButton'),
    onClickApplyButton: () => handleClickButton(messageBox, 'onClickApplyButton'),
    onClickRetryButton: () => handleClickButton(messageBox, 'onClickRetryButton'),
  }));

  return <>
    { messageBoxList.length > 0 && <MessageBoxWrapper messageBoxes={messageBoxList} /> }
  </>;

};

export default MessageBoxWrapperContainer;


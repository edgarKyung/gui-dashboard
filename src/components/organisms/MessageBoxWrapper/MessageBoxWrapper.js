import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { MessageBox } from '../../atoms';
import styles from './MessageBoxWrapper.scss';
const cx = classNames.bind(styles);

const MessageBoxWrapper = ({ messageBoxes }) => {
  const messageBoxList = messageBoxes.map((messageBox, idx) => (
    <MessageBox
      key={idx}
      {...messageBox}
    />
  ));

  return (
    <div className={cx('modal-wrapper')}>
      <div className={cx('modal-list-wrapper')}>
        {messageBoxList}
      </div>
    </div>
  );
};

MessageBoxWrapper.propTypes = {
  messageBoxes: PropTypes.array,
};

MessageBoxWrapper.defaultProps = {
  messageBoxes: [],
};

export default MessageBoxWrapper;

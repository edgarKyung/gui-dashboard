import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Button, Input } from '../../atoms';
import styles from './MessagePopupTemplate.module.scss';
const cx = classNames.bind(styles);

const MessagePopupTemplate = ({
  title,
  children,
  onClickOk,
  onClickCancel,
  onClickClose,
}) => {

  return (
    <div className={cx('modal-wrapper')}>
      <div className={cx('modal-list-wrapper')}>
        <div className={cx('content-box-wrapper')} >
          <div className={cx('title')}>
            {title}
            <span onClick={onClickClose}>X</span>
          </div>
          <div className={cx('content')}>
            {children}
          </div>
          <div className={cx('btn-wrapper')}>
            <Button
              type={'primary'}
              className={cx('btn')}
              onClick={onClickOk}
            >
              확인
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

MessagePopupTemplate.propTypes = {
  onClickItem: PropTypes.func,
};

MessagePopupTemplate.defaultProps = {
  items: [],
  onClickItem: () => { },
  onClickOk: () => { },
  onClickCancel: () => { },
  onClickClose: () => { },
};

export default MessagePopupTemplate;

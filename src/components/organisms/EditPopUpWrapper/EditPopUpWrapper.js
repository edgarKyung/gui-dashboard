import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Button, Input } from '../../atoms';
import styles from './EditPopUpWrapper.module.scss';
const cx = classNames.bind(styles);

const Item = React.memo(({
  data,
  onClickItem,
  activeFile,
}) => {
  const onClick = useCallback(() => {
    onClickItem(data);
  }, [data]);

  return (
    <li className={cx({ active: activeFile === data })} onClick={onClick}>{data}</li>
  );
});

const EditPopUpWrapper = ({
  name,
  onClickOk,
  onClickCancel,
  onClickClose,
  onChangeFileName,
}) => {

  return (
    <div className={cx('modal-wrapper')}>
      <div className={cx('modal-list-wrapper')}>
        <div className={cx('content-box-wrapper')} >
          <div className={cx('title')}>
            이름 변경하기
            <span onClick={onClickClose}>X</span>
          </div>
          <div className={cx('content')}>
            <Input
              type="text"
              name="name"
              value={name}
              onChange={onChangeFileName}
            />
          </div>
          <div className={cx('btn-wrapper')}>
            <Button
              type={'primary'}
              className={cx('btn')}
              onClick={onClickOk}
            >
              확인
            </Button>
            <Button
              className={cx('btn')}
              onClick={onClickCancel}
            >
              취소
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

EditPopUpWrapper.propTypes = {
  onChangeFileName: PropTypes.func,
};

EditPopUpWrapper.defaultProps = {
  name: '',
  onClickOk: () => { },
  onClickCancel: () => { },
  onClickClose: () => { },
  onChangeFileName: () => { },
};

export default EditPopUpWrapper;

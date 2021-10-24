import React, {useCallback, useState} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Button, Input } from '../../atoms';
import styles from './FileListPopupWrapper.module.scss';
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

const FileListPopupWrapper = ({ 
  items,
  onClickItem,
  activeFile,
  onClickOk,
  onClickCancel,
  onClickClose,
}) => {

  return (
    <div className={cx('modal-wrapper')}>
      <div className={cx('modal-list-wrapper')}>
        <div className={cx('content-box-wrapper')} >
          <div className={cx('title')}>
            불러오기
            <span onClick={onClickClose}>X</span>
          </div>
          <div className={cx('content')}>
            <ul>
              {
                items.map((item, index) => (
                  <Item activeFile={activeFile} key={index} data={item} onClickItem={onClickItem}/>
                ))
              }
            </ul>
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

FileListPopupWrapper.propTypes = {
  onClickItem: PropTypes.func,
};

FileListPopupWrapper.defaultProps = {
  items: [],
  onClickItem: () => {},
  onClickOk: () => {},
  onClickCancel: () => {},
  onClickClose: () => {},
};

export default FileListPopupWrapper;

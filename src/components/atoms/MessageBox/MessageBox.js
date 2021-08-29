import React, { Component } from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import styles from './MessageBox.scss';
import { Button } from '../../atoms';

const cx = classNames.bind(styles);

class MessageBox extends Component {
  shouldComponentUpdate(next) {
    const prev = this.props;
    if (prev.children.props && next.children.props) {
      if (prev.children.props.id !== next.children.props.id) return true;
      if (prev.children.props.value !== next.children.props.value) return true;
    }
    return prev.id !== next.id
      || prev.disabledOk !== next.disabledOk
      || prev.disabledCancel !== next.disabledCancel
      || prev.disabledYes !== next.disabledYes
      || prev.disabledNo !== next.disabledNo
      || prev.disabledRetry !== next.disabledRetry
      || prev.disabledStop !== next.disabledStop
      || prev.disabledApply !== next.disabledApply
      || prev.mitigation !== next.mitigation
      || prev.isCloseButton !== next.isCloseButton
      || JSON.stringify(prev.buttonType) !== JSON.stringify(next.buttonType);
  }

  render() {
    const {
      id,
      title,
      titleClassName,
      contentClassName,
      buttonType,
      children,
      mitigation,
      disabledOk,
      disabledCancel,
      disabledYes,
      disabledNo,
      onClickOkButton,
      onClickCancelButton,
      onClickYesButton,
      onClickNoButton,
      onClickCloseButton,
    } = this.props;

    const buttons = buttonType.map((btnType) => {
      let btnClass = 'default';
      let func;
      let btnDisabled;
      switch (btnType) {
        case 'OK':
          btnClass = 'primary';
          func = onClickOkButton;
          btnDisabled = disabledOk;
          break;
        case 'CANCEL':
          func = onClickCancelButton;
          btnDisabled = disabledCancel;
          break;
        case 'YES':
          btnClass = 'primary';
          func = onClickYesButton;
          btnDisabled = disabledYes;
          break;
        case 'NO':
          func = onClickNoButton;
          btnDisabled = disabledNo;
          break;
        default:
      }
      return (
        <Button
          className={cx('btn')}
          onClick={func}
          type={btnClass}
          key={btnType}
          disabled={
            (btnDisabled)
            || (id === 'collisionError' && mitigation)
          }
        >
          {btnType}
        </Button>
      );
    });

    return (
      <div className={cx('msg-box-wrapper')} id={`modal-${id}`} >
        <div className={cx('title', titleClassName)}> {title}</div>
        <div className={cx('content', contentClassName)}>{children}</div>
        <div className={cx('btn-wrapper', { hide: buttonType.length === 0 })}>
          {buttons}
        </div>
      </div>
    );
  }
}

MessageBox.propTypes = {
  mitigation: PropTypes.bool,
  hotKey: PropTypes.bool,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  type: PropTypes.string,
  className: PropTypes.string,
  titleClassName: PropTypes.string,
  contentClassName: PropTypes.string,
  title: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.array]),
  buttonType: PropTypes.array,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.array,
    PropTypes.func,
  ]),
  isCloseButton: PropTypes.bool,
  isHideIcon: PropTypes.bool,
  isShowCurrentTime: PropTypes.bool,
  forceUpdate: PropTypes.bool,
  disabledOk: PropTypes.bool,
  disabledCancel: PropTypes.bool,
  disabledYes: PropTypes.bool,
  disabledNo: PropTypes.bool,
  disabledRetry: PropTypes.bool,
  disabledStop: PropTypes.bool,
  disabledApply: PropTypes.bool,
  onClickOkButton: PropTypes.func,
  onClickCancelButton: PropTypes.func,
  onClickYesButton: PropTypes.func,
  onClickNoButton: PropTypes.func,
  onClickRetryButton: PropTypes.func,
  onClickCloseButton: PropTypes.func,
  onClickStopButton: PropTypes.func,
  onClickApplyButton: PropTypes.func,
};

MessageBox.defaultProps = {
  type: 'info',
  title: '알림',
  className: '',
  titleClassName: '',
  contentClassName: '',
  buttonType: ['OK'],
  children: null,
  isCloseButton: true,
  isHideIcon: false,
  isShowCurrentTime: true,
  forceUpdate: false,
  onClickOkButton: () => { console.log('onClickOkButton is not defined'); },
  onClickCancelButton: () => { console.log('onClickCancelButton is not defined'); },
  onClickYesButton: () => { console.log('onClickYesButton is not defined'); },
  onClickNoButton: () => { console.log('onClickNoButton is not defined'); },
  onClickCloseButton: () => { console.log('onClickCloseButton is not defined'); },
};

export default MessageBox;

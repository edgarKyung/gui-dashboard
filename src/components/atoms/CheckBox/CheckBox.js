import React from 'react';
import classNames from 'classnames/bind';
import styles from './CheckBox.module.scss';

const cx = classNames.bind(styles);

const CheckBox = ({
  id,
  className,
  icoClassName,
  icoCheckedClassName,
  icoDisabledClassName,
  checked,
  disabled,
  hidden,
  value,
  dataset,
  onChange,
  children,
  onClick,
  onClickDisabled,
  ...rest
}) => {
  const onClickHandler = () => {
    if (disabled && onClickDisabled) {
      return onClickDisabled;
    } else if (disabled) {
      return (() => { });
    }
    return onClick;
  }

  return (
    <label
      htmlFor={id}
      className={cx(
        'checkbox-wrapper',
        className,
        { hidden },
      )}
    >
      <input
        id={id}
        type="checkbox"
        className={cx('hide-input')}
        checked={checked}
        disabled={disabled}
        value={value}
        onChange={onChange}
        {...rest}
      />
      <i
        className={cx('ico-checkbox', icoClassName, {
          checked: checked && !icoCheckedClassName,
          disabled: disabled && !icoDisabledClassName,
          [icoCheckedClassName]: checked,
          [icoDisabledClassName]: disabled,
        })}
        {...dataset}
        onClick={onClickHandler}
      />
      {children}
    </label>
  )
}


export default CheckBox;

import React, { PureComponent } from 'react';
import classNames from 'classnames/bind';
import styles from './HeaderMenu.scss';

const cx = classNames.bind(styles);

class HeaderMenu extends PureComponent {
  render() {
    return (
      <ul className={cx('header-wrap')} >
        <li>menu1</li>
        <li>menu2</li>
        <li>menu3</li>
      </ul>
    );
  }
}

export default HeaderMenu;

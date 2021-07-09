import React, { PureComponent } from 'react';
import { Link } from "react-router-dom";
import classNames from 'classnames/bind';
import styles from './HeaderMenu.scss';

const cx = classNames.bind(styles);

class HeaderMenu extends PureComponent {
  render() {
    return (
      <ul className={cx('header-wrap')} >
        <li>
          <Link to="/">Map</Link>
        </li>
        <li>
          <Link to="/point">Point</Link>
        </li>
        <li>
          <Link to="/polygon">Polygon</Link>
        </li>
      </ul>
    );
  }
}

export default HeaderMenu;

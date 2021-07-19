import React, { PureComponent } from 'react';
import { Link } from "react-router-dom";
import classNames from 'classnames/bind';
import styles from './AsideMenu.module.scss';
import menus from '../../../static/constants/menus';
const cx = classNames.bind(styles);

class AsideMenu extends PureComponent {
  render() {
    return (
      <div className={cx('aside-wrap')}>
        <div className={cx('logo')}>
        <Link to='/'><img src='/images/layout/aside/logo.png' /></Link>
        </div>
        <ul className={cx('menu-list')} >
          {
            menus.map(map=>(
              <li>
                <Link to={map.link}>
                  <img src={`/images/layout/aside/btn_${map.id}.png`} />
                </Link>
              </li>
            ))
          }
        </ul>
        <div className={cx('info-wrap')}>
          <ul>
            <li>
              <img src='/images/layout/aside/icon_calendar.png' />
              2021.07.01
            </li>
            <li>
              <img src='/images/layout/aside/icon_time.png' />
              오후 2:00
            </li>
          </ul>

        </div>
      </div>
    );
  }
}

export default AsideMenu;
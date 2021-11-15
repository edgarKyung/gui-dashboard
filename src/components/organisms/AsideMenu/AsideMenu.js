import React, { PureComponent } from 'react';
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import classNames from 'classnames/bind';
import styles from './AsideMenu.module.scss';
import menus from '../../../static/constants/menus';
import { Button, Icon } from '../../atoms';
const cx = classNames.bind(styles);

const AsideMenu = ({ location }) => {
  return (
    <div className={cx('aside-wrap')}>
      <div className={cx('logo-wrap')}>
        <Link to='/'>
          <Button type='logo' className={cx('logo')} />
        </Link>
      </div>
      <ul className={cx('menu-list')} >
        {
          Object.entries(menus).map(([id, data]) => {
            return (
              <li key={id}>
                <Link to={data.link}>
                  <Button type={data.id} className={cx('menu-btn')} active={location.pathname === data.link}></Button>
                </Link>
              </li>)
          })
        }
      </ul>
      <div className={cx('info-wrap')}>
        <ul>
          <li>
            <Icon type='calendar' className={cx('icon')} />
            2021.07.01
          </li>
          <li>
            <Icon type='time' className={cx('icon')} />
            오후 2:00
          </li>
        </ul>

      </div>
    </div>
  );
}

export default React.memo(withRouter(AsideMenu));
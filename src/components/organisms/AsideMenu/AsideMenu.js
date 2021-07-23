import React, { PureComponent } from 'react';
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import classNames from 'classnames/bind';
import styles from './AsideMenu.module.scss';
import menus from '../../../static/constants/menus';
import { Button, Icon } from '../../atoms';
const cx = classNames.bind(styles);

class AsideMenu extends PureComponent {
  render() {
    return (
      <div className={cx('aside-wrap')}>
        <div className={cx('logo')}>
          <Link to='/operation'>
            <Button type='logo'/>
          </Link>
        </div>
        <ul className={cx('menu-list')} >
          {
            Object.entries(menus).map(([id, data])=>{
              const { to, location } = this.props;
              return (
              <li key={id}>
                <Link to={data.link}>
                  <Button type={data.id} className={cx(location.pathname === data.link && 'on')}></Button>
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
}

export default withRouter(AsideMenu);
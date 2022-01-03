import React, { PureComponent } from 'react';
import { Link } from "react-router-dom";
import classNames from 'classnames/bind';
import styles from './AsideMenu.module.scss';
import { Button, Icon, Timer } from '../../atoms';
const cx = classNames.bind(styles);

const AsideMenu = ({
  floorList,
  activeFloor,
  onClickBtn,
}) => {
  console.log(  floorList, activeFloor);
  return (
    <div className={cx('aside-wrap')}>
      <div className={cx('logo-wrap')}>
        <Button type='logo' className={cx('logo')} />
      </div>
      <ul className={cx('menu-list')} >
        {
          floorList.map((floor, index) => {
            console.log('floor', floor);
            return (
              <li key={index} 
                className={cx({active: activeFloor === index})}
                data-index={index}
                onClick={onClickBtn}
              >
                {floor.name}
              </li>)
          })
        }
      </ul>
      <div className={cx('info-wrap')}>
        <Timer />
      </div>
    </div>
  );
}

export default React.memo(AsideMenu);
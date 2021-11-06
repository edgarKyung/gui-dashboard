import React from 'react';
import 'rc-slider/assets/index.css';
import classNames from 'classnames/bind';
import { PageTemplate } from '../../templates';
import styles from './SettingPage.module.scss';
import { Input, Slider } from '../../atoms';
import { MainContentTemplate } from '../../templates';
const cx = classNames.bind(styles);

const SettingPage = () => {
  const handleChangeSlider = (data) => {
    console.log(data);
  };

  return(
  <PageTemplate>
    <MainContentTemplate title={'설정'} classNames={cx('page-wrap')}>
      <div className={cx('content-wrap')}>
        <ul className={cx('list-wrap')}>
          <li>
            <div>최고 속도</div>
            <div>
              <Slider min={0} max={20} onChange={handleChangeSlider}/>
            </div>
            <div><Input /> mm/s</div>
          </li>
          <li>
          </li>
        </ul>
      </div>
    </MainContentTemplate>
  </PageTemplate>
  );
}

export default SettingPage;
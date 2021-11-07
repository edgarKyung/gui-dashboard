import React from 'react';
import 'rc-slider/assets/index.css';
import classNames from 'classnames/bind';
import { PageTemplate } from '../../templates';
import styles from './SettingPage.module.scss';
import { Input, Slider, Button } from '../../atoms';
import { MainContentTemplate } from '../../templates';
import { RobotStatusBarContainer } from '../../../containers';
const cx = classNames.bind(styles);

const SettingPage = ({
  sliderList
}) => {
  return (
  <PageTemplate>
    <MainContentTemplate title={'설정'} classNames={cx('page-wrap')}>
      <div className={cx('content-wrap')}>
        <ul className={cx('list-wrap')}>
          { sliderList.map(data => (
          <li>
            <div className={cx('title')}>{data.title}</div>
            <div className={cx('slider')}>
              <Slider min={data.min} max={data.max} onChange={data.onChangeSlider}/>
            </div>
            <div className={cx('input')}><Input value={data.value}/> {data.unit}</div>
          </li>
          ))}
          <li>
            <div className={cx('title')}>맵 파일 선택</div>
            <div>
              <Input className={cx('input-file')}/>
            </div>
            <div>
              <Button type="search"/>
            </div>
          </li>
        </ul>
        <ul className={cx('btn-wrap')}>
          <li>
            <Button type="import"/>
            <div>Import</div>
          </li>
          <li>
            <Button type="export"/>
            <div>Export</div>
          </li>
        </ul>
      </div>
      <div className={cx('status-wrap')}>
        <RobotStatusBarContainer className={cx('status-bar')}/>
      </div>
    </MainContentTemplate>
  </PageTemplate>
  );
}

export default SettingPage;
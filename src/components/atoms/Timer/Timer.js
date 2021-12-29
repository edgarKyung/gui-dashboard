import React, { useState } from 'react';
import Icon from '../Icon';
import { useInterval } from '../../../services/hooks';
import classNames from 'classnames/bind';
import styles from './Timer.module.scss';
const cx = classNames.bind(styles);

const TimerComponent = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  useInterval(async () => {
    const date = new Date().getTime();

    const parse = new Date(date).toLocaleString();
    const splitData = parse.split('. ');
    setTime(splitData.pop());
    setDate(splitData.join('.'));
  }, 1000);

  return (
    <ul className={cx('timer-wrap')}>
      <li>
        <Icon type='calendar' className={cx('icon')} />
        {date}
      </li>
      <li>
        <Icon type='time' className={cx('icon')} />
        {time}
      </li>
    </ul>
  )

};


export default React.memo(TimerComponent);
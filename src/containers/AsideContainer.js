import React, { useState } from 'react';
import { useInterval } from '../services/hooks';
import * as RobotApi from '../lib/Robot';
import { AsideMenu } from '../components/organisms';

const AsideContainer = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  useInterval(async () => {
    const data = await RobotApi.date();
    const parse = new Date(data.date).toLocaleString();
    const splitData = parse.split('. ');
    setTime(splitData.pop());
    setDate(splitData.join('.'));
  }, 1000);

  return (
    <>
      <AsideMenu
        date={date}
        time={time}
      />
    </>
  )
}


export default AsideContainer;
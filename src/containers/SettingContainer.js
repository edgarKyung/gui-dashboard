import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { SettingPage } from '../components/pages';

const SettingContainer = () => {
  const dispatch = useDispatch();
  const [speedLimit, setSpeedLimit] = useState(0);
  const [acc, setAcc] = useState(0);
  const [dec, setDec] = useState(0);
  const [obstacle, setObstacle] = useState(0);

  const sliderList = [
    {
      title: '최고 속도',
      min: 0,
      max: 100,
      unit: 'mm/s',
      value: speedLimit,
      onChangeSlider: (data) => {
        setSpeedLimit(data);
      }
    },
    {
      title: '가속도',
      min: 0,
      max: 100,
      unit: 'mm/s2',
      value: acc,
      onChangeSlider: (data) => {
        setAcc(data);
      }
    },
    {
      title: '감속도',
      min: 0,
      max: 100,
      unit: 'mm/s2',
      value: dec,
      onChangeSlider: (data) => {
        setDec(data);
      }
    },
    {
      title: '장애물 인식거리',
      min: 0,
      max: 100,
      unit: 'mm/s',
      value: obstacle,
      onChangeSlider: (data) => {
        setObstacle(data);
      }
    },
  ];


  return (
    <>
      <SettingPage
        sliderList={sliderList}
      />
    </>
  )
}


export default React.memo(SettingContainer);
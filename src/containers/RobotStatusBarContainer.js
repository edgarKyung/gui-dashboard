import React, { Component } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { RobotStatusBar, BatteryInfo } from '../components/organisms';
import { Icon } from '../components/atoms';
import { addMessage } from '../modules/reducers/message';

const RobotStatusBarContainer = ({ children }) => {
  const dispatch = useDispatch();
  const {
    battery,
  } = useSelector((store) => ({
    battery: store.monitoringData.get('battery'),
  }));
  const handleClickBattery = async () => {
    console.log('onClick Battery');
    dispatch(addMessage({
      title: '베터리 정보',
      children : BatteryInfo({battery}),
      buttonType: ['OK']
    }));
    
  };

  return (
    <>
      <RobotStatusBar 
        status='로딩중' 
        battery={battery} 
        onClickBattery={handleClickBattery}
      />
    </>
  )
}


export default RobotStatusBarContainer;
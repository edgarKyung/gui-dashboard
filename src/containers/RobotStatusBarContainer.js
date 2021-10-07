import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { RobotStatusBar, BatteryInfo, CompanyInfo } from '../components/organisms';
import * as RobotApi from '../lib/Robot';
import { addMessage } from '../modules/reducers/message';

const RobotStatusBarContainer = () => {
  const dispatch = useDispatch();
  const {
    battery,
  } = useSelector((store) => ({
    battery: store.monitoringData.get('battery').toJS(),
  }));
  const handleClickBattery = () => {
    dispatch(addMessage({
      title: '베터리 정보',
      children : BatteryInfo({battery}),
      buttonType: ['OK']
    }));
    
  };

  const handleClickInfo = async () => {
    const info = await RobotApi.info();
    dispatch(addMessage({
      title: info.title,
      children : CompanyInfo({info}),
      buttonType: ['OK']
    }));
  };

  return (
    <>
      <RobotStatusBar 
        status='로딩중' 
        battery={battery} 
        onClickInfo={handleClickInfo}
        onClickBattery={handleClickBattery}
      />
    </>
  )
}


export default RobotStatusBarContainer;
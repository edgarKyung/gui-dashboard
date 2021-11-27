import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { RobotStatusBar, CompanyInfo } from '../components/organisms';
import { BatteryPopupContainer } from '.';

import * as RobotApi from '../lib/Robot';
import { setBatteryPopup } from '../modules/reducers/common';
import { addMessage } from '../modules/reducers/message';

const RobotStatusBarContainer = ({ className }) => {
  const dispatch = useDispatch();
  const {
    battery,
    status,
  } = useSelector((store) => ({
    battery: store.monitoringData.get('battery').toJS(),
    status: store.monitoringData.getIn(['status', 'status']),
  }));
  const handleClickBattery = useCallback(() => {
    dispatch(setBatteryPopup(true));
  }, []);

  const handleClickInfo = useCallback(async () => {
    const info = await RobotApi.info();
    dispatch(addMessage({
      title: info.title,
      children: CompanyInfo({ info }),
      buttonType: ['OK']
    }));
  }, []);

  return (
    <>
      <RobotStatusBar
        className={className}
        status={status}
        battery={battery}
        onClickInfo={handleClickInfo}
        onClickBattery={handleClickBattery}
      />
    </>
  )
}


export default React.memo(RobotStatusBarContainer);
import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { BatteryInfo } from '../components/organisms';
import { MessagePopupTemplate } from '../components/templates';
import { setBatteryPopup } from '../modules/reducers/common';

const BatteryPopupContainer = () => {
  const dispatch = useDispatch();
  const {
    batteryPopup,
    battery,
  } = useSelector((store) => ({
    batteryPopup: store.common.getIn(['ui', 'batteryPopup']),
    battery: store.monitoringData.get('battery').toJS(),
  }));

  const handleClickClose = () => {
    dispatch(setBatteryPopup(false));
  };

  return (
    <>
      {batteryPopup && (
        < MessagePopupTemplate
          title={'베터리 정보'}
          onClickCancel={handleClickClose}
          onClickOk={handleClickClose}
          onClickClose={handleClickClose}
        >
          <BatteryInfo
            chargeTime={battery.chargeTime}
            current={battery.current}
            dischargeTime={battery.dischargeTime}
            percent={battery.percent}
            temperature={battery.temperature}
            voltage={battery.voltage}
          />
        </MessagePopupTemplate>
      )}
    </>
  )
}


export default React.memo(BatteryPopupContainer);
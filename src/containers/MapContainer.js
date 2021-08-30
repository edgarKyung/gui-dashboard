import React, { useEffect, useState } from 'react';
import { MapPage } from '../components/pages';
import * as RobotApi from '../lib/Robot';

const MapContainer = () => {
  const [width, setWidth] = useState(1185);
  const [height, setHeight] = useState(1137);
  // const [imgData, setImgData] = useState();
  // const canvas_padding = 10;

  // useEffect(() => {
  //   async function getInitData() {

  //   }
  //   getInitData();
  // }, []);

  // [TODO: 리팩토링]
  // 오퍼레이션 컨테이너와 중복 코드 (조이스틱 컴포넌트화)
  let sendRequestFlag = false;
  let velocity_linear = 0;
  let velocity_angular = 0;

  async function requestMoveControl(ms) {
    setTimeout(async () => {
      try {
        await RobotApi.jog({ linear: velocity_linear, angular: velocity_angular });
      } catch (ex) {
        console.error(ex);
      } finally {
        if (sendRequestFlag === true) {
          requestMoveControl(ms);
        }
      }
    }, ms);
  }

  const handleRobotMoveStart = async (point) => {
    try {
      if (sendRequestFlag === false) {
        sendRequestFlag = true;
        requestMoveControl(30);
      }
      let angle = point.angle.radian - Math.PI / 2;
      angle = angle < 0 ? angle + 2 * Math.PI : angle;
      angle = angle > Math.PI ? angle - 2 * Math.PI : angle;

      velocity_linear = point.distance / 100 * Math.cos(angle);
      velocity_angular = point.distance / 100 * Math.sin(angle);

    } catch (err) {
      console.error(err)
    }
  }

  const handleRobotMoveEnd = async (point) => {
    try {
      velocity_linear = 0;
      velocity_angular = 0;
      sendRequestFlag = false;
      requestMoveControl(100);
    } catch (err) {
      console.error(err)
    }
  }

  const handleClickSave = async () => {
    try {
      await RobotApi.saveMap();
    } catch (err) {
      console.error(err)
    }
  }

  const handleClickLoad = async () => {
    try {
      await RobotApi.loadMap();
    } catch (err) {
      console.error(err)
    }
  }

  const handleClickScan = async () => {
    try {
      await RobotApi.scanMap();
    } catch (err) {
      console.error(err)
    }
  }

  const handleClickEnd = async () => {
    try {
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <MapPage
      width={width}
      height={height}
      onClickSave={handleClickSave}
      onClickLoad={handleClickLoad}
      onClickScan={handleClickScan}
      onClickEnd={handleClickEnd}
      onRobotMoveStart={handleRobotMoveStart}
      onRobotMoveEnd={handleRobotMoveEnd}
    />
  )
}

export default MapContainer;
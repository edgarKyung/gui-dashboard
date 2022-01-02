import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { AsideMenu } from '../components/organisms';
import { setActiveFloor } from '../modules/reducers/floors';

const AsideContainer = () => {
  const dispatch = useDispatch();
  const { 
    floorList,
    activeFloor,
  } = useSelector((store) => ({
    floorList: store.floors.floors,
    activeFloor: store.floors.activeFloor
  }));


  const handleClickBtn = useCallback((data) => {
    const { index } = data.target.dataset;
    console.log('handleClickBtn', index);
    dispatch(setActiveFloor(Number(index)));
  }, []);

  return (
    <>
      <AsideMenu
        floorList={floorList}
        activeFloor={activeFloor}
        onClickBtn={handleClickBtn}
      />
    </>
  )
}


export default AsideContainer;
import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { AsideMenu } from '../components/organisms';
import { setActiveIndex } from '../modules/reducers/images';

const AsideContainer = () => {
  const dispatch = useDispatch();
  const { 
    imageList,
    activeIndex,
  } = useSelector((store) => ({
    imageList: store.images.list,
    activeIndex: store.images.activeIndex
  }));


  const handleClickBtn = useCallback((data) => {
    const { index } = data.target.dataset;
    console.log('handleClickBtn', index);
    dispatch(setActiveIndex(Number(index)));
  }, []);

  return (
    <>
      <AsideMenu
        imageList={imageList}
        activeIndex={activeIndex}
        onClickBtn={handleClickBtn}
      />
    </>
  )
}


export default AsideContainer;
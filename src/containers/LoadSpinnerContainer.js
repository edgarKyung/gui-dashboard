import React, { useCallback, useState } from 'react';
import { useSelector, shallowEqual } from 'react-redux'
import { LoadSpinner } from '../components/organisms';
import { addMessage } from '../modules/reducers/message';

const LoadSpinnerContainer = ({ }) => {
  const { visibleCount } = useSelector((store) => ({ visibleCount: store.common.spinner.get('visibleCount') }), shallowEqual);
  console.log(visibleCount);
  const display = visibleCount > 0;
  return (
    display && <LoadSpinner />
  )
}

export default LoadSpinnerContainer;
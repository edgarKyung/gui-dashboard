import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { RobotList } from '../components/organisms';
import { setRobotActiveIndex } from '../modules/reducers/robots';

const RobotListContainer = ({ children }) => {
  const dispatch = useDispatch();
  const {
    robots,
  } = useSelector((store) => ({
    robots: store.robots.get('robots'),
  }));

  const handleClickRobot = useCallback((index) => {
    console.log(index);
    dispatch(setRobotActiveIndex(index));
  }, []);

  return (
    <RobotList
      robots={robots}
      onClickRobot={handleClickRobot}
    />
  )
}

export default RobotListContainer;
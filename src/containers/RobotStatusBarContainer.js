import React from 'react';
import { useSelector, shallowEqual } from 'react-redux'
import { RobotStatusBar } from '../components/organisms';

const RobotStatusBarContainer = ({ className }) => {
  const {
    robots,
    activeFloor,
    floors,
  } = useSelector((store) => ({
    robots: store.robots.get('robots'),
    activeFloor: store.floors.activeFloor,
    floors: store.floors.floors,
  }), shallowEqual);

  const selectedFloor = floors[activeFloor];
  const robotsFilter = selectedFloor ? robots.filter((robot) => selectedFloor.robots.includes(robot.id)) : [];

  const operation = robotsFilter.filter(robot => robot.condition === 'ONLINE').length;
  const offline = robotsFilter.filter(robot => robot.condition === 'OFFLINE').length;
  const charging = robotsFilter.filter(robot => robot.condition === 'CHARGING').length;

  const utilization = robotsFilter.length ? operation / robotsFilter.length * 100 : 0;
  return (
    <>
      <RobotStatusBar
        className={className}

        utilization={utilization.toFixed(2)}
        operation={operation}
        offline={offline}
        charging={charging}
      />
    </>
  )
}


export default React.memo(RobotStatusBarContainer);
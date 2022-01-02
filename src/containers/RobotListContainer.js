import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { RobotList } from '../components/organisms';
import { setRobotActiveIndex } from '../modules/reducers/robots';
import EditPopUpContainer from './EditPopUpContainer';
import ApolloClient from '../services/dataCollector/apolloClient';
import queryList from '../services/dataCollector/query';

const RobotListContainer = ({ children }) => {
  const dispatch = useDispatch();
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

  const [editPopup, setEditPopup] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState(null);

  const handleClickRobot = useCallback((id) => {
    console.log(id);
    dispatch(setRobotActiveIndex(id));
  }, []);

  const handleClickEdit = useCallback((id, name) => {
    setEditPopup(true);
    setEditId(id);
    setEditName(name);
    console.log(name);
  }, []);

  const handleClickClose = () => {
    setEditPopup(false);
  }

  const handleClickOk = async (editName) => {
    try {
      console.log(editId, editName);
      const client = ApolloClient.getClient();
      const result = await client.mutate({ 
        mutation: queryList['updateName'],
        variables: {
          "updateNameId": editId,
          "name": editName,
        }
      });
      setEditPopup(false);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  return (
    <>
    <RobotList
      robots={robotsFilter}
      onClickRobot={handleClickRobot}
      onClickEdit={handleClickEdit}
    />
    { editPopup && 
      <EditPopUpContainer 
        name={editName}
        onClickOk={handleClickOk}
        onClickCancel={handleClickClose}
        onClickClose={handleClickClose}  
      />
    }
    </>
  )
}

export default RobotListContainer;
import React, { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { DashBoardPage } from '../components/pages';
import ApolloClient from '../services/dataCollector/apolloClient';
import queryList from '../services/dataCollector/query';
import { setFloorList } from '../modules/reducers/floors';

const DashBoardContainer = ({ children }) => {
  console.log(ApolloClient);
  const dispatch = useDispatch();

  useEffect(() => {
    const getImages = async () => {
      const client = ApolloClient.getClient();
      const result = await client.query({ query: queryList['floors'] });
      if (result?.data) {
        const { floors } = result.data;
        console.log('floors', floors);
        dispatch(setFloorList(floors));
      }    
    };
    getImages();
  }, []);


  return (
    <Fragment>
      <DashBoardPage />
    </Fragment>
  )
}

export default DashBoardContainer;
import React, { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { DashBoardPage } from '../components/pages';
import ApolloClient from '../services/dataCollector/apolloClient';
import queryList from '../services/dataCollector/query';
import { setImageList } from '../modules/reducers/images';

const DashBoardContainer = ({ children }) => {
  console.log(ApolloClient);
  const dispatch = useDispatch();

  useEffect(() => {
    const getImages = async () => {
      const result = await ApolloClient.query({ query: queryList['images'] });
      if (result?.data) {
        const { images } = result.data;
        console.log(images);
        dispatch(setImageList(images));
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
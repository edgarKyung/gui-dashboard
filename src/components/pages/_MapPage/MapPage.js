import React from 'react';
import classNames from 'classnames/bind';
import { PageTemplate } from '../../templates';
import styles from './MapPage.scss';
import {MapContainer} from '../../../containers';
const cx = classNames.bind(styles);

const MapPage = () => (
  <PageTemplate>
    <MapContainer />
  </PageTemplate>
);

export default MapPage;
import React, { useEffect, useState, useCallback } from 'react';
import { CanvasMap } from '../components/organisms';


const convertImageData = (data) => {
  const base64String = 'data:image/png;base64,' + new Buffer.from(data).toString("base64");
  return base64String; 
}

const CanvasMapContainer = () => {

  return (<div>asd</div>);
  // return (
  //   <CanvasMap
  //     canvasWidth={1189}
  //     canvasHeight={1017}
  //   />
  // )
}

CanvasMapContainer.defaultProps = {
};

export default React.memo(CanvasMapContainer);

import React, {Fragment} from 'react';

const OperationContainer = ({children}) => {
  console.log(children);
  return (
    <Fragment>
        {children}
    </Fragment>
  )
}

export default OperationContainer;
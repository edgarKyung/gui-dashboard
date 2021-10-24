import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux'
import { SavePopUpWrapper } from '../components/organisms';
import { addMessage } from '../modules/reducers/message';

const SavePopUpContainer = ({
  onClickOk,
  onClickCancel,
  onClickClose,
}) => {
  const dispatch = useDispatch();
  const [fileName, setFileName] = useState('');

  const handleChangeFileName = useCallback((e) => {
    setFileName(e.target.value);
  }, [])
  const handleClickOk = useCallback(() => {
    if(!fileName){
      dispatch(addMessage({
        title: '경고',
        children : '파일명을 입력해주세요',
        buttonType: ['OK']
      }));
    } else {
      onClickOk(fileName);
    }
  }, [fileName]);

  return (
    <SavePopUpWrapper
      fileName={fileName}
      onClickOk={handleClickOk}
      onClickCancel={onClickCancel}
      onClickClose={onClickClose}
      onChangeFileName={handleChangeFileName}
    /> 
)
}

export default SavePopUpContainer;
import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux'
import { EditPopUpWrapper } from '../components/organisms';
import { addMessage } from '../modules/reducers/message';

const EditPopUpContainer = ({
  name,
  onClickOk,
  onClickCancel,
  onClickClose,
}) => {
  const dispatch = useDispatch();
  const [editName, setEditName] = useState(name);

  const handleChangeFileName = useCallback((e) => {
    setEditName(e.target.value);
  }, [])
  const handleClickOk = useCallback(() => {
    const regExp = /^[a-zA-Z0-9_-]*$/;
    const validation = regExp.test(editName);
    if (!editName) {
      dispatch(addMessage({
        title: '경고',
        children: '값을 입력해주세요',
        buttonType: ['OK']
      }));
    } else if (!validation) {
      dispatch(addMessage({
        title: '경고',
        children: '영어와 숫자만 사용해주세요',
        buttonType: ['OK']
      }));
    } else {
      onClickOk(editName);
    }
  }, [editName]);

  return (
    <EditPopUpWrapper
      name={editName}
      onClickOk={handleClickOk}
      onClickCancel={onClickCancel}
      onClickClose={onClickClose}
      onChangeFileName={handleChangeFileName}
    />
  )
}

export default EditPopUpContainer;
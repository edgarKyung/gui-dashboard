import React, { useCallback, useState } from 'react';
import { FileListPopupWrapper } from '../components/organisms';

const FileListPopupContainer = ({
  items,
  onClickOk,
  onClickCancel,
  onClickClose,
}) => {

  const [activeFile, setActiveFile] = useState('');

  const handleClickItem = (item) => {
    setActiveFile(item);
  };

  const handleClickOk = useCallback(() => {
      onClickOk(activeFile);
  }, [activeFile]);

  return (
    <FileListPopupWrapper
      items={items}
      activeFile={activeFile}
      onClickItem={handleClickItem}
      onClickOk={handleClickOk}
      onClickCancel={onClickCancel}
      onClickClose={onClickClose}
    /> 
)
}

export default FileListPopupContainer;
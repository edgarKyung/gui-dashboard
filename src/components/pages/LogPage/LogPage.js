import React from 'react';
import 'rc-slider/assets/index.css';
import classNames from 'classnames/bind';
import { PageTemplate } from '../../templates';
import styles from './LogPage.module.scss';
import { Input, Slider, Button } from '../../atoms';
import { MainContentTemplate } from '../../templates';
import { RobotStatusBarContainer } from '../../../containers';
const cx = classNames.bind(styles);

const Table = ({
  data,
  className
}) => {
  return (
    <div className={cx('table-wrap', className)}>
      <ul className={cx('table-title')}>
        { data.titles.map((title, index) => (
          <li key={`title-${index}`} style={{
            width:data.columnWidth[index]
          }}>
            {title.children}
          </li>
        ))}
      </ul>
      <ul className={cx('table-content')}>
        { data.dataList.length > 0 && data.dataList.map((rowData, rowIndex) => (
            <li key={`content-${rowIndex}`}>
              {data.columns.map((col, index) => (
                <div key={`row-${rowIndex}-${index}`} style={{
                  width:data.columnWidth[index]
                }}>
                  {rowData[col.dataField]}
                </div>
              ))}
            </li>  
        ))}
      </ul>
      <ul className={cx('pagination-wrap')}>
        <li><Button type={'prev'}/></li>
        <li className={cx('page-num')}>1</li>
        <li className={cx('page-num', 'active')}>2</li>
        <li className={cx('page-num')}>3</li>
        <li className={cx('page-num')}>4</li>
        <li className={cx('page-num')}>5</li>
        <li className={cx('page-num')}>6</li>
        <li><Button type={'next'}/></li>
      </ul>
    </div>
  );
};

const LogPage = () => {
  const rowData = {
    id: 1,
    date: '21/11/08',
    level: 'Lv1',
    status: 'Connect',
    service: 'DataServer',
    code: '10202',
    contents: 'This is Contents',
  };
  const dataList = [
    rowData,
    rowData,
    rowData,
    rowData,
  ];

  const tableData = {
    titles: [
      { children: 'No' },
      { children: 'Date' },
      { children: 'Level' },
      { children: 'Status' },
      { children: 'Service Name' },
      { children: 'Code' },
      { children: 'Contents' },
    ],
    dataList,
    columns: [
      { dataField: 'id' },
      { dataField: 'date' },
      { dataField: 'level' },
      { dataField: 'status' },
      { dataField: 'service' },
      { dataField: 'code' },
      { dataField: 'contents' },
    ],
    columnWidth: ['10%', '10%', '10%', '10%', '20%', '10%', '30%'],
  };

  return (
  <PageTemplate>
    <MainContentTemplate title={'로그'} classNames={cx('page-wrap')}>
      <div className={cx('content-wrap')}>
        <div className={cx('search-form-wrap')}>
          <div className={cx('search-form')}>
            <div>검색</div>
            <div className={cx('search-input')}><Input /></div>
            <div><Button type="search"/></div>
          </div>
          <div className={cx('export-btn')}>
            <Button  type="export"/>
            <span>Export</span>
          </div>
        </div>

        <div className={cx('table-form-wrap')}>
          <Table 
            data={tableData}
          />
        </div>

      </div>
      <div className={cx('status-wrap')}>
        <RobotStatusBarContainer className={cx('status-bar')}/>
      </div>
    </MainContentTemplate>
  </PageTemplate>
  );
}

export default LogPage;
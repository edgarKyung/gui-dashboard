import queryList from './query';
import ApolloClient from './apolloClient';
import { setRobotList } from '../../modules/reducers/robots';

class DataCollector {
  constructor() {
    this.init();
    this.prevRobots = '';
  }

  init() {
    this.robotList();
  }

  robotList(){
    const client = ApolloClient.getClient();
    const query = queryList['robots'];
    client.subscribe({ query }).subscribe(({ data }) => {
      const strData = JSON.stringify(data.robots);
      if(this.prevRobots !== strData) { 
        this.store.dispatch(setRobotList(data.robots));
        this.prevRobots = strData;
      }
    }, err => {
      console.log(err);
    });    
  }

  injectStore(store) {
    this.store = store;
    console.log('injectStore', store)
    console.log(this);
  };
}

export default new DataCollector();

import queryList from './query';
import ApolloClient from './apolloClient';
import { setRobotList } from '../../modules/reducers/robots';

class DataCollector {
  constructor() {
    this.init();
  }

  init() {
  }

  robotList(){
    const query = queryList['robots'];
    ApolloClient.subscribe({ query }).subscribe(({ data }) => {
      this.store.dispatch(setRobotList(data.robots));
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

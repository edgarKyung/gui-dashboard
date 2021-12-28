import {
  gql,
} from "@apollo/client";

const queryList = {
  'images': gql`
    query ExampleQuery {
      images
    }
  `,
}

const subscriptionList = {
  'robots': gql`
      subscription Subscription {
          robots {
              name
              id
              ip
              ping
              status {
                  pose {
                      x
                      y
                      degree
                  }
                  schedule {
                      x
                      y
                      degree
                  }
                  battery {
                      voltage
                      current
                      percent
                      chargeTime
                      dischargeTime
                      temperature
                  }
              }
          }
      }    
  `,
}

export default Object.assign(queryList, subscriptionList);
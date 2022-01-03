import {
  gql,
} from "@apollo/client";

const queryList = {
  'images': gql`
    query ExampleQuery {
      images
    }
  `,
  'floors': gql`
    query Query {
      floors {
        id
        name
        src
        image
        robots
      }
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
              condition
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

const mutation = {
  'updateName': gql `
    mutation Mutation($updateNameId: String!, $name: String!) {
      updateName(id: $updateNameId, name: $name) {
        name
        id
      }
    }  
  `,
}

export default Object.assign(queryList, subscriptionList, mutation);
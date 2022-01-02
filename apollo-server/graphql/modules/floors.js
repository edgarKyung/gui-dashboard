const { gql } =  require('apollo-server')
const path = require('path');
const dataSources = require('../dataSources');

module.exports = () => {
    const typeDefs = gql`
    type Floor {
        name: String
        id: String!
        src: String!
        image: JSON
        robots: [String]
    }
    `
    
    const resolvers = {
        Query: {
            floors: (_, __, context) => {
                const floors = dataSources().floors.map(data => {
                    const imageSrc = path.join(__dirname, '../_temp', data.src);
                    const image = dataSources().imageAPI.loadImage(imageSrc);
                    return {
                        ...data,
                        image,
                    }
                });
                return floors;
            //   return datasoruce.floors;
            },
        },
    }
    
    return {
        typeDefs: typeDefs,
        resolvers: resolvers
    }
}
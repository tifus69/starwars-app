const graphQL = require("graphql");
const lodash = require("lodash");
const axios = require("axios");

const { GraphQLString, GraphQLSchema, GraphQLObjectType } = graphQL;

const PeopleType = new GraphQLObjectType({
  name: "People",
  fields: {
    name: { type: GraphQLString }
  }
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    people: {
      type: PeopleType,
      args: { search: { type: GraphQLString } },
      resolve(parentValue, args) {
        return axios
          .get(`https://swapi.co/api/people/?search=${args.search}`)
          .then(response => response.data.results[0]);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});

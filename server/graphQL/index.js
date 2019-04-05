const
  query = require('./query'),
  mutation = require('./mutation'),
  { GraphQLSchema } = require('graphql')

const schema = new GraphQLSchema({
  query,
  mutation
})

module.exports = schema

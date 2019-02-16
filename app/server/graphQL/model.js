const { GraphQLObjectType, GraphQLString, GraphQLBoolean } = require('graphql')

const model = {
  Note: new GraphQLObjectType({
    name: 'Note',
    fields: () => ({
      id: { type: GraphQLString },
      content: { type: GraphQLString },
      user: { type: GraphQLString }
    })
  }),
  Card: new GraphQLObjectType({
    name: 'Card',
    fields: () => ({
      title: { type: GraphQLString },
      href: { type: GraphQLString },
      image: { type: GraphQLString },
      color: { type: GraphQLString },
      internal: { type: GraphQLBoolean },
    })
  })
}

module.exports = model
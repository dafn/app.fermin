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
      background: { type: GraphQLString },
      textColor: { type: GraphQLString },
      image: { type: GraphQLString },
      user: { type: GraphQLString },
      id: { type: GraphQLString }
    })
  })
}

module.exports = model
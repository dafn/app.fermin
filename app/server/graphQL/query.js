const
  { Note, Card } = require('./model'),
  { GraphQLList, GraphQLObjectType, GraphQLString, GraphQLNonNull } = require('graphql'),
  { getNote, listNotes, getCards } = require('../datastore')

const query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    Note: {
      type: Note,
      args: {
        id: { type: GraphQLNonNull(GraphQLString) }
      },
      resolve: async (parent, args) => {
        return await getNote(args.id)
      }
    },
    Notes: {
      type: new GraphQLList(Note),
      resolve: async (parent, args, req) => {
        return await listNotes(req.user)
      }
    },
    Cards: {
      type: new GraphQLList(Card),
      resolve: async (parent, args, req) => {
        return await getCards()
      }
    }
  }
})

module.exports = query

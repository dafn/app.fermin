const
  { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLNonNull } = require('graphql'),
  { addNote, updateNote, deleteNote } = require('../datastore')

const mutation = new GraphQLObjectType({
  name: 'Mutations',
  fields: {
    setNote: {
      type: GraphQLInt,
      args: {
        id: { type: GraphQLString },
        content: { type: GraphQLNonNull(GraphQLString) }
      },
      resolve: async (parent, args, req) => {
        if (args.id)
          return await updateNote(decodeURI(args.id), decodeURI(args.content))
        else
          return await addNote(req.user, decodeURI(args.content))
      }
    },
    deleteNote: {
      type: GraphQLInt,
      args: {
        id: { type: GraphQLNonNull(GraphQLString) }
      },
      resolve: async (parent, args) => {
        return await deleteNote(args.id)
      }
    }
  }
})

module.exports = mutation

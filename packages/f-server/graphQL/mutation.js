const
  { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLNonNull, GraphQLBoolean } = require('graphql'),
  { addNote, updateNote, deleteNote, addCard } = require('../datastore')

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
    },
    addCard: {
      type: GraphQLInt,
      args: {
        title: { type: GraphQLNonNull(GraphQLString) },
        href: { type: GraphQLNonNull(GraphQLString) },
        background: { type: GraphQLNonNull(GraphQLString) },
        textColor: { type: GraphQLNonNull(GraphQLString) },
        image: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args, req) => {
        return await addCard(args.title, args.href, args.background, args.textColor, args.image, req.user)
      }
    }
  }
})

module.exports = mutation

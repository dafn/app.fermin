export default (state, action) => {
  switch (action.type) {
    case 'change':
      return { text: action.payload  };
    case 'reset':
      return { text: ''  };
    default:
      throw new Error();
  }
}

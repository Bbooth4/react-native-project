const initialState = {
  List: []
};

const list = (state=initialState, action) => {
  switch (action.type) {
  case 'TEST_ACTION':
    return action.payload;
  default:
    return state;
  }
};

export default list;

import SharedConstants from 'constants/SharedConstants';

const DEFAULT_COMMUNICATION_STATE = {
  error: false,
};

export const dataRetrievalReducer =
(state = DEFAULT_COMMUNICATION_STATE, action) => {
  switch (action.type) {
    case SharedConstants.DATA_RETRIEVAL_ERROR:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};

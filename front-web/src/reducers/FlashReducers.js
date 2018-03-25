import { FlashConstants } from 'actions/FlashActions';

export const messageSuccessReducer = (state = null, action) => {
  switch (action.type) {
    case FlashConstants.FLASH_SUCCESS:
      return action.message;
    case FlashConstants.FLASH_DISCARD_SUCCESS:
      return null;
    default:
      return state;
  }
};

export const messageErrorReducer = (state = null, action) => {
  switch (action.type) {
    case FlashConstants.FLASH_ERROR:
      return action.message;
    case FlashConstants.FLASH_DISCARD_ERROR:
      return null;
    default:
      return state;
  }
};

import keyMirror from 'keymirror';

export const FlashConstants = keyMirror({
  FLASH_ERROR: null,
  FLASH_SUCCESS: null,
  FLASH_DISCARD_ERROR: null,
  FLASH_DISCARD_SUCCESS: null,
});

export const addFlashMessage = (type, message) => ({
  type,
  message,
});

export const discardMessage = (type) => {
  switch (type) {
    case FlashConstants.FLASH_SUCCESS:
      return {
        type: FlashConstants.FLASH_DISCARD_SUCCESS,
      };
    case FlashConstants.FLASH_ERROR:
      return {
        type: FlashConstants.FLASH_DISCARD_ERROR,
      };
    default:
      return '';
  }
};

import SharedConstants from 'constants/SharedConstants';
import { FlashConstants, addFlashMessage } from './FlashActions';

export const _setCommunicationError = error => ({
  type: SharedConstants.DATA_RETRIEVAL_ERROR,
  error,
});

export const setCommunicationError = error => (dispatch) => {
  dispatch(addFlashMessage(FlashConstants.FLASH_ERROR, error.message || 'Unknown error'));
  dispatch(_setCommunicationError(error));
};

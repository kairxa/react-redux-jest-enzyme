import { normalize, Schema, arrayOf } from 'normalizr';
import { Map as map } from 'immutable';
import { createSelector } from 'reselect';
import { denormalize } from 'denormalizr';
import request from 'superagent';

export const GET_ANNOUNCEMENT_SUCCESS = 'GET_ANNOUNCEMENT_SUCCESS';
export const GET_ANNOUNCEMENT_FAILED = 'GET_ANNOUNCEMENT_FAILED';

const announcementSchema = new Schema('announcements');
const commentSchema = new Schema('comments');
const authorSchema = new Schema('author');
authorSchema.define({});
commentSchema.define({
  author: authorSchema,
});
announcementSchema.define({
  author: authorSchema,
  comments: arrayOf(commentSchema),
});

/**
 * Return dispatch function with specific actions.
 */
export default queryString => async (dispatch) => { // action
  const req = request.get('http://kk.co/announcements');
  req.query({ queryString });
  return req.then((response) => {
    const json = response.body.json;
    const normalized = normalize(json, {
      announcements: arrayOf(announcementSchema),
    });
    dispatch({ type: GET_ANNOUNCEMENT_SUCCESS, payload: map(normalized) });
  }).catch((error) => {
    dispatch({ type: GET_ANNOUNCEMENT_FAILED, errorMessage: error.response.body.message });
  });
};

/**
 * Basic reducer with the following data format:
 * {
 *  type: string,
 *  payload: Immutable{},
 *  errorMessage: string,
 * }
 */
export const getAnnouncementsReducer = (state = {
  type: '',
  payload: map({}),
  errorMessage: '',
}, action) => {
  switch (action.type) {
    case GET_ANNOUNCEMENT_SUCCESS:
      return {
        type: action.type,
        payload: state.payload.mergeDeep(action.payload),
        errorMessage: '',
      };
    case GET_ANNOUNCEMENT_FAILED:
      return {
        type: action.type,
        payload: state.payload,
        errorMessage: action.errorMessage,
      };
    default:
      return state;
  }
};

const getAnnouncementsPayload = state => state.payload;

/**
 * Returned data is expected in this format:
 * {
 *  announcements: announcement[]
 * }
 *
 * So to get the nicely returned array, components using this must
 * refer to announcements explicitly
 * (i.e. getAnnouncementsSelector(state.getAnnouncements).announcements).
 */
export const getAnnouncementsSelector = createSelector(
  [getAnnouncementsPayload],
  (announcementsPayload) => {
    const jsonized = announcementsPayload.toJSON();
    return denormalize(jsonized.result, jsonized.entities, {
      announcements: arrayOf(announcementSchema),
    });
  },
);

/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */

import configureMockStore from 'redux-mock-store';
import nock from 'nock';
import thunk from 'redux-thunk';
import { normalize, Schema, arrayOf } from 'normalizr';
import { Map as map } from 'immutable';

import getAnnouncementsAction, * as announcements from './getAnnouncements';

const mockStore = configureMockStore([thunk]);

// Schema cannot be imported from getAnnouncements.js :(
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

// Mock data for announcement
const mockAnnouncement = {
  announcements: [
    {
      id: 1,
      title: '# Lorem Ipsum Dolor Sit Amet',
      createdAt: '2016-11-27T14:16:00.000Z',
      editedAt: '2016-11-27T14:16:00.000Z',
      author: {
        id: 25,
        name: 'Putra Prawira Tanzil',
        picture: 'http://placehold.it/320x320',
      },
      comments: [
        {
          id: 5,
          title: '# Yet another lorem ipsum',
          createdAt: '2016-11-27T14:16:03.000Z',
          editedAt: '2016-11-27T14:16:05.000Z',
          author: {
            id: 25,
            name: 'Putra Prawira Tanzil',
            picture: 'http://placehold.it/320x320',
          },
        },
      ],
    },
    {
      id: 2,
      title: '# Lorem Ipsum Dolor Sit Amet',
      createdAt: '2016-11-27T14:16:00.000Z',
      editedAt: '2016-11-27T14:16:00.000Z',
      author: {
        id: 25,
        name: 'Putra Prawira Tanzil',
        picture: 'http://placehold.it/320x320',
      },
      comments: [
        {
          id: 5,
          title: '# Yet another lorem ipsum',
          createdAt: '2016-11-27T14:16:03.000Z',
          editedAt: '2016-11-27T14:16:05.000Z',
          author: {
            id: 25,
            name: 'Putra Prawira Tanzil',
            picture: 'http://placehold.it/320x320',
          },
        },
      ],
    },
  ],
};

afterEach(() => {
  nock.cleanAll();
});

// Success test for getAnnouncementsAction a.k.a. default export from getAnnouncements.js
test('should return successful dispatch action', () => {
  const store = mockStore({
    announcements: {
      type: '',
      payload: map({}),
      errorMessage: '',
    },
  });

  // Payload should be a map of normalized announcement data
  const expectedPayload = map(normalize(mockAnnouncement, {
    announcements: arrayOf(announcementSchema),
  }));

  // Mock store actions returns array of dispatched actions.
  // We expect it to be a success action here.
  const expectedAction = [
    { type: announcements.GET_ANNOUNCEMENT_SUCCESS, payload: expectedPayload },
  ];

  nock('http://kk.co')
    .get('/announcements')
    .reply(200, { json: mockAnnouncement });

  return store.dispatch(getAnnouncementsAction()).then(() => {
    expect(store.getActions()).toEqual(expectedAction);
  });
});

// Failed test for getAnnouncementsAction a.k.a. default export from getAnnouncements.js
test('should return failed dispatch action', () => {
  const store = mockStore({
    announcements: {
      type: '',
      payload: map({}),
      errorMessage: '',
    },
  });

  const errorMessage = 'ERROR';

  const expectedAction = [
    { type: announcements.GET_ANNOUNCEMENT_FAILED, errorMessage },
  ];

  nock('http://kk.co')
    .get('/announcements')
    .reply(401, { message: errorMessage });

  return store.dispatch(getAnnouncementsAction())
    .then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
});

// getAnnouncementsReducer with action.type === GET_ANNOUNCEMENT_SUCCESS
test('should properly return success state', () => {
  const state = {
    type: '',
    payload: map({}),
    errorMessage: '',
  };

  const payload = map(normalize(mockAnnouncement, {
    announcements: arrayOf(announcementSchema),
  }));

  const action = {
    type: announcements.GET_ANNOUNCEMENT_SUCCESS,
    payload,
  };

  const expectedAction = Object.assign({}, action, {
    errorMessage: '',
  });

  const result = announcements.getAnnouncementsReducer(state, action);

  expect(result).toEqual(expectedAction);
});

// getAnnouncementsReducer with action.type = GET_ANNOUNCEMENT_FAILED
test('should properly return failed state', () => {
  const state = {
    type: '',
    payload: map({}),
    errorMessage: '',
  };

  const action = {
    type: announcements.GET_ANNOUNCEMENT_FAILED,
    errorMessage: 'ERROR',
  };

  const expectedAction = Object.assign({}, action, {
    payload: map({}),
  });

  const result = announcements.getAnnouncementsReducer(state, action);

  expect(result).toEqual(expectedAction);
});

// getAnnouncementsReducer with action.type !== GET_ANNOUNCEMENT_SUCCESS || GET_ANNOUNCEMENT_FAILED
test('should properly return default state when type is not SUCCESS or FAILED', () => {
  const state = {
    type: '',
    payload: map({}),
    errorMessage: '',
  };

  const action = {
    type: 'GET_ANNOUNCEMENT_FAILED_AND_SUCCESS',
    errorMessage: 'ERROR',
  };

  const result = announcements.getAnnouncementsReducer(undefined, action);

  expect(result).toEqual(state);
});

// Testing that selector returns denormalized data from state.payload
test('should properly get denormalized payload from selector', () => {
  const getAnnouncementsState = {
    type: announcements.GET_ANNOUNCEMENT_SUCCESS,
    payload: map(normalize(mockAnnouncement, {
      announcements: arrayOf(announcementSchema),
    })),
    errorMessage: '',
  };

  // Expect to return NON-immutable JSON data similar to mockAnnouncement
  const denormalized = announcements.getAnnouncementsSelector(getAnnouncementsState);

  expect(denormalized).toEqual(mockAnnouncement);
});

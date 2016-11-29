import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { getAnnouncementsReducer as getAnnouncements } from './getAnnouncements';

export default combineReducers({
  getAnnouncements,
  routing: routerReducer,
});

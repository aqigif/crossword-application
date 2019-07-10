import { combineReducers } from 'redux';
import { createNavigationReducer } from 'react-navigation-redux-helpers';

import RootNavigation from './../../navigations/Router';
import auth from './authReducer';
import crosswords from './crosswords';

const router = createNavigationReducer(RootNavigation);

const appReducer = combineReducers({
  router,
  auth,
  crosswords,
})

export default appReducer
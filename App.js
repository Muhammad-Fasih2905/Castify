import React from 'react';
import Navigation from './src/navigation/Navigation';
import {NativeBaseProvider} from 'native-base';
import {PaperProvider} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Provider} from 'react-redux';
import {persistReducer, persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import {
  legacy_createStore as createStore,
  applyMiddleware,
  combineReducers,
} from 'redux';
import createSagaMiddleware from 'redux-saga';

// reducer
import authReducer from './src/Redux/reducer/auth';
import followReducer from './src/Redux/reducer/followUser';
import postReducer from './src/Redux/reducer/post';
import searchReducer from './src/Redux/reducer/search';
import notificationsReducer from './src/Redux/reducer/notification';
import portfiloReducer from './src/Redux/reducer/portfilo';
import chatReducer from './src/Redux/reducer/chat';
import jobReducer from './src/Redux/reducer/job/jobReducer';

// saga
import authSaga from './src/Redux/saga/auth';
import followSaga from './src/Redux/saga/followUser';
import postSaga from './src/Redux/saga/post';
import searchRootSaga from './src/Redux/saga/search';
import notificationsSaga from './src/Redux/saga/notification';
import portfiloSaga from './src/Redux/saga/portfilo';
import chatSaga from './src/Redux/saga/chat';
import jobRootSaga from './src/Redux/saga/job';

// Toast Message
import Toast from 'react-native-toast-message';

const sagaMiddleware = createSagaMiddleware();

const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  whitelist: ['token', 'user', 'post'],
};

const postPersistConfig = {
  key: 'post',
  storage: AsyncStorage,
  whitelist: ['post'],
};

const store = createStore(
  combineReducers({
    auth: persistReducer(authPersistConfig, authReducer),
    follow: followReducer,
    post: persistReducer(postPersistConfig, postReducer),
    search: searchReducer,
    notifications: notificationsReducer,
    portfilo: portfiloReducer,
    chat: chatReducer,
    jobs: jobReducer,
  }),
  applyMiddleware(sagaMiddleware),
);

let persistor = persistStore(store);

sagaMiddleware.run(authSaga);
sagaMiddleware.run(followSaga);
sagaMiddleware.run(postSaga);
sagaMiddleware.run(searchRootSaga);
sagaMiddleware.run(notificationsSaga);
sagaMiddleware.run(portfiloSaga);
sagaMiddleware.run(chatSaga);
sagaMiddleware.run(jobRootSaga);

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider>
          <NativeBaseProvider>
            <SafeAreaProvider style={{flex: 1}}>
              <Navigation />
              <Toast />
            </SafeAreaProvider>
          </NativeBaseProvider>
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;

import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { readData } from './src/utils/Utils';
import Navigation from './src/Navigations/navigations';
import 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/store';
import { signIn } from './src/store/reducers/authSlice';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
    CheckUserData();
  }, []);

  const CheckUserData = async () => {
    let userDetails = await readData('user_details');
    let userToken = await readData('user_token');
    let signType = await readData('sign_type');

    if (userToken && userDetails) {
      store.dispatch(signIn({
        userDetails: userDetails,
        userToken: userToken,
        signType: signType,
      }));
      console.log('Store after dispatch:', store.getState());
    } else {
      console.log('No stored user data found');
    }
  };

  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1 }}>
        <Navigation />
      </SafeAreaView>
    </Provider>
  );
};

export default App;

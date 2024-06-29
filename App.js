import React, {useContext, useEffect, useState} from 'react';
import SplashScreen from 'react-native-splash-screen';
import GlobalState from './src/context/globalState';
import { readData } from './src/utils/Utils';
import Navigation from './src/Navigations/navigations';
import 'react-native-gesture-handler';

const App = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
      SplashScreen.hide();
      CheckUserData();
  }, []);

  const CheckUserData = async () => {
    let UserData = await readData('user_details');
    setUserData(UserData);
  };


  return (
    <GlobalState dataUser={userData}>
        <Navigation />
    </GlobalState>
  );
};

export default App;

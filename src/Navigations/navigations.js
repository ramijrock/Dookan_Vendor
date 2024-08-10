import React, {useContext, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {readData} from '../utils/Utils';
import appContext from '../context/appContext';
import AppNavigation from './appNavigation';
import AuthNavigation from './authNavigation';

const Navigation = () => {
  const context = useContext(appContext);

  useEffect(() => {
    CheckUserData();
  }, []);

  const CheckUserData = async () => {
    let userData = await readData('user_details');
    context.setUserData(userData);
  };

  return (
    <NavigationContainer>
      {context.userData?.token == null ? (
        <AuthNavigation />
      ) : context.userData?.vendor_info?.kyc_complete == 'yes' ? (
        <AppNavigation />
      ) : (
        <KycStack vendor_info={context.userData.vendor_info} />
      )}
    </NavigationContainer>
  );
};

export default Navigation;

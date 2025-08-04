import React, {useContext, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigation from './appNavigation';
import AuthNavigation from './authNavigation';
import KycStack from './kycStack';
import { useSelector } from 'react-redux';

const Navigation = () => {
  const {userToken, userDetails} = useSelector((state) => state.authReducer);

  let vendor_info = {
    onboarding_steps_completed: true
  }
  return (
    <NavigationContainer>
      {userToken == null ? (
        <AuthNavigation />
      ) : userDetails?.vendor_info?.kyc_complete == 'yes' ? (
        <AppNavigation />
      ) : (
        <KycStack vendor_info={vendor_info} />
      )}
    </NavigationContainer>
  );
};

export default Navigation;

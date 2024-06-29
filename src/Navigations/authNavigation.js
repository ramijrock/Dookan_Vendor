import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
    Onboarding, 
    SignIn,
    Register,
    ForgetPassword,
    // RegVerify,
    // createPin,
    StoreInfo
} from '../Screens';

const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
    return(
        <Stack.Navigator initialRouteName={"Onboarding"} screenOptions={{headerShown: false}}>
            <Stack.Screen name="Onboarding" component={Onboarding} />
            <Stack.Screen name="Login" component={SignIn} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
            {/* <Stack.Screen name="StoreInfo" component={StoreInfo} /> */}
            {/* <Stack.Screen name="RegVerify" component={RegVerify} />
            <Stack.Screen name="CreatePin" component={createPin} /> */}
        </Stack.Navigator>
    )
}

export default AuthNavigation;
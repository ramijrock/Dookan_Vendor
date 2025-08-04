import {
  createNativeStackNavigator
} from "@react-navigation/native-stack";
import { StoreOwnerInfo, StoreInfo, BankInformation, UploadDocument, KycSubmitted } from "../Screens";

const KycStack = ({vendor_info}) => {
  let initialRoute = "StoreOwnerInfo";
  if(vendor_info.onboarding_steps_completed == 1){
    initialRoute = "StoreOwnerInfo"
  }else if(vendor_info.onboarding_steps_completed == 2){
    initialRoute = "StoreInfo"
  }else if(vendor_info.onboarding_steps_completed == 3){
    initialRoute = "BankInformation"
  }else if(vendor_info.onboarding_steps_completed == 4){
    initialRoute = "UploadDocument"
  }else if(vendor_info.onboarding_steps_completed == 5){
    initialRoute = "KycSubmitted"
  }
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{
        headerShown: false
      }}
    >
      
      <Stack.Screen name="StoreOwnerInfo" component={StoreOwnerInfo} />
      <Stack.Screen name="StoreInfo" component={StoreInfo} />
      <Stack.Screen name="BankInformation" component={BankInformation} />
      <Stack.Screen name="UploadDocument" component={UploadDocument} />
      <Stack.Screen name="KycSubmitted" component={KycSubmitted} />
    </Stack.Navigator>
  );
  
};

export default KycStack;

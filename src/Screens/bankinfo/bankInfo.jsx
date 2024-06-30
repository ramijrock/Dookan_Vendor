import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  Keyboard,
  TouchableOpacity,
  ImageBackground,
  PermissionsAndroid
} from 'react-native';
import {COLORS} from '../../utils/globalColors';
import {Arrow, Button, TextInput} from '../../components';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { launchImageLibrary } from "react-native-image-picker";
import Geolocation from 'react-native-geolocation-service';

const BankInformation = () => {
  const navigation = useNavigation();
  const [inputs, setInputs] = useState({
    bankName: '',
    account: '',
    branchName: '',
    ifscNumber: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleOnChangeText = (text, input) => {
    console.log(text);
    setInputs(prevState => ({...prevState, [input]: text}));
  };

  const handleError = (errorMessage, input) => {
    setErrors(prevState => ({...prevState, [input]: errorMessage}));
  };

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.bankName) {
      handleError('This field is required!', 'bankName');
      isValid = false;
    }

    if (!inputs.account) {
      handleError('This field is required!', 'account');
      isValid = false;
    }

    if (!inputs.branchName) {
      handleError('This field is required!', 'branchName');
      isValid = false;
    }

    if (!inputs.ifscNumber) {
      handleError('This field is required!', 'ifscNumber');
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = () => {
    if (validate()) {
      console.log('data');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={COLORS.white}
        translucent
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{marginTop: 24}}>
          <Arrow onPress={() => navigation.goBack()} name={'chevron-back'} />
        </View>
        <View style={styles.titleSection}>
          <Text style={styles.title}>KYC form for vendor registration</Text>
          <Text style={styles.subTitle}>Bank Information</Text>
        </View>
        <View style={styles.inputSection}>
          <View style={styles.wrapper}>
            <TextInput
              placeholder={'Bank Name*'}
              placeholderTextColor={COLORS.textColor}
              keyboardType={'default'}
              onChangeText={text => handleOnChangeText(text, 'bankName')}
              onFocus={() => handleError(null, 'bankName')}
              errorMessage={errors.bankName}
            />
          </View>
          <View style={styles.wrapper}>
            <TextInput
              placeholder={'Account Number*'}
              placeholderTextColor={COLORS.textColor}
              keyboardType={'default'}
              onChangeText={text => handleOnChangeText(text, 'account')}
              onFocus={() => handleError(null, 'account')}
              errorMessage={errors.account}
            />
          </View>
          
          <View style={[styles.wrapper]}>
            <TextInput
              placeholder={'Branch Name*'}
              placeholderTextColor={COLORS.textColor}
              keyboardType={'default'}
                onChangeText={text => handleOnChangeText(text, 'branchName')}
                onFocus={() => handleError(null, 'branchName')}
                errorMessage={errors.branchName}
            />
          </View>
          <View style={[styles.wrapper]}>
            <TextInput
              placeholder={'IFSC Number*'}
              placeholderTextColor={COLORS.textColor}
              keyboardType={'default'}
                onChangeText={text => handleOnChangeText(text, 'ifscNumber')}
                onFocus={() => handleError(null, 'ifscNumber')}
                errorMessage={errors.ifscNumber}
            />
          </View>
        </View>
        <View style={styles.btnSection}>
          <Button
            fontSize={18}
            height={50}
            btnName={'Continue'}
            onPress={handleSubmit}
            borderRadius={10}
            loading={loading}
            color={COLORS.textColor}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    // backgroundColor: COLORS.white
  },
  titleSection: {
    marginVertical: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.black,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.textColor,
    marginTop: 8,
  },
  inputSection: {
    marginVertical: 24,
  },
  wrapper: {
    marginVertical: 5,
  },
  inputSectionTwo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btnSection: {
    marginVertical: 20,
  },
});

export default BankInformation;

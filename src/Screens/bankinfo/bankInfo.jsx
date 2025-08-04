import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  Keyboard,
} from 'react-native';
import {COLORS} from '../../utils/globalColors';
import {Arrow, Button, TextInput} from '../../components';

const BankInformation = () => {
  const navigation = useNavigation();
  const [inputs, setInputs] = useState({
    accountNumber: '',
    ifscCode: '',
    accountHolderName: '',
    bankName: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleOnChangeText = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };

  const handleError = (errorMessage, input) => {
    setErrors(prevState => ({...prevState, [input]: errorMessage}));
  };

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;
    let ifscRegx = /^[A-Z]{4}0[A-Z0-9]{6}$/;
    let accountRegx = /^[0-9]{9,18}$/;

    // Account Holder Name validation
    if (!inputs.accountHolderName) {
      handleError('Account holder name is required!', 'accountHolderName');
      isValid = false;
    } else if (inputs.accountHolderName.length < 2 || inputs.accountHolderName.length > 50) {
      handleError('Account holder name must be between 2 and 50 characters!', 'accountHolderName');
      isValid = false;
    }

    // Bank Name validation
    if (!inputs.bankName) {
      handleError('Bank name is required!', 'bankName');
      isValid = false;
    } else if (inputs.bankName.length < 2 || inputs.bankName.length > 50) {
      handleError('Bank name must be between 2 and 50 characters!', 'bankName');
      isValid = false;
    }

    // Account Number validation
    if (!inputs.accountNumber) {
      handleError('Account number is required!', 'accountNumber');
      isValid = false;
    } else if (!inputs.accountNumber.match(accountRegx)) {
      handleError('Enter valid account number (9-18 digits)!', 'accountNumber');
      isValid = false;
    }

    // IFSC Code validation
    if (!inputs.ifscCode) {
      handleError('IFSC code is required!', 'ifscCode');
      isValid = false;
    } else if (!inputs.ifscCode.match(ifscRegx)) {
      handleError('Enter valid IFSC code!', 'ifscCode');
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = () => {
    if (validate()) {
      const bankData = {
        bankDetails: {
          accountNumber: inputs.accountNumber,
          ifscCode: inputs.ifscCode.toUpperCase(),
          accountHolderName: inputs.accountHolderName,
          bankName: inputs.bankName,
        },
      };
      
      console.log('Bank data:', bankData);
      // Navigate to next step
      navigation.navigate('OperatingHours');
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
              placeholder={'Account Holder Name*'}
              placeholderTextColor={COLORS.textColor}
              keyboardType={'default'}
              onChangeText={text => handleOnChangeText(text, 'accountHolderName')}
              onFocus={() => handleError(null, 'accountHolderName')}
              errorMessage={errors.accountHolderName}
              maxLength={50}
            />
          </View>
          <View style={styles.wrapper}>
            <TextInput
              placeholder={'Bank Name*'}
              placeholderTextColor={COLORS.textColor}
              keyboardType={'default'}
              onChangeText={text => handleOnChangeText(text, 'bankName')}
              onFocus={() => handleError(null, 'bankName')}
              errorMessage={errors.bankName}
              maxLength={50}
            />
          </View>
          <View style={styles.wrapper}>
            <TextInput
              placeholder={'Account Number*'}
              placeholderTextColor={COLORS.textColor}
              keyboardType={'numeric'}
              onChangeText={text => handleOnChangeText(text, 'accountNumber')}
              onFocus={() => handleError(null, 'accountNumber')}
              errorMessage={errors.accountNumber}
              maxLength={18}
            />
          </View>
          <View style={styles.wrapper}>
            <TextInput
              placeholder={'IFSC Code*'}
              placeholderTextColor={COLORS.textColor}
              keyboardType={'default'}
              onChangeText={text => handleOnChangeText(text.toUpperCase(), 'ifscCode')}
              onFocus={() => handleError(null, 'ifscCode')}
              errorMessage={errors.ifscCode}
              maxLength={11}
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
  btnSection: {
    marginVertical: 20,
  },
});

export default BankInformation;

import {useNavigation} from '@react-navigation/native';
import React, { useState } from 'react';
import {View, Text, StyleSheet, StatusBar, ScrollView, Keyboard} from 'react-native';
import {COLORS} from '../../utils/globalColors';
import {Arrow, Button, TextInput} from '../../components';

const StoreOwnerInformation = () => {
  const navigation = useNavigation();
  const [inputs, setInputs] = useState({
    fullName: "",
    mobile: "",
    email: "",
    pan: "",
    aadhar: "",
    city: "",
    state: ""
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
    let emailRegx = /\S+@\S+\.\S+/;

    if (!inputs.fullName) {
      handleError('This field is required!', 'fullName');
      isValid = false;
    } else if (inputs.fullName.length >= 25) {
      handleError('This field is more than 25 characters!', 'fullName');
      isValid = false;
    }

    if (!inputs.mobile) {
        handleError('This field is required!', 'mobile');
        isValid = false;
      }

    if (!inputs.email) {
      handleError('This field is required!', 'email');
      isValid = false;
    } else if (!inputs.email.match(emailRegx)) {
        handleError('Enter valid email!', 'email');
      isValid = false;
    }

    if (!inputs.pan) {
      handleError('This field is required!', 'pan');
      isValid = false;
    } else if (!inputs.pan.length != 10) {
      handleError(
        'Enter valid pan number!',
        'pan',
      );
      isValid = false;
    }

    if (!inputs.aadhar) {
      handleError('This field is required!', 'aadhar');
      isValid = false;
    } else if (inputs.aadhar?.length !== 12) {
      handleError('Enter valid Aadhar number!', 'aadhar');
      isValid = false;
    }

    if (!inputs.city) {
      handleError('This field is required!', 'city');
      isValid = false;
    }

    if (!inputs.state) {
        handleError('This field is required!', 'state');
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = () => {
    if (validate()) {
        console.log('data');
    }
  }

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
          <Text style={styles.subTitle}>Store Owner Information</Text>
        </View>
        <View style={styles.inputSection}>
          <View style={styles.wrapper}>
            <TextInput
              placeholder={'Owner Name'}
              placeholderTextColor={COLORS.textColor}
              keyboardType={'default'}
                onChangeText={text => handleOnChangeText(text, 'fullname')}
                onFocus={() => handleError(null, 'fullname')}
                errorMessage={errors.fullName}
            />
          </View>
          <View style={styles.wrapper}>
            <TextInput
              placeholder={'Phone Number'}
              placeholderTextColor={COLORS.textColor}
              keyboardType={'default'}
                onChangeText={text => handleOnChangeText(text, 'mobile')}
                onFocus={() => handleError(null, 'mobile')}
                errorMessage={errors.mobile}
            />
          </View>
          <View style={styles.wrapper}>
            <TextInput
              placeholder={'Owner Email'}
              placeholderTextColor={COLORS.textColor}
              keyboardType={'default'}
                onChangeText={text => handleOnChangeText(text, 'email')}
                onFocus={() => handleError(null, 'email')}
                errorMessage={errors.email}
            />
          </View>
          <View style={styles.inputSectionTwo}>
            <View style={[styles.wrapper, {width: '48%'}]}>
              <TextInput
                placeholder={'Owner Pan'}
                placeholderTextColor={COLORS.textColor}
                keyboardType={'default'}
                  onChangeText={text => handleOnChangeText(text, 'pan')}
                  onFocus={() => handleError(null, 'pan')}
                  errorMessage={errors.pan}
              />
            </View>
            <View style={[styles.wrapper, {width: '48%'}]}>
              <TextInput
                placeholder={'Owner Aadhar'}
                placeholderTextColor={COLORS.textColor}
                keyboardType={'default'}
                  onChangeText={text => handleOnChangeText(text, 'aadhar')}
                  onFocus={() => handleError(null, 'aadhar')}
                  errorMessage={errors.aadhar}
              />
            </View>
          </View>
          <View style={styles.inputSectionTwo}>
            <View style={[styles.wrapper, {width: '48%'}]}>
              <TextInput
                placeholder={'City'}
                placeholderTextColor={COLORS.textColor}
                keyboardType={'default'}
                  onChangeText={text => handleOnChangeText(text, 'city')}
                  onFocus={() => handleError(null, 'city')}
                  errorMessage={errors.city}
              />
            </View>
            <View style={[styles.wrapper, {width: '48%'}]}>
              <TextInput
                placeholder={'State'}
                placeholderTextColor={COLORS.textColor}
                keyboardType={'default'}
                  onChangeText={text => handleOnChangeText(text, 'state')}
                  onFocus={() => handleError(null, 'state')}
                  errorMessage={errors.state}
              />
            </View>
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
  }
});

export default StoreOwnerInformation;

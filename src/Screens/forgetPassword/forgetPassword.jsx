import {useNavigation} from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import {View, Text, StyleSheet, Image, TextInput, StatusBar} from 'react-native';
import {Arrow, Button} from '../../components';
import {COLORS} from '../../utils/globalColors';

const ForgetPassword = () => {
  const navigation = useNavigation();
  const firstRef = useRef();
  const secondRef = useRef();
  const thirdRef = useRef();
  const forthRef = useRef();
  const [otp, setOtp] = useState({1: '', 2: '', 3: '', 4: ''});
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={COLORS.white}
        translucent
      />
      <View style={{marginBottom: 15, marginTop: 24}}>
        <Arrow onPress={() => navigation.goBack()} name={'chevron-back'} />
      </View>
      <View style={styles.pageTitle}>
        <Text style={styles.title}>Forget Password</Text>
        <Text style={styles.subTitle}>
          Check Email: <Text style={styles.email}>ramij****@gmail.com</Text>
        </Text>
      </View>
      <View style={styles.iconSection}>
        <Image
          style={styles.mailIcon}
          source={require('../../assets/images/open-mail.png')}
        />
      </View>
      <View>
        <Text style={styles.verifyText}>Enter verify code</Text>
      </View>
      <View>
        <View style={styles.OTPContainer}>
          <View style={styles.otpBox}>
            <TextInput
              style={styles.otpText}
              keyboardType="number-pad"
              maxLength={1}
              ref={firstRef}
              onChangeText={text => {
                setOtp({...otp, 1: text});
                text && secondRef.current.focus();
              }}
            />
          </View>
          <View style={styles.otpBox}>
            <TextInput
              style={styles.otpText}
              keyboardType="number-pad"
              maxLength={1}
              ref={secondRef}
              onChangeText={text => {
                setOtp({...otp, 2: text});
                text ? thirdRef.current.focus() : firstRef.current.focus();
              }}
            />
          </View>
          <View style={styles.otpBox}>
            <TextInput
              style={styles.otpText}
              keyboardType="number-pad"
              maxLength={1}
              ref={thirdRef}
              onChangeText={text => {
                setOtp({...otp, 3: text});
                text ? forthRef.current.focus() : secondRef.current.focus();
              }}
            />
          </View>
          <View style={styles.otpBox}>
            <TextInput
              style={styles.otpText}
              keyboardType="number-pad"
              maxLength={1}
              ref={forthRef}
              onChangeText={text => {
                setOtp({...otp, 4: text});
                !text && thirdRef.current.focus();
              }}
            />
          </View>
        </View>
        <View>
          <Text style={styles.resendText}>Resend code?</Text>
        </View>
        <View style={styles.wrapper}>
          <Button
            height={50}
            btnName="Verify"
            color={COLORS.tab}
            borderRadius={8}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  pageTitle: {
    marginVertical: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: COLORS.textColor,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: COLORS.textColor,
  },
  email: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  iconSection: {
    backgroundColor: COLORS.white,
    alignSelf: 'center',
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
  mailIcon: {
    height: 50,
    width: 50,
    resizeMode: 'contain',
  },
  verifyText: {
    alignSelf: 'center',
    marginVertical: 10,
    fontSize: 18,
    fontWeight: '500',
    color: COLORS.textColor,
  },
  resendText: {
    alignSelf: 'flex-end',
    right: 35,
    marginVertical: 5,
    color: COLORS.textColor,
  },
  wrapper: {
    marginVertical: 15,
    paddingHorizontal: 30,
  },
  OTPContainer: {
    marginHorizontal: 20,
    marginBottom: 10,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
  },
  otpBox: {
    borderRadius: 8,
    borderColor: COLORS.primary,
    borderWidth: 0.5,
  },
  otpText: {
    fontSize: 25,
    color: COLORS.lightPrimary,
    padding: 0,
    textAlign: 'center',
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
});

export default ForgetPassword;

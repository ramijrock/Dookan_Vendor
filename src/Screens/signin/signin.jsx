import React, {useContext, useState} from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  Keyboard,
  StatusBar,
} from 'react-native';
import {COLORS} from '../../utils/globalColors';
import {useNavigation} from '@react-navigation/native';
import {Button, CheckBox, SocialButton, TextInput} from '../../components';
import AppContext from '../../context/appContext';

const SignIn = () => {
  const navigation = useNavigation();
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    remember: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const context = useContext(AppContext);

  const handleOnChangeText = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };

  const handleError = (errorMessage, input) => {
    setErrors(prevState => ({...prevState, [input]: errorMessage}));
  };

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!inputs.email) {
      handleError('This field is required!', 'email');
      isValid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError('Enter valid email!', 'email');
      isValid = false;
    }

    if (!inputs.password) {
      handleError('This field is required!', 'password');
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
        <View style={[styles.pageTitle, {marginTop: 74}]}>
          <Text style={styles.title}>Sign In</Text>
          <Text style={styles.subTitle}>
            Please login to your vendor account.
          </Text>
        </View>
        <View style={styles.loginSection}>
          <View style={styles.wrapper}>
            <TextInput
              placeholder={'Email/Phone'}
              name={'mail-outline'}
              onChangeText={text => handleOnChangeText(text, 'email')}
              onFocus={() => handleError(null, 'email')}
              keyboardType={'email-address'}
              errorMessage={errors.email}
              placeholderTextColor={COLORS.textColor}
            />
          </View>
          <View style={styles.wrapper}>
            <TextInput
              placeholder={'Password'}
              placeholderTextColor={COLORS.textColor}
              password
              onChangeText={text => handleOnChangeText(text, 'password')}
              errorMessage={errors.password}
              onFocus={() => handleError(null, 'password')}
            />
          </View>
          <View
            style={[styles.wrapper, styles.forgetSection, {marginBottom: 20}]}>
            <View>
              <CheckBox
                title={'Remember me'}
                onPress={() => {
                  setInputs({remember: !remember});
                }}
                checked={inputs.remember}
              />
            </View>
            <Text
              onPress={() => navigation.navigate('ForgetPassword')}
              style={styles.forgetText}>
              Forget Password?
            </Text>
          </View>
          <View style={styles.btnSection}>
            <Button
              height={50}
              btnName={'Sign In'}
              fontSize={18}
              borderRadius={10}
              onPress={handleSubmit}
              // loading={loading}
              color={COLORS.textColor}
            />
          </View>
          <View>
            <Text style={styles.orText}>Or</Text>
          </View>
          <View style={styles.socialSection}>
            <SocialButton
              source={require('../../assets/images/facebook.png')}
            />
            <SocialButton source={require('../../assets/images/google.png')} />
          </View>
        </View>
        <View style={styles.account}>
          <Text style={styles.subTitle}>Don't have an account?</Text>
          <Text
            onPress={() => navigation.navigate('Register')}
            style={[
              styles.subTitle,
              {color: COLORS.primary, marginHorizontal: 5, fontWeight: 'bold'},
            ]}>
            Register
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    // backgroundColor:COLORS.lightGrey
  },
  pageTitle: {
    marginTop: 30,
    marginVertical: 10,
    // backgroundColor:'red'
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
  account: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginVertical: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
  loginSection: {
    marginVertical: 20,
  },
  wrapper: {
    marginVertical: 5,
  },
  forgetSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  forgetText: {
    color: COLORS.textColor,
    fontSize: 16,
    fontWeight: 'bold',
  },
  orText: {
    alignSelf: 'center',
    color: COLORS.textColor,
    padding: 5,
    fontWeight: 'bold',
    fontSize: 16,
  },
  socialSection: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 10,
  },
});

export default SignIn;

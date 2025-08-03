import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Keyboard,
  StatusBar,
} from 'react-native';
import {COLORS} from '../../utils/globalColors';
import {RegisterFeatures} from '../../features';
import {useNavigation} from '@react-navigation/native';
import {
  Arrow,
  Button,
  CheckBox,
  SocialButton,
  TextInput,
} from '../../components';
import { register } from '../../services/Auth';

const Register = () => {
  const navigation = useNavigation();
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    cPassword: '',
    terms: false,
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
    let passRegx = '[A-Z][a-z]*[0-9][a-z]*';
    let emailRegx = '[a-z0-9_-.]+[@][a-z]+[.][a-z]{2 3}';

    if (!inputs.name) {
      handleError('This field is required!', 'name');
      isValid = false;
    } else if (inputs.name.length >= 25) {
      handleError('This field is more than 25 characters!', 'name');
      isValid = false;
    }

    if (!inputs.email) {
      handleError('This field is required!', 'email');
      isValid = false;
    }

    if (!inputs.phone) {
      handleError('This field is required!', 'phone');
      isValid = false;
    }

    if (!inputs.password) {
      handleError('This field is required!', 'password');
      isValid = false;
    } else if (!inputs.password.match(passRegx)) {
      handleError(
        'First character uppercase and one digit needed to create password!',
        'password',
      );
      isValid = false;
    }

    if (!inputs.cPassword) {
      handleError('This field is required!', 'cPassword');
      isValid = false;
    } else if (inputs.cPassword !== inputs.password) {
      handleError('Confirm password does not match!', 'cPassword');
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = () => {
    if (validate()) {
      let obj = {
        name: inputs?.name,
        email: inputs?.email,
        mobile: inputs?.phone,
        password: inputs?.password,
        role: "vendor"
      }
      setLoading(true);
      register(obj)
        .then((res) => {
          console.log('res=====>', res);
          navigation.navigate('Login');
        })
        .catch((err) => {
          console.log('error', err);
        })
        .finally(() => {
          setLoading(false);
        })
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={COLORS.white}
        translucent
      />
      <ScrollView showsVerticalScrollIndicator={false} style={{marginTop: 24}}>
        <View style={{}}>
          <Arrow onPress={() => navigation.goBack()} name={'chevron-back'} />
        </View>
        <View style={styles.pageTitle}>
          <Text style={styles.title}>Register</Text>
          <Text style={styles.subTitle}>Input your information here.</Text>
        </View>
        <View style={styles.section}>
          <View style={styles.wrapper}>
            <TextInput
              placeholder={'Name'}
              placeholderTextColor={COLORS.textColor}
              name={'person-outline'}
              keyboardType={'default'}
              onChangeText={text => handleOnChangeText(text, 'name')}
              onFocus={() => handleError(null, 'name')}
              errorMessage={errors.name}
            />
          </View>
          <View style={styles.wrapper}>
            <TextInput
              placeholder={'Email'}
              placeholderTextColor={COLORS.textColor}
              name={'mail-outline'}
              keyboardType={'email-address'}
              onChangeText={text => handleOnChangeText(text, 'email')}
              onFocus={() => handleError(null, 'email')}
              errorMessage={errors.email}
            />
          </View>
          <View style={styles.wrapper}>
            <TextInput
              placeholder={'Phone'}
              placeholderTextColor={COLORS.textColor}
              name={'call-outline'}
              keyboardType={'numeric'}
              onChangeText={text => handleOnChangeText(text, 'phone')}
              onFocus={() => handleError(null, 'phone')}
              maxLength={10}
              errorMessage={errors.phone}
            />
          </View>
          <View style={styles.wrapper}>
            <TextInput
              placeholder={'Password'}
              password
              placeholderTextColor={COLORS.textColor}
              name={'lock-closed-outline'}
              secureTextEntry={true}
              onChangeText={text => handleOnChangeText(text, 'password')}
              onFocus={() => handleError(null, 'password')}
              errorMessage={errors.password}
            />
          </View>
          <View style={styles.wrapper}>
            <TextInput
              placeholder={'Confirm Password'}
              password
              placeholderTextColor={COLORS.textColor}
              secureTextEntry={true}
              name={'lock-closed-outline'}
              onChangeText={text => handleOnChangeText(text, 'cPassword')}
              onFocus={() => handleError(null, 'cPassword')}
              errorMessage={errors.cPassword}
            />
          </View>
        </View>
        <View style={styles.btnSection}>
          <Button
            fontSize={18}
            height={50}
            btnName={'Register'}
            onPress={handleSubmit}
            borderRadius={10}
            loading={loading}
            color={COLORS.textColor}
          />
        </View>
        <View>
          <Text style={styles.orText}>Or</Text>
        </View>
        <View style={styles.socialSection}>
          <SocialButton source={require('../../assets/images/facebook.png')} />
          <SocialButton source={require('../../assets/images/google.png')} />
        </View>
        <View style={styles.account}>
          <Text style={styles.subTitle}>Already have an account?</Text>
          <Text
            onPress={() => navigation.navigate('Login')}
            style={[
              styles.subTitle,
              {color: COLORS.primary, marginHorizontal: 5, fontWeight: 'bold'},
            ]}>
            Sign in
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
    // backgroundColor:COLORS.white
  },
  pageTitle: {
    marginTop: 10,
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
    color: COLORS.tab,
  },
  account: {
    flexDirection: 'row',
    alignSelf: 'center',
    // backgroundColor:'red',
    marginVertical: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
  section: {
    marginVertical: 20,
  },
  wrapper: {
    marginVertical: 5,
  },
  btnSection: {
    marginVertical: 20,
  },
  orText: {
    alignSelf: 'center',
    color: COLORS.black,
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

export default Register;

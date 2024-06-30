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
  PermissionsAndroid,
} from 'react-native';
import {COLORS} from '../../utils/globalColors';
import {Arrow, Button, TextInput} from '../../components';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {launchImageLibrary} from 'react-native-image-picker';
import Geolocation from 'react-native-geolocation-service';

const StoreOwnerInformation = () => {
  const navigation = useNavigation();
  const [inputs, setInputs] = useState({
    storeName: '',
    address: '',
    email: '',
    mobile: '',
    description: '',
    image: null,
  });
  const [location, setLocation] = useState({
    latitude: '',
    longitude: '',
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

  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setInputs({image: imageUri});
      }
    });
  };

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Geolocation Permission',
          message: 'Can we access your location?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      console.log('granted', granted);
      if (granted === 'granted') {
        console.log('You can use Geolocation');
        return true;
      } else {
        console.log('You cannot use Geolocation');
        return false;
      }
    } catch (err) {
      return false;
    }
  };

  const getLocation = () => {
    const result = requestLocationPermission();
    result.then(res => {
      if (res) {
        Geolocation.getCurrentPosition(
          position => {
            setLocation({
              latitude: position.coords.latitude?.toString(),
              longitude: position?.coords?.longitude?.toString(),
            });
          },
          error => {
            // See error code charts below.
            console.log(error.code, error.message);
            setLocation({latitude: '', longitude: ''});
          },
          //   {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    });
  };

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;
    let emailRegx = /\S+@\S+\.\S+/;

    if (!inputs.storeName) {
      handleError('This field is required!', 'storeName');
      isValid = false;
    } else if (inputs.storeName.length >= 25) {
      handleError('This field is more than 25 characters!', 'storeName');
      isValid = false;
    }

    if (!inputs.address) {
      handleError('This field is required!', 'address');
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
          <Text style={styles.subTitle}>Store Information</Text>
        </View>
        <View style={styles.inputSection}>
          <View style={styles.wrapper}>
            <TextInput
              placeholder={'Store Name*'}
              placeholderTextColor={COLORS.textColor}
              keyboardType={'default'}
              onChangeText={text => handleOnChangeText(text, 'storeName')}
              onFocus={() => handleError(null, 'storeName')}
              errorMessage={errors.storeName}
            />
          </View>
          <View style={styles.wrapper}>
            <TextInput
              placeholder={'Store Address*'}
              placeholderTextColor={COLORS.textColor}
              keyboardType={'default'}
              onChangeText={text => handleOnChangeText(text, 'address')}
              onFocus={() => handleError(null, 'address')}
              errorMessage={errors.address}
            />
          </View>
          <View style={styles.inputSectionTwo}>
            <View style={[styles.wrapper, {width: '48%'}]}>
              <TextInput
                placeholder={'Store Email*'}
                placeholderTextColor={COLORS.textColor}
                keyboardType={'default'}
                onChangeText={text => handleOnChangeText(text, 'email')}
                onFocus={() => handleError(null, 'email')}
                errorMessage={errors.email}
              />
            </View>
            <View style={[styles.wrapper, {width: '48%'}]}>
              <TextInput
                placeholder={'Store Phone*'}
                placeholderTextColor={COLORS.textColor}
                keyboardType={'default'}
                onChangeText={text => handleOnChangeText(text, 'mobile')}
                onFocus={() => handleError(null, 'mobile')}
                errorMessage={errors.mobile}
              />
            </View>
          </View>
          <View style={styles.locationSection}>
            <View style={styles.locationWrapper}>
              <Text style={styles.locationText}>Location</Text>
              <MaterialIcons
                name="my-location"
                size={24}
                color={COLORS.primary}
                onPress={getLocation}
              />
            </View>
            <View style={[styles.inputSectionTwo, {marginVertical: 10}]}>
              <View style={[styles.wrapper, {width: '48%'}]}>
                <TextInput
                  placeholder={'latitude'}
                  placeholderTextColor={COLORS.textColor}
                  keyboardType={'default'}
                  value={location?.latitude}
                  editable={false}
                />
              </View>
              <View style={[styles.wrapper, {width: '48%'}]}>
                <TextInput
                  placeholder={'longitude'}
                  placeholderTextColor={COLORS.textColor}
                  keyboardType={'default'}
                  value={location?.longitude}
                  editable={false}
                />
              </View>
            </View>
          </View>
          <View style={[styles.wrapper, {marginTop: 12}]}>
            <TextInput
              placeholder={'Store Description'}
              placeholderTextColor={COLORS.textColor}
              keyboardType={'default'}
              //   onChangeText={text => handleOnChangeText(text, 'description')}
              //   onFocus={() => handleError(null, 'description')}
              //   errorMessage={errors.description}
              multine={true}
            />
          </View>
          {inputs.image ? (
            <View
              style={{
                borderWidth: 1,
                borderRadius: 8,
                borderColor: COLORS.lightPrimary,
              }}>
              <ImageBackground
                source={{uri: inputs.image}}
                style={styles.image}>
                <View
                  style={{
                    alignSelf: 'center',
                    bottom: 0,
                    position: 'absolute',
                  }}>
                  <Button
                    btnName={'Remove Image'}
                    backgroundColor={'transparent'}
                    borderWidth={1}
                    borderRadius={8}
                    borderColor={COLORS.error}
                    color={COLORS.error}
                    fontSize={16}
                    height={35}
                    onPress={() => setInputs({image: null})}
                  />
                </View>
              </ImageBackground>
            </View>
          ) : (
            <View style={styles.imageSection}>
              <TouchableOpacity
                style={{alignItems: 'center'}}
                activeOpacity={0.8}
                onPress={openImagePicker}>
                <MaterialIcons
                  name="add-to-photos"
                  size={36}
                  color={COLORS.iconColor}
                />
                <Text style={styles.addPhotoText}>Add Store Image</Text>
              </TouchableOpacity>
            </View>
          )}
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
  locationSection: {
    backgroundColor: COLORS.lightGrey,
    padding: 8,
    paddingBottom: 0,
    borderRadius: 8,
    marginTop: 8,
  },
  locationText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textColor,
  },
  locationWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageSection: {
    backgroundColor: COLORS.lightGrey,
    height: 180,
    borderRadius: 8,
    marginTop: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addPhotoText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textColor,
    marginTop: 4,
  },
  image: {
    height: 180,
    resizeMode: 'cover',
    borderRadius: 8,
    marginVertical: 8,
  },
});

export default StoreOwnerInformation;

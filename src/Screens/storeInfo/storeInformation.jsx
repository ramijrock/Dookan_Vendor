import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  Keyboard,
  // TouchableOpacity,
  // ImageBackground,
  PermissionsAndroid,
} from 'react-native';
import { COLORS } from '../../utils/globalColors';
import { Arrow, Button, TextInput, Dropdown } from '../../components';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import {launchImageLibrary} from 'react-native-image-picker';
import Geolocation from 'react-native-geolocation-service';
import { createVendor } from '../../services/vendor';
import { useDispatch, useSelector } from 'react-redux';
import { writeData } from '../../utils/Utils';
import { updateUserDetails } from '../../store/reducers/authSlice';

const StoreInformation = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { userDetails } = useSelector((state) => state.authReducer);

  const [inputs, setInputs] = useState({
    businessName: '',
    businessType: '',
    businessDescription: '',
    contactPerson: '',
    email: '',
    phone: '',
    alternatePhone: '',
    street: '',
    city: '',
    state: '',
    country: 'India',
    postalCode: '',
    latitude: '',
    longitude: '',
    businessLogo: null,
    businessBanner: null,
  });

  // const [businessSettings, setBusinessSettings] = useState({
  //   isDeliveryAvailable: true,
  //   minimumOrderAmount: '100',
  //   deliveryFee: '0',
  //   freeDeliveryThreshold: '500',
  //   maxDeliveryDistance: '10',
  //   estimatedDeliveryTime: '45',
  // });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const businessTypes = [
    { label: 'Grocery Store', value: 'grocery_store' },
    { label: 'Supermarket', value: 'supermarket' },
    { label: 'Convenience Store', value: 'convenience_store' },
    { label: 'Specialty Store', value: 'specialty_store' },
    { label: 'Online Grocery', value: 'online_grocery' },
  ];

  const handleOnChangeText = (text, input) => {
    setInputs(prevState => ({ ...prevState, [input]: text }));
  };

  // const handleSettingsChange = (text, input) => {
  //   setBusinessSettings(prevState => ({...prevState, [input]: text}));
  // };

  const handleError = (errorMessage, input) => {
    setErrors(prevState => ({ ...prevState, [input]: errorMessage }));
  };

  // const openImagePicker = (type) => {
  //   const options = {
  //     mediaType: 'photo',
  //     includeBase64: false,
  //   };

  //   launchImageLibrary(options, response => {
  //     if (response.didCancel) {
  //       console.log('User cancelled image picker');
  //     } else if (response.error) {
  //       console.log('Image picker error: ', response.error);
  //     } else {
  //       let imageUri = response.uri || response.assets?.[0]?.uri;
  //       setInputs(prevState => ({...prevState, [type]: imageUri}));
  //     }
  //   });
  // };

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
      if (granted === 'granted') {
        return true;
      } else {
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
            setInputs(prevState => ({
              ...prevState,
              latitude: position.coords.latitude?.toString(),
              longitude: position?.coords?.longitude?.toString(),
            }));
          },
          error => {
            console.log(error.code, error.message);
          },
        );
      }
    });
  };

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;
    let emailRegx = /\S+@\S+\.\S+/;
    let phoneRegx = /^[0-9]{10,15}$/;
    let postalRegx = /^[0-9]{6}$/;

    // Business Name validation
    if (!inputs.businessName) {
      handleError('Business name is required!', 'businessName');
      isValid = false;
    } else if (inputs.businessName.length < 2 || inputs.businessName.length > 100) {
      handleError('Business name must be between 2 and 100 characters!', 'businessName');
      isValid = false;
    }

    // Business Type validation
    if (!inputs.businessType) {
      handleError('Business type is required!', 'businessType');
      isValid = false;
    }

    // Contact Person validation
    if (!inputs.contactPerson) {
      handleError('Contact person is required!', 'contactPerson');
      isValid = false;
    } else if (inputs.contactPerson.length < 2 || inputs.contactPerson.length > 50) {
      handleError('Contact person name must be between 2 and 50 characters!', 'contactPerson');
      isValid = false;
    }

    // Email validation
    if (!inputs.email) {
      handleError('Email is required!', 'email');
      isValid = false;
    } else if (!inputs.email.match(emailRegx)) {
      handleError('Enter valid email!', 'email');
      isValid = false;
    }

    // Phone validation
    if (!inputs.phone) {
      handleError('Phone number is required!', 'phone');
      isValid = false;
    } else if (!inputs.phone.match(phoneRegx)) {
      handleError('Enter valid phone number!', 'phone');
      isValid = false;
    }

    // Address validation
    if (!inputs.street) {
      handleError('Street address is required!', 'street');
      isValid = false;
    } else if (inputs.street.length < 5 || inputs.street.length > 200) {
      handleError('Street address must be between 5 and 200 characters!', 'street');
      isValid = false;
    }

    if (!inputs.city) {
      handleError('City is required!', 'city');
      isValid = false;
    } else if (inputs.city.length < 2 || inputs.city.length > 50) {
      handleError('City must be between 2 and 50 characters!', 'city');
      isValid = false;
    }

    if (!inputs.state) {
      handleError('State is required!', 'state');
      isValid = false;
    } else if (inputs.state.length < 2 || inputs.state.length > 50) {
      handleError('State must be between 2 and 50 characters!', 'state');
      isValid = false;
    }

    if (!inputs.postalCode) {
      handleError('Postal code is required!', 'postalCode');
      isValid = false;
    } else if (!inputs.postalCode.match(postalRegx)) {
      handleError('Enter valid 6-digit postal code!', 'postalCode');
      isValid = false;
    }

    // Location validation
    if (!inputs.latitude || !inputs.longitude) {
      handleError('Please get your location!', 'location');
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = () => {
    if (validate()) {
      const vendorData = {
        userId: userDetails._id,
        ...inputs,
        address: {
          street: inputs.street,
          city: inputs.city,
          state: inputs.state,
          country: inputs.country,
          postalCode: inputs.postalCode,
          latitude: parseFloat(inputs.latitude),
          longitude: parseFloat(inputs.longitude),
        },
        // deliverySettings: {
        //   isDeliveryAvailable: businessSettings.isDeliveryAvailable,
        //   minimumOrderAmount: parseFloat(businessSettings.minimumOrderAmount),
        //   deliveryFee: parseFloat(businessSettings.deliveryFee),
        //   freeDeliveryThreshold: parseFloat(businessSettings.freeDeliveryThreshold),
        //   maxDeliveryDistance: parseFloat(businessSettings.maxDeliveryDistance),
        //   estimatedDeliveryTime: parseFloat(businessSettings.estimatedDeliveryTime),
        // },
      };

      setLoading(true);
      createVendor(vendorData)
        .then((res) => {
          console.log('Vendor created successfully:', res);
          
          // Update user details with vendor information
          const updatedUserDetails = {
            ...userDetails,
            vendor_info: res.data
          };
          
          // Save to local storage
          writeData("user_details", updatedUserDetails);
          
          // Update Redux store
          dispatch(updateUserDetails({ userDetails: updatedUserDetails }));
          
          // Navigate to next step or show success message
          navigation.navigate('BusinessDocuments');
        })
        .catch((err) => {
          console.log('Error creating vendor:', err);
        })
        .finally(() => {
          setLoading(false);
        });
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
        <View style={{ marginTop: 24 }}>
          <Arrow onPress={() => navigation.goBack()} name={'chevron-back'} />
        </View>
        <View style={styles.titleSection}>
          <Text style={styles.title}>KYC form for vendor registration</Text>
          <Text style={styles.subTitle}>Store Information</Text>
        </View>

        <View style={styles.inputSection}>
          {/* Business Basic Information */}
          <View style={styles.sectionTitle}>
            <Text style={styles.sectionTitleText}>Basic Information</Text>
          </View>

          <View style={styles.wrapper}>
            <TextInput
              placeholder={'Business Name*'}
              placeholderTextColor={COLORS.textColor}
              keyboardType={'default'}
              onChangeText={text => handleOnChangeText(text, 'businessName')}
              onFocus={() => handleError(null, 'businessName')}
              errorMessage={errors.businessName}
              maxLength={100}
            />
          </View>

          <View style={styles.wrapper}>
            <Dropdown
              placeholder="Select Business Type*"
              data={businessTypes}
              onSelect={(item) => handleOnChangeText(item.value, 'businessType')}
              errorMessage={errors.businessType}
            />
          </View>

          <View style={styles.wrapper}>
            <TextInput
              placeholder={'Business Description (Optional)'}
              placeholderTextColor={COLORS.textColor}
              keyboardType={'default'}
              onChangeText={text => handleOnChangeText(text, 'businessDescription')}
              multiline={true}
              numberOfLines={3}
              maxLength={500}
            />
          </View>

          {/* Contact Information */}
          <View style={styles.sectionTitle}>
            <Text style={styles.sectionTitleText}>Contact Information</Text>
          </View>

          <View style={styles.wrapper}>
            <TextInput
              placeholder={'Contact Person*'}
              placeholderTextColor={COLORS.textColor}
              keyboardType={'default'}
              onChangeText={text => handleOnChangeText(text, 'contactPerson')}
              onFocus={() => handleError(null, 'contactPerson')}
              errorMessage={errors.contactPerson}
              maxLength={50}
            />
          </View>

          <View style={styles.wrapper}>
            <TextInput
              placeholder={'Business Email*'}
              placeholderTextColor={COLORS.textColor}
              keyboardType={'email-address'}
              onChangeText={text => handleOnChangeText(text, 'email')}
              onFocus={() => handleError(null, 'email')}
              errorMessage={errors.email}
            />
          </View>

          <View style={styles.inputSectionTwo}>
            <View style={[styles.wrapper, { width: '48%' }]}>
              <TextInput
                placeholder={'Phone Number*'}
                placeholderTextColor={COLORS.textColor}
                keyboardType={'phone-pad'}
                onChangeText={text => handleOnChangeText(text, 'phone')}
                onFocus={() => handleError(null, 'phone')}
                errorMessage={errors.phone}
                maxLength={10}
              />
            </View>
            <View style={[styles.wrapper, { width: '48%' }]}>
              <TextInput
                placeholder={'Alternate Phone (Optional)'}
                placeholderTextColor={COLORS.textColor}
                keyboardType={'phone-pad'}
                onChangeText={text => handleOnChangeText(text, 'alternatePhone')}
                maxLength={10}
              />
            </View>
          </View>

          {/* Address Information */}
          <View style={styles.sectionTitle}>
            <Text style={styles.sectionTitleText}>Address Information</Text>
          </View>

          <View style={styles.wrapper}>
            <TextInput
              placeholder={'Street Address*'}
              placeholderTextColor={COLORS.textColor}
              keyboardType={'default'}
              onChangeText={text => handleOnChangeText(text, 'street')}
              onFocus={() => handleError(null, 'street')}
              errorMessage={errors.street}
              maxLength={200}
            />
          </View>

          <View style={styles.inputSectionTwo}>
            <View style={[styles.wrapper, { width: '48%' }]}>
              <TextInput
                placeholder={'City*'}
                placeholderTextColor={COLORS.textColor}
                keyboardType={'default'}
                onChangeText={text => handleOnChangeText(text, 'city')}
                onFocus={() => handleError(null, 'city')}
                errorMessage={errors.city}
                maxLength={50}
              />
            </View>
            <View style={[styles.wrapper, { width: '48%' }]}>
              <TextInput
                placeholder={'State*'}
                placeholderTextColor={COLORS.textColor}
                keyboardType={'default'}
                onChangeText={text => handleOnChangeText(text, 'state')}
                onFocus={() => handleError(null, 'state')}
                errorMessage={errors.state}
                maxLength={50}
              />
            </View>
          </View>

          <View style={styles.inputSectionTwo}>
            <View style={[styles.wrapper, { width: '48%' }]}>
              <TextInput
                placeholder={'Postal Code*'}
                placeholderTextColor={COLORS.textColor}
                keyboardType={'numeric'}
                onChangeText={text => handleOnChangeText(text, 'postalCode')}
                onFocus={() => handleError(null, 'postalCode')}
                errorMessage={errors.postalCode}
                maxLength={6}
              />
            </View>
            <View style={[styles.wrapper, { width: '48%' }]}>
              <TextInput
                placeholder={'Country'}
                placeholderTextColor={COLORS.textColor}
                keyboardType={'default'}
                value={inputs.country}
                editable={false}
              />
            </View>
          </View>

          {/* Location */}
          <View style={styles.locationSection}>
            <View style={styles.locationWrapper}>
              <Text style={styles.locationText}>Location Coordinates</Text>
              <MaterialIcons
                name="my-location"
                size={24}
                color={COLORS.primary}
                onPress={getLocation}
              />
            </View>
            <View style={[styles.inputSectionTwo, { marginVertical: 10 }]}>
              <View style={[styles.wrapper, { width: '48%' }]}>
                <TextInput
                  placeholder={'Latitude'}
                  placeholderTextColor={COLORS.textColor}
                  keyboardType={'numeric'}
                  value={inputs.latitude}
                  editable={false}
                />
              </View>
              <View style={[styles.wrapper, { width: '48%' }]}>
                <TextInput
                  placeholder={'Longitude'}
                  placeholderTextColor={COLORS.textColor}
                  keyboardType={'numeric'}
                  value={inputs.longitude}
                  editable={false}
                />
              </View>
            </View>
            {errors.location && (
              <Text style={styles.errorText}>{errors.location}</Text>
            )}
          </View>

          {/* Delivery Settings */}
          {/* <View style={styles.sectionTitle}>
            <Text style={styles.sectionTitleText}>Delivery Settings</Text>
          </View> */}

          {/* <View style={styles.inputSectionTwo}>
            <View style={[styles.wrapper, {width: '48%'}]}>
              <TextInput
                placeholder={'Min Order Amount (₹)'}
                placeholderTextColor={COLORS.textColor}
                keyboardType={'numeric'}
                onChangeText={text => handleSettingsChange(text, 'minimumOrderAmount')}
                value={businessSettings.minimumOrderAmount}
              />
            </View>
            <View style={[styles.wrapper, {width: '48%'}]}>
              <TextInput
                placeholder={'Delivery Fee (₹)'}
                placeholderTextColor={COLORS.textColor}
                keyboardType={'numeric'}
                onChangeText={text => handleSettingsChange(text, 'deliveryFee')}
                value={businessSettings.deliveryFee}
              />
            </View>
          </View> */}

          {/* <View style={styles.inputSectionTwo}>
            <View style={[styles.wrapper, {width: '48%'}]}>
              <TextInput
                placeholder={'Free Delivery Above (₹)'}
                placeholderTextColor={COLORS.textColor}
                keyboardType={'numeric'}
                onChangeText={text => handleSettingsChange(text, 'freeDeliveryThreshold')}
                value={businessSettings.freeDeliveryThreshold}
              />
            </View>
            <View style={[styles.wrapper, {width: '48%'}]}>
              <TextInput
                placeholder={'Max Distance (km)'}
                placeholderTextColor={COLORS.textColor}
                keyboardType={'numeric'}
                onChangeText={text => handleSettingsChange(text, 'maxDeliveryDistance')}
                value={businessSettings.maxDeliveryDistance}
              />
            </View>
          </View> */}

          {/* Business Images */}
          {/* <View style={styles.sectionTitle}>
            <Text style={styles.sectionTitleText}>Business Images</Text>
          </View>

          <View style={styles.imageSection}>
            <Text style={styles.imageLabel}>Business Logo</Text>
            {inputs.businessLogo ? (
              <View style={styles.imageContainer}>
                <ImageBackground
                  source={{uri: inputs.businessLogo}}
                  style={styles.image}>
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => setInputs(prevState => ({...prevState, businessLogo: null}))}>
                    <Text style={styles.removeButtonText}>Remove</Text>
                  </TouchableOpacity>
                </ImageBackground>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.addImageButton}
                activeOpacity={0.8}
                onPress={() => openImagePicker('businessLogo')}>
                <MaterialIcons name="add-to-photos" size={36} color={COLORS.iconColor} />
                <Text style={styles.addPhotoText}>Add Business Logo</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.imageSection}>
            <Text style={styles.imageLabel}>Business Banner</Text>
            {inputs.businessBanner ? (
              <View style={styles.imageContainer}>
                <ImageBackground
                  source={{uri: inputs.businessBanner}}
                  style={styles.image}>
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => setInputs(prevState => ({...prevState, businessBanner: null}))}>
                    <Text style={styles.removeButtonText}>Remove</Text>
                  </TouchableOpacity>
                </ImageBackground>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.addImageButton}
                activeOpacity={0.8}
                onPress={() => openImagePicker('businessBanner')}>
                <MaterialIcons name="add-to-photos" size={36} color={COLORS.iconColor} />
                <Text style={styles.addPhotoText}>Add Business Banner</Text>
              </TouchableOpacity>
            )}
          </View> */}
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
  sectionTitle: {
    marginVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGrey,
    paddingBottom: 8,
  },
  sectionTitleText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.black,
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
    padding: 12,
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
  errorText: {
    color: COLORS.error,
    fontSize: 12,
    marginTop: 4,
  },
  imageSection: {
    marginVertical: 8,
  },
  imageLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textColor,
    marginBottom: 8,
  },
  addImageButton: {
    backgroundColor: COLORS.lightGrey,
    height: 120,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: COLORS.lightPrimary,
  },
  image: {
    height: 120,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  removeButton: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: COLORS.error,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
  },
  removeButtonText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '500',
  },
  addPhotoText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textColor,
    marginTop: 4,
  },
});

export default StoreInformation;

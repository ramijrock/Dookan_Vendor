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

const UploadDocs = () => {
  const navigation = useNavigation();
  const [inputs, setInputs] = useState({
    panDocs: '',
    aadharDocs: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const openImagePicker = type => {
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
        if (type == 'pan') {
          setInputs({...inputs, panDocs: imageUri});
        } else {
          setInputs({...inputs, aadharDocs: imageUri});
        }
      }
    });
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
          <Text style={styles.subTitle}>Upload Document</Text>
        </View>
        <View style={styles.inputSection}>
          {inputs.panDocs ? (
            <View
              style={styles.imageWrapper}>
              <ImageBackground
                source={{uri: inputs.panDocs}}
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
                    onPress={() => setInputs({...inputs, panDocs: null})}
                  />
                </View>
              </ImageBackground>
            </View>
          ) : (
            <View style={styles.imageSection}>
              <TouchableOpacity
                style={{alignItems: 'center'}}
                activeOpacity={0.8}
                onPress={() => openImagePicker('pan')}>
                <MaterialIcons
                  name="add-to-photos"
                  size={36}
                  color={COLORS.iconColor}
                />
                <Text style={styles.addPhotoText}>Add Pan Image</Text>
              </TouchableOpacity>
            </View>
          )}

          {inputs.aadharDocs ? (
            <View
              style={styles.imageWrapper}>
              <ImageBackground
                source={{uri: inputs.aadharDocs}}
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
                    onPress={() => setInputs({...inputs, aadharDocs: null})}
                  />
                </View>
              </ImageBackground>
            </View>
          ) : (
            <View style={styles.imageSection}>
              <TouchableOpacity
                style={{alignItems: 'center'}}
                activeOpacity={0.8}
                onPress={() => openImagePicker('aadhar')}>
                <MaterialIcons
                  name="add-to-photos"
                  size={36}
                  color={COLORS.iconColor}
                />
                <Text style={styles.addPhotoText}>Add Aadhar Image</Text>
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
  image: {
    height: 180,
    resizeMode: 'cover',
    borderRadius: 8,
    marginVertical: 8,
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
  btnSection: {
    marginVertical: 20,
  },
  imageWrapper:{
    borderWidth: 1,
    borderRadius: 8,
    borderColor: COLORS.lightPrimary,
    marginVertical:8
  }
});

export default UploadDocs;

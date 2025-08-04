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
} from 'react-native';
import {COLORS} from '../../utils/globalColors';
import {Arrow, Button, TextInput} from '../../components';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {launchImageLibrary} from 'react-native-image-picker';

const BusinessDocuments = () => {
  const navigation = useNavigation();
  const [inputs, setInputs] = useState({
    taxId: '',
    gstNumber: '',
    panNumber: '',
    businessLicense: '',
    fssaiLicense: '',
  });

  const [documents, setDocuments] = useState({
    businessRegistration: null,
    taxCertificate: null,
    fssaiCertificate: null,
    addressProof: null,
    idProof: null,
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleOnChangeText = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };

  const handleError = (errorMessage, input) => {
    setErrors(prevState => ({...prevState, [input]: errorMessage}));
  };

  const openImagePicker = (type) => {
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
        setDocuments(prevState => ({...prevState, [type]: imageUri}));
      }
    });
  };

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;
    let gstRegx = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    let panRegx = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

    // GST Number validation
    if (!inputs.gstNumber) {
      handleError('GST number is required!', 'gstNumber');
      isValid = false;
    } else if (!inputs.gstNumber.match(gstRegx)) {
      handleError('Enter valid GST number!', 'gstNumber');
      isValid = false;
    }

    // PAN Number validation
    if (!inputs.panNumber) {
      handleError('PAN number is required!', 'panNumber');
      isValid = false;
    } else if (!inputs.panNumber.match(panRegx)) {
      handleError('Enter valid PAN number!', 'panNumber');
      isValid = false;
    }

    // Required documents validation
    if (!documents.businessRegistration) {
      handleError('Business registration document is required!', 'businessRegistration');
      isValid = false;
    }

    if (!documents.fssaiCertificate) {
      handleError('FSSAI certificate is required!', 'fssaiCertificate');
      isValid = false;
    }

    if (!documents.addressProof) {
      handleError('Address proof is required!', 'addressProof');
      isValid = false;
    }

    if (!documents.idProof) {
      handleError('ID proof is required!', 'idProof');
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = () => {
    if (validate()) {
      const businessData = {
        ...inputs,
        documents: {
          businessRegistration: documents.businessRegistration,
          taxCertificate: documents.taxCertificate,
          fssaiCertificate: documents.fssaiCertificate,
          addressProof: documents.addressProof,
          idProof: documents.idProof,
        },
      };
      
      console.log('Business documents data:', businessData);
      // Navigate to next step
      navigation.navigate('BankInformation');
    }
  };

  const renderDocumentUpload = (title, type, required = false) => (
    <View style={styles.documentSection}>
      <Text style={styles.documentTitle}>
        {title} {required && <Text style={styles.required}>*</Text>}
      </Text>
      {documents[type] ? (
        <View style={styles.documentContainer}>
          <ImageBackground
            source={{uri: documents[type]}}
            style={styles.documentImage}>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => setDocuments(prevState => ({...prevState, [type]: null}))}>
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          </ImageBackground>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.addDocumentButton}
          activeOpacity={0.8}
          onPress={() => openImagePicker(type)}>
          <MaterialIcons name="add-to-photos" size={36} color={COLORS.iconColor} />
          <Text style={styles.addDocumentText}>Upload {title}</Text>
        </TouchableOpacity>
      )}
      {errors[type] && (
        <Text style={styles.errorText}>{errors[type]}</Text>
      )}
    </View>
  );

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
          <Text style={styles.subTitle}>Business Documents</Text>
        </View>
        
        <View style={styles.inputSection}>
          {/* Business Licenses */}
          <View style={styles.sectionTitle}>
            <Text style={styles.sectionTitleText}>Business Licenses & Numbers</Text>
          </View>
          
          <View style={styles.wrapper}>
            <TextInput
              placeholder={'GST Number*'}
              placeholderTextColor={COLORS.textColor}
              keyboardType={'default'}
              onChangeText={text => handleOnChangeText(text.toUpperCase(), 'gstNumber')}
              onFocus={() => handleError(null, 'gstNumber')}
              errorMessage={errors.gstNumber}
              maxLength={15}
            />
          </View>

          <View style={styles.wrapper}>
            <TextInput
              placeholder={'PAN Number*'}
              placeholderTextColor={COLORS.textColor}
              keyboardType={'default'}
              onChangeText={text => handleOnChangeText(text.toUpperCase(), 'panNumber')}
              onFocus={() => handleError(null, 'panNumber')}
              errorMessage={errors.panNumber}
              maxLength={10}
            />
          </View>

          <View style={styles.wrapper}>
            <TextInput
              placeholder={'Tax ID (Optional)'}
              placeholderTextColor={COLORS.textColor}
              keyboardType={'default'}
              onChangeText={text => handleOnChangeText(text, 'taxId')}
            />
          </View>

          <View style={styles.wrapper}>
            <TextInput
              placeholder={'Business License Number (Optional)'}
              placeholderTextColor={COLORS.textColor}
              keyboardType={'default'}
              onChangeText={text => handleOnChangeText(text, 'businessLicense')}
            />
          </View>

          <View style={styles.wrapper}>
            <TextInput
              placeholder={'FSSAI License Number (Optional)'}
              placeholderTextColor={COLORS.textColor}
              keyboardType={'default'}
              onChangeText={text => handleOnChangeText(text, 'fssaiLicense')}
            />
          </View>

          {/* Required Documents */}
          <View style={styles.sectionTitle}>
            <Text style={styles.sectionTitleText}>Required Documents</Text>
          </View>

          {renderDocumentUpload('Business Registration Certificate', 'businessRegistration', true)}
          {renderDocumentUpload('FSSAI Certificate', 'fssaiCertificate', true)}
          {renderDocumentUpload('Address Proof', 'addressProof', true)}
          {renderDocumentUpload('ID Proof', 'idProof', true)}

          {/* Optional Documents */}
          <View style={styles.sectionTitle}>
            <Text style={styles.sectionTitleText}>Optional Documents</Text>
          </View>

          {renderDocumentUpload('Tax Certificate', 'taxCertificate', false)}
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
  btnSection: {
    marginVertical: 20,
  },
  documentSection: {
    marginVertical: 12,
  },
  documentTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textColor,
    marginBottom: 8,
  },
  required: {
    color: COLORS.error,
  },
  addDocumentButton: {
    backgroundColor: COLORS.lightGrey,
    height: 100,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.lightGrey,
    borderStyle: 'dashed',
  },
  documentContainer: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: COLORS.lightPrimary,
  },
  documentImage: {
    height: 100,
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
  addDocumentText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textColor,
    marginTop: 4,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 12,
    marginTop: 4,
  },
});

export default BusinessDocuments; 
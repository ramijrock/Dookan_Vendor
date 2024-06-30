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
  Image,
} from 'react-native';
import {COLORS} from '../../utils/globalColors';
import {Arrow, Button, TextInput} from '../../components';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {launchImageLibrary} from 'react-native-image-picker';
import Geolocation from 'react-native-geolocation-service';

const KycSubmitted = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    console.log('called');
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
        <View style={styles.innerBody}>
          <Text style={styles.innerTitle}>Successful Registration</Text>
          <Image
            source={require('../../assets/images/kyc.png')}
            style={{height: 200, width: 200, resizeMode:'contain'}}
          />
          <Image
            source={require('../../assets/images/done.png')}
            style={{height: 50, width: '80%', marginVertical: 20, resizeMode:'contain'}}
          />
        </View>
        <View style={styles.btnSection}>
          <Button
            fontSize={18}
            height={50}
            btnName={`Vendor's Login`}
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
  innerBody: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    marginVertical: 50,
    paddingTop: 30,
    borderRadius: 15,
    paddingHorizontal: 10,
    alignItems: 'center'
  },
  innerTitle: {
    position: 'absolute',
    top: -19,
    backgroundColor: COLORS.white,
    textAlign: 'center',
    alignSelf: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color:COLORS.textColor,
    borderColor:COLORS.primary,
    borderWidth:1,
    borderRadius:4
  },
  btnSection: {
    marginVertical: 20,
  },
});

export default KycSubmitted;

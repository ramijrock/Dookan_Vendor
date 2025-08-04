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
  Switch,
} from 'react-native';
import {COLORS} from '../../utils/globalColors';
import {Arrow, Button, TextInput} from '../../components';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const OperatingHours = () => {
  const navigation = useNavigation();
  const [operatingHours, setOperatingHours] = useState({
    monday: { open: '09:00', close: '18:00', isOpen: true },
    tuesday: { open: '09:00', close: '18:00', isOpen: true },
    wednesday: { open: '09:00', close: '18:00', isOpen: true },
    thursday: { open: '09:00', close: '18:00', isOpen: true },
    friday: { open: '09:00', close: '18:00', isOpen: true },
    saturday: { open: '09:00', close: '18:00', isOpen: true },
    sunday: { open: '09:00', close: '18:00', isOpen: true },
  });

  const [paymentMethods, setPaymentMethods] = useState({
    cash: true,
    card: true,
    upi: true,
    netBanking: false,
    wallet: false,
  });

  const [businessSettings, setBusinessSettings] = useState({
    autoAcceptOrders: false,
    orderNotification: true,
    stockAlert: true,
    lowStockThreshold: '10',
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const days = [
    { key: 'monday', label: 'Monday' },
    { key: 'tuesday', label: 'Tuesday' },
    { key: 'wednesday', label: 'Wednesday' },
    { key: 'thursday', label: 'Thursday' },
    { key: 'friday', label: 'Friday' },
    { key: 'saturday', label: 'Saturday' },
    { key: 'sunday', label: 'Sunday' },
  ];

  const paymentOptions = [
    { key: 'cash', label: 'Cash' },
    { key: 'card', label: 'Card' },
    { key: 'upi', label: 'UPI' },
    { key: 'netBanking', label: 'Net Banking' },
    { key: 'wallet', label: 'Digital Wallet' },
  ];

  const handleTimeChange = (day, field, value) => {
    setOperatingHours(prevState => ({
      ...prevState,
      [day]: {
        ...prevState[day],
        [field]: value,
      },
    }));
  };

  const handleDayToggle = (day) => {
    setOperatingHours(prevState => ({
      ...prevState,
      [day]: {
        ...prevState[day],
        isOpen: !prevState[day].isOpen,
      },
    }));
  };

  const handlePaymentToggle = (method) => {
    setPaymentMethods(prevState => ({
      ...prevState,
      [method]: !prevState[method],
    }));
  };

  const handleSettingToggle = (setting) => {
    setBusinessSettings(prevState => ({
      ...prevState,
      [setting]: !prevState[setting],
    }));
  };

  const handleSettingChange = (text, setting) => {
    setBusinessSettings(prevState => ({
      ...prevState,
      [setting]: text,
    }));
  };

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    // Check if at least one day is open
    const hasOpenDay = Object.values(operatingHours).some(day => day.isOpen);
    if (!hasOpenDay) {
      handleError('At least one day must be open!', 'operatingHours');
      isValid = false;
    }

    // Check if at least one payment method is selected
    const hasPaymentMethod = Object.values(paymentMethods).some(method => method);
    if (!hasPaymentMethod) {
      handleError('At least one payment method must be selected!', 'paymentMethods');
      isValid = false;
    }

    // Validate low stock threshold
    if (businessSettings.lowStockThreshold && 
        (isNaN(businessSettings.lowStockThreshold) || 
         parseInt(businessSettings.lowStockThreshold) < 1)) {
      handleError('Low stock threshold must be a positive number!', 'lowStockThreshold');
      isValid = false;
    }

    return isValid;
  };

  const handleError = (errorMessage, input) => {
    setErrors(prevState => ({...prevState, [input]: errorMessage}));
  };

  const handleSubmit = () => {
    if (validate()) {
      const settingsData = {
        operatingHours,
        paymentMethods,
        settings: {
          autoAcceptOrders: businessSettings.autoAcceptOrders,
          orderNotification: businessSettings.orderNotification,
          stockAlert: businessSettings.stockAlert,
          lowStockThreshold: parseInt(businessSettings.lowStockThreshold) || 10,
        },
      };
      
      console.log('Settings data:', settingsData);
      // Navigate to final step
      navigation.navigate('KycSubmitted');
    }
  };

  const renderDayRow = (day) => (
    <View key={day.key} style={styles.dayRow}>
      <View style={styles.dayInfo}>
        <Text style={styles.dayLabel}>{day.label}</Text>
        <Switch
          value={operatingHours[day.key].isOpen}
          onValueChange={() => handleDayToggle(day.key)}
          trackColor={{ false: COLORS.lightGrey, true: COLORS.primary }}
          thumbColor={COLORS.white}
        />
      </View>
      {operatingHours[day.key].isOpen && (
        <View style={styles.timeRow}>
          <View style={styles.timeInput}>
            <Text style={styles.timeLabel}>Open</Text>
            <TextInput
              style={styles.timePicker}
              value={operatingHours[day.key].open}
              onChangeText={(text) => handleTimeChange(day.key, 'open', text)}
              placeholder="09:00"
              placeholderTextColor={COLORS.textColor}
            />
          </View>
          <View style={styles.timeInput}>
            <Text style={styles.timeLabel}>Close</Text>
            <TextInput
              style={styles.timePicker}
              value={operatingHours[day.key].close}
              onChangeText={(text) => handleTimeChange(day.key, 'close', text)}
              placeholder="18:00"
              placeholderTextColor={COLORS.textColor}
            />
          </View>
        </View>
      )}
    </View>
  );

  const renderPaymentMethod = (method) => (
    <View key={method.key} style={styles.paymentRow}>
      <Text style={styles.paymentLabel}>{method.label}</Text>
      <Switch
        value={paymentMethods[method.key]}
        onValueChange={() => handlePaymentToggle(method.key)}
        trackColor={{ false: COLORS.lightGrey, true: COLORS.primary }}
        thumbColor={COLORS.white}
      />
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
          <Text style={styles.subTitle}>Operating Hours & Settings</Text>
        </View>
        
        <View style={styles.inputSection}>
          {/* Operating Hours */}
          <View style={styles.sectionTitle}>
            <Text style={styles.sectionTitleText}>Operating Hours</Text>
          </View>
          
          {days.map(renderDayRow)}
          
          {errors.operatingHours && (
            <Text style={styles.errorText}>{errors.operatingHours}</Text>
          )}

          {/* Payment Methods */}
          <View style={styles.sectionTitle}>
            <Text style={styles.sectionTitleText}>Payment Methods</Text>
          </View>
          
          {paymentOptions.map(renderPaymentMethod)}
          
          {errors.paymentMethods && (
            <Text style={styles.errorText}>{errors.paymentMethods}</Text>
          )}

          {/* Business Settings */}
          <View style={styles.sectionTitle}>
            <Text style={styles.sectionTitleText}>Business Settings</Text>
          </View>

          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Auto Accept Orders</Text>
            <Switch
              value={businessSettings.autoAcceptOrders}
              onValueChange={() => handleSettingToggle('autoAcceptOrders')}
              trackColor={{ false: COLORS.lightGrey, true: COLORS.primary }}
              thumbColor={COLORS.white}
            />
          </View>

          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Order Notifications</Text>
            <Switch
              value={businessSettings.orderNotification}
              onValueChange={() => handleSettingToggle('orderNotification')}
              trackColor={{ false: COLORS.lightGrey, true: COLORS.primary }}
              thumbColor={COLORS.white}
            />
          </View>

          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Stock Alerts</Text>
            <Switch
              value={businessSettings.stockAlert}
              onValueChange={() => handleSettingToggle('stockAlert')}
              trackColor={{ false: COLORS.lightGrey, true: COLORS.primary }}
              thumbColor={COLORS.white}
            />
          </View>

          {businessSettings.stockAlert && (
            <View style={styles.wrapper}>
              <TextInput
                placeholder={'Low Stock Threshold'}
                placeholderTextColor={COLORS.textColor}
                keyboardType={'numeric'}
                onChangeText={text => handleSettingChange(text, 'lowStockThreshold')}
                value={businessSettings.lowStockThreshold}
                errorMessage={errors.lowStockThreshold}
              />
            </View>
          )}
        </View>

        <View style={styles.btnSection}>
          <Button
            fontSize={18}
            height={50}
            btnName={'Submit KYC'}
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
  dayRow: {
    marginVertical: 8,
    padding: 12,
    backgroundColor: COLORS.lightGrey,
    borderRadius: 8,
  },
  dayInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  dayLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.textColor,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeInput: {
    flex: 1,
    marginHorizontal: 4,
  },
  timeLabel: {
    fontSize: 12,
    color: COLORS.textColor,
    marginBottom: 4,
  },
  timePicker: {
    backgroundColor: COLORS.white,
    padding: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.lightGrey,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGrey,
  },
  paymentLabel: {
    fontSize: 16,
    color: COLORS.textColor,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGrey,
  },
  settingLabel: {
    fontSize: 16,
    color: COLORS.textColor,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 12,
    marginTop: 4,
  },
});

export default OperatingHours; 
import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { COLORS } from "../../utils/globalColors";
import Ionicons from 'react-native-vector-icons/Ionicons';


const TextInputComponent = ({
    placeholder, 
    placeholderTextColor, 
    name, 
    value, 
    keyboardType, 
    leftName, 
    password,
    onChangeText, 
    errorMessage, 
    onFocus = () => {}, 
    maxLength, 
    secureTextEntry,
    ...props
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hidePassword, setHidePassword] = useState(password);
    return(
        <>
            <View style={[styles.inputBox, {
                paddingLeft: leftName ? 35 : 10,
                borderColor: errorMessage ? 'red' : isFocused ? COLORS.primary : null,
            }]}>
                <TextInput 
                    {...props}
                    autoCorrect={false}
                    placeholder={placeholder} 
                    placeholderTextColor={placeholderTextColor} 
                    style={styles.input}
                    cursorColor={COLORS.textColor}
                    value={value}
                    keyboardType={keyboardType}
                    onChangeText={onChangeText}
                    onFocus={() => {
                        onFocus();
                        setIsFocused(true);
                    }}
                    onBlur={() => {
                        setIsFocused(false);
                    }}
                    maxLength={maxLength}
                    secureTextEntry={hidePassword}
                />
                <Ionicons name={leftName} color={COLORS.iconColor} style={styles.leftIcon} size={25} />
                {
                    password ? 
                    <TouchableOpacity style={styles.rightIcon} onPress={() => setHidePassword(!hidePassword)}>
                        <Ionicons name={hidePassword ? 'lock-closed-outline' : "lock-open-outline"} color={COLORS.iconColor} size={25} />
                    </TouchableOpacity> :
                    <Ionicons name={name} color={COLORS.iconColor} style={styles.rightIcon} size={25} />}
            </View>
            {
                errorMessage && <View style={styles.errorBox}>
                    <Text style={styles.error}>{errorMessage}</Text>
                </View>
            }
        </>
    )
}

const styles = StyleSheet.create({
    inputBox:{
        height:50,
        backgroundColor:COLORS.white,
        borderRadius:10,
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:10,
        borderWidth:0.5
    },
    input:{
        fontSize:16,
        fontWeight:'500',
        letterSpacing:0.5,
        flex:0.9,
        color:COLORS.textColor
    },
    rightIcon:{
        position:'absolute',
        right:10
    },
    leftIcon:{
        position:'absolute',
        left:10
    },
    errorBox:{
        paddingVertical:2,
        paddingLeft:5
    },
    error:{
        color:COLORS.error,
        letterSpacing:0.5,
    }
});

export default TextInputComponent;
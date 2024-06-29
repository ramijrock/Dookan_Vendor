import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { COLORS } from "../../utils/globalColors";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


const CheckBoxComponent = ({title, error, errorMessage, checked, onPress, onFocus}) => {
    const [isFocused, setIsFocused] = useState(false);
    const iconName = checked ? "checkbox-marked" : "checkbox-blank-outline";
    return (
        <>
            <View style={styles.checkBoxContainer}>
                <TouchableOpacity 
                    onPress={onPress} 
                    onFocus={() => {
                        onFocus();
                        setIsFocused(true)
                    }}
                    onBlur={() => setIsFocused(false)}
                >
                    <MaterialCommunityIcons name={iconName} size={24} color={COLORS.primary} />
                </TouchableOpacity>
                <Text style={styles.titleText}>{title}</Text>
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
    checkBoxContainer:{
        flexDirection:'row',
        alignItems:'center',
    },
    titleText:{
        color:COLORS.textColor,
        fontSize:14,
        fontWeight:'400'
    },
    errorBox:{
        paddingLeft:9
    },
    error:{
        color:COLORS.error,
        letterSpacing:0.5,
        lineHeight:15
    }
})

export default CheckBoxComponent;
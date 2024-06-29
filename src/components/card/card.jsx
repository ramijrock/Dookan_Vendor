import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS } from "../../utils/globalColors";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const Card = ({leftIcon, title, icon, onPress}) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.iconSection}>
                <MaterialCommunityIcons name={leftIcon} size={24} color={COLORS.white} />
            </View>
            <View style={styles.titleSection}>
                <Text style={styles.title}>{title}</Text>
            </View>
            <View style={styles.rightIcon}>
                <MaterialCommunityIcons name={icon} size={36} />
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container:{
        backgroundColor:COLORS.lightwhite,
        padding:8,
        marginVertical:5,
        borderRadius:8,
        flexDirection:'row',
        alignItems:'center'
    },
    iconSection:{
        height:40,
        width:40,
        backgroundColor:COLORS.primary,
        borderRadius:50,
        alignItems:'center',
        justifyContent:'center'
    },
    titleSection:{
        marginHorizontal:20
    },
    title:{
        fontSize:16,
        fontWeight:'400',
        color:COLORS.textColor
    },
    rightIcon:{
        position:'absolute',
        right:5
    }
})

export default Card;
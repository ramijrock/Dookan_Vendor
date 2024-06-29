import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Dimensions } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from "../../utils/globalColors";

const {height, width} = Dimensions.get('window')
const Arrow = ({onPress, name, title, notification, onPressOthers}) => {
    return(
        <View style={styles.container}>
            <TouchableOpacity onPress={onPress}>
                <View style={onPress ? styles.arrow : null}>
                    <Ionicons name={name} color={'#fff'} size={25} />
                </View>
            </TouchableOpacity> 
            <View style={styles.titleSection}>
                <Text style={styles.pageTitle}>{title}</Text>
            </View>
            <View style={styles.rightIcon}>
                <Ionicons name={notification} color={COLORS.primary} size={25} onPress={onPressOthers} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        alignItems:'center',
        // backgroundColor:'red',
        // justifyContent:'center'
    },
    arrow: {
        backgroundColor:COLORS.primary,
        borderRadius:50,
        width:35,
        height:35,
        justifyContent:'center',
        alignItems:'center',
        // position:'absolute',
        // left:0
    },
    pageTitle:{
        fontSize:18,
        fontWeight:'bold',
        textTransform:'capitalize',
        color:COLORS.textColor
    },
    titleSection: {
        position:'absolute', 
        left:0, 
        top:0, 
        right:0, 
        bottom:0, 
        alignItems:'center', 
        justifyContent:'center'
    },
    rightIcon: {
        position:'absolute',
        right:5
    }
});

export default Arrow;
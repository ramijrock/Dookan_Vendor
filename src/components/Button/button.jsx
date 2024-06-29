import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { COLORS } from "../../utils/globalColors";
import Loader from "../Loader/loader";

const Button = ({btnName, height, onPress, fontSize, borderRadius, backgroundColor, color, borderWidth, borderColor, loading}) => {
    return(
        <>
            <TouchableOpacity onPress={onPress} style={[styles.btn, {height: height, borderRadius:borderRadius, backgroundColor: backgroundColor ? backgroundColor : COLORS.primary, borderColor: borderColor, borderWidth: borderWidth}]}> 
                {
                    loading ? <Loader /> :
                    <Text style={[styles.btnText, {fontSize: fontSize, color: color}]}>{btnName}</Text>
                }
            </TouchableOpacity>
        </>
    )
}


const styles = StyleSheet.create({
    btn: {
        // height:50,
        width:'100%',
        backgroundColor:COLORS.primary,
        // borderRadius:12,
        justifyContent:'center',
        alignItems:'center',
        paddingHorizontal:5
    },
    btnText: {
        // fontSize:18,
        fontWeight:'bold',
        color:'white',
        letterSpacing:0.5,
        textTransform:'capitalize'
    }
});


export default Button;
import React from "react";
import { StyleSheet, TouchableOpacity, Image } from "react-native";
import { COLORS } from "../../utils/globalColors";


const SocialButton = ({source}) => {
    return (
        <>
            <TouchableOpacity style={styles.scBtn}>
                <Image source={source} style={styles.scIcon}  />
            </TouchableOpacity>
        </>
    )
}


const styles = StyleSheet.create({
    scBtn:{
        backgroundColor:COLORS.white,
        alignSelf:'center',
        width:50,
        height:50,
        borderRadius:50,
        alignItems:'center',
        justifyContent:'center',
        marginHorizontal:5
    },
    scIcon:{
        width:30,
        height:30,
        resizeMode:"contain",
        alignSelf:'center',
        alignItems:'center',
        justifyContent:'center'
    }
})

export default SocialButton;
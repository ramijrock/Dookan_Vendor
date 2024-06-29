import React from "react";
import { View, StyleSheet, ActivityIndicator, Text } from "react-native";
import { COLORS } from "../../utils/globalColors";

const Loader = () => {
    return (
        <>
            <View style={styles.loaderContainer}>
                <ActivityIndicator color={COLORS.white} size={35} />
                <Text style={styles.loaderText}>Loading...</Text>
            </View>
        </>
    )
}


const styles = StyleSheet.create({
    loaderContainer:{
        flexDirection:'row',
        alignItems:'center'
    },
    loaderText:{
        fontSize:16,
        marginHorizontal:5,
        color:COLORS.white
    }
})

export default Loader;
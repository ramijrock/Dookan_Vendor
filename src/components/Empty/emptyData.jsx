import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../../utils/globalColors";

const EmptyData = ({title}) => {
    return (
        <View style={styles.emptyContainer}>
            <Text style={styles.label}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    emptyContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    label:{
        fontSize:16,
        fontWeight:'500',
        color:COLORS.textColor
    }
})

export default EmptyData;
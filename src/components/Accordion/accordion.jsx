import React, { useRef, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image, Animated, LayoutAnimation, Dimensions } from "react-native";
import { COLORS } from "../../utils/globalColors";
import { toggleAnimation } from "./toggleAnimation";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button} from "../../components";

const {width, height} = Dimensions.get('window');

const Accordion = () => {
    const [showContent, setShowContent] = useState(false);
    const animationController = useRef(new Animated.Value(0)).current;

    const toggleListItem = () => {
        const config = {
            duration: 300,
            toValue: showContent ? 0 : 1,
            useNativeDriver: true
        }
        Animated.timing(animationController, config).start();
        LayoutAnimation.configureNext(toggleAnimation)
        setShowContent(!showContent)
    }

    const ArrowTransform = animationController.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg']
    })
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={()=> toggleListItem()}>
                <View style={styles.titleContainer}>
                    <View style={styles.titleLeftSection}>
                        <Text style={styles.title}>Product review</Text>
                        <Animated.View style={{transform: [{rotateZ: ArrowTransform}]}}>
                            <Image source={require('../../assets/images/dropdown.png')} style={styles.icon} />
                        </Animated.View>
                    </View>
                    <View style={styles.titleRightSection}>
                        <MaterialCommunityIcons name="calendar" size={25} color={COLORS.primary} />
                        <Text style={styles.rightTitleInner}>10-NOV-23</Text>
                    </View>
                </View>
            </TouchableOpacity>
            {
                showContent && 
            <View style={styles.bodyContainer}>
                <View style={styles.reviewSection}>
                    <Image source={require('../../assets/images/profile.jpg')} style={styles.reviewPerson} />
                    <View>
                        <Text style={styles.reviewMsg}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. </Text>
                        <View style={styles.reviewFooter}>
                            <MaterialCommunityIcons name="calendar" size={25} color={COLORS.primary} />
                            <Text style={styles.ratingDate}>10-Nov-22</Text>
                            <View style={styles.ratingStar}>
                                <MaterialCommunityIcons name="star-outline" size={25} color={COLORS.primary} />
                                <MaterialCommunityIcons name="star-outline" size={25} color={COLORS.primary} />
                                <MaterialCommunityIcons name="star-outline" size={25} color={COLORS.primary} />
                                <MaterialCommunityIcons name="star-outline" size={25} color={COLORS.primary} />
                                <MaterialCommunityIcons name="star-outline" size={25} color={COLORS.primary} />
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{width:width*0.22, alignSelf:'center'}}>
                    <Button btnName={'View More'} borderRadius={10} height={25} borderColor={COLORS.primary} color={COLORS.primary} fontSize={13} backgroundColor={'transparent'} borderWidth={1} />
                </View>
            </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width: '100%',
        padding:10,
        borderRadius:12,
        backgroundColor:COLORS.white,
        marginBottom:10,
        overflow:'hidden'
    },
    title:{
        fontSize:16,
        color:COLORS.textColor,
        fontWeight:'bold',
        lineHeight:20
    },
    body:{
        paddingHorizontal:10,
        paddingVertical:10,
    },
    titleContainer:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        // borderBottomWidth:0.5,
        // paddingBottom:10,
        // borderBottomColor:COLORS.lightGrey
    },
    icon:{
        height:15,
        width:15,
        marginHorizontal:10
    },
    bodyContainer:{
        marginTop:10
    },
    titleLeftSection:{
        flexDirection:'row',
        alignItems:'center'
    }, 
    titleRightSection:{
        flexDirection:'row',
        alignItems:'center',
    },
    rightTitleInner:{
        marginHorizontal:15,
        color:COLORS.textColor
    },
    reviewSection:{
        flexDirection:'row',
    },
    reviewPerson:{
        height:40,
        width:40,
        borderRadius:50,
        resizeMode:'contain',
        marginRight:5
    },
    reviewMsg:{
        width:width*0.8,
        lineHeight:18,
        textAlign:'left',
        letterSpacing:0.5,
        color:COLORS.tab
    },
    reviewFooter:{
        flexDirection:'row',
        alignItems:'center',
        marginVertical:5
    },
    ratingDate:{
        marginLeft:10,
        fontWeight:'400',
        color:COLORS.black
    },
    ratingStar:{
        flexDirection:'row',
        alignItems:'center',
        position:'absolute',
        right:0
    }
})

export default Accordion;
import { useNavigation } from "@react-navigation/native";
import React, { useRef } from "react";
import { View, StyleSheet, Text, FlatList, Image, Dimensions } from "react-native";
import { Arrow, Button } from "../../components";
import { COLORS } from "../../utils/globalColors";

const slides = [
    {
        id:0,
        image:require('../../assets/images/food.png'),
        title:'Well Health',
        subtitle:'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
    },
    {
        id:1,
        image:require('../../assets/images/payment.png'),
        title:'Buy Easy',
        subtitle:'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
    },
    {
        id:2,
        image:require('../../assets/images/delivery.png'),
        title:'Track delivery',
        subtitle:'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
    },
    {
        id:3,
        image:require('../../assets/images/onboarding1.png'),
        title:'Fast delivery',
        subtitle:'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
    }
]

const {width, height} = Dimensions.get('window');
const Onboarding = () => {

    const navigation = useNavigation();
    const [isActive, setIsActive] = React.useState(0);
    const ref = useRef(null);

    const updateSlide = (e) =>{
        const contentOffsetX = e.nativeEvent.contentOffset.x;
        const currentIndex = Math.round(contentOffsetX / width);
        setIsActive(currentIndex);
    }

    const goNextSlides = () =>{
        const nxtSlideIndex = isActive+1;
        if(nxtSlideIndex != slides.length){
            const offset = nxtSlideIndex * width;
            ref?.current?.scrollToOffset({offset});
            setIsActive(nxtSlideIndex);
        }
    }

    const RenderItem =({item}) => {
        return(
            <View style={{justifyContent:'center'}}>
                <Image style={styles.image} source={item.image} />
                <View style={{alignItems:'center', marginVertical:20}}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.subTitle}>{item.subtitle}</Text>
                </View>
            </View>
        )
    }

    return(
        <View style={styles.container}>
            <View style={styles.top}>
                <Text style={styles.skipBtn}>Skip</Text>
            </View>
            <View style={styles.middle}>
                <FlatList 
                    data={slides}
                    renderItem={({item})=> <RenderItem item={item} />}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    ref={ref}
                    onMomentumScrollEnd={updateSlide}
                />
            </View>
            <View style={styles.bottom}>
                {
                    isActive == 3 ? 
                        <Button btnName={'Get Started'} height={50} fontSize={18} onPress={()=> navigation.navigate('Login')} color={COLORS.textColor} borderRadius={8} /> 
                    :
                    <View style={styles.dotSection}>
                        {
                            slides.map((i, index) =>{
                                return(
                                    <View key={i.id} style={[styles.dot, isActive === index && {backgroundColor:COLORS.primary, width:75, height:10}]} />
                                )
                            })
                        }
                    </View> 
                }
                <View style={{alignSelf:'center'}}>
                    {
                        isActive == slides.length-1 ? null : <Arrow name={'chevron-forward'} onPress={goNextSlides} />
                    }
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:COLORS.white,
        height:'100%',
    },
    top: {
        height:'8%',
        // backgroundColor:'green',
        paddingHorizontal:20,
        justifyContent:'center'
    },
    middle: {
        height:'82%',
        // backgroundColor:'yellow',
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:10
    },
    bottom: {
        height:'10%',
        // backgroundColor:'grey',
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:20,
        flexDirection:'row'
    },
    skipBtn:{
        alignSelf:'flex-end',
        fontSize:16,
        fontWeight:'400',
        color:COLORS.black,
    },
    image:{
        width:width,
        height:height*0.4,
        resizeMode:'contain',
        marginTop:10
    },
    title:{
        paddingVertical:10,
        fontSize:26,
        fontWeight:'bold',
        textTransform:"capitalize",
        color:COLORS.black,
        // marginTop:20
    },
    subTitle:{
        textAlign:'center',
        width:width*0.9,
        fontSize:16,
        lineHeight:20,
        marginTop:20,
        color:COLORS.textColor
    },
    dotSection:{
        alignItems:'center',
        flexDirection:'row'
    },
    dot:{
        height:5,
        width:25,
        backgroundColor:COLORS.primary,
        borderRadius:10,
        marginHorizontal:2,
        marginVertical:20
    }
})

export default Onboarding;
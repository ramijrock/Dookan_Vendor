import React, { useRef, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image, TextInput, FlatList } from "react-native";
import { COLORS } from "../../utils/globalColors";

const Dropdown = ({ 
  placeholder = "Select Option", 
  data = [], 
  onSelect, 
  errorMessage,
  searchable = true 
}) => {
    const [selectedItem, setSelectedItem] = useState(placeholder);
    const [isClicked, setIsClicked] = useState(false);
    const [filteredData, setFilteredData] = useState(data);
    const searchRef = useRef();
 
    const onSearch = (text) => {
        if(text !== "" && searchable) {
            let tempData = data.filter((item) => {
                return item.label.toLowerCase().indexOf(text.toLowerCase()) > -1;
            })
            setFilteredData(tempData);
        } else {
            setFilteredData(data)
        }
    }

    const handleSelect = (item) => {
        setSelectedItem(item.label);
        setFilteredData(data);
        setIsClicked(false);
        if (searchRef.current) {
            searchRef.current.clear();
        }
        if (onSelect) {
            onSelect(item);
        }
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity 
                style={[styles.dropDownSelector, errorMessage && styles.errorBorder]} 
                onPress={() => setIsClicked(!isClicked)}
            >
                <Text style={[styles.selectorText, selectedItem === placeholder && styles.placeholderText]}>
                    {selectedItem}
                </Text>
                {
                    isClicked ? 
                    <Image source={require('../../assets/images/up-arrow.png')} style={styles.icon} /> :
                    <Image source={require('../../assets/images/dropdown.png')} style={styles.icon} />
                }
            </TouchableOpacity>
            {errorMessage && (
                <Text style={styles.errorText}>{errorMessage}</Text>
            )}
            {
                isClicked ? 
                <View style={styles.dropdownArea}>
                    {searchable && (
                        <TextInput 
                            ref={searchRef} 
                            placeholder="Search" 
                            style={styles.searchInput} 
                            onChangeText={(text) => onSearch(text)} 
                        />
                    )}
                    <FlatList 
                        data={filteredData}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item}) => {
                            return(
                                <TouchableOpacity 
                                    style={styles.dropdownItem} 
                                    onPress={() => handleSelect(item)}
                                >
                                    <Text style={styles.itemText}>{item.label}</Text>
                                </TouchableOpacity>
                            )
                        }}
                    />
                </View> : null
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex:1
    },
    dropDownSelector:{
        width:'100%',
        height:50,
        borderWidth:1,
        borderColor:COLORS.lightGrey,
        alignSelf:'center',
        borderRadius:8,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal:15,
        backgroundColor: COLORS.white,
    },
    errorBorder: {
        borderColor: COLORS.error,
    },
    selectorText: {
        fontSize: 16,
        color: COLORS.textColor,
    },
    placeholderText: {
        color: COLORS.textColor,
        opacity: 0.6,
    },
    icon: {
        height:20,
        width:20,
        tintColor:COLORS.primary
    },
    dropdownArea: {
        width:'100%',
        maxHeight:300,
        borderRadius:8,
        marginTop:5,
        backgroundColor:COLORS.white,
        elevation:5,
        alignSelf:'center',
        padding:10,
        borderWidth: 1,
        borderColor: COLORS.lightGrey,
    },
    searchInput: {
        width:'100%',
        height:40,
        borderRadius:8,
        borderWidth:1,
        borderColor:COLORS.lightGrey,
        alignSelf:'center',
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    dropdownItem:{
        width:'100%',
        height:40,
        borderBottomWidth:1,
        borderBottomColor:COLORS.lightGrey,
        alignSelf:'center',
        justifyContent:'center',
        paddingHorizontal: 10,
    },
    itemText: {
        fontSize: 16,
        color: COLORS.textColor,
    },
    errorText: {
        color: COLORS.error,
        fontSize: 12,
        marginTop: 4,
        marginLeft: 4,
    }
})

export default Dropdown;
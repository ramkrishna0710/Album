import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { FC, useState } from 'react';
import Icon from './Icon';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';


const CircularSliderHeader = ({ activeIndex, endCursor }) => {

    const [isFavorite, setIsFavorite] = useState(false);
    const navigation = useNavigation();

    return (
        <View style={styles.mainContainer}>
            <View style={styles.innerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon
                        name="chevron-back"
                        iconFamily="Ionicons"
                        size={25}
                        color="#000"
                    />
                </TouchableOpacity>

                <Text style={styles.text}>{activeIndex + 1}/{endCursor + 1}</Text>
                <View style={[styles.innerContainer, { gap: 5 }]}>
                    <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
                        <Icon
                            name={isFavorite ? "heart" : "heart-outline"}
                            iconFamily="Ionicons"
                            size={25}
                            color={isFavorite ? "red" : "#000"}
                        />
                    </TouchableOpacity>

                    <Icon
                        name="ellipsis-vertical"
                        iconFamily="Ionicons"
                        size={20}
                        color="#000"
                    />
                </View>
            </View>
        </View>
    );
};

export default CircularSliderHeader;

const styles = StyleSheet.create({
    mainContainer: {
        position: 'absolute',
        top: 0,
        width: '100%',
        flexGrow: 0,
        backgroundColor: 'white',
        paddingHorizontal: 10,
        paddingVertical: 10,
        zIndex: 10,
    },
    innerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    text: {
        color: '#000',
        fontSize: 16,
        fontWeight: '600',
    },
});

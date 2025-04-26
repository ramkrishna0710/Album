import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { FC, useState } from 'react';
import Icon from './Icon';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import CustomActionSheet from './CustomActionSheet';

interface CirclularSliderHeaderProps {
    photos: any;
    activeIndex: any;
    total: any;
}

const CircularSliderHeader: FC<CirclularSliderHeaderProps> = ({ photos, activeIndex, total }) => {

    const [isFavorite, setIsFavorite] = useState(false);
    const navigation = useNavigation();
    const [sheetVisible, setSheetVisible] = useState(false);

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

                <Text style={styles.text}>{activeIndex + 1}/{total}</Text>
                <View style={[styles.innerContainer, { gap: 5 }]}>
                    <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
                        <Icon
                            name={isFavorite ? "heart" : "heart-outline"}
                            iconFamily="Ionicons"
                            size={25}
                            color={isFavorite ? "red" : "#000"}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => { setSheetVisible(true) }}
                    >
                        <Icon
                            name="ellipsis-vertical"
                            iconFamily="Ionicons"
                            size={20}
                            color="#000"
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <CustomActionSheet
                visible={sheetVisible}
                onClose={() => setSheetVisible(false)}
                onOptionPress={({ index }: any) => {
                    // console.log('Selected option:', index);
                }}
            />
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
        opacity: 0.91
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

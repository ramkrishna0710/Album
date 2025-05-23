import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from './Icon'
import { useNavigation } from '@react-navigation/native'

const AlbumHeader = ({ openFolderModal }: any) => {
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <Text style={styles.headerTxt}>Albums</Text>
            <View style={styles.subContainer}>
                <Text style={styles.edtTxt}>Edit</Text>
                <TouchableOpacity onPress={openFolderModal}>
                    <Icon
                        iconFamily='MaterailCommunityIcons'
                        color={'white'}
                        name='plus'
                        size={24}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('SettingsScreen')}
                >
                    <Icon
                        iconFamily='Ionicons'
                        color={'white'}
                        name='settings-outline'
                        size={22}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default AlbumHeader

const styles = StyleSheet.create({
    container: {
        paddingTop: 22,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        margin: 5,
        paddingHorizontal: 10
    },
    headerTxt: {
        fontSize: 22,
        fontWeight: '700',
        letterSpacing: 1.2,
        color: 'white'
    },
    subContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 18
    },
    edtTxt: {
        fontSize: 16,
        color: 'white'
    }
})
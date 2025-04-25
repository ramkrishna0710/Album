import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from './Icon'

const AlbumHeader = ({ openFolderModal }: any) => {
    return (
        <View style={styles.container}>
            <Text style={styles.headerTxt}>Albums</Text>
            <View style={styles.subContainer}>
                <Text style={styles.edtTxt}>Edit</Text>
                <TouchableOpacity onPress={openFolderModal}>
                    <Icon
                        iconFamily='MaterailCommunityIcons'
                        color={'black'}
                        name='plus'
                        size={24}
                    />
                </TouchableOpacity>

                <Icon
                    iconFamily='Ionicons'
                    color={'black'}
                    name='settings-outline'
                    size={22}
                />
            </View>
        </View>
    )
}

export default AlbumHeader

const styles = StyleSheet.create({
    container: {
        paddingVertical: 2,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        margin: 5,
        paddingHorizontal: 10
    },
    headerTxt: {
        fontSize: 22,
        fontWeight: '700',
        letterSpacing: 1.2
    },
    subContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 18
    },
    edtTxt: {
        fontSize: 16,
    }
})
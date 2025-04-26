import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Switch,
    StatusBar,
    SafeAreaView,
} from 'react-native';
import Icon from '../components/Icon';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface SettingsScreenProps {
    navigation: NativeStackNavigationProp<any>;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ navigation }) => {
    // State for toggle switches
    const [intelligentClassification, setIntelligentClassification] = useState(true);
    const [recentlyDeleted, setRecentlyDeleted] = useState(true);
    const [screenStaysOn, setScreenStaysOn] = useState(false);
    const [rotateAutomatically, setRotateAutomatically] = useState(false);

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Icon iconFamily='Ionicons' name="chevron-back" size={28} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Settings</Text>
                <View style={{ width: 28 }} />
            </View>

            {/* Settings Content */}
            <View style={styles.content}>
                <Text style={styles.sectionTitle}>More settings</Text>

                {/* Intelligent classification */}
                <View style={styles.settingItem}>
                    <Text style={styles.settingTitle}>Intelligent classification</Text>
                    <Switch
                        value={intelligentClassification}
                        onValueChange={setIntelligentClassification}
                        trackColor={{ false: '#D3D3D3', true: '#4CD964' }}
                        thumbColor="#FFFFFF"
                        ios_backgroundColor="#D3D3D3"
                    />
                </View>
                <View style={styles.divider} />

                {/* Recently deleted */}
                <View style={styles.settingItem}>
                    <Text style={styles.settingTitle}>Recently deleted</Text>
                    <Switch
                        value={recentlyDeleted}
                        onValueChange={setRecentlyDeleted}
                        trackColor={{ false: '#D3D3D3', true: '#4CD964' }}
                        thumbColor="#FFFFFF"
                        ios_backgroundColor="#D3D3D3"
                    />
                </View>
                <View style={styles.divider} />

                {/* Description text */}
                <Text style={styles.descriptionText}>
                    Deleted images and videos will be displayed in "Recently deleted".
                </Text>

                {/* Screen stays on */}
                <View style={styles.settingItem}>
                    <Text style={styles.settingTitle}>Screen stays on when viewing images</Text>
                    <Switch
                        value={screenStaysOn}
                        onValueChange={setScreenStaysOn}
                        trackColor={{ false: '#D3D3D3', true: '#4CD964' }}
                        thumbColor="#FFFFFF"
                        ios_backgroundColor="#D3D3D3"
                    />
                </View>
                <View style={styles.divider} />

                {/* Rotate automatically */}
                <View style={styles.settingItem}>
                    <Text style={styles.settingTitle}>Rotate automatically when viewing images</Text>
                    <Switch
                        value={rotateAutomatically}
                        onValueChange={setRotateAutomatically}
                        trackColor={{ false: '#D3D3D3', true: '#4CD964' }}
                        thumbColor="#FFFFFF"
                        ios_backgroundColor="#D3D3D3"
                    />
                </View>
                <View style={styles.divider} />

                {/* Description text */}
                <Text style={styles.descriptionText}>
                    Images can rotate with the phone even though the screen is locked in portrait mode.
                </Text>

                {/* Check for update */}
                <View style={styles.settingItem}>
                    <Text style={styles.settingTitle}>Check for update</Text>
                </View>
                <Text style={styles.versionText}>Current version: V6.9.0.11</Text>
                <View style={styles.divider} />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2C2C2C', // Set background color to #2C2C2C
    },
    statusBar: {
        height: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        backgroundColor: '#2C2C2C', // Set status bar background color to #2C2C2C
    },
    statusBarLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statusBarRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statusBarText: {
        fontSize: 12,
        marginHorizontal: 5,
        color: '#fff', // Set status bar text color to white
    },
    statusBarTextSmall: {
        fontSize: 10,
        marginHorizontal: 5,
        color: '#fff', // Set status bar text color to white
    },
    header: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        backgroundColor: '#2C2C2C', // Set header background color to #2C2C2C
    },
    backButton: {
        padding: 5,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '500',
        color: '#fff', // Set header title color to white
    },
    content: {
        flex: 1,
        paddingHorizontal: 15,
    },
    sectionTitle: {
        fontSize: 18,
        color: '#fff', // Set section title color to white
        marginVertical: 15,
    },
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
    },
    settingTitle: {
        fontSize: 16,
        fontWeight: '500',
        flex: 1,
        color: '#fff', // Set setting title color to white
    },
    divider: {
        height: 1,
        backgroundColor: '#444', // Set divider color to a lighter gray
    },
    descriptionText: {
        fontSize: 14,
        color: '#fff', // Set description text color to white
        marginVertical: 10,
        paddingLeft: 5,
    },
    versionText: {
        fontSize: 14,
        color: '#fff', // Set version text color to white
        marginBottom: 10,
    },
});


export default SettingsScreen;
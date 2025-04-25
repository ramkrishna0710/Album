import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import AlbumHeader from '../components/AlbumHeader';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const WIDTH = Dimensions.get('window').width;

interface Album {
  id: string;
  label: string;
  groupName: string;
  thumbnail?: string | null;
}

interface AlbumScreenProps {
  navigation: NativeStackNavigationProp<any>;
}

const AlbumScreen: React.FC<AlbumScreenProps> = ({ navigation }) => {
  const [albums, setAlbums] = useState<Album[]>([
    { id: '1', label: 'Camera', groupName: 'Camera' },
    { id: '2', label: 'WhatsApp', groupName: 'WhatsApp Images' },
    { id: '3', label: 'Screenshots', groupName: 'Screenshots' }
  ]);
  const [newFolderName, setNewFolderName] = useState('');
  const [showModal, setShowModal] = useState(false);

  // Fetching permission and initializing album data
  useEffect(() => {
    const init = async () => {
      const granted = await hasPermission();
      if (granted) {
        loadThumbnails();
      }
    };
    init();
  }, []);

  // Request permission for accessing media
  const hasPermission = async (): Promise<boolean> => {
    const version = Number(Platform.Version);
    const permission =
      version >= 33
        ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
        : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) return true;

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  };


  // Fetch the thumbnail image for the album
  const getAlbumThumbnail = async (groupName: string): Promise<string | null> => {
    try {
      const photos = await CameraRoll.getPhotos({
        first: 1,
        groupName: groupName,
        assetType: 'Photos',
      });
      return photos.edges[0]?.node.image.uri ?? null;
    } catch (err) {
      console.error("Error fetching album thumbnail", err);
      return null;
    }
  };

  // Load all albums and fetch thumbnails
  const loadThumbnails = async () => {
    const updatedAlbums = await Promise.all(
      albums.map(async (album) => {
        const thumbnail = await getAlbumThumbnail(album.groupName);
        return { ...album, thumbnail };
      })
    );
    setAlbums(updatedAlbums);
  };

  // Handle the addition of a custom folder
  const addCustomFolder = () => {
    if (!newFolderName.trim()) return;
    const newAlbum: Album = {
      id: Date.now().toString(),
      label: newFolderName.trim(),
      groupName: newFolderName.trim()
    };
    setAlbums((prev) => [...prev, newAlbum]);
    setNewFolderName('');
    setShowModal(false);
  };

  return (
    <View style={styles.container}>
      <AlbumHeader openFolderModal={() => setShowModal(true)} />

      <FlatList
        data={albums}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={{ padding: 10 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              // Pass the selected album data to PhotoScreen
              navigation.navigate('PhotoScreen', { album: item });
            }}
            style={styles.albumCard}
          >
            <Image
              source={
                item.thumbnail
                  ? { uri: item.thumbnail }
                  : require('../assets/image.png') // Placeholder if no thumbnail
              }
              style={styles.placeholderImg}
            />
            <Text style={styles.albumName}>{item.label}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Modal for custom folder */}
      <Modal transparent={true} visible={showModal} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={{ fontWeight: '700', fontSize: 16, marginBottom: 10 }}>
              New Folder Name
            </Text>
            <TextInput
              value={newFolderName}
              onChangeText={setNewFolderName}
              placeholder="Enter folder name"
              style={styles.input}
            />
            <View style={styles.modalBtnContainer}>
              <TouchableOpacity onPress={() => setShowModal(false)} style={styles.modalBtn}>
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={addCustomFolder}
                style={[styles.modalBtn, { backgroundColor: '#000' }]}
              >
                <Text style={{ color: '#fff' }}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AlbumScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  albumCard: { margin: 8, justifyContent: 'flex-start' },
  placeholderImg: {
    height: WIDTH * 0.43,
    width: WIDTH * 0.43,
    borderRadius: 8,
    backgroundColor: '#ddd',
  },
  albumName: { marginTop: 6, fontSize: 16, fontWeight: '600' },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
    marginBottom: 10,
  },
  modalBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalBtn: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#eee',
    minWidth: 80,
    alignItems: 'center',
  },
});

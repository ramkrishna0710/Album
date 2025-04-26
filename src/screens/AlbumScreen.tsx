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
import CustomStatusBar from '../components/CustomStatusbar';

const WIDTH = Dimensions.get('window').width;

interface Album {
  id: string;
  label: string;
  groupName: string;
  thumbnail?: string | null;
  count?: number;
}

interface AlbumScreenProps {
  navigation: NativeStackNavigationProp<any>;
}

const AlbumScreen: React.FC<AlbumScreenProps> = ({ navigation }) => {
  const [albums, setAlbums] = useState<Album[]>([
    { id: '1', label: 'Camera', groupName: 'Camera' },
    { id: '2', label: 'WhatsApp', groupName: 'WhatsApp Images' },
    { id: '3', label: 'Screenshots', groupName: 'Screenshots' },
    { id: '4', label: 'Pictures', groupName: 'Pictures' },
    { id: '5', label: 'Favorites', groupName: 'Favorites' },
    { id: '6', label: 'Bluetooth', groupName: 'Bluetooth' },
    { id: '7', label: 'Download', groupName: 'Download' },
    { id: '8', label: 'Facebook', groupName: 'Facebook' },
  ]);
  const [newFolderName, setNewFolderName] = useState('');
  const [showModal, setShowModal] = useState(false);

  // Fetching permission and initializing album data
  // useEffect(() => {
  //   const init = async () => {
  //     const granted = await hasPermission();
  //     if (granted) {
  //       const albumsList = await CameraRoll.getAlbums({ assetType: 'Photos' });
  //       console.log('All Albums:', albumsList[0].count);
  //       albumsList.forEach(album => {
  //         console.log(`${album.title} count: ${album.count}`);
  //       });
  //       loadThumbnails();
  //     }
  //   };
  //   init();
  // }, []);

  useEffect(() => {
    const init = async () => {
      const granted = await hasPermission();
      if (granted) {
        try {
          const albumsList = await CameraRoll.getAlbums({ assetType: 'Photos' });

          const updatedAlbums = await Promise.all(
            albums.map(async (album) => {
              const matching = albumsList.find((a) => a.title === album.groupName);
              const thumbnail = await getAlbumThumbnail(album.groupName);
              return {
                ...album,
                thumbnail,
                count: matching?.count ?? 0,
              };
            })
          );

          setAlbums(updatedAlbums);
        } catch (err) {
          console.error('Error fetching albums', err);
        }
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

      const albumsList = await CameraRoll.getAlbums({ assetType: 'Photos' });
      // albumsList.forEach(album => {
      //   console.log(`${album.title} count: ${album.count}`);
      // });

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
      {/* <CustomStatusBar translucent={false} hidden={false} /> */}
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
              navigation.navigate('CirclularSlider', { album: item });
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
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
              <Text style={styles.albumName}>{item.label} </Text>
              <Text style={[styles.albumName, { opacity: 0.6 }]}>({item?.count})</Text>
            </View>
          </TouchableOpacity>
        )}
        ListFooterComponent={() => {
          return (
            <View style={{ justifyContent: 'center', alignItems: 'center', opacity: 0.4, margin: 5, marginBottom: 10 }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#fff' }}>Made with ❤️</Text>
              <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#fff' }}>By - Ramkrishna Mandal</Text>
            </View>
          )
        }}
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
  container: { flex: 1, backgroundColor: '#2C2C2C' },
  albumCard: { margin: 8, justifyContent: 'flex-start' },
  placeholderImg: {
    height: WIDTH * 0.43,
    width: WIDTH * 0.43,
    borderRadius: 8,
    backgroundColor: '#ddd',
  },
  albumName: { marginTop: 6, fontSize: 14, fontWeight: '600', color: 'white' },
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

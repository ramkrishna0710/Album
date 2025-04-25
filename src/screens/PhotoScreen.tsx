import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, ActivityIndicator } from 'react-native';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';

interface PhotoScreenProps {
  route: any;
}

const PhotoScreen: React.FC<PhotoScreenProps> = ({ route }) => {
  const { album } = route.params ?? {};

  const [photos, setPhotos] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPhotos = async () => {
      if (!album) return;

      try {
        setLoading(true);
        const fetchedPhotos = await CameraRoll.getPhotos({
          first: 50, // You can adjust the number of photos loaded here
          groupName: album.groupName,
          assetType: 'Photos',
        });
        setPhotos(fetchedPhotos.edges);
      } catch (error) {
        console.error('Error fetching photos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, [album]);

  if (!album) {
    return (
      <View>
        <Text>No album data available</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>Album Name: {album.label}</Text>
      <Text>Group Name: {album.groupName}</Text>
      <Text>Album ID: {album.id}</Text>
      {album.thumbnail && (
        <Image
          source={{ uri: album.thumbnail }}
          style={{ width: 200, height: 200, marginVertical: 10 }}
        />
      )}

      {/* Loading state */}
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={photos}
          keyExtractor={(item, index) => item.node.image.uri || index.toString()}
          renderItem={({ item }) => (
            <Image
              source={{ uri: item.node.image.uri }}
              style={{ width: 100, height: 100, margin: 5 }}
            />
          )}
        />
      )}
    </View>
  );
};

export default PhotoScreen;

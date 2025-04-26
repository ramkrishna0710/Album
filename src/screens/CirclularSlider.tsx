import { View, Text, FlatList, Dimensions, Image, StyleSheet } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import CarouselItem from '../components/CarouselItem';
import Animated, { clamp, FadeIn, FadeOut, runOnJS, useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';

interface CirclularSliderProps {
    route: any;
}

const { width } = Dimensions.get('screen');
const _itemSize = width * 0.24;
const _spaching = 12;
const _itemTotalSize = _itemSize + _spaching;

const CirclularSlider: FC<CirclularSliderProps> = ({ route }) => {

    const { album } = route.params ?? {};

    const [photos, setPhotos] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [activeIndex, setActiveIndex] = useState(0)

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

    const scrollX = useSharedValue(0);
    const onScroll = useAnimatedScrollHandler(e => {
        scrollX.value = clamp(
            e.contentOffset.x / _itemTotalSize,
            0,
            photos.length - 1
        );
        // console.log(scrollX.value);
        const newActiveIndex = Math.round(scrollX.value);

        if (activeIndex !== newActiveIndex) {
            runOnJS(setActiveIndex)(newActiveIndex)
        }
    })

    if (!album) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 14, color: 'white', fontWeight: '700' }}>No album data available</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'black' }}>
            <View style={[StyleSheet.absoluteFillObject]}>
                <Animated.Image
                    entering={FadeIn.duration(500)}
                    exiting={FadeOut.duration(500)}
                    key={`image-${activeIndex}`}
                    source={{ uri: photos[activeIndex]?.node.image.uri }}
                    style={{ flex: 1 }}
                />
            </View>
            <Animated.FlatList
                style={{ flexGrow: 0, height: _itemSize * 2 }}
                contentContainerStyle={{
                    gap: _spaching,
                    paddingHorizontal: (width - _itemSize) / 2
                }}
                data={photos}
                keyExtractor={(_, index) => String(index)}
                renderItem={({ item, index }) => {
                    return <CarouselItem
                        imageUri={item.node.image.uri}
                        index={index}
                        scrollX={scrollX}
                    />
                }}
                horizontal
                showsHorizontalScrollIndicator={false}
                // scrolling
                onScroll={onScroll}
                scrollEventThrottle={1000 / 60}
                snapToInterval={_itemTotalSize}
                decelerationRate={'fast'}
            />
        </View>
    )
}

export default CirclularSlider
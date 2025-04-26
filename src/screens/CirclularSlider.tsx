import {
    View,
    Text,
    FlatList,
    Dimensions,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import CarouselItem from '../components/CarouselItem';
import Animated, {
    clamp,
    FadeIn,
    FadeOut,
    runOnJS,
    useAnimatedScrollHandler,
    useSharedValue,
} from 'react-native-reanimated';
import CircularSliderHeader from '../components/CircularSliderHeader';
import Icon from '../components/Icon';
import { useNavigation } from '@react-navigation/native';

interface CirclularSliderProps {
    route: any;
}

const { width } = Dimensions.get('screen');
const _itemSize = width * 0.24;
const _spaching = 12;
const _itemTotalSize = _itemSize + _spaching;

const CirclularSlider: FC<CirclularSliderProps> = ({ route }) => {
    const { album } = route.params ?? {};
    const navigation = useNavigation()

    const [photos, setPhotos] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [endCursor, setEndCursor] = useState<string | null>(null);
    const [hasNextPage, setHasNextPage] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);

    const fetchPhotos = async (isFirstLoad = false) => {
        if (!album || loading || (!isFirstLoad && !hasNextPage)) return;

        try {
            setLoading(true);
            const result = await CameraRoll.getPhotos({
                first: 10,
                groupName: album.groupName,
                assetType: 'Photos',
                after: isFirstLoad ? undefined : endCursor ?? undefined,
            });

            const newPhotos = result.edges;

            if (isFirstLoad) {
                setPhotos(newPhotos);
            } else {
                setPhotos(prev => [...prev, ...newPhotos]);
            }

            setEndCursor(result.page_info.end_cursor ?? null);
            setHasNextPage(result.page_info.has_next_page);
        } catch (error) {
            console.error('Error fetching photos:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPhotos(true);
    }, [album]);

    const scrollX = useSharedValue(0);

    const onScroll = useAnimatedScrollHandler(e => {
        scrollX.value = clamp(e.contentOffset.x / _itemTotalSize, 0, photos.length - 1);
        const newActiveIndex = Math.round(scrollX.value);
        runOnJS(setActiveIndex)(newActiveIndex);
    });

    if (!loading && photos.length === 0) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#2C2C2C' }}>
                <View style={{ position: 'absolute', top: 15, left: 15 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon
                            name="chevron-back"
                            iconFamily="Ionicons"
                            size={25}
                            color="#fff"
                        />
                    </TouchableOpacity>
                </View>
                <Text style={{ fontSize: 14, color: 'white', fontWeight: '700' }}>
                    No {album?.groupName} data available
                </Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'black' }}>
            <View style={StyleSheet.absoluteFillObject}>
                <Animated.Image
                    entering={FadeIn.duration(500)}
                    exiting={FadeOut.duration(500)}
                    key={`image-${activeIndex}`}
                    source={{ uri: photos[activeIndex]?.node.image.uri }}
                    style={{ flex: 1, resizeMode: 'cover' }}
                />
            </View>

            <View style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
                <CircularSliderHeader
                    photos={photos}
                    activeIndex={activeIndex}
                    total={album.count}
                />
            </View>

            <Animated.FlatList
                style={{ flexGrow: 0, height: _itemSize * 2 }}
                contentContainerStyle={{
                    gap: _spaching,
                    paddingHorizontal: (width - _itemSize) / 2,
                }}
                data={photos}
                keyExtractor={(_, index) => String(index)}
                renderItem={({ item, index }) => (
                    <CarouselItem
                        imageUri={item.node.image.uri}
                        index={index}
                        scrollX={scrollX}
                    />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                onScroll={onScroll}
                scrollEventThrottle={16}
                snapToInterval={_itemTotalSize}
                decelerationRate="fast"
                onEndReached={() => fetchPhotos(false)}
                onEndReachedThreshold={0.5}
                ListFooterComponent={
                    loading && hasNextPage ? (
                        <ActivityIndicator style={{ padding: 20 }} color="white" />
                    ) : null
                }
            />
        </View>
    );
};

export default CirclularSlider;

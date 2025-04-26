import { View, Text, Image, Dimensions } from 'react-native'
import React from 'react'
import Animated, { interpolate, interpolateColor, SharedValue, useAnimatedStyle } from 'react-native-reanimated';

const { width } = Dimensions.get('screen');
const _itemSize = width * 0.24;
const _spaching = 12;

const CarouselItem = ({ imageUri, index, scrollX }: { imageUri: string; index: number; scrollX: SharedValue<number> }) => {

    const stylez = useAnimatedStyle(() => {
        return {
            borderWidth: 4,
            borderColor: interpolateColor(
                scrollX.value,
                [index - 1, index, index + 1],
                ['transparent', 'white', 'transparent']
            ),
            transform: [{
                translateY: interpolate(
                    scrollX.value,
                    [index - 1, index, index + 1],
                    [_itemSize / 3, 0, _itemSize / 3]
                )
            }]
        }
    })

    return (
        <Animated.View style={[
            {
                width: _itemSize,
                height: _itemSize,
                borderRadius: _itemSize / 2
            },
            stylez
        ]}>
            <Image
                source={{ uri: imageUri }}
                style={{
                    flex: 1,
                    borderRadius: _itemSize / 2
                }}
            />
        </Animated.View>
    )
}

export default CarouselItem
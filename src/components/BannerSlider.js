
import React, { useRef, useState, useEffect } from 'react';
import { View, FlatList, Image, Dimensions, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../constants';
import { getBanner } from '../redux/slices/banner';
import { useDispatch, useSelector } from 'react-redux';

const { width } = Dimensions.get('window');
const imageWidth = width * 0.87;

const BannerSlider = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const flatListRef = useRef(null);
    const banners = useSelector(state => state.Banner.banners)
    const dispatch = useDispatch()

    const get_banners = async () => {
        try {
            await dispatch(getBanner())

        } catch (error) {

        }
    }
    useEffect(() => {
        get_banners()
    }, [])

    const handleScroll = (event) => {
        const slideSize = event.nativeEvent.layoutMeasurement.width;
        const index = Math.floor(event.nativeEvent.contentOffset.x / slideSize);
        setActiveIndex(index);
    };

    const renderItem = ({ item }) => (
        <View style={styles.imageContainer}>
            <Image source={{ uri: item }} style={styles.image} />
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                ref={flatListRef}
                data={banners || []}
                renderItem={renderItem}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                keyExtractor={(item, index) => index.toString()}
                snapToInterval={width}
                decelerationRate="fast"
            />
            <View style={styles.pagination}>
                {banners.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.dot,
                            activeIndex === index ? styles.activeDot : styles.inactiveDot,
                        ]}
                    />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: -SIZES.twenty,
    },
    imageContainer: {
        width, // Full width of the screen
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: SIZES.ten
    },
    image: {
        width: imageWidth,
        height: imageWidth * (2 / 3.5),
        resizeMode: 'cover',
        borderRadius: SIZES.ten
    },
    pagination: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: SIZES.fifteen
    },
    dot: {
        width: SIZES.twentyFive,
        height: SIZES.five + 1,
        borderRadius: 4,
        marginHorizontal: 4,
    },
    activeDot: {
        backgroundColor: COLORS.primary,
    },
    inactiveDot: {
        backgroundColor: COLORS.gray,
    },
});

export default BannerSlider;

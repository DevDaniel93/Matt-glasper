

import React, { useRef, useState } from 'react';
import { View, FlatList, Image, Dimensions, StyleSheet, ImageBackground, Text } from 'react-native';
import { COLORS, IMAGES, SIZES, height, width } from '../constants';
import { label } from '../constants/lables';
import { useTranslation } from 'react-i18next';


const imageWidth = width * 0.8;

const CardSlider = ({ data }) => {
    const { t } = useTranslation();
    const [activeIndex, setActiveIndex] = useState(0);
    const flatListRef = useRef(null);

    const handleScroll = (event) => {
        const slideSize = event.nativeEvent.layoutMeasurement.width;
        const index = Math.floor(event.nativeEvent.contentOffset.x / slideSize);
        setActiveIndex(index);
    };

    const _renderItem = ({ item, index }) => {
        return (
            <View style={styles.imageContainer}>


                <ImageBackground
                    source={IMAGES.CardBg}
                    resizeMode="stretch"
                    style={styles.image} >
                    <View style={styles.row}>
                        <Text style={styles.heading}>
                            {t('Credit')}
                        </Text>
                        <Text style={styles.heading}>
                            {t('Discover')}
                        </Text>
                    </View>
                    <View >
                        <Text style={[styles.heading, { letterSpacing: 3, marginTop: 10 }]}>
                            Sample Name
                        </Text>
                        <Text style={[styles.heading, { letterSpacing: 3, marginTop: 10 }]}>
                            6011 - 7406 - 4763 - 8837
                        </Text>
                    </View>
                </ImageBackground>



            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                ref={flatListRef}
                data={data || []}
                renderItem={_renderItem}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                keyExtractor={(item, index) => index.toString()}
                snapToInterval={width} // This ensures each item snaps to the center
                decelerationRate="fast"
            />
            <View style={styles.pagination}>
                {data.map((_, index) => (
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
        borderRadius: SIZES.ten,
    },
    image: {
        width: imageWidth,
        height: imageWidth * (2 / 3.5),
        resizeMode: 'cover',
        borderRadius: SIZES.ten,
        padding: SIZES.twenty,
        justifyContent: "space-between"
    },
    pagination: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: SIZES.fifteen
    },
    dot: {
        width: SIZES.ten,
        height: SIZES.ten,
        borderRadius: SIZES.ten,
        marginHorizontal: 4,
    },
    activeDot: {
        backgroundColor: COLORS.primary,
    },
    inactiveDot: {
        backgroundColor: COLORS.gray,
    },
    row: {
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center"
    },
    heading: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: "600"
    },
});

export default CardSlider;

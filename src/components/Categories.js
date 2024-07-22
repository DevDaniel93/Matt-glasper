import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS, FONTFAMILY, SIZES } from '../constants'
import { useDispatch, useSelector } from 'react-redux'
import { SCREENS, getTheme } from '../constants/theme'
import { label } from '../constants/lables'
import { useTranslation } from 'react-i18next'

import { setLoading } from '../redux/slices/utils'
import { SuccessAlert } from '../utils/utils'
import { useNavigation } from '@react-navigation/native'

export default function Categories(props) {
    const navigation = useNavigation()
    const theme = useSelector(state => state.Theme.theme)
    const { t } = useTranslation();

    const currentTheme = getTheme(theme)
    const [selectId, setSelectedId] = useState(null)



    const _renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    setSelectedId(item?.id)
                    props.onPress(item)

                }}
                style={styles.CategoryContainer}>
                <Image style={[styles.img, { borderColor: selectId === item?.id ? COLORS.primary : currentTheme.defaultTextColor }]}
                    source={{ uri: item?.image?.src }}
                />
                <Text style={[styles.txt, { color: currentTheme.defaultTextColor, }]}>
                    {item?.name}
                </Text>
            </TouchableOpacity>
        )
    }
    return (
        <View>
            <View style={styles.row}>
                <Text style={[styles.heading, { color: currentTheme.defaultTextColor, }]}>
                    {t('Categories')}
                </Text>
                {!props.hide &&

                    <TouchableOpacity
                        onPress={() => {
                            navigation?.navigate(SCREENS.AllProduct, { item: null })
                        }}
                    >
                        <Text style={[styles.seeAll, { color: currentTheme.primary, }]}>
                            {t('seeAll')}
                        </Text>
                    </TouchableOpacity>
                }

            </View>
            <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                data={props?.data || [1, 2, 3]}
                keyExtractor={(item) => item.id}
                renderItem={_renderItem}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: SIZES.fifteen
    },
    heading: {

        fontSize: SIZES.twenty,
        fontWeight: "500",
        fontFamily: FONTFAMILY.Poppins
    },
    CategoryContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginRight: SIZES.twenty,
        marginVertical: SIZES.fifteen
    },
    seeAll: {
        color: COLORS.primary,
        fontSize: SIZES.fifteen + 2,
        fontFamily: FONTFAMILY.Poppins,
        textDecorationLine: "underline",
        fontWeight: "500"
    },
    img: {
        width: SIZES.fifty * .9,
        height: SIZES.fifty * .9,
        borderRadius: SIZES.fifty,
        borderWidth: 1,

        resizeMode: "contain"
    },
    txt: {
        marginTop: SIZES.five,

        fontSize: SIZES.fifteen,
        fontFamily: FONTFAMILY.Poppins
    }
})
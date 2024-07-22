import { Alert, FlatList, ScrollView, StyleSheet, Text, View, RefreshControl, ActivityIndicator } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { IMAGES, SIZES, STYLES } from '../../constants'
import ProductCard from '../../components/ProductCard'
import HeaderWithArrow from '../../components/HeaderWithArrow'

import { useDispatch, useSelector } from 'react-redux'
import { getTheme } from '../../constants/theme'
import { useTranslation } from 'react-i18next'
import { getFavProduct, getProducts } from '../../redux/slices/products'
import { useFocusEffect } from '@react-navigation/native'
import { setLoading } from '../../redux/slices/utils'


export default function WishList() {
    const theme = useSelector(state => state.Theme.theme)
    const dispatch = useDispatch()
    const user = useSelector(state => state.Auth.user)
    const [products, setProducts] = useState([])
    const currentTheme = getTheme(theme)
    const { t } = useTranslation();
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);


    const getProduct = useCallback(async () => {

        if (loading || !hasMore) return; // Prevent multiple calls if already loading or no more data
        try {
            console.log("Fetching products");
            setLoading(true);
            const params = {
                ...(user !== null && { user_id: user?.user_id }),
            }

            const response = await dispatch(getProducts(page, params));

            if (response.length === 0) {
                setHasMore(false); // No more data to load
            } else {
                const filterFav = response.filter((item) => item?.favourite === true);
                // setProducts((prevProducts) => [...prevProducts, ...filterFav]);
                setProducts((prevProducts) => {
                    const newProducts = filterFav.filter(
                        (newItem) => !prevProducts.some((existingItem) => existingItem.id === newItem.id)
                    );
                    return [...prevProducts, ...newProducts];
                });
                setPage(prevPage => prevPage + 1);
            }
            setLoading(false);
        } catch (error) {
            console.log("Failed to fetch products:", error);
            setLoading(false);
        }
    }, [dispatch, loading, page, hasMore]);


    useFocusEffect(
        useCallback(() => {
            getProduct();
            return () => {
                // Cleanup function if needed
            };
        }, [getProduct])
    );
    useFocusEffect(
        useCallback(() => {

            setProducts([])
            setHasMore(true)
            setPage(1)
            getProduct();
            return () => {
                // Cleanup function if needed
            };
        }, [])
    );

    const removeById = (id) => {
        setProducts((prevProducts) => prevProducts.filter(item => item.id !== id));
    };
    const renderEmptyComponent = () => {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

                <Text style={{ color: currentTheme?.defaultTextColor, fontSize: SIZES.twenty, marginTop: SIZES.twenty }}>
                    {t('No Order found')}
                </Text>


            </View>
        )
    }
    return (
        <View style={[STYLES.container, { backgroundColor: currentTheme.Background }]}>
            <HeaderWithArrow
                label={t('Wishlist')}
            />
            {user !== null ?
                <FlatList
                    columnWrapperStyle={{
                        justifyContent: "space-between",
                    }}
                    showsVerticalScrollIndicator={false}
                    data={products}
                    numColumns={2}
                    renderItem={({ item }) => <ProductCard
                        onFav={removeById}
                        item={item} />}
                    onEndReachedThreshold={0.1}
                    onEndReached={() => {
                        if (!loading && hasMore) {
                            getProduct();
                        }
                    }}
                    ListFooterComponent={() =>
                        loading && <ActivityIndicator size="large" color={currentTheme.primary} style={{ marginVertical: 20 }} />
                    }
                />
                : <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ color: currentTheme?.defaultTextColor, fontSize: SIZES.twenty, marginTop: SIZES.twenty }}>
                        {t("Please Login to see your WishList")}
                    </Text>
                </View>
            }

            <View style={{ height: SIZES.fifty * 1.5 }} />
            {/* <FlatList
                columnWrapperStyle={{
                    marginTop: SIZES.ten,
                    justifyContent: "space-between",

                }}
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
                data={products || []}
                keyExtractor={item => item.id}
                numColumns={"2"}
                renderItem={({ item }) => {
                    return (
                        <ProductCard item={item} />
                    )
                }}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                ListEmptyComponent={renderEmptyComponent}
                ListFooterComponent={() => {
                    return (
                        <View style={{ height: SIZES.fifty * 1.5 }} />

                    )
                }}
            /> */}

        </View>
    )
}

const styles = StyleSheet.create({})

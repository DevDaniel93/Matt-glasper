
import { ActivityIndicator, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import { STYLES } from '../../constants'
import { useDispatch, useSelector } from 'react-redux'
import { SIZES, getTheme, width } from '../../constants/theme'
import { useTranslation } from 'react-i18next'
import HeaderWithArrow from '../../components/HeaderWithArrow'
import SearchFilter from '../../components/SearchFilter'
import FilterModal from '../../components/FilterModal'
import ProductCard from '../../components/ProductCard'
import { getFilterProducts, getProducts } from '../../redux/slices/products'

import CustomButton from '../../components/CustomButton'

export default function AllProducts(props) {
    const { navigation, route } = props
    const modal = React.useRef(null)
    const dispatch = useDispatch()
    const { item } = route?.params

    const theme = useSelector(state => state.Theme.theme)
    const currentTheme = getTheme(theme)
    const { t } = useTranslation();
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const user = useSelector(state => state.Auth.user)
    const [search, setSearch] = useState("")
    const [products, setProducts] = useState([])
    const [isFilter, setIsFilter] = useState(false)

    const [filterProducts, setFilterProducts] = useState([])

    const onReset = () => {
        setHasMore(true)
        setProducts([])
        setPage(1)
        getProduct()
        setIsFilter(false)
    }

    const onCancel = () => {
        if (modal.current) {
            modal.current.close();
        }
    }

    const onApply = (pro) => {

        setProducts(pro);
        setIsFilter(true)
    }
    const getProduct = async (page) => {

        if (loading || !hasMore) return; // Prevent multiple calls if already loading or no more data
        try {
            console.log("Fetching products");
            setLoading(true);
            const params = {
                ...(user !== null && { user_id: user?.user_id }),
                ...(item !== null && { category: item }),
            }

            const response = await dispatch(getProducts(page, params));

            if (response.length === 0) {
                setHasMore(false); // No more data to load
            } else {


                // setProducts((prevProducts) => [...prevProducts, ...response]);
                setProducts(response)
                // setPage(prevPage => prevPage + 1);
            }
            setLoading(false);
        } catch (error) {
            console.log("Failed to fetch products:", error);
            setLoading(false);
        }
    }
    // const getProduct = useCallback(async () => {

    //     if (loading || !hasMore) return; // Prevent multiple calls if already loading or no more data
    //     try {
    //         console.log("Fetching products");
    //         setLoading(true);
    //         const params = {
    //             ...(user !== null && { user_id: user?.user_id }),
    //             ...(item !== null && { category: item }),
    //         }

    //         const response = await dispatch(getProducts(page, params));

    //         if (response.length === 0) {
    //             setHasMore(false); // No more data to load
    //         } else {
    //             setProducts((prevProducts) => [...prevProducts, ...response]);
    //             setPage(prevPage => prevPage + 1);
    //         }
    //         setLoading(false);
    //     } catch (error) {
    //         console.log("Failed to fetch products:", error);
    //         setLoading(false);
    //     }
    // }, [dispatch, loading, page, hasMore]);




    const filterProductsBySearch = (searchText) => {
        if (searchText !== "") {
            const filtered = products.filter(product =>
                product.name.toLowerCase().includes(searchText.toLowerCase())
            );
            setFilterProducts(filtered);
        } else {
            setFilterProducts(products);
        }
    }
    useEffect(() => {
        filterProductsBySearch(search);
    }, [search, products]);
    useEffect(() => {
        getProduct()
    }, []);


    const RenderEmptyComponent = () => {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text style={{ color: currentTheme?.defaultTextColor, fontSize: SIZES.twenty, marginTop: SIZES.twenty }}>
                    No Product found
                </Text>
            </View>
        )
    }
    return (
        <View style={[STYLES.container, { backgroundColor: currentTheme.Background }]}>
            <HeaderWithArrow label={t("Products")} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ marginTop: SIZES.fifteen }}>
                <SearchFilter
                    value={search}
                    onChangeText={(e) => {
                        setSearch(e);
                    }}
                    onPress={() => {
                        if (modal.current) {
                            modal.current.open();
                        }
                    }}
                />
                {loading ?
                    <ActivityIndicator size="large" color={currentTheme.primary} style={{ marginVertical: 20 }} /> :
                    filterProducts?.length === 0 ?

                        <RenderEmptyComponent /> :
                        <FlatList
                            columnWrapperStyle={{
                                justifyContent: "space-between",
                            }}
                            showsVerticalScrollIndicator={false}
                            data={filterProducts}
                            numColumns={2}
                            renderItem={({ item }) => <ProductCard item={item}
                                onFav={() => {

                                }} />}
                        // onEndReachedThreshold={0.1}
                        // onEndReached={() => {
                        //     if (!loading && hasMore) {
                        //         getProduct();
                        //     }
                        // }}
                        // ListFooterComponent={() =>
                        //     loading && <ActivityIndicator size="large" color={currentTheme.primary} style={{ marginVertical: 20 }} />
                        // }
                        />
                }


            </ScrollView>
            {!isFilter && <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: SIZES.ten }}>
                <CustomButton
                    onPress={() => {
                        setPage(pre => pre - 1)
                        setHasMore(true)
                        getProduct(page - 1)
                    }}
                    disabled={page === 1}
                    btnStyle={styles.btnStyle}
                    label={"Back"}
                />


                <CustomButton
                    btnStyle={styles.btnStyle}
                    disabled={!hasMore}
                    onPress={() => {
                        setPage(pre => pre + 1)
                        getProduct(page + 1)
                    }}
                    label={"Next"}
                />
            </View>}


            <FilterModal modalizeRef={modal} onApply={onApply} onResetAll={onReset} onCancel={onCancel} />
        </View>
    )
}

const styles = StyleSheet.create({
    btnStyle: {
        alignSelf: "center",
        width: width * .42
    }
})

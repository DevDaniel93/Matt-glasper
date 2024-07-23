import { ActivityIndicator, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { IMAGES, SIZES, STYLES, height } from '../../constants';
import ProductCard from '../../components/ProductCard';
import CustomHeader from '../../components/CustomHeader';
import BannerSlider from '../../components/BannerSlider';
import Categories from '../../components/Categories';
import SearchFilter from '../../components/SearchFilter';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS, SCREENS, getTheme, width } from '../../constants/theme';
import { useTranslation } from 'react-i18next';
import FilterModal from '../../components/FilterModal';
import { useFocusEffect } from '@react-navigation/native';
import { getProducts } from '../../redux/slices/products';
import CustomButton from '../../components/CustomButton';

export default function Home(props) {
    const { navigation } = props;

    const modal = React.useRef(null);
    const theme = useSelector(state => state.Theme.theme);
    const [search, setSearch] = useState('')
    const [products, setProducts] = useState([]);
    const user = useSelector(state => state.Auth.user)
    const [filterProducts, setFilterProducts] = useState(products)
    const categories = useSelector(state => state?.categories?.categories);
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [isFilter, setIsFilter] = useState(false)
    const currentTheme = getTheme(theme);
    const { t } = useTranslation();

    const onCancel = () => {
        if (modal.current) {
            modal.current.close();
        }
    };

    const onApply = (products) => {
        setProducts(products);
        setIsFilter(true)
    };


    // const getProduct = useCallback(async () => {

    //     if (loading || !hasMore) return; // Prevent multiple calls if already loading or no more data
    //     try {
    //         console.log("Fetching products");
    //         setLoading(true);
    //         const params = {
    //             ...(user !== null && { user_id: user?.user_id }),
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
    // },
    //     [dispatch, loading, page, hasMore]

    // );
    const getProduct = async () => {
        console.log("in get product", page)
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



    useFocusEffect(
        useCallback(() => {
            getProduct();
            return () => {
                // Cleanup function if needed
            };
        }, [])
    );

    const onReset = () => {
        setHasMore(true)
        setProducts([])
        setPage(1)
        getProduct()
        setIsFilter(false)
    }
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


    return (
        <View style={[STYLES.container, { backgroundColor: currentTheme.Background }]}>
            <CustomHeader />
            <ScrollView showsVerticalScrollIndicator={false}>
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
                <BannerSlider />
                <Categories
                    data={categories}
                    onPress={(item) => {
                        navigation.navigate(SCREENS.AllProduct, { item: item?.id });
                    }}
                />
                {loading ?
                    <ActivityIndicator size="large" color={currentTheme.primary} style={{ marginVertical: 20 }} /> :
                    <FlatList
                        columnWrapperStyle={{
                            justifyContent: "space-between",
                        }}
                        showsVerticalScrollIndicator={false}
                        data={filterProducts}
                        numColumns={2}
                        renderItem={({ item }) => <ProductCard
                            onFav={() => {

                            }}
                            item={item} />}
                    // onEndReachedThreshold={1}
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
                {!isFilter && <View style={{ flexDirection: "row", justifyContent: "space-between", }}>
                    <CustomButton
                        onPress={() => {
                            setPage(pre => pre - 1)
                            getProduct()
                        }}
                        disabled={page === 1}
                        btnStyle={styles.btnStyle}
                        label={"Back"}
                    />


                    <CustomButton
                        btnStyle={styles.btnStyle}
                        onPress={() => {
                            setPage(pre => pre + 1)
                            getProduct()
                        }}
                        label={"Next"}
                    />
                </View>}

                <View style={{ height: SIZES.fifty * 1.5 }} />
            </ScrollView>
            <FilterModal modalizeRef={modal} onApply={onApply} onResetAll={onReset} onCancel={onCancel} />
        </View>
    );
}

const styles = StyleSheet.create({
    btnStyle: {
        alignSelf: "center",
        width: width * .42
    }
});

import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import ImagePicker from 'react-native-image-crop-picker';
import { COLORS, FONTS, SIZES } from '../../constants';
import Icon, { IconType } from '../Icons';
import Card from '../Card';
import { label } from '../../constants/lables';
import { useTranslation } from 'react-i18next';

export default function UploadPhotoModal({
    isCircle,
    cropping,
    multiple,
    visibility,
    setVisibility,
    onImageSelected,
    includeBase64,
}) {
    const { t } = useTranslation();
    //======================= Image Picker From Gallery Methood ================================//
    const choosePhotoFromGallery = () => {
        ImagePicker.openPicker({
            cropping: cropping,
            multiple: multiple,
            width: SIZES.ten * 40,
            height: SIZES.ten * 40,
            cropperCircleOverlay: isCircle,
            compressImageQuality: 0.5,
            includeBase64: includeBase64,
        }).then(image => {
            setVisibility(false);
            onImageSelected(image);
        });
    };

    //======================= Image Capture From Camera Methood ================================//
    const takePhotoFromCamera = async () => {

        ImagePicker.openCamera({
            cropping: cropping,
            width: SIZES.ten * 40,
            height: SIZES.ten * 40,
            compressImageQuality: 0.5,
            cropperCircleOverlay: isCircle,
            includeBase64: includeBase64,
        }).then(image => {

            setVisibility(false);

            onImageSelected(image);

        });
    };

    //************rendorBottomSheet */
    const renderBottomSheetContent = () => {
        return (
            <View style={styles.bottomSheetBody}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                    <Text
                        style={[
                            FONTS.mediumFont16,
                            {
                                color: COLORS.defaultTextColor,
                            },
                        ]}>
                        {t('UploadPhoto')}
                    </Text>
                    <TouchableOpacity
                        onPress={() => {
                            setVisibility(false);
                        }}>
                        <Icon
                            type={IconType.Ionicons}
                            name={'close-sharp'}
                            style={{ color: COLORS.primary, fontSize: 22 }}
                        //   onPress={() => props.setVisibility(false)}
                        />
                    </TouchableOpacity>
                </View>
                <Text
                    style={[
                        FONTS.lightFont12,
                        {
                            color: COLORS.brownGrey,
                        },
                    ]}>
                    {t('SelectAPhotoFrom')}
                </Text>
                <View
                    style={{
                        marginTop: SIZES.ten * 3,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                    <Card
                        style={[
                            styles.viewSelectImageType,
                            {
                                marginRight: SIZES.ten,
                                backgroundColor: COLORS.primary,
                            },
                        ]}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                takePhotoFromCamera();
                            }}>
                            <Icon
                                type={IconType.Ionicons}
                                name={'camera'}
                                style={{
                                    color: COLORS.white,
                                    fontSize: SIZES.twentyFive * 2,
                                }}
                            />
                        </TouchableOpacity>
                    </Card>
                    <Card
                        style={[
                            styles.viewSelectImageType,
                            {
                                marginLeft: SIZES.ten,
                                backgroundColor: COLORS.primary,
                            },
                        ]}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                choosePhotoFromGallery();
                            }}>
                            <Icon
                                type={IconType.MaterialIcons}
                                name={'photo-library'}
                                style={{
                                    color: COLORS.white,
                                    fontSize: SIZES.twentyFive * 2,
                                }}
                                col
                            />
                        </TouchableOpacity>
                    </Card>
                </View>

                <View style={{ height: SIZES.fifty }} />
            </View>
        );
    };

    return (
        <Modal
            statusBarTranslucent
            animationIn={'slideInUp'}
            animationOut={'slideOutDown'}
            isVisible={visibility}
            style={styles.modal}>
            {renderBottomSheetContent()}
        </Modal>
    );
}

const styles = StyleSheet.create({
    bottomSheetBody: {
        backgroundColor: COLORS.white,
        padding: SIZES.fifteen,
        borderTopStartRadius: SIZES.ten,
        borderTopEndRadius: SIZES.ten,
    },
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    viewSelectImageType: {
        flex: 1,
        height: SIZES.fifty * 2,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: SIZES.ten,
    },
    button: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
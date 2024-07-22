import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Icon, IconType } from '../../components'
import CustomButton from '../../components/CustomButton'
import CustomModal from '../../components/CustomModal'
import EditText from '../../components/EditText'
import HeaderWithArrow from '../../components/HeaderWithArrow'
import UploadPhotoModal from '../../components/modal/UploadPhotoModal'
import { COLORS, IMAGES, SIZES, STYLES, height } from '../../constants'
import { getTheme } from '../../constants/theme'
import { ChangePassword, updateProfile } from '../../redux/slices/auth'
import { setLoading } from '../../redux/slices/utils'

export default function Profile(props) {
    const theme = useSelector(state => state.Theme.theme)
    const { t } = useTranslation();
    const currentTheme = getTheme(theme)
    const user = useSelector(state => state.Auth.user)
    const { navigation } = props
    const dispatch = useDispatch()
    const [isEdit, setIsEdit] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const [changePasswordModal, setChangePasswordModal] = useState(false)
    const [image, setImage] = useState('')
    const [firstName, setFirstName] = useState(user?.first_name)
    const [lastName, setLastName] = useState(user?.last_name)
    const [email, setEmail] = useState(user?.email)
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')


    const ProfilePic = () => {
        return (
            <View style={styles.imgConatiner}>
                <Image source={image !== "" ? { uri: image?.path } : user !== null ? { uri: user?.user_avatar } : IMAGES.user} style={styles.img} resizeMode="contain" />
                {isEdit &&
                    <TouchableOpacity
                        onPress={() => {
                            setIsVisible(!isVisible)
                        }}
                        style={styles.iconContainer}>
                        <Icon
                            name={"camera"}
                            type={IconType.Entypo}
                            color={COLORS.white}
                            size={SIZES.twenty}
                        />
                    </TouchableOpacity>
                }

            </View>
        )
    }

    const handleChanges = async () => {
        try {
            if (isEdit === true) {

                const fromData = new FormData()
                fromData.append("user_id", user?.user_id)
                fromData.append("first_name", firstName)
                fromData.append("last_name", lastName)
                fromData.append("email", email)
                if (image !== '') {
                    fromData.append("avatar", {
                        uri: image.path,
                        type: image.mime,
                        name: image.filename || `filename.${image.mime.split('/')[1]}`,
                    })
                }

                dispatch(setLoading(true))
                await dispatch(updateProfile(fromData))
                dispatch(setLoading(false))
                setIsEdit(pre => !pre)
            }
            else {
                setIsEdit(pre => !pre)
            }
        } catch (error) {
            console.log(error)
        }

    }
    const UpdatePassword = async () => {
        try {

            const data = {
                user_id: user?.user_id,
                old_password: oldPassword,
                new_password: newPassword,
                confirm_password: confirmPassword,
            }
            dispatch(setLoading(true))
            await dispatch(ChangePassword(data))
            dispatch(setLoading(false))
            setChangePasswordModal(!changePasswordModal)


        } catch (error) {

        }

    }
    return (
        <View style={[STYLES.container, { backgroundColor: currentTheme.Background }]}>
            <HeaderWithArrow label={isEdit ? t('EditProfile') : t('Profile')} />
            <ProfilePic />
            <EditText

                value={firstName}
                onChangeText={(e) => {
                    setFirstName(e)
                }}
                editable={isEdit ? true : false}
                label={t('FirstName')}
            />
            <EditText
                value={lastName}
                onChangeText={(e) => {
                    setLastName(e)
                }}

                editable={isEdit ? true : false}
                label={t('LastName')}

            />
            <EditText
                value={email}
                onChangeText={(e) => {
                    setEmail(e)
                }}

                editable={isEdit ? true : false}
                label={t('Email')}

            />
            <CustomButton
                onPress={handleChanges}
                btnStyle={{ marginTop: SIZES.twentyFive }}
                label={isEdit ? t('SaveChanges') : t('EditProfile')}
            />
            {isEdit === true &&
                <CustomButton
                    onPress={() => {
                        setChangePasswordModal(!changePasswordModal)
                    }}
                    txtstyle={styles.txtstyle}
                    btnStyle={[styles.btnStyle, { backgroundColor: currentTheme.Background, }]}
                    label={t('ChangePassword')}
                />
            }
            <UploadPhotoModal
                visibility={isVisible}
                onImageSelected={setImage}
                setVisibility={setIsVisible}
            />
            <CustomModal
                isvisible={changePasswordModal}
            >
                <Text style={styles.heading}>
                    {t('ChangePassword')}
                </Text>
                <Icon
                    name={"cross"}
                    type={IconType.Entypo}
                    color={COLORS.primary}
                    size={SIZES.twentyFive}
                    style={{ position: "absolute", right: SIZES.fifteen, top: SIZES.fifteen }}
                    onPress={() => setChangePasswordModal(false)}
                />
                <EditText
                    value={oldPassword}
                    onChangeText={(e) => {
                        setOldPassword(e)
                    }}
                    password
                    required
                    label={t('EnterOldPassword')}

                />
                <EditText
                    value={newPassword}
                    onChangeText={(e) => {
                        setNewPassword(e)
                    }}
                    password
                    required
                    label={t('EnterNewPassword')}

                />
                <EditText
                    value={confirmPassword}
                    onChangeText={(e) => {
                        setConfirmPassword(e)
                    }}
                    password
                    required
                    label={t('ConfirmPassword')}
                />
                <CustomButton
                    btnStyle={{ marginVertical: SIZES.fifteen }}
                    onPress={() => {
                        UpdatePassword()


                    }}
                    label={t('Update')}
                />

            </CustomModal>

        </View>
    )
}

const styles = StyleSheet.create({
    btnStyle: {

        borderColor: COLORS.primary,
        borderWidth: 1,

    },
    txtstyle: {
        color: COLORS.primary
    },
    img: {
        width: "100%",
        height: "100%",
        borderRadius: SIZES.fifty,
    },
    imgConatiner: {
        width: height * .15,
        height: height * .15,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: SIZES.twenty,
        alignSelf: "center",
        borderColor: COLORS.primary,
        borderWidth: 2,
        borderRadius: SIZES.fifty,
    },
    iconContainer: {
        backgroundColor: COLORS.primary,
        padding: SIZES.ten - 2,
        borderRadius: SIZES.fifty,
        position: "absolute",
        bottom: 0,
        right: 10
    },



    heading: {
        color: COLORS.defaultTextColor,
        alignSelf: "center",
        marginVertical: SIZES.fifteen,
        fontSize: SIZES.twenty,
        fontWeight: "600"
    }

})
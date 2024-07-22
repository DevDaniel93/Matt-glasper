import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../constants'
import Icon, { IconType } from './Icons'



export default function CustomButton(props) {
    return (
        <TouchableOpacity

            disabled={props.disabled}
            onPress={props.onPress}
            style={[styles.btn, { backgroundColor: props.disabled ? COLORS.gray : COLORS.primary }, props.btnStyle]}>
            <Text style={[styles.txt, props.txtstyle, { right: props.icon && 30 }]}>{props.label}</Text>
            {props.icon &&
                <View
                    style={[styles.starContainer, { position: "absolute", right: 50, top: 7, }]}
                >
                    <Icon
                        name={props.icon.name}
                        type={props.icon.type}
                        color={props.icon.color}
                        size={SIZES.twenty + 3}
                    />
                </View>}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btn: {
        // width: "100%",
        // flex: 1,
        backgroundColor: COLORS.primary,
        padding: SIZES.fifteen,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: SIZES.twentyFive,
        marginTop: SIZES.ten
    },
    txt: {
        color: COLORS.defaultBtnColor,
        fontWeight: "600",
        fontSize: SIZES.fifteen
    },
    starContainer: {
        // paddingHorizontal: SIZES.fifteen,
        borderRadius: SIZES.twentyFive,
        backgroundColor: COLORS.white,
        width: 35,
        height: 35,
        alignItems: "center",
        justifyContent: "center"
    },
})
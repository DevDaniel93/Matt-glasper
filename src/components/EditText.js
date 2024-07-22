import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { COLORS } from '../constants';
import { FONTS, getTheme, height, SIZES, width } from '../constants/theme';
import { MyTouchableOpacity, Card, Icon, IconType } from '../components';
import { useSelector } from 'react-redux';

export default function EditText(props) {
    const [enableSecureEntry, setEnableSecureEntry] = useState(true);
    const [focusColor, setFocusColor] = useState(COLORS.charcoalGrey);
    const theme = useSelector(state => state.Theme.theme)
    const currentTheme = getTheme(theme)

    return (
        <View style={[styles.textInputView, props.styleTxtArea]}>
            {props?.label
                &&
                <Text style={[styles.textLabel, { color: focusColor !== currentTheme.charcoalGrey ? focusColor : currentTheme.defaultTextColor }]}>
                    {props.label}
                    {props?.required &&
                        <Text style={styles.required}> *</Text>}
                </Text>
            }
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={[styles.textInputArea, { borderColor: focusColor }, props?.inputArea]}>
                    {props.hasIcon ? (
                        <Icon
                            type={props.type}
                            name={props.name}
                            style={{
                                marginRight: SIZES.ten * 0.7,
                                fontSize: SIZES.twenty * 1.1,
                            }}
                        />
                    ) : null}
                    <TextInput

                        {...props}
                        ref={props.ref}
                        multiline={props?.multiline}
                        secureTextEntry={props.password ? enableSecureEntry : false}
                        selectionColor={COLORS.primary}
                        placeholderTextColor={COLORS.gray}
                        placeholder={props?.placeholder}
                        onFocus={() => { setFocusColor(COLORS.primary) }}
                        onBlur={() => { setFocusColor(COLORS.charcoalGrey) }}
                        style={[FONTS.mediumFont14, styles.textInput, { color: currentTheme.defaultTextColor }, props?.style]}
                    />
                    {props.password ? (
                        <TouchableOpacity
                            onPress={() => {
                                setEnableSecureEntry(!enableSecureEntry);
                            }}>
                            <Icon
                                name={enableSecureEntry ? 'eye-slash' : 'eye'}
                                type={IconType.FontAwesome}
                                style={{
                                    fontSize: 20,
                                    color: currentTheme.defaultTextColor,
                                    marginLeft: 5,
                                }}
                            />
                        </TouchableOpacity>
                    ) : null}
                </View>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    textInputView: {
        // width: '100%',
        justifyContent: 'center',
        marginTop: SIZES.ten,
        borderRadius: Math.sqrt(width + height),
    },
    textInputArea: {
        flex: 1,
        height: SIZES.twentyFive * 2.3,
        padding: SIZES.five,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: SIZES.ten,
        paddingHorizontal: SIZES.fifteen
    },
    textInput: {
        flex: 1,
    },
    textLabel: {
        fontFamily: "Poppins",
        fontSize: SIZES.fifteen,
        fontWeight: "500",
        marginBottom: SIZES.ten,
        color: COLORS.defaultTextColor
    },
    required: {
        color: COLORS.red,
    }
});
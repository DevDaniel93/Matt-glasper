
import React, { useRef, useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../constants';

const OtpInput = ({ codeLength = 6, onCodeFilled }) => {
    const [code, setCode] = useState(new Array(codeLength).fill(''));
    const inputs = useRef([]);

    const handleChange = (text, index) => {
        if (text.length > 1) return;
        const newCode = [...code];
        newCode[index] = text;
        setCode(newCode);

        if (text !== '' && index < codeLength - 1) {
            inputs.current[index + 1].focus();
        }

        if (index === codeLength - 1) {
            onCodeFilled(newCode.join(''));
        }
    };

    const handleKeyPress = ({ nativeEvent: { key } }, index) => {
        if (key === 'Backspace' && code[index] === '' && index > 0) {
            inputs.current[index - 1].focus();
        }
    };

    return (
        <View style={styles.container}>
            {Array(codeLength)
                .fill(0)
                .map((_, index) => (
                    <TextInput
                        key={index}
                        style={styles.input}
                        keyboardType="numeric"
                        maxLength={1}
                        ref={(input) => (inputs.current[index] = input)}
                        onChangeText={(text) => handleChange(text, index)}
                        onKeyPress={(e) => handleKeyPress(e, index)}
                        value={code[index]}
                    />
                ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 20,
    },
    input: {
        width: SIZES.twentyFive * 2,
        height: SIZES.twentyFive * 2,
        borderWidth: 1,
        borderRadius: SIZES.ten,
        borderColor: COLORS.primary,
        textAlign: 'center',
    },
});

export default OtpInput;

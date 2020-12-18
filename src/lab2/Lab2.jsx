import React, { useState } from 'react';
import { StyleSheet, View, Share } from 'react-native';
import { useTheme, TextInput, Text, Button } from 'react-native-paper';
const { share, sharedAction, dismissedAction } = Share;

const Lab2 = () => {
    const { colors } = useTheme();
    const [sharableText, setSharableText] = useState('Lorem Ipsum Dolor Sit Amet');
    const wordCount = (sharableText.match(/\S*/g) || []).filter((word) => word.length).length;

    const onShare = async () => {
        try {
            const result = await share({
                message: sharableText,
            });
            if (result.action === sharedAction) {
                if (result.activityType) {
                    alert('Shared successfully on ', result.activityType);
                } else {
                    // shared in android
                    alert('Shared successfully!');
                }
            } else if (result.action === dismissedAction) {

                alert('Share action dismissed');
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: colors.background,
                },
            ]}
        >
            <TextInput
                label="Text Input"
                value={sharableText}
                onChangeText={(text) => setSharableText(text)}
                style={styles.input}
            />
            <View style={{ display: 'flex', flexDirection: 'row', width: 200 }}>
                <View style={styles.sharableTextContainer}>
                    <Text style={{ color: colors.primary }}>Text from input:</Text>
                    <Text style={styles.sharableText}>{sharableText}</Text>
                </View>
                <View style={styles.sharableTextContainer}>
                    <Text style={{ color: colors.primary }}>Words in text:</Text>
                    <Text style={styles.sharableText}>{wordCount}</Text>
                </View>
            </View>
            <Button style={styles.share} icon="share-variant" mode="outlined" onPress={onShare}>
                Share
            </Button>
        </View>
    );
};

export default Lab2;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    input: {
        marginBottom: 15,
        backgroundColor: 'white'
    },
    sharableText: {
        paddingVertical: 5,
    },
    sharableTextContainer: {
        paddingLeft: 10,
        marginBottom: 15,
    },
    share: {
        marginBottom: 15,
        width: 100,
        alignSelf: 'center'
    },
});

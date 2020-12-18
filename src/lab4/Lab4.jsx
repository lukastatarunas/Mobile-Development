import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme, TextInput, Button } from 'react-native-paper';
import { WebView as ReactWebView } from 'react-native-webview';

const Lab4 = ({ navigation }) => {
    const { colors } = useTheme();
    const [uri, setUri] = useState('https://www.vgtu.lt');

    const handleSubmit = () => {
        navigation.navigate('WebViewComponent', { uri: uri });
    }

    return (
        <>
            <View
                style={[
                    styles.container,
                    {
                        backgroundColor: colors.background,
                    },
                ]}
            >
                <TextInput
                    label="URL"
                    value={uri}
                    onChangeText={(text) => setUri(text)}
                    style={styles.input}
                />
                <Button mode="contained" title="submit" onPress={handleSubmit} style={{width: 200, alignSelf: 'center', marginTop: 10}}>Submit Query</Button>
            </View>
        </>
    );
};

export default Lab4;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

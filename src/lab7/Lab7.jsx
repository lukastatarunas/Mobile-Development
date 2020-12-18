import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme, Text, Switch } from 'react-native-paper';
import Lab7Context from './Lab7Context';

const Lab7 = () => {
    const { colors } = useTheme();
    const { isWatchingBattery, setIsWatchingBattery } = useContext(Lab7Context);

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: colors.background,
                },
            ]}
        >
            <View style={styles.switchContainer}>
                <Text style={{fontWeight: '700'}}>Turn on low battery notifications </Text>
                {isWatchingBattery !== null && (
                    <Switch
                        color='red'
                        value={isWatchingBattery}
                        onValueChange={() => setIsWatchingBattery(!isWatchingBattery)}
                    />
                )}
            </View>
        </View>
    );
};

export default Lab7;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        padding: 10
    },
});

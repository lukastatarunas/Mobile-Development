import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { Button, useTheme, Card, Title, Paragraph } from 'react-native-paper';
import { NAVIGATIONS } from './constants';

const navigationsArr = Object.entries(NAVIGATIONS);
// eslint-disable-next-line no-unused-vars
const [_, ...navigationsForButtons] = navigationsArr;

const HomeScreen = ({ navigation }) => {
    const { colors } = useTheme();
    return (
        <ScrollView>
            <View styles={styles.container}>
                <Button style={{ fontSize: 20, textAlign: 'center', marginTop: 20 }} >Made by Dimitrijus Stepanov, PRIf-17/2</Button>
                <Button style={{ fontSize: 18, textAlign: 'center', marginTop: 20 }} >1ST LAB IS A SCREENSHOT</Button>
                {navigationsForButtons.map(([_, NAVIGATION]) => (
                    <Card style={styles.card}>
                        <Card.Title title={NAVIGATION} />
                        <Card.Cover source={{ uri: 'https://images.idgesg.net/images/article/2019/01/android-dark-mode-100785923-large.jpg' }} />
                        <Card.Actions>
                            <Button mode="outlined" onPress={() => navigation.navigate(NAVIGATION)}>Go to {NAVIGATION}</Button>
                        </Card.Actions>
                    </Card>
                ))}
            </View>
        </ScrollView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
        marginTop: 10
    },
    card: {
        margin: 10,
    },
    button: {
        marginTop: 15,
        width: 200
    },
});

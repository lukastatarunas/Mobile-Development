import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { useTheme, List, Text, Colors } from 'react-native-paper';
import cities from './cities.json';

const { Item } = List;

const Lab5 = ({ navigation }) => {
    const { colors } = useTheme();
    const [popUps, setPopups] = useState([]);
    const { name, aCount, upperCaseCount, lowerCaseCount, voiceLettersCount } =
        popUps[popUps.length - 1] || {};

    useEffect(() => {
        const unsubscribe = navigation.addListener('beforeRemove', (e) => {
            if (!popUps.length) {
                return;
            }
            setPopups(popUps.slice(0, popUps.length - 1));
            e.preventDefault();
        });
        return unsubscribe;
    }, [navigation, popUps]);

    useEffect(() => {
        console.log(cities)
    }, [])

    const handlePress = (pressedName) => {
        if (pressedName === name) {
            return;
        }
        const aCount = (pressedName.match(/a|A/g) || []).length;
        if (aCount) {
            setPopups([
                ...popUps,
                {
                    name: pressedName,
                    aCount,
                },
            ]);
        } else {
            setPopups([
                ...popUps,
                {
                    name: pressedName,
                    upperCaseCount: (pressedName.match(/[A-Z]/g) || []).length,
                    lowerCaseCount: (pressedName.match(/[a-z]/g) || []).length,
                    voiceLettersCount: (pressedName.match(/[a|A|e|E|i|I|y|Y|u|U|o|O]/g) || [])
                        .length,
                },
            ]);
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
            <ScrollView>
                {cities.map(({ id, name }) => (
                    <>
                        <Item title={name} key={id} onPress={() => handlePress(name)} />
                        <View
                            style={{
                                borderBottomColor: 'red',
                                borderBottomWidth: 1,
                            }}
                        />
                    </>
                ))}
            </ScrollView>
            {popUps[popUps.length - 1] && (
                <View style={styles.popUp}>
                    <Text style={styles.text}>City: {name}</Text>
                    {aCount && <Text style={styles.text}>A letters in city: {aCount}</Text>}
                    {!aCount && <Text style={styles.text}>Length of city name: {name.length}</Text>}
                    {upperCaseCount && <Text style={styles.text}>Uppercase letters in city: {upperCaseCount}</Text>}
                    {lowerCaseCount && <Text style={styles.text}>Lowercase letters in city: {lowerCaseCount}</Text>}
                    {voiceLettersCount && <Text style={styles.text}>Vowels in city: {voiceLettersCount}</Text>}
                </View>
            )}
        </View>
    );
};

export default Lab5;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    popUp: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: Colors.red500,
        padding: 20,
    },
    text: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    }
});

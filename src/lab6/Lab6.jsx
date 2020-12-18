import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme, Text } from 'react-native-paper';
import ViewMenu from './ViewMenu';
import DatePickingModal from './DatePickingModal';
import Lab6Context from './Lab6Context';

const Lab6 = () => {
    const { colors } = useTheme();
    const { datePickerState } = useContext(Lab6Context);
    const { timeDifference } = datePickerState;
    const [firstText, setFirstText] = useState('Press me!');
    const [secondText, setSecondText] = useState('Symbols in phrase: ');
    const [timeText, setTimeText] = useState('')
    const [letterPos, setLetterPos] = useState(0);
    const [letterTickingText, setLetterTickingText] = useState(null);

    useEffect(() => {
        if (timeDifference === null) {
            return;
        }

        setTimeText(timeDifference);
    }, [timeDifference]);

    useEffect(() => {
        let interval = null;
        if (letterTickingText) {
            interval = setInterval(() => {
                setLetterPos((letterPos) => {
                    if (letterPos + 1 >= letterTickingText.length) {
                        setLetterTickingText(null);
                        return letterPos;
                    }
                    return letterPos + 1;
                });
            }, 1000);
        } else if (!letterTickingText && letterPos !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [firstText.length, letterTickingText, letterPos]);

    const handleItemPress = (text) => (itemPressed) => {
        if (itemPressed === 0) setSecondText(`Symbols in phrase: ${text.length}`);
        else if (itemPressed === 1) {
            setLetterTickingText(text);
            setLetterPos(0);
        }
    };

    return (
        <>
            <DatePickingModal />
            <View
                style={[
                    styles.container,
                    {
                        backgroundColor: colors.background,
                    },
                ]}
            >
                <ViewMenu
                    style={styles.text}
                    items={['Count symbols in phrase', 'Show letters']}
                    onItemPress={handleItemPress(firstText)}
                    anchor={(props) => <Text {...props}>{firstText}</Text>}
                />
                <ViewMenu
                    style={styles.text}
                    items={['Count symbols in phrase', 'Show letters']}
                    onItemPress={handleItemPress(secondText)}
                    anchor={(props) => <Text {...props}>{secondText}</Text>}
                />
                <Text style={styles.text}>Letter every 1 second:</Text>
                {letterTickingText && <Text>{letterTickingText[letterPos]}</Text>}
                <Text>Time difference in minutes: {timeText}</Text>
            </View>
        </>
    );
};

export default Lab6;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    text: {
        marginBottom: 15,
        borderWidth: 2,
        padding: 10
    },
});

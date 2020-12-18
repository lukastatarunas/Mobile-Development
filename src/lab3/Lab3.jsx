import React, { useState } from 'react';
import { StyleSheet, Platform, ScrollView, Picker, View, ToastAndroid, TouchableOpacity } from 'react-native';
import { useTheme, TextInput, Button, Text, Switch } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import Stars from 'react-native-stars';
import { AntDesign as Icon } from '@expo/vector-icons';
import Autocomplete from 'react-native-autocomplete-input'

const isIos = Platform.OS === 'ios';

const Lab3 = () => {
    const { colors } = useTheme();
    const [title, setTitle] = useState('');
    const [faculty, setFaculty] = useState('');
    const [filteredFaculties, setFilteredFaculties] = useState([])
    const [difficulty, setDifficulty] = useState(2);
    const [day, setDay] = useState('Pirmadienis');
    const [date, setDate] = useState(new Date());
    const [showTimePicker, setShowTimePicker] = useState(isIos || false);
    const [willRegister, setWillRegister] = useState(false);

    const minutes = date.getMinutes();
    const time = `${date.getHours()}:${minutes < 10 ? '0' + minutes : minutes}`;

    const onSave = () => {
        ToastAndroid.show(`Name: ${title}\nFaculty: ${faculty}\nDifficulty: ${difficulty} out of 5\nDay of week: ${day}\nSelected time: ${time}\nRegister: ${willRegister ? 'YES' : 'NO'}`, ToastAndroid.LONG)
    };

    const facultyOptions = [
        'Antano Gustaicio aviacijos institutas',
        'Aplinkos inzinerijos fakultetas',
        'Architekturos fakultetas',
        'Elektronikos fakultetas',
        'Fundamentiniu mokslu fakultetas',
    ]

    const findFaculty = (text) => {
        if (text) {
            let value = text.toLowerCase()
            setFilteredFaculties(
                facultyOptions.filter(faculty => faculty.toLowerCase().indexOf(value) > -1),
            )
        } else {
            setFilteredFaculties([])
        }
    }



    return (
        <ScrollView
            style={[
                styles.container,
                {
                    backgroundColor: colors.background,
                },
            ]}
        >
            <TextInput
                label="Name"
                value={title}
                onChangeText={(text) => setTitle(text)}
                style={styles.input}
            />
            <Text style={{ color: colors.primary, marginVertical: 10 }}>Set Faculty:</Text>
            <Autocomplete
                data={filteredFaculties}
                defaultValue={faculty}
                inputContainerStyle={styles.autocompleteContainer}
                onChangeText={text => findFaculty(text)}
                renderItem={({ item, i }) => (
                    <TouchableOpacity onPress={() => {
                        setFaculty(item)
                        setFilteredFaculties([])
                    }}>
                        <Text>{item}</Text>
                    </TouchableOpacity>
                )}
            />
            <Text style={{ color: colors.primary, marginVertical: 10 }}>Choose difficulty:</Text>
            <Stars
                default={difficulty}
                half={false}
                fullStar={<Icon name="heart" size={50} color={colors.primary} />}
                emptyStar={<Icon name="hearto" size={50} color='black' />}
                update={(newDifficulty) => setDifficulty(newDifficulty)}
                spacing={6}
            />
            <Text style={{ color: colors.primary, marginVertical: 10 }}>DoW:</Text>
            <Picker
                itemStyle={{ color: colors.onBackground }}
                style={{ color: colors.onBackground }}
                selectedValue={day}
                onValueChange={(newDay) => setDay(newDay)}
            >
                <Picker.Item label={'Monday'} value={'Monday'} />
                <Picker.Item label={'Tuesday'} value={'Tuesday'} />
                <Picker.Item label={'Wednesday'} value={'Wednesday'} />
                <Picker.Item label={'Thursday'} value={'Thursday'} />
                <Picker.Item label={'Friday'} value={'Friday'} />
                <Picker.Item label={'Saturday'} value={'Saturday'} />
                <Picker.Item label={'Sunday'} value={'Sunday'} />
            </Picker>
            {!isIos && (
                <>
                    <Button
                        style={{ width: 200, marginVertical: 10 }}
                        mode="contained"
                        icon="calendar"
                        color={colors.blue}
                        size={20}
                        onPress={() => setShowTimePicker(true)}
                    >
                        Open timepicker
                    </Button>
                </>
            )}
            {showTimePicker && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode="time"
                    display="default"
                    onChange={(event, selectedDate) => {
                        if (!isIos) setShowTimePicker(false);
                        if (selectedDate) setDate(selectedDate);
                    }}
                    textColor={colors.onBackground}
                />
            )}
            <Text style={{ color: colors.primary, marginVertical: 10 }}>Selected time: {time}</Text>
            <View style={[styles.switchContainer, styles.input]}>
                <Text style={{marginVertical: 10}}>Do you want to register? </Text>
                <Switch value={willRegister} onValueChange={() => setWillRegister(!willRegister)} />
            </View>
            <Button mode="contained" onPress={onSave}>
                Save changes
            </Button>
        </ScrollView>
    );
};

export default Lab3;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 5,
    },
    input: {
        marginBottom: 15,
        backgroundColor: 'white'
    },
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
});

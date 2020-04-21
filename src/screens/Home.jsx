import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    TextInput
} from 'react-native';
import moment from 'moment';

import Calendar from '../components/Calendar';
import CurrentTime from '../components/CurrentTime';
import Notes from '../components/Notes';

const styles = StyleSheet.create({
    rowItem: {
        flex: 1,
        flexDirection: 'row',
        padding: 15,
        alignItems: 'center',
    },
    container: {
        marginTop: 50
    },
    header: {
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        marginVertical: 5,
        marginHorizontal: 15
    },
    listInput: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    inputField: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        width: 300,
        paddingHorizontal: 10
    }
});

function Home({ database }) {
    const [selectedDate, setSelectedDate] = React.useState(moment(moment()));
    const [calendarMonth, setCalendarMonth] = React.useState(moment(selectedDate));
    const [text, setText] = React.useState('');

    const handlePress = (item) => {
        if (item !== -1) {
            setSelectedDate(moment(calendarMonth).date(item));
        }
    };

    const changeMonth = (n) => {
        setCalendarMonth(moment(calendarMonth).add(n, 'month'));
    };

    const handleAddNote = async () => {
        if (text.trim() === '') {
            return;
        }

        await database.action(async () => {
            await database.collections.get('notes').create(note => {
                note.body = text.trim()
                note.date = selectedDate.format('L')
            })
        });

        setText('');
    };

    return (
        <View style={styles.container}>
            <CurrentTime />
            <Calendar
                month={calendarMonth}
                handleChange={changeMonth}
                selectedDate={selectedDate}
                handlePress={handlePress}
            />
            <View>
                <Text style={styles.header}>
                    {selectedDate.format('MMMM Do YYYY')}
                </Text>
                <View style={styles.listInput}>
                    <TextInput
                        style={styles.inputField}
                        value={text}
                        onChangeText={(val) => setText(val)}
                    />
                    <Button
                        title="+"
                        onPress={handleAddNote}
                    />
                </View>
                <Notes database={database} selectedDate={selectedDate} />
            </View>
        </View>
    );
}

export default Home;

import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Button,
    TextInput
} from 'react-native';
import moment from 'moment';

import Calendar from '../components/Calendar';
import CurrentTime from '../components/CurrentTime';

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
    list: {
        marginTop: 20,
        marginHorizontal: 10
    },
    listInput: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    listItem: {
        marginVertical: 5,
        borderBottomWidth: 1,
        borderColor: '#ccc',
        paddingBottom: 2,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    inputField: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        width: 300,
        paddingHorizontal: 10
    }
});

function Home() {
    const [selectedDate, setSelectedDate] = React.useState(moment(moment()));
    const [calendarMonth, setCalendarMonth] = React.useState(moment(selectedDate));
    const [text, setText] = React.useState('');
    const [notes, setNotes] = React.useState([]);

    const handlePress = (item) => {
        if (item !== -1) {
            setSelectedDate(moment(calendarMonth).date(item));
        }
    };

    const changeMonth = (n) => {
        setCalendarMonth(moment(calendarMonth).add(n, 'month'));
    };

    const handleAddNote = () => {
        if (text.trim() === '') {
            return;
        }

        setNotes([...notes, { body: text.trim(), date: selectedDate.format('L') }]);
        setText('');
    };

    const handleRemoveNote = (val) => setNotes((prevState) => prevState.filter((note) => {
        return !(note.date === selectedDate.format('L') && note.body === val);
    }));

    const filterNotes = () => notes.filter((note) => note.date === selectedDate.format('L'));

    const renderNote = ({ item }) => (
        <View style={styles.listItem}>
            <Text>{item.body}</Text>
            <Button title="x" onPress={() => handleRemoveNote(item.body)} />
        </View>
    );

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
                <FlatList
                    data={filterNotes()}
                    renderItem={renderNote}
                    style={styles.list}
                    keyExtractor={(item) => item.body}
                />
            </View>
        </View>
    );
}

export default Home;

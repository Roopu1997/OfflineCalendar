import React from 'react';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import withObservables from "@nozbe/with-observables";
import { Q } from "@nozbe/watermelondb";

const styles = StyleSheet.create({
    list: {
        marginTop: 20,
        marginHorizontal: 10
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
});

const NoteItem = ({ note }) => {
    const handleRemoveNote = async () => {
        note.deleteNote()
    };

    return (
        <View style={styles.listItem}>
            <Text>{note.body}</Text>
            <Button title="x" onPress={handleRemoveNote} />
        </View>
    );
};

const Note = withObservables(['note'], ({ note }) => ({
    note: note.observe()
}))(NoteItem);

const Notes = ({ notes }) => {
    const renderNote = ({ item }) => <Note note={item} />;

    return (
        <FlatList
            data={notes}
            renderItem={renderNote}
            style={styles.list}
            keyExtractor={(item) => item.id}
        />
    );
};

const enhance = withObservables(["selectedDate"], ({ database, selectedDate }) => ({
    notes: database.collections.get("notes").query(Q.where("date", Q.eq(selectedDate.format('L'))))
}));

export default enhance(Notes);

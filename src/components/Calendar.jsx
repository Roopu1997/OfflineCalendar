import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button
} from 'react-native';
import moment from 'moment';

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const styles = StyleSheet.create({
    rowItem: {
        flex: 1,
        flexDirection: 'row',
        padding: 15,
        alignItems: 'center',
    },
    header: {
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        marginVertical: 5
    },
    calendar: {
        backgroundColor: '#eee',
        paddingVertical: 15
    },
    calendarTitle: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
});

const Calendar = ({
    month,
    handleChange,
    selectedDate,
    handlePress
}) => {
    const generateMatrix = () => {
        const matrix = [];
        // Create header
        matrix[0] = weekDays;

        const firstDay = moment(month).startOf('month').day();

        const maxDays = month.daysInMonth();

        let counter = 1;
        for (let row = 1; row < 7; row += 1) {
            matrix[row] = [];
            for (let col = 0; col < 7; col += 1) {
                matrix[row][col] = -1;
                if (row === 1 && col >= firstDay) {
                    // Fill in rows only after the first day of the month
                    matrix[row][col] = counter;
                    counter += 1;
                } else if (row > 1 && counter <= maxDays) {
                    // Fill in rows only if the counter's not greater than
                    // the number of days in the month
                    matrix[row][col] = counter;
                    counter += 1;
                }
            }
            if (matrix[row][6] === -1 || matrix[row][6] === maxDays) {
                break;
            }
        }

        return matrix;
    };

    const matrix = generateMatrix();

    const rows = matrix.map((row, rowIndex) => {
        const rowItems = row.map((item, colIndex) => {
            const isSelected = moment(month).date(item).format('MMM Do YY') === selectedDate.format('MMM Do YY')
                && rowIndex !== 0;
            return (
                <Text
                    key={rowIndex + colIndex}
                    style={{
                        flex: 1,
                        height: 20,
                        textAlign: 'center',
                        borderStyle: 'solid',
                        borderWidth: isSelected ? 1 : 0,
                        borderColor: '#999',
                        // Highlight header
                        backgroundColor: rowIndex === 0 ? '#ccc' : '#fff',
                        // Highlight Sundays
                        color: colIndex === 0 ? '#a00' : '#000',
                        // Highlight current date
                        fontWeight: isSelected ? 'bold' : 'normal'
                    }}
                    onPress={() => handlePress(item)}
                >
                    {item !== -1 ? item : ''}
                </Text>
            );
        });

        return (
            <View
                key={rowIndex}
                style={styles.rowItem}
            >
                {rowItems}
            </View>
        );
    });

    return (
        <View style={styles.calendar}>
            <View style={styles.calendarTitle}>
                <Button
                    title="<"
                    onPress={() => handleChange(-1)}
                />
                <Text style={styles.header}>
                    {month.format('MMMM YYYY')}
                </Text>
                <Button
                    title=">"
                    onPress={() => handleChange(+1)}
                />
            </View>
            {rows}
        </View>
    );
};

export default Calendar;

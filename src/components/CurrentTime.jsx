import React from 'react';
import { StyleSheet, Text } from 'react-native';
import moment from 'moment';

const styles = StyleSheet.create({
    current: {
        fontWeight: 'bold',
        fontSize: 22,
        textAlign: 'center',
        marginVertical: 10
    },
});

const CurrentTime = () => {
    const [currentDate, setCurrentDate] = React.useState(moment());

    React.useEffect(() => {
        setInterval(() => setCurrentDate(moment()), 1000);
    }, []);

    return (
        <Text style={styles.current}>
            {currentDate.format('MMMM Do YYYY, h:mm:ss a')}
        </Text>
    );
};

export default CurrentTime;

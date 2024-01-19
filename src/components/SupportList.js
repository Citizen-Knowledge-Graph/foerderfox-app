import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Dummy data for the list
const data = [
    {
        id: '1',
        title: 'Energiepauschale',
        description: "He'll want to use your yacht, and I don't want this thing smelling like fish.",
        time: '8m ago',
        image: require('../assets/images/family_icon.png'), // Replace with your local image
    },
    {
        id: '2',
        title: 'Bildungsgutschein',
        description: "He'll want to use your yacht, and I don't want this thing smelling like fish.",
        time: '8m ago',
        image: require('../assets/images/family_icon.png'), // Replace with your local image
    },
    {
        id: '3',
        title: 'Elterngeld',
        description: "He'll want to use your yacht, and I don't want this thing smelling like fish.",
        time: '8m ago',
        image: require('../assets/images/family_icon.png'), // Replace with your local image
    },
    {
        id: '4',
        title: 'Arbeitslosengeld',
        description: "He'll want to use your yacht, and I don't want this thing smelling like fish.",
        time: '8m ago',
        image: require('../assets/images/family_icon.png'), // Replace with your local image
    },
    {
        id: '5',
        title: 'Gesundheitsversicherung',
        description: "He'll want to use your yacht, and I don't want this thing smelling like fish.",
        time: '8m ago',
        image: require('../assets/images/family_icon.png'), // Replace with your local image
    }
];

const ListHeader = () => {
    return (
        <Text style={styles.listHeader}>Deine Förderungen</Text>
    );
};

const ListItem = ({ item }) => {
    const navigation = useNavigation();

    const handleListItemPress = () => {
        navigation.navigate('SchemeStackScreen', {});
    };

    return (


        <TouchableOpacity onPress={handleListItemPress}>
            <View style={styles.listItem}>
                <Image source={item.image} style={styles.listItemImage} />
                <View style={styles.listItemContent}>
                    <Text style={styles.listItemTitle}>{item.title}</Text>
                    <Text style={styles.listItemDescription}>{item.description}</Text>
                </View>
                <Text style={styles.listItemTime}>{item.time}</Text>
            </View>
        </TouchableOpacity>
    )
};

const FörderungenList = () => {
    return (
        <View style={styles.container}>
            <ListHeader />
            {data.map(item => (
                <ListItem key={item.id} item={item} />))
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listHeader: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingTop: 16,
        backgroundColor: '#FFF', // Or any color you want for the background of the header
    },
    listItem: {
        flexDirection: 'row',
        padding: 16,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    listItemImage: {
        width: 40,
        height: 40,
        borderRadius: 25,
        marginRight: 16,
    },
    listItemContent: {
        flex: 1,
    },
    listItemTitle: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    listItemDescription: {
        fontSize: 10,
        color: '#666',
    },
    listItemTime: {
        fontSize: 8,
        color: '#666',
    },
});

export default FörderungenList;
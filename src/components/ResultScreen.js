import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    ScrollView,
    StatusBar,
    FlatList,
    ActivityIndicator
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';
import Image from 'react-native-fast-image';
import { styles } from '../styles/result';
import CaptionCard from './card/CaptionCard';

const ResultScreen = ({ route }) => {
    const image = route?.params?.image;
    const { captions, loading, error } = useSelector((state) => state.captions); 
    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor={'transparent'} />
            <View style={{}}>
                <LinearGradient
                    colors={['#6366F1', '#D946EF']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[styles.gradientButton, { padding: 20, paddingTop: 50, alignItems: 'flex-start', borderRadius: 0, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }]}
                >
                    <Text style={styles.title}>Result</Text>
                    <Text style={styles.title}>Paresh</Text>
                </LinearGradient>
            </View>
            {
               loading && <ActivityIndicator size={'large'} />
            }
            <View style={{ marginTop: 20, flex: 1 }}>
                <Image
                    source={{ uri: image.uri }} // Replace with your image
                    style={styles.image}
                />
                <View style={{ paddingBottom: 220 }}>
                    <FlatList
                        data={captions}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => <CaptionCard image={image} item={item} />}
                        contentContainerStyle={styles.list}
                    />
                </View>
            </View>
        </View>
    );
};

export default ResultScreen;



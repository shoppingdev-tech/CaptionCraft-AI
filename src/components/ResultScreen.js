import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    ScrollView,
    StatusBar,
    FlatList,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'react-native-fast-image';
import { styles } from '../styles/result';
import CaptionCard from './card/CaptionCard';
import { fetchCurrentDetails } from '../redux/thunk/auth';
import Icon from 'react-native-vector-icons/Ionicons';
import { theme } from '../theme';
import RectangleSkeleton from './skeleton/result';
import { useDisableBackHandler } from '../backHandlerUtils';

const ResultScreen = ({ route, navigation }) => {
  useDisableBackHandler();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    console.log('user', user?.id);
    useEffect(() => {
        dispatch(fetchCurrentDetails({uid: user?.id}));
    }, [loading])
    const image = route?.params?.image;
    const { captions, loading } = useSelector((state) => state.captions);
    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor={'transparent'} />
            <View style={{ backgroundColor: '#F3F4F6' }}>
                <LinearGradient
                    colors={['#6366F1', '#D946EF']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: 20,
                        paddingTop: 40,
                        paddingBottom: 10
                    }}
                >
                    <TouchableOpacity onPress={() => navigation.reset({
                        index: 0,
                        routes: [{ name: 'Home' }], // Name of the screen you want to go after reset
                    })} style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                        <View >
                            <Icon name="arrow-back-sharp" size={24} color={theme.colors.white} />
                        </View>
                        <Text style={{
                            color: theme.colors.white,
                            fontFamily: 'Poppins-SemiBold',
                            fontSize: 20,
                            marginLeft: 20
                        }}>
                            Your Captions!
                        </Text>
                    </TouchableOpacity>
                </LinearGradient>
            </View>
            <View style={{ marginTop: 20, flex: 1 }}>
                <Image
                    source={{ uri: image.uri }} // Replace with your image
                    style={styles.image}
                />

                <View style={{ paddingBottom: 220 }}>
                    {
                        loading ? (
                            <RectangleSkeleton />

                        ) : (
                            <FlatList
                                data={captions}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }) => <CaptionCard image={image} item={item} />}
                                contentContainerStyle={styles.list}
                            />
                        )
                    }
                </View>
            </View>
        </View>
    );
};

export default ResultScreen;



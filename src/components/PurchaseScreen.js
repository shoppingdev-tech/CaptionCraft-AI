import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import styles from '../styles/purchase';
import LinearGradient from 'react-native-linear-gradient';

const plans = [
    {
        title: 'Free Plan',
        description: 'Access to basic features like generating captions and saving a limited number of posts.',
        price: '$0 / month',
        buttonText: 'Start Free Plan',
    },
    {
        title: 'Premium Plan',
        description: 'Unlock all premium features, including themed caption packs, unlimited saves, and priority support.',
        price: '$5.99 / month',
        buttonText: 'Get Premium',
    },
    {
        title: 'One-Time Purchase',
        description: 'Pay once and unlock all premium features forever, with no recurring fees.',
        price: '$29.99 (One-time)',
        buttonText: 'Buy Once',
    },
];

const PurchaseScreen = () => {
    return (
        <LinearGradient colors={['#6366F1', '#D946EF']} start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }} style={styles.gradientBackground}>
            <StatusBar translucent backgroundColor={'transparent'} />

            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Choose Your Plan</Text>

                {plans.map((plan, index) => (
                    <View key={index} style={styles.card}>
                        <Text style={styles.planTitle}>{plan.title}</Text>
                        <Text style={styles.planDescription}>{plan.description}</Text>
                        <Text style={styles.planPrice}>{plan.price}</Text>
                        <TouchableOpacity style={styles.button}>
                            <LinearGradient colors={['#7C3AED', '#8B5CF6']} style={styles.buttonGradient}>
                                <Text style={styles.buttonText}>{plan.buttonText}</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
        </LinearGradient>
    );
};

export default PurchaseScreen;

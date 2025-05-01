import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import styles from '../styles/purchase';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';

const plans = [
    {
        title: 'Free Plan',
        description: 'Includes 50 tokens and access to all basic features with ads (2 per request). Great to explore the app for free.',
        price: '₹0 (Default)',
        buttonText: 'Start for Free',
        plan: 'FREE'
    },
    {
        title: 'Ad-Free Add-on',
        description: 'Remove all ads from the app. Combine with any token plan for an uninterrupted experience.',
        price: '₹100',
        buttonText: 'Go Ad-Free',
        plan: 'ADD_FREE'
    },
    {
        title: 'Starter Plan',
        description: 'Get 100 tokens for casual use. Ads will be shown with each request.',
        price: '₹50',
        buttonText: 'Buy Starter Plan',
        plan: 'STARTER'
    },
    {
        title: 'Standard Plan',
        description: 'Includes 200 tokens with ads. Ideal for regular users.',
        price: '₹90',
        buttonText: 'Buy Standard Plan',
        plan: 'STANDERED'
    },
    {
        title: 'Pro Plan',
        description: '500 tokens for heavy usage with ads. Great for creators and small teams.',
        price: '₹220',
        buttonText: 'Buy Pro Plan',
        plan: 'PRO',
    },
    {
        title: 'Ultra Pro Plan',
        description: '1000 tokens with ads. Best value for power users and businesses.',
        price: '₹850',
        buttonText: 'Buy Ultra Pro Plan',
        plan: 'ULTRA_PRO',
    },
];

const PurchaseScreen = () => {
    const { user } = useSelector((state) => state.auth);
    console.log('user', user);
    return (
        <LinearGradient colors={['#6366F1', '#D946EF']} start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }} style={styles.gradientBackground}>
            <StatusBar translucent backgroundColor={'transparent'} />

            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Choose Your Plan</Text>

                {plans.map((plan, index) => {
                    const isDisbled= user?.plan == 'FREE' && plan?.plan == user?.plan || user?.isAddFree && plan?.plan == 'ADD_FREE'
                    return (
                        (
                            <View key={index} style={styles.card}>
                                <Text style={styles.planTitle}>{plan.title}</Text>
                                <Text style={styles.planDescription}>{plan.description}</Text>
                                <Text style={styles.planPrice}>{plan.price}</Text>
                                <TouchableOpacity disabled={isDisbled} style={styles.button}>
                                    <LinearGradient colors={isDisbled ? ['#6B7280', '#9CA3AF'] : ['#7C3AED', '#8B5CF6']} style={styles.buttonGradient}>
                                        <Text style={styles.buttonText}>{plan.buttonText}</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        )
                    )
                })}
            </ScrollView>
        </LinearGradient>
    );
};

export default PurchaseScreen;

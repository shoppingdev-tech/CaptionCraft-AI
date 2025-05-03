import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import styles from '../styles/purchase';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const PurchaseScreen = () => {
    const { t } = useTranslation();
    const { user } = useSelector((state) => state.auth);
    console.log('user', user);
    const plans = [
        {
            title: t('free_plan'),
            description: t('free_plan_desc'),
            price: '₹0 (Default)',
            buttonText: t('start_for_free'),
            plan: 'FREE'
        },
        {
            title: t('ad_free_addon'),
            description: t('ad_free_addon_desc'),
            price: '₹100',
            buttonText: t('go_ad_free'),
            plan: 'ADD_FREE'
        },
        {
            title: t('starter_plan'),
            description: t('starter_plan_desc'),
            price: '₹50',
            buttonText: t('buy_starter_plan'),
            plan: 'STARTER'
        },
        {
            title: t('standard_plan'),
            description: t('standard_plan_desc'),
            price: '₹90',
            buttonText: t('buy_standard_plan'),
            plan: 'STANDERED'
        },
        {
            title: t('pro_plan'),
            description: t('pro_plan_desc'),
            price: '₹220',
            buttonText: t('buy_pro_plan'),
            plan: 'PRO',
        },
        {
            title: t('ultra_pro_plan'),
            description: t('ultra_pro_plan_desc'),
            price: '₹850',
            buttonText: t('buy_ultra_pro_plan'),
            plan: 'ULTRA_PRO',
        },
    ];
    return (
        <LinearGradient colors={['#6366F1', '#D946EF']} start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }} style={styles.gradientBackground}>
            <StatusBar translucent backgroundColor={'transparent'} />

            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>{t('choose_plan')}</Text>

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

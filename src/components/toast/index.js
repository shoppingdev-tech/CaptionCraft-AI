import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme';

const CustomToast = ({ text1, text2, type }) => {
    console.log('text1, text2, type',text1, text2, type);
    
  const isError = type === 'error';
  const isSuccess = type === 'success';
  const isInfo = type === 'info';

  return (
    <View style={[styles.container, 
      isError && { borderLeftColor: theme.colors.redError },
      isSuccess && { borderLeftColor: theme.colors.primary },
      isInfo && { borderLeftColor: theme.colors.gray }
    ]}>
      <Text style={styles.title}>{text1}</Text>
      {text2 ? <Text style={styles.message}>{text2} </Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    backgroundColor: theme.colors.white,
    padding: 12,
    borderLeftWidth: 5,
    borderRadius: 12,
    marginTop: 10,
    alignSelf: 'center',
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    ...theme.fonts.boldStyle,
    color: theme.colors.textPrimary,
  },
  message: {
    ...theme.fonts.body2Style,
    color: theme.colors.textSecondary,
    marginTop: 4,
  },
});

export default CustomToast;

import firestore from '@react-native-firebase/firestore'; // or your Firebase config import

export const logErrorToFirestore = async (type, errorString) => {
  try {
    if(__DEV__){
        return;
    }
    await firestore()
      .collection('errorLogs')
      .add({
        type,
        error: errorString,
        timestamp: new Date().toISOString(),
      });
  } catch (err) {
  }
};

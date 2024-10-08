import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';
import { AyaData } from '../modules/quranModule';

interface ContentReaderProps {
  content: AyaData[] | undefined; 
}

const ContentReader = ({ content }: ContentReaderProps) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'LPMQ': require('../assets/fonts/LPMQ.ttf'),
      });
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!content) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No content available.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {content.map((aya) => (
        <View key={aya.aya_id} style={styles.ayaContainer}>
          <Text style={styles.ayaNumber}>{aya.aya_number}</Text>
          <Text style={styles.ayaText}>{aya.aya_text}</Text>
          <Text style={styles.translation}>{aya.translation_aya_text}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  ayaContainer: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
  },
  ayaNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  ayaText: {
    fontSize: 16,
    marginVertical: 5,
    fontFamily: 'LPMQ'
  },
  translation: {
    fontSize: 14,
    color: '#555',
  },
});

export default ContentReader;

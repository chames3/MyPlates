import { useState } from 'react';
import { Button, Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

export default function RecordScreen() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [memo, setMemo] = useState('');

  const pickImage = async () => {
    // メディアライブラリの権限リクエスト
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('アクセス拒否', '写真へのアクセスが許可されていません。');
      return;
    }
  
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });
  
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🍽️ 食事を記録する</Text>

      {/* 写真エリア */}
      <View style={styles.imageContainer}>
        <Image
          source={imageUri ? { uri: imageUri } : require('../assets/images/placeholder.png')}
          style={styles.image}
        />
      </View>

      <Button title="📷 写真を選ぶ" onPress={pickImage} />

      {/* メモ入力欄 */}
      <TextInput
        placeholder="メモを入力してください（例：サラダと焼き魚）"
        style={styles.input}
        multiline
        value={memo}
        onChangeText={setMemo}
      />

      <Button title="💾 保存する" onPress={() => { /* 後で実装 */ }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    height: 200,
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
  },
  image: {
    width: 180,
    height: 180,
    resizeMode: 'cover',
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 12,
    borderRadius: 8,
    minHeight: 100,
    textAlignVertical: 'top',
  },
});

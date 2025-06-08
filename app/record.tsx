import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Alert, Button, Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { postMealRecord } from '../utils/api';

export default function RecordScreen() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [memo, setMemo] = useState('');
  const [mimeType, setMimeType] = useState('');
  const [fileName, setFileName] = useState('');

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
      quality: 1,
      base64: false
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      setMimeType(asset.mimeType ?? 'image/jpeg')
      setFileName(asset.fileName ?? 'upload.jpg')
      setImageUri(asset.uri);
    }

  };

  const handleSubmit = async () => {
    if (!memo || !imageUri) {
      alert('メモと画像を入力してください');
      return;
    }

    try {
      const res = await postMealRecord(memo, imageUri, mimeType, fileName);
      console.log('投稿成功:', res);
      setMemo('');
      setImageUri(null);
    } catch (err) {
      alert('送信に失敗しました');
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

      <Button title="💾 保存する" onPress={handleSubmit} />
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

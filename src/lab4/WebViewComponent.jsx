import React from 'react';
import { WebView } from 'react-native-webview';
import { View } from 'react-native';

export default function WebViewComponent({ route }) {
  const { uri } = route.params;

  return (
    <View style={{ flex: 1 }}>
      <WebView source={{ uri: uri }} />
    </View>
  );
}

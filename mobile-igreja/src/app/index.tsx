import { Image, StyleSheet, Platform, KeyboardAvoidingView, View, Text, TouchableOpacity, TextInput } from 'react-native';


import { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { useAuth } from '../authContext';
import { ActivityIndicator } from 'react-native-paper';

import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';


export default function LoginScreen() {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const { signIn, loading, devLogin,errors } = useAuth()
  const handleLogin = async () => {

    if (!username.trim() || !password.trim()) {

      return;
    }
    await signIn({
      email: username,
      password
    })
 
  }

  const handleParceiro = async  () => {
  
    await devLogin({
      id: '2',
      name: 'PARCEIRO AJUDANTE',
      email: 'parceiro.com',
      profile: 'CONTRIBUIDOR',
    })
  }

  const handleIgreja = async  () => {
  
    await devLogin({
      id: '1',
      name: 'Igreja de Jesus',
      email: 'igreja.com.br',
      profile: 'IGREJA',
    })
  }
  return (
    <>
      {loading ? <ActivityIndicator animating={true} color={'RED'} />

        :
        
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ backgroundColor: '#FFF' }}>


          <View style={styles.logoContainer}>
            <Image
              source={{ uri: 'https://placehold.co/400' }}
              style={styles.logo}
            />
            <Text style={styles.appName}>Meu Aplicativo</Text>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.label}>Usuário</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite seu usuário"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              autoCorrect={false}
            />

            <Text style={styles.label}>Senha</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite sua senha"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <TouchableOpacity
              style={styles.button}
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text style={styles.buttonText}>Entrar</Text>
              )}
            </TouchableOpacity>

            {/* Botões de login rápido para desenvolvimento */}
            {__DEV__ && (
              <View style={styles.devContainer}>
                <Text style={styles.devText}>Modo de Desenvolvimento</Text>
                <View style={styles.devButtonContainer}>
                  <TouchableOpacity
                    style={[styles.devButton, { backgroundColor: '#6495ED' }]}
                  onPress={() => handleParceiro()}
                  // disabled={loading}
                  >
                    <Text style={styles.devButtonText}>Login Parceiro</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.devButton, { backgroundColor: '#FFA500' }]}
                  onPress={() => handleIgreja()}
                  // disabled={loading}
                  >
                    <Text style={styles.devButtonText}>Login Igreja</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
            <View>{errors ? errors : null}</View>
          <View style={styles.footer}>
            <Text style={styles.footerText}>© 2025 Minha Empresa</Text>
          </View>
        </KeyboardAvoidingView>
      }
    </>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666666',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 40,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#4B0082',
  },
  formContainer: {
    paddingHorizontal: 30,
    paddingVertical: 40
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#F9F9F9',
  },
  button: {
    backgroundColor: '#4B0082',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  footerText: {
    color: '#999',
    fontSize: 12,
  },
  // Estilos para botões de desenvolvimento
  devContainer: {
    marginTop: 40,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  devText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#999',
    marginBottom: 10,
  },
  devButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  devButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  devButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});


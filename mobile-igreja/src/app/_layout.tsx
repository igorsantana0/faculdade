import { Image, StyleSheet, Platform, KeyboardAvoidingView, View, Text, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';


import { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { Slot, Stack, useRouter } from 'expo-router';
import { AuthProvider, useAuth } from '../authContext';



export default function Layout() {
  return (
    <AuthProvider>

        <Slot />

     
    </AuthProvider>
  )
}
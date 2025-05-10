import { useAuth } from "@/src/authContext";
import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { Button, IconButton } from "react-native-paper";
import AntDesign from '@expo/vector-icons/AntDesign';
import Toast, { SuccessToast } from "react-native-toast-message";
export default function Header() {
    const { signOut, user } = useAuth();
    const logout = async () => {
        await signOut().then(() => router.replace('/'))
    }

    const normaliZeText = (text: string | undefined) => {
        if (text) {
            if (text.length > 20) return text ? text.slice(0, 20) + "..." : ''
            return text
        }

        return ''
    }
    return (
        <>
            <View style={styles.container}>

                <Text style={styles.userName}>Olá, {normaliZeText(user?.name)}
                </Text>
                <IconButton
                    onPress={logout}
                    icon={'exit-to-app'}
                    iconColor="red"
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#4B0082',
        color: '#fff',

    },
    userName: {
        color: '#FFF',
        fontWeight: 500,
        fontSize: 20
    }
})
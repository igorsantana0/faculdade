import { useAuth } from "@/src/authContext"
import Header from "@/src/components/header/header.component";
import { Slot } from "expo-router";
import { ActivityIndicator } from "react-native-paper";
import Toast from "react-native-toast-message";

export default function Layout() {
    const { loading } = useAuth();
    return (
        <>
            {loading ?
                <ActivityIndicator animating={true} color={'RED'} />
                : <>
                    <Header />
                    <Slot />
                </>}
        </>
    )
}
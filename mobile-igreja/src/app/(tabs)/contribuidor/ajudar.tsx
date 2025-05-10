import { useAuth } from "@/src/authContext";
import { HelperService } from "@/src/services/helpers.service";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ActivityIndicator, TextInput } from "react-native-paper";

export default function Ajudar() {
    const [loadingButton, setLoadingButton] = useState(false)
    const { user } = useAuth();
    const [nome, setNome] = useState<string>()
    const [idade, setIdade] = useState<string>();
    const [descricao, setDescricao] = useState<string>();
    const handlerHelper = async () => {
        setLoadingButton(true)
        if (!!nome && !!idade && !!descricao) {
            const helper = {
                nome,
                idade,
                descricao,
                userId: user?.id
            }
            await HelperService.sendHelper(helper).then(() => location.reload());
        }

        setTimeout(() => setLoadingButton(false), 3000)

    }
    return (

        <View style={style.container}>
            <View style={style.formContainer}>
                <Text style={style.headerText}>Ajude o proximo</Text>
                <View>
                    <Text style={style.label}>Quem você quer ajudar? </Text>
                    <TextInput
                        style={style.input}
                        placeholder="Nome"
                        value={nome}
                        onChangeText={setNome}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </View>
                <View>
                    <Text style={style.label}>Idade de quem vocêr quer ajudar? </Text>
                    <TextInput
                        style={style.input}
                        placeholder="Idade"
                        value={idade}
                        onChangeText={setIdade}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </View>
                <View>
                    <Text style={style.label}>Descrição, Local? </Text>
                    <TextInput
                        style={style.input2}
                        placeholder="Descrição"
                        value={descricao}
                        onChangeText={setDescricao}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </View>
                <TouchableOpacity
                    style={style.button}
                    onPress={() => handlerHelper()}
                    disabled={loadingButton}
                >
                    {loadingButton ? (
                        <ActivityIndicator animating={true} color={'#FFFFFF'} />
                    ) : (
                        <Text style={style.buttonText}>Enviar dados</Text>
                    )}
                </TouchableOpacity>
            </View>
        </View>

    )
}

const style = StyleSheet.create({
    headerText: {

        fontSize: 40,
        color: '#666666',
    },
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#4B0082',
        width: "100%",
        height: 50,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },

    formContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '14px',

    },
    label: {
        fontSize: 16,
        color: '#333',
        marginBottom: 5,
    },
    input2: {
        height: 70,
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 16,
        marginBottom: 20,
        backgroundColor: '#F9F9F9',
    },
    input: {
        height: 30,
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 16,
        marginBottom: 20,
        backgroundColor: '#F9F9F9',
    },
})
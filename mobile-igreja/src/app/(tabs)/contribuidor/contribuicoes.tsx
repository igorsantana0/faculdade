import { useAuth } from "@/src/authContext"
import { HelperService } from "@/src/services/helpers.service"
import { useNavigation } from "expo-router"
import { useEffect, useState } from "react"
import { ScrollView, Text } from "react-native"
import { Button, Card } from "react-native-paper"


export default function Contribuicoes() {
    const { user } = useAuth()
    const navigation = useNavigation()
    type Helper = {
        nome: string,
        idade: number,
        descricao: string,
        status: string
    }
    const [helpers, setHelpers] = useState<Helper[]>([])
    const loadHelpers = async () => {
        await HelperService.getByUserId(user?.id).then(r => setHelpers(r))

    }
    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            if (user) loadHelpers();
        });

        return unsubscribe;
    }, [navigation, user]);

    useEffect(() => {
        if (user) loadHelpers();
    }, [user]);

    const status: any = {
        RESOLVIDO: "[FINALIZADO]",
        ABERTO: "[ABERTO]",
        EM_PROCESSO: "[EM PROCESSO DE AJUDA]",
        CANCELADO: "[CANCELADO]"
    }


    return (
        <ScrollView>

            {helpers.length < 1 ? <Text>Sem ajudas para listar</Text> : helpers.map((p) => (
                (
                    <Card>
                        <Card.Title title={`${p.nome} - ${status[p.status]}`} subtitle={`idade: ${p.idade}`} />
                        <Card.Content>
                            <Text>{p.descricao}</Text>
                        </Card.Content>

                    </Card>
                )
            ))}
        </ScrollView >
    )
}
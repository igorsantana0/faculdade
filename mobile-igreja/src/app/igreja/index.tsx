import { useAuth } from "@/src/authContext";
import { HelperService } from "@/src/services/helpers.service";
import { useRoute } from "@react-navigation/native";
import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import { Button, Card, PaperProvider, Text } from 'react-native-paper';
import Toast, { BaseToastProps } from 'react-native-toast-message';

export default function Igreja() {
    type Helper = {
        id: string,
        nome: string,
        idade: number,
        descricao: string,
        status: string
    }
    const [helpers,setHelpers] = useState<Helper[]>([])
    const loadHelpers =  async () => {
        await  HelperService.getAll().then(r => setHelpers(r))
       
    }
    useEffect(()=> {
        loadHelpers();
    },[])

    const status: any = {
        RESOLVIDO: "[FINALIZADO]",
        ABERTO: "[ABERTO]",
        EM_PROCESSO: "[EM PROCESSO DE AJUDA]",
        CANCELADO: "[CANCELADO]"
    }

    const handleStatus = async (id: any, status: any) => {
        await HelperService.updateStatus(id, status).then(()=> loadHelpers());
    }

    return (
        <>
        <ScrollView>
            {helpers.length < 1 ? <Text>Sem ajudas para listar</Text> : helpers.map((p, index
            
              ) => (
                  (
                      <Card key={index}>
                          <Card.Title title={`${p.nome} - ${status[p.status]}`} subtitle={`idade: ${p.idade}`} />
                          <Card.Content>
                              <Text>{p.descricao}</Text>
                          </Card.Content>
                          <Card.Actions>
                              {p.status == "EM_PROCESSO" ? <Button onPress={() => handleStatus(p.id, "RESOLVIDO")}>Finalizar a ajuda</Button> : null}
                              {(p.status != "RESOLVIDO" && p.status != "CANCELADO" && p.status != "EM_PROCESSO") ?
                               <Button onPress={() => handleStatus(p.id, "EM_PROCESSO")}>Ajudar</Button> 
                                : null}
                              {(p.status != "RESOLVIDO" && p.status != "CANCELADO") ? <Button onPress={() => handleStatus(p.id, "CANCELADO")}>Cancelar</Button> : null}

                          </Card.Actions>
                      </Card>
                  )
              ))} 
    
        </ScrollView >
        </>
    )
}
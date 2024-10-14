import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, Alert, StyleSheet } from 'react-native';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebaseConfig'; // Importa o Firestore configurado

export default function App() {
    const [mangas, setMangas] = useState([]);
    const [serie, setSerie] = useState('');
    const [nome, setNome] = useState('');
    const [capitulo, setCapitulo] = useState('');

    // Função para buscar dados da coleção "Mangas" no Firestore
    const fetchMangas = async () => {
        try {
            const mangasCollection = collection(db, 'Mangas');
            const mangasSnapshot = await getDocs(mangasCollection);
            const mangasList = mangasSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setMangas(mangasList);
        } catch (error) {
            console.error("Erro ao buscar mangás: ", error);
        }
    };

    // Função para adicionar um novo mangá no Firestore
    const addManga = async () => {
        if (!nome) {
            Alert.alert('Erro', 'O nome não pode ser nulo');
            return;
        }
        try {
            const newManga = {
                serie,
                nome,
                capitulo
            };
            // Adiciona o novo mangá à coleção "Mangas"
            await addDoc(collection(db, 'Mangas'), newManga);
            // Limpa o formulário
            setSerie('');
            setNome('');
            setCapitulo('');
            // Atualiza a lista de mangás
            fetchMangas();
        } catch (error) {
            console.error("Erro ao adicionar mangá: ", error);
        }
    };

    // Função para deletar um mangá do Firestore
    const deleteManga = async (mangaId) => {
        Alert.alert(
            'Confirmar',
            'Você tem certeza que deseja deletar este mangá?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },
                {
                    text: 'Deletar',
                    onPress: async () => {
                        try {
                            // Deleta o documento pelo ID
                            await deleteDoc(doc(db, 'Mangas', mangaId));
                            // Atualiza a lista de mangás
                            fetchMangas();
                        } catch (error) {
                            console.error("Erro ao deletar mangá: ", error);
                        }
                    }
                }
            ]
        );
    };

    // Executa a função ao carregar o componente
    useEffect(() => {
        fetchMangas();
    }, []);

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Mangás no Firestore</Text>
            
            {/* Formulário para adicionar um novo mangá */}
            <View style={styles.form}>
                <TextInput
                    placeholder="Nome"
                    value={nome}
                    onChangeText={setNome}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Capítulo"
                    value={capitulo}
                    onChangeText={setCapitulo}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Série"
                    value={serie}
                    onChangeText={setSerie}
                    style={styles.input}
                />
                <Button title="Adicionar Mangá" onPress={addManga} />
            </View>

            {/* Renderiza os mangás do Firestore */}
            {mangas.map(manga => (
                <View key={manga.id} style={styles.mangaCard}>
                    {manga.nome && (
                        <Text style={styles.mangaNome}>Nome: {manga.nome}</Text>
                    )}
                    {manga.capitulo && (
                        <Text>Capítulo: {manga.capitulo}</Text>
                    )}
                    {manga.serie && (
                        <Text>Série: {manga.serie}</Text>
                    )}
                    {/* Botão para deletar o mangá */}
                    <Button title="Deletar" onPress={() => deleteManga(manga.id)} color="red" />
                </View>
            ))}
        </ScrollView>
    );
}

// Estilos
const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#F2F2F2',
        flex: 1
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center'
    },
    form: {
        marginVertical: 20,
        backgroundColor: '#FFFFFF',
        padding: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    input: {
        borderWidth: 1,
        borderColor: '#BFBFBF',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        backgroundColor: '#F9F9F9',
    },
    mangaCard: {
        marginVertical: 10,
        padding: 15,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    mangaNome: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

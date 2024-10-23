// import { View, Text, Button, StyleSheet } from "react-native-web";

// export default function Notification() {
//     return (
//         <View style={styles.container}>
//             <Text style={styles.text}>Notification</Text>
//             <Button title="Mostrar notificações" onPress={() => { }}>  </Button>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifation: 'center',
//         alignItems: 'center',
//     }
// });

// import React, { useState, useEffect } from "react";
// import { View, Text, Button, StyleSheet, Platform } from "react-native";
// import * as Notifications from 'expo-notifications';
// import * as Permissions from 'expo-permissions';

// export default function Notification() {
//   const [notification, setNotification] = useState(false);

//   useEffect(() => {
//     registerForPushNotificationsAsync();

//     const notificationListener = Notifications.addNotificationReceivedListener(notification => {
//       setNotification(notification);
//     });

//     return () => {
//       Notifications.removeNotificationSubscription(notificationListener);
//     };
//   }, []);

//   const showNotification = () => {
//     Notifications.scheduleNotificationAsync({
//       content: {
//         title: "Olá!",
//         body: "Esta é sua notificação de teste!",
//       },
//       trigger: { seconds: 2 },
//     });
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>Notification</Text>
//       <Button title="Mostrar notificações" onPress={showNotification} />
//     </View>
//   );
// }

// // Função para solicitar permissões de notificação
// async function registerForPushNotificationsAsync() {
//   if (Platform.OS === 'android') {
//     await Notifications.setNotificationChannelAsync('default', {
//       name: 'default',
//       importance: Notifications.AndroidImportance.MAX,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: '#FF231F7C',
//     });
//   }

//   const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
//   let finalStatus = existingStatus;

//   if (existingStatus !== 'granted') {
//     const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
//     finalStatus = status;
//   }

//   if (finalStatus !== 'granted') {
//     alert('Permissão para notificações não concedida!');
//     return;
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   text: {
//     fontSize: 20,
//     marginBottom: 20,
//   }
// });







// expo install expo-notifications
// import React, { useEffect } from 'react';
// import * as Notifications from 'expo-notifications';
// import { Button, View } from 'react-native';

// Notifications.setNotificationHandler({ // setNotificationHandler: Define como as notificações serão tratadas no app.
//   handleNotification: async () => ({ 
//     shouldShowAlert: true, // shouldShowAlert: Define se a notificação deve ser exibida como um alerta visual.
//     shouldPlaySound: true, //shouldPlaySound: Define se a notificação deve reproduzir som.
//     shouldSetBadge: false, //houldSetBadge: Define se a notificação deve alterar o número de ícones de notificação (badge) no ícone do app (geralmente em iOS).
//   }),
// });

// export default function App() {
//     useEffect(() => {
//         const checkNotificationPermissions = async () => {
//             const { status } = await Notifications.getPermissionsAsync();
//             if (status !== 'granted') {
//                 const { status: newStatus } = await Notifications.requestPermissionsAsync();
//                 if (newStatus !== 'granted') {
//                     alert('Permissão de notificação negada!');
//                     return;
//                 }
//             }
//         };

//         checkNotificationPermissions();
//     }, []);

//     const sendNotification = async () => {
//         await Notifications.scheduleNotificationAsync({
//             content: {
//                 title: "Notificação React",
//                 body: 'Notificação Recebida com Sucesso!!!',
//             },
//             trigger: null,
//         });
//     };

//     return (
//         <View>
//             <Button title="Enviar Notificação" onPress={sendNotification} />
//         </View>
//     );
// }




// import React, { useState, useEffect } from 'react';
// import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
// import * as Contacts from 'expo-contacts';

// export default function ContactList() {
//   const [contacts, setContacts] = useState([]);
//   const [permission, setPermission] = useState(null);

//   useEffect(() => {
//     // Função para solicitar permissão de acesso aos contatos
//     const getPermissions = async () => {
//       const { status } = await Contacts.requestPermissionsAsync();
//       setPermission(status === 'granted');
//     };

//     getPermissions();
//   }, []);

//   // Função para carregar os contatos do dispositivo
//   const loadContacts = async () => {
//     if (permission) {
//       const { data } = await Contacts.getContactsAsync({
//         fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Emails],
//       });

//       if (data.length > 0) {
//         setContacts(data);
//       }
//     } else {
//       alert('Permissão para acessar contatos não foi concedida');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Lista de Contatos</Text>
//       <Button title="Carregar Contatos" onPress={loadContacts} />

//       <FlatList
//         data={contacts}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <View style={styles.contactItem}>
//             <Text style={styles.contactName}>{item.name}</Text>
//             {item.phoneNumbers && (
//               <Text style={styles.contactInfo}>
//                 Telefone: {item.phoneNumbers[0].number}
//               </Text>
//             )}
//             {item.emails && (
//               <Text style={styles.contactInfo}>Email: {item.emails[0].email}</Text>
//             )}
//           </View>
//         )}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   contactItem: {
//     padding: 15,
//     borderBottomWidth: 1,
//     borderColor: '#ddd',
//   },
//   contactName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   contactInfo: {
//     fontSize: 16,
//     color: '#555',
//   },
// });


// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, Button, ScrollView, Alert, StyleSheet } from 'react-native';
// import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
// import { db } from './firebaseConfig'; // Importa o Firestore configurado
// import * as Notifications from 'expo-notifications';
// import * as Permissions from 'expo-permissions';

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: true,
//     shouldSetBadge: false,
//   }),
// });

// export default function App() {
//   const [mangas, setMangas] = useState([]);
//   const [serie, setSerie] = useState('');
//   const [nome, setNome] = useState('');
//   const [capitulo, setCapitulo] = useState('');

//   // Função para buscar dados da coleção "Mangas" no Firestore
//   const fetchMangas = async () => {
//     try {
//       const mangasCollection = collection(db, 'Mangas');
//       const mangasSnapshot = await getDocs(mangasCollection);
//       const mangasList = mangasSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//       setMangas(mangasList);
//     } catch (error) {
//       console.error("Erro ao buscar mangás: ", error);
//     }
//   };

//   // Função para solicitar permissões de notificação
//   const requestNotificationPermission = async () => {
//     const { status: existingStatus } = await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;

//     if (existingStatus !== 'granted') {
//       const { status } = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }

//     if (finalStatus !== 'granted') {
//       alert('Permissão de notificação não foi concedida.');
//       return false;
//     }

//     return true;
//   };

//   // Função para adicionar um novo mangá no Firestore e disparar notificação
//   const addManga = async () => {
//     if (!nome) {
//       Alert.alert('Erro', 'O nome não pode ser nulo');
//       return;
//     }

//     try {
//       const newManga = {
//         serie,
//         nome,
//         capitulo
//       };
//       await addDoc(collection(db, 'Mangas'), newManga);
//       setSerie('');
//       setNome('');
//       setCapitulo('');
//       fetchMangas();

//       const hasPermission = await requestNotificationPermission();

//       if (hasPermission) {
//         // Disparar notificação ao adicionar um mangá
//         await Notifications.scheduleNotificationAsync({
//           content: {
//             title: "Mangá Adicionado",
//             body: `O mangá ${nome} foi adicionado com sucesso!`,
//           },
//           trigger: null,
//         });
//       }
//     } catch (error) {
//       console.error("Erro ao adicionar mangá: ", error);
//     }
//   };

//   // Função para deletar um mangá do Firestore e disparar notificação
//   const deleteManga = async (mangaId) => {
//     Alert.alert(
//       'Confirmar',
//       'Você tem certeza que deseja deletar este mangá?',
//       [
//         {
//           text: 'Cancelar',
//           style: 'cancel'
//         },
//         {
//           text: 'Deletar',
//           onPress: async () => {
//             try {
//               await deleteDoc(doc(db, 'Mangas', mangaId));
//               fetchMangas();

//               const hasPermission = await requestNotificationPermission();

//               if (hasPermission) {
//                 // Disparar notificação ao deletar um mangá
//                 await Notifications.scheduleNotificationAsync({
//                   content: {
//                     title: "Mangá Deletado",
//                     body: `Um mangá foi deletado!`,
//                   },
//                   trigger: null,
//                 });
//               }
//             } catch (error) {
//               console.error("Erro ao deletar mangá: ", error);
//             }
//           }
//         }
//       ]
//     );
//   };

//   // Executa a função ao carregar o componente
//   useEffect(() => {
//     fetchMangas();

//     // Verificar permissões de notificação ao inicializar o app
//     requestNotificationPermission();
//   }, []);

//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.title}>Mangás no Firestore</Text>
      
//       {/* Formulário para adicionar um novo mangá */}
//       <View style={styles.form}>
//         <TextInput
//           placeholder="Nome"
//           value={nome}
//           onChangeText={setNome}
//           style={styles.input}
//         />
//         <TextInput
//           placeholder="Capítulo"
//           value={capitulo}
//           onChangeText={setCapitulo}
//           style={styles.input}
//         />
//         <TextInput
//           placeholder="Série"
//           value={serie}
//           onChangeText={setSerie}
//           style={styles.input}
//         />
//         <Button title="Adicionar Mangá" onPress={addManga} />
//       </View>

//       {/* Renderiza os mangás do Firestore */}
//       {mangas.map(manga => (
//         <View key={manga.id} style={styles.mangaCard}>
//           {manga.nome && (
//             <Text style={styles.mangaNome}>Nome: {manga.nome}</Text>
//           )}
//           {manga.capitulo && (
//             <Text>Capítulo: {manga.capitulo}</Text>
//           )}
//           {manga.serie && (
//             <Text>Série: {manga.serie}</Text>
//           )}
//           {/* Botão para deletar o mangá */}
//           <Button title="Deletar" onPress={() => deleteManga(manga.id)} color="red" />
//         </View>
//       ))}
//     </ScrollView>
//   );
// }

// // Estilos
// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     backgroundColor: '#F2F2F2',
//     flex: 1
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center'
//   },
//   form: {
//     marginVertical: 20,
//     backgroundColor: '#FFFFFF',
//     padding: 15,
//     borderRadius: 10,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 1,
//     },
//     shadowOpacity: 0.2,
//     shadowRadius: 1.41,
//     elevation: 2,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#BFBFBF',
//     padding: 10,
//     marginBottom: 10,
//     borderRadius: 5,
//     backgroundColor: '#F9F9F9',
//   },
//   mangaCard: {
//     marginVertical: 10,
//     padding: 15,
//     backgroundColor: '#FFFFFF',
//     borderRadius: 10,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 1,
//     },
//     shadowOpacity: 0.2,
//     shadowRadius: 1.41,
//     elevation: 2,
//   },
//   mangaNome: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });


import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, Alert, StyleSheet } from 'react-native';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebaseConfig'; // Importa o Firestore configurado
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [livros, setLivros] = useState([]);
  const [serie, setSerie] = useState('');
  const [nome, setNome] = useState('');
  const [capitulo, setCapitulo] = useState('');

  // Função para buscar dados da coleção "Livros" no Firestore
  const fetchLivros = async () => {
    try {
      const livrosCollection = collection(db, 'Livros');
      const livrosSnapshot = await getDocs(livrosCollection);
      const livrosList = livrosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setLivros(livrosList);
    } catch (error) {
      console.error("Erro ao buscar livros: ", error);
    }
  };

  // Função para solicitar permissões de notificação
  const requestNotificationPermission = async () => {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      alert('Permissão de notificação não foi concedida.');
      return false;
    }

    return true;
  };

  // Função para adicionar um novo livro no Firestore e disparar notificação
  const addLivro = async () => {
    if (!nome) {
      Alert.alert('Erro', 'O nome não pode ser nulo');
      return;
    }

    try {
      const newLivro = {
        serie,
        nome,
        capitulo
      };
      await addDoc(collection(db, 'Livros'), newLivro);
      setSerie('');
      setNome('');
      setCapitulo('');
      fetchLivros();

      const hasPermission = await requestNotificationPermission();

      if (hasPermission) {
        // Disparar notificação ao adicionar um livro
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "Livro Adicionado",
            body: `O livro ${nome} foi adicionado com sucesso!`,
          },
          trigger: null,
        });
      }
    } catch (error) {
      console.error("Erro ao adicionar livro: ", error);
    }
  };

  // Função para deletar um livro do Firestore e disparar notificação
  const deleteLivro = async (livroId) => {
    Alert.alert(
      'Confirmar',
      'Você tem certeza que deseja deletar este livro?',
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Deletar',
          onPress: async () => {
            try {
              await deleteDoc(doc(db, 'Livros', livroId));
              fetchLivros();

              const hasPermission = await requestNotificationPermission();

              if (hasPermission) {
                // Disparar notificação ao deletar um livro
                await Notifications.scheduleNotificationAsync({
                  content: {
                    title: "Livro Deletado",
                    body: `Um livro foi deletado!`,
                  },
                  trigger: null,
                });
              }
            } catch (error) {
              console.error("Erro ao deletar livro: ", error);
            }
          }
        }
      ]
    );
  };

  // Executa a função ao carregar o componente
  useEffect(() => {
    fetchLivros();

    // Verificar permissões de notificação ao inicializar o app
    requestNotificationPermission();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Livros no Firestore</Text>
      
      {/* Formulário para adicionar um novo livro */}
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
          placeholder="Ano de Lançamento"
          value={serie}
          onChangeText={setSerie}
          style={styles.input}
        />
        <Button title="Adicionar Livro" onPress={addLivro} />
      </View>

      {/* Renderiza os livros do Firestore */}
      {livros.map(livro => (
        <View key={livro.id} style={styles.livroCard}>
          {livro.nome && (
            <Text style={styles.livroNome}>Nome: {livro.nome}</Text>
          )}
          {livro.capitulo && (
            <Text>Capítulo: {livro.capitulo}</Text>
          )}
          {livro.serie && (
            <Text>Ano de Lançamento {livro.serie}</Text>
          )}
          {/* Botão para deletar o livro */}
          <Button title="Deletar" onPress={() => deleteLivro(livro.id)} color="red" />
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
  livroCard: {
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
  livroNome: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

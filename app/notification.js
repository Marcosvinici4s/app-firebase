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




import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import * as Contacts from 'expo-contacts';

export default function ContactList() {
  const [contacts, setContacts] = useState([]);
  const [permission, setPermission] = useState(null);

  useEffect(() => {
    // Função para solicitar permissão de acesso aos contatos
    const getPermissions = async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      setPermission(status === 'granted');
    };

    getPermissions();
  }, []);

  // Função para carregar os contatos do dispositivo
  const loadContacts = async () => {
    if (permission) {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Emails],
      });

      if (data.length > 0) {
        setContacts(data);
      }
    } else {
      alert('Permissão para acessar contatos não foi concedida');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Contatos</Text>
      <Button title="Carregar Contatos" onPress={loadContacts} />

      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.contactItem}>
            <Text style={styles.contactName}>{item.name}</Text>
            {item.phoneNumbers && (
              <Text style={styles.contactInfo}>
                Telefone: {item.phoneNumbers[0].number}
              </Text>
            )}
            {item.emails && (
              <Text style={styles.contactInfo}>Email: {item.emails[0].email}</Text>
            )}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  contactItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  contactInfo: {
    fontSize: 16,
    color: '#555',
  },
});
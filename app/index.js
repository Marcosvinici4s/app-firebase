import { Text, View, Pressable } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Sexta feira</Text>

      <Link href="/firebase" asChhild>
      
        <Pressable>
          <Text> TI </Text>
        </Pressable>

      </Link>
      <Text>Sexta feira</Text>

      <Link href="/firebaseCrud" asChhild>
      
        <Pressable>
          <Text> Crud </Text>
        </Pressable>

      </Link>

    </View>
  );
}
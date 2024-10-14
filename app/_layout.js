import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{title: 'Index'}}/>
      <Stack.Screen name="Firebase" options={{title: 'firebase'}} />
    </Stack>
  );
}
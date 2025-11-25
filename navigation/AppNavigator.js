import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import GameScreen from "../screens/GameScreen";
import LevelScreen from "../screens/LevelScreen";
import ResultsScreen from "../screens/ResultsScreen";


const Stack = createNativeStackNavigator();

export default function AppNavigator({ user }) {
    return (
        <Stack.Navigator>
            {!user ? (
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{ headerShown: false }}
                />
            ) : (
                <>
                    <Stack.Screen
                        name="Home"
                        component={HomeScreen}
                        options={{ headerShown: false }}
                    />

                    <Stack.Screen
                        name="Level"
                        component={LevelScreen}
                        options={{ title: "Dificultad" }}
                    />



                    <Stack.Screen
                        name="Game"
                        component={GameScreen}
                        options={{ title: "Juego" }}
                    />

                    <Stack.Screen name="Results" component={ResultsScreen} />
                </>
            )}
        </Stack.Navigator>
    );
}

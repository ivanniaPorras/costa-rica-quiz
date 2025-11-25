import "leaflet/dist/leaflet.css";
import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import AppNavigator from "./navigation/AppNavigator";


function Main() {
  const { user } = useContext(AuthContext);

  return <AppNavigator user={user} />;
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Main />
      </NavigationContainer>
    </AuthProvider>
  );
}

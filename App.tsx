import { View, ActivityIndicator } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useState, useEffect, useContext } from "react";
import { auth } from "./config/firebase.js";
import Home from "./src/screens/Home";
import Login from "./src/screens/LogIn";
import SignUp from "./src/screens/SignUp";
import MakeBooking from "./src/screens/MakeBooking";
import Profile from "./src/screens/Profile";
// import Form from "./src/screens/Form";
import PreviewProfile from "./src/screens/PreviewProfile";
import AllBookings from "./src/screens/AllBookings";
import MoreInfo from "./src/screens/MoreInfo";
import LandingPage from "./src/screens/LandingPage";
import Account from "./src/screens/Account";

const Stack = createStackNavigator();
export const AuthenticatedUserContext = createContext({});

const AuthenticatedUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};

const AuthStack = () => {
  // const navigation = useNavigation()
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="MakeBooking" component={MakeBooking} />
    </Stack.Navigator>
  );
};

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="MakeBooking" component={MakeBooking} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="PreviewProfile" component={PreviewProfile} />
      <Stack.Screen name="AllBookings" component={AllBookings} />
      <Stack.Screen name="MoreInfo" component={MoreInfo} />
      <Stack.Screen name="LandingPage" component={LandingPage}/>
      <Stack.Screen name="Account" component={Account}/>
    </Stack.Navigator>
  );
};

const RootNavigator = () => {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(
      auth,
      async (authenticatedUser) => {
        authenticatedUser ? setUser(authenticatedUser) : setUser(null);
        setIsLoading(false);
      }
    );
    return unsubscribeAuth;
  }, [user]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <HomeStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <AuthenticatedUserProvider>
      <RootNavigator />
    </AuthenticatedUserProvider>
  );
}

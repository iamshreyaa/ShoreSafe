// // import React from 'react';
// // import { NavigationContainer } from '@react-navigation/native';
// // import { createNativeStackNavigator } from '@react-navigation/native-stack';

// // // Import your screens
// // import WelcomeScreen from './screens/WelcomeScreen';
// // import LoginScreen from './screens/LoginScreen';
// // import SignupScreen from './screens/SignupScreen';
// // import NextPageScreen from './screens/NextPageScreen';
// // import MapScreen from './screens/MapScreen';
// // import BeachScreen from './screens/BeachScreen';
// // import Beachinfo from './screens/Beachinfo'; // Fixed name to match the import

// // const Stack = createNativeStackNavigator();

// // function App() {
// //   return (
// //     <NavigationContainer>
// //       <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
// //         <Stack.Screen name="Welcome" component={WelcomeScreen} />
// //         <Stack.Screen name="Login" component={LoginScreen} />
// //         <Stack.Screen name="Signup" component={SignupScreen} />
// //         <Stack.Screen name="NextPage" component={NextPageScreen} />
// //         <Stack.Screen name="MapScreen" component={MapScreen} />
// //         <Stack.Screen name="Beaches" component={BeachScreen} />
// //         <Stack.Screen name="Beachinfo" component={Beachinfo} />
// //       </Stack.Navigator>
// //     </NavigationContainer>
// //   );
// // }

// // export default App;

// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// // Import your screens
// import WelcomeScreen from './screens/WelcomeScreen';
// import LoginScreen from './screens/LoginScreen';
// import SignupScreen from './screens/SignupScreen';
// import NextPageScreen from './screens/NextPageScreen';
// import MapScreen from './screens/MapScreen';
// import BeachScreen from './screens/BeachScreen';
// import BeachDetailsScreen from './screens/BeachDetailsScreen'; // Ensure the correct component name

// const Stack = createNativeStackNavigator();

// function App() {
//   return (
//     <NavigationContainer>
//      <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
//   <Stack.Screen name="Welcome" component={WelcomeScreen} />
//   <Stack.Screen name="Login" component={LoginScreen} />
//   <Stack.Screen name="Signup" component={SignupScreen} />
//   <Stack.Screen name="NextPage" component={NextPageScreen} />
//   <Stack.Screen name="MapScreen" component={MapScreen} />
//   <Stack.Screen name="BeachScreen" component={BeachScreen} />
//   <Stack.Screen name="BeachDetailsScreen" component={BeachDetailsScreen} />
// </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// export default App;

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import your screens
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import NextPageScreen from './screens/NextPageScreen';
import MapScreen from './screens/MapScreen';
import BeachScreen from './screens/BeachScreen';
import BeachDetailsScreen from './screens/BeachDetailsScreen'; // Ensure the correct component name

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: true }}/>
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="NextPage" component={NextPageScreen} />
        <Stack.Screen name="MapScreen" component={MapScreen} options={{ headerShown: true }} />
        <Stack.Screen name="BeachScreen" component={BeachScreen} options={{ headerShown: true }}/>
        <Stack.Screen name="BeachDetailsScreen" component={BeachDetailsScreen} options={{ headerShown: true }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
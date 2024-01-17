// App.tsx
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MainScreen from './screens/MainScreen';
import HomeScreen from './screens/HomeScreen';
import { loadInitialData, readProjectDir, readTestFile } from './services/fileManagement';
import { loadToShapes, createValidationReport } from './services/validator';


const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    loadInitialData();

    const runValidation = async () => {
      try {
        const funding_profile = await loadToShapes("citizen-solar-funding.ttl");
        const citizen = await loadToShapes("citizen-b.ttl");
        const validationReport = await createValidationReport(funding_profile, citizen);
        console.log(`Validation conforms: ${validationReport.report.conforms}`);
      } catch (error) {
        console.log(error)
        // Handle the error
      }
    };
    runValidation()

  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
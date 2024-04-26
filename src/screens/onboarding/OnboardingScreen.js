import React, { useEffect, useState } from 'react';
import OnboardingList from './components/OnboardingList';
import { fetchOnboardingScreenData } from './OnboardingController';
import LoadingScreen from '../LoadingScreen';

// Component
const OnboardingScreen = () => {
  const [onboardingScreenData, setOnboardingScreenData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newOnboardingScreenData = await fetchOnboardingScreenData();
        setOnboardingScreenData(newOnboardingScreenData);
      } catch (error) {
        console.error('Failed to fetch onboarding screen data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {onboardingScreenData ? (
        <OnboardingList onboardingScreenData={onboardingScreenData} />
      ) : (
        <LoadingScreen />
      )}
    </>
  );
};

export default OnboardingScreen;

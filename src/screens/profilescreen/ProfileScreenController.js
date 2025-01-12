import { readFile, readJson } from '../../utilities/fileManagement';
import { ProfileDataField, ProfileScreenData } from './ProfileScreenModel';
import { Share } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserStore } from '../../models/user-model';

// config
const dataFields = [
  '@id',
  'ff:hasBirthday',
  'ff:hasResidence',
  'ff:paysRentCold',
  'ff:hasLivingArea',
  'ff:parentingSetup',
  'ff:receivesWohngeld',
  'ff:hasIncomeBrutto',
  'ff:hasIncomeNetto',
];

export const fetchProfileScreenData = async (userId) => {
  let profileScreenData = new ProfileScreenData();
  //
  // fetch content information for each data field
  const userHydrationPath = await AsyncStorage.getItem(
    'user-profile-hydration'
  );
  const userHydrationJson = await readJson(userHydrationPath);
  dataFields.map((key) => {
    const newDataField = new ProfileDataField(key);
    newDataField.setDisplayName(userHydrationJson[key].display_name);
    profileScreenData.addProfileDataField(newDataField);
  });
  //
  // fetch user data from the user profile
  const userProfile = UserStore.retrieveUserData(userId);
  console.log('Retrieved user profile:', userProfile);
  profileScreenData.profileData.forEach((entry) => {
    entry.setValue(userProfile[entry.key]);
  });
  //
  // fetch user profile meta data
  profileScreenData.addAlternativeUserProfile(UserStore.retrieveAllUserIds());
  return profileScreenData;
};

export const updateUserProfile = async (userId, field, updateValue) => {
  UserStore.setField(userId, field, updateValue);
};

export const shareFile = async () => {
  const userProfilePath = 'user-profile.ttl';
  const userProfileString = await readFile(userProfilePath);
  try {
    await Share.share({
      message: userProfileString,
      title: 'User profile in turtle format',
    });
  } catch (err) {
    console.error(`Error sharing the content of ${userProfilePath}`, err);
  }
};

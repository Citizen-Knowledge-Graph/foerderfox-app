import { readJson } from '../../utilities/fileManagement';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PersonalisedScreenData, SectionFieldCard } from './PersonalisedModel';
import { UserStore } from '../../models/user-model';

// config
export const fetchPersonalisedScreenData = async (activeSection) => {
  const personalisedScreenData = new PersonalisedScreenData();
  //
  // fetch onboarding cards path
  const onboardingCardsPath = await AsyncStorage.getItem('onboarding-cards');
  const sectionPath = onboardingCardsPath + activeSection + '.json';
  const sectionCards = await readJson(sectionPath);
  //
  // iterate through onboarding cards
  for (let card of sectionCards) {
    //
    // create onboarding card
    const newSectionFieldCard = new SectionFieldCard(
      card.datafield,
      card.title,
      card.datatype,
      card.options ? card.options : null,
      card.objectClass ? card.objectClass : null
    );
    personalisedScreenData.addSectionFieldCard(newSectionFieldCard);
  }

  return personalisedScreenData;
};

export const addUserProfileField = async (userId, field, newValue) => {
  UserStore.setField(userId, field, newValue);
};

export const addNestedUserProfileField = async (
  userId,
  group,
  id,
  datafield,
  newValue
) => {
  UserStore.setNestedField(userId, group, id, datafield, newValue);
};

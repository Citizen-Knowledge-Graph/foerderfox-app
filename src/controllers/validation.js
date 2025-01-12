import { readFile, readJson } from '../utilities/fileManagement.js';
import {
  validateAll,
  validateUserProfile,
} from '@foerderfunke/matching-engine';
import {
  convertUserProfileToTurtle,
  extractDatafieldsMetadata,
  extractRequirementProfilesMetadata,
} from '@foerderfunke/matching-engine/src/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useValidationReportStore, useMetadataStore } from '../storage/zustand';
import { UserStore } from '../models/user-model';

// run validation
const runValidation = async (userId) => {
  //
  // fetch selected user
  const userProfile = UserStore.retrieveUserData(userId);
  const userProfileString = await convertUserProfileToTurtle(userProfile);

  const datafieldsPath = await AsyncStorage.getItem('datafields');
  const datafieldsString = await readFile(datafieldsPath);
  if (!(await validateUserProfile(userProfileString, datafieldsString))) {
    console.error('Invalid user profile');
  }

  // load query registry
  const queryRegistryPath = await AsyncStorage.getItem('query-registry');
  const queryRegistry = await readJson(queryRegistryPath);
  let requirementProfilesPath = await AsyncStorage.getItem(
    'requirement-profiles'
  );

  // iterate through queries in registry
  let requirementProfiles = {};

  for (let requirementProfile in queryRegistry) {
    const { fileName, rpUri } = queryRegistry[requirementProfile];
    const queryPath = requirementProfilesPath + fileName;
    requirementProfiles[rpUri] = await readFile(queryPath);
  }

  console.log('Running validations for:', Object.keys(requirementProfiles));

  const materializationPath = await AsyncStorage.getItem('materialization');
  const materializationString = await readFile(materializationPath);

  let validateAllReport = await validateAll(
    userProfileString,
    requirementProfiles,
    datafieldsString,
    materializationString,
    false
  );

  useValidationReportStore.getState().updateValidationReport(validateAllReport);

  // fetch metadata
  let metadata = {
    df: await extractDatafieldsMetadata(datafieldsString),
    rp: await extractRequirementProfilesMetadata(Object.values(requirementProfiles)),
  };

  useMetadataStore.getState().updateMetadata(metadata);
};

export default runValidation;

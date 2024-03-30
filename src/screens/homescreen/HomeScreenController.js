import { readJson } from '../../utilities/fileManagement';
import { HomeScreenData, SchemeData } from './HomeScreenModel';

export const fetchHomeScreenData = async (validationState) => {
  const registryPath = 'query-registry.json';
  const schemeRegistry = await readJson(registryPath);
  const homeScreenData = new HomeScreenData();

  console.log('validation state: ', validationState);

  console.log('scheme registry: ', schemeRegistry);

  Object.keys(validationState).map((scheme) => {
    let newScheme = new SchemeData(scheme);
    newScheme.setTitle(schemeRegistry[scheme].title);
    newScheme.setDescription(schemeRegistry[scheme].description);
    if (validationState[scheme].conforms) {
      homeScreenData.addEligible(newScheme);
    } else {
      homeScreenData.addNonEligible(newScheme);
    }
  });
  console.log('home screen data: ', homeScreenData);
  return homeScreenData;
};

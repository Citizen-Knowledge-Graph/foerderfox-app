import {
  writeFile,
  fetchZipAssetFromModule,
  listAllFiles,
} from '../utilities/fileManagement';
import {
  fetchLatestCommitHash,
  fetchZipAssetFromRepository,
} from '../utilities/gitManagement';
import { unzipFromBase64 } from '../utilities/zipHandling';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { validateResources } from '../AppData';

const fetchDataToDevice = async () => {
  console.log('Fetching data from local assets');
  await fetchLocalData();
  console.log('Fetching data from remote repo');
  await fetchRemoteData();
  console.log('Validate all required resources have been set');
  await validateResources();
  console.log('All files in app storage:', await listAllFiles(true));
};

const fetchLocalData = async () => {
  const modulePath = require('../../assets/data.zip');
  let binaryData = await fetchZipAssetFromModule(modulePath);
  let unzippedData = await unzipFromBase64(binaryData);
  await processFiles(unzippedData);
};

const fetchRemoteData = async () => {
  const repo = 'Citizen-Knowledge-Graph/requirement-profiles';
  const archivePath = 'zip-archive/archive.zip';
  const latestCommit = await fetchLatestCommitHash(repo);
  const storedLatestCommit = await AsyncStorage.getItem('latest-commit-stored');

  if (storedLatestCommit === null || storedLatestCommit !== latestCommit) {
    console.log('Data needs to be updated');
    const binaryData = await fetchZipAssetFromRepository(repo, archivePath);
    let unzippedData = await unzipFromBase64(binaryData);
    await processFiles(unzippedData, true);
    await AsyncStorage.setItem('latest-commit-stored', latestCommit);
  } else {
    console.log('Data already up to date');
  }
};

const processFiles = async (files, checkManifest = false) => {
  for (const file of files) {
    console.log('Writing file:', file.filename);
    await writeFile(file.filename, file.fileContent, true);
  }
};

export default fetchDataToDevice;

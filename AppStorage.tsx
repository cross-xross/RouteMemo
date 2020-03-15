import { Drive } from './domains/Drive';
import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';

const storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
  sync: {}
});

export default class AppStorage {

  saveDrivesToStorage = (drives: Drive[]) => {
    try {
      storage.save({
        key: 'drives',
        data: drives
      });
    } catch (error) {
      // Error saving data
    }
  };

  loadDrivesFromStorage = async (): Drive[] => {
    try {
      const result: Drive[] = await storage.load({ key: 'drives' })
      return result
    } catch (error) {
      console.warn('err:' + error)
      return []
    }
  };
}

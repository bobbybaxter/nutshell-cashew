import axios from 'axios';
import fbref from '../apiKeys.json';

const firebaseUrl = fbref.firebaseKeys.databaseURL;

const addDiaryEntry = newEntry => axios.post(`${firebaseUrl}/diaryEntries.json`, newEntry);

const editDiaryEntry = (newEntry, entryId) => axios.put(`${firebaseUrl}/diaryEntries/${entryId}.json`, newEntry);

const deleteDiaryEntry = entryId => axios.delete(`${firebaseUrl}/diaryEntries/${entryId}.json`);

const getDiaryEntriesByUid = uid => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/diaryEntries.json?orderBy="uid"&equalTo="${uid}"`)
    .then((results) => {
      const diaryEntriesResults = results.data;
      const diaryEntries = [];
      Object.keys(diaryEntriesResults).forEach((diaryEntryId) => {
        diaryEntriesResults[diaryEntryId].id = diaryEntryId;
        diaryEntries.push(diaryEntriesResults[diaryEntryId]);
      });
      resolve(diaryEntries);
    })
    .catch(error => reject(error));
});

export default {
  getDiaryEntriesByUid,
  addDiaryEntry,
  editDiaryEntry,
  deleteDiaryEntry,
};

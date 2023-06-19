import { openDB } from 'idb';
import { VersionsDownloaded } from '../types';

export const dbForVersionsDownloaded = await openDB('BibleApp', 1, {
    upgrade(db) {
        const store = db.createObjectStore('versionsDownloaded', { keyPath: 'versionId', autoIncrement: true, });
        store.createIndex('versionId', 'versionId', { unique: true });
    }
});

async function getVersionsDownloaded(): Promise<VersionsDownloaded[]> {
    const versionsDownloadedPromise = dbForVersionsDownloaded.getAll('versionsDownloaded');
    const versionsDownloaded = await versionsDownloadedPromise;

    return versionsDownloaded;
}

export const versionsDownloaded = await getVersionsDownloaded();
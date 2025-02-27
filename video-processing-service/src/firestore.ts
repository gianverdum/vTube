import { credential } from 'firebase-admin';
import { initializeApp } from 'firebase-admin/app';
import { Firestore } from 'firebase-admin/firestore';

initializeApp({ credential: credential.applicationDefault() });

const firestore = new Firestore();

// Note: This requires setting an env variable in Cloud Run
/**
 * if (process.env.NODE_ENV !++ 'production') {
 *   firestore.settings({
 *     host: 'localhost:8080',
 *     ssl: false,
 *   });
 * }
 */

const videoCollectionId = 'videos';

export interface Video {
    id?: string,
    uid?: string,
    filename?: string,
    status?: 'processing' | 'processed',
    title?: string,
    description?: string,
}

async function getVideo(videoId: string) {

}

export function setVideo(videoId: string, video: Video) {

}

export async function isVideoNew(videoId: string) {

}

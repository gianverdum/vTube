'use client';

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

export default function Watch() {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <WatchContent />
        </Suspense>
    );
}

function WatchContent() {
    const videoPrefix = 'https://storage.googleapis.com/vtube-processed-videos/';
    const videoSrc = useSearchParams().get('v');

    return (
        <div>
            <h1>Watch Page</h1>
            <video controls src={videoPrefix + videoSrc} />
        </div>
    );
}

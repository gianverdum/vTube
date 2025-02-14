// 1. GCS file interactions
// 2. Local file interactions
import { Storage } from "@google-cloud/storage";
import fs from "fs";
import ffmpeg from "fluent-ffmpeg";

const storage = new Storage();

const rawVideoBucketName = "vtube-raw-videos";
const processedVideoBucketName = "vtube-processed-videos";

const localRawVideoPath = "./raw-videos";
const localProcessedVideoPath = "./processed-videos";

/**
 * Creates the local directories for raw and processed videos.
 */
export function setupDirectories() {
    if (!fs.existsSync("raw-videos")) {
        fs.mkdirSync("raw-videos");
    }

    if (!fs.existsSync("processed-videos")) {
        fs.mkdirSync("processed-videos");
    }
    }

/**
 * @param rawVideoName The name of the raw video file to convert from {@link localRawVideoPtah}.
 * @param processedVideoName The name of the processed video file to convert to {@link localProcessedVideoPath}.
 */
export function convertVideo(rawVideoName: string, processedVideoName: string) {
    const localRawVideoPath = `raw-videos/${rawVideoName}`;
    const localProcessedVideoPath = `processed-videos/${processedVideoName}`;

    ffmpeg(localRawVideoPath)
        .outputOptions("-vf", "scale=-1:360")
        .on("end", () => {
            console.log("Processing finished successfully.");
        })
        .on("error", (err) => {
            console.log("An error occurred: " + err.message);
        })
        .save(localProcessedVideoPath);
}

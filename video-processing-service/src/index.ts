import express from 'express';
import ffmpeg from 'fluent-ffmpeg';

// Set FFmpeg binary path (check your installed path with `which ffmpeg`)
ffmpeg.setFfmpegPath('/usr/bin/ffmpeg');
ffmpeg.setFfprobePath('/usr/bin/ffprobe');

const app = express();

// Add this line to parse JSON request bodies
app.use(express.json());

app.post('/process-video', (req, res) => {
    // Get tpath of the input video from the request body
    const inputFilePath = req.body.inputFilePath;
    const outputFilePath = req.body.outputFilePath;

    if (!inputFilePath || !outputFilePath) {
        res.status(400).send('Bad request: Missing file path.');
        return;
    }

    ffmpeg(inputFilePath)
        .outputOptions('-vf', 'scale=-1:360')
        .on('end', () => {
            res.status(200).send('Processing finished successfully.');
        })
        .on('error', (err) => {
            console.log('An error occurred: ' + err.message)
            res.status(500).send('Internal server error: ' + err.message);
        })
        .save(outputFilePath)
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

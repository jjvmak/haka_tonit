
// Node requirements
const express = require('express');
const app = express();

// AutoML configs
const automl = require('@google-cloud/automl').v1beta1;
const client = new automl.PredictionServiceClient();

// Google Cloud project configs
const projectId = "plenary-cat-231816";
const computeRegion = "europe-north1";
const modelId = "TODOOO";
const scoreThreshold = "0.5";

// Get the full path of the model.
const modelFullId = client.modelPath(projectId, computeRegion, modelId);


// Handle GET root
app.get('/', (req, res) => {
    console.log("somebody meddled with root");
    res.send('GET OUT OF MY ROOT!');
});

// Handle POST image
app.post('/image', (req, res) => {
    console.log("received something (an image?)");
    var request = {
        image: req.body.image
    };

    //check if was Gambina or not
    var response = checkGambinity(request.image);
    res.send(response);
});


// Contacts to Google and returns image's gambinification result as json
async function checkGambinity(img) {
    var resp;

    // Params is additional domain-specific parameters.
    const params = {};
    if (scoreThreshold) {
        params.scoreThreshold = scoreThreshold;
    }

    // Set the payload by giving the content and type of the file.
    const payload = {};
    payload.image = { imageBytes: img };

    // Currently there is no additional parameters supported.
    console.log("connecting to Google");
    const [response] = await client.predict({
        name: modelFullId,
        payload: payload,
        params: params,
    });

    // Handle response
    console.log(`Prediction results:`);
    response.payload.forEach(result => {
        console.log(`Predicted class name: ${result.displayName}`);
        console.log(`Predicted class score: ${result.classification.score}`);
        resp = {
            label: result.displayName,
            score: result.classification.score
        }
    });
    return resp;
}


// Open to localhost:6900
app.listen(6900, () => console.log('Send gambina.jpgs to 6900 now'));
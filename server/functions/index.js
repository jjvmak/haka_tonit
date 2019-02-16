
// *** This is the app.js to be hosted in Firebase ***

//-------------------- CONFIGS --------------------
// secret key
const key = "haka_ton1";

// Firebase requirement
const functions = require('firebase-functions');

// Node requirements
const express = require('express');
const app = express();
app.use(express.json());

// AutoML configs
const automl = require('@google-cloud/automl').v1beta1;
const client = new automl.PredictionServiceClient();
const projectId = "plenary-cat-231816";
const computeRegion = "europe-north1";
const modelId = "TODO";
const scoreThreshold = "0.5";
const modelFullId = client.modelPath(projectId, computeRegion, modelId);


//-------------------- HTTP HANDLERS --------------------
// Handle GET root
app.get('/', (req, res) => {
    console.log("somebody meddled with root");
    res.send('GET OUT OF MY ROOT!');
});

// Handle POST image
app.post('/image', (req, res) => {

    //if key correct:
    if (req.body.hasOwnProperty('key') && req.body.hasOwnProperty('image') && req.body.key === key) {
        console.log("we spotted a very nice friend of gambiina :)");
        var request = {
            image: req.body.image
        };

        //TEST:
        console.log(request);
        res.send(request);

        //PRODUCTION:
        //var response = checkGambinity(request.image);
        //res.send(response);

    //if not:
    } else {
        console.log("we spotted an infiltrator");
        res.status(400);
        res.send("get out!");
    }
});


//-------------------- GOOGLE CLOUD CONNECT --------------------
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


//-------------------- EXPORT --------------------
// Export app to Firebase
exports.app = functions.https.onRequest(app);
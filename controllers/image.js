returnClarifaiRequestOptions = (imageURL) => {
    const PAT = '63c901c31567427293252c2330c5d0d9';
    const USER_ID = 'd7gtnyxr6ql3';       
    const APP_ID = 'faceRecognition';
    const IMAGE_URL = imageURL;

    const raw = JSON.stringify({
      "user_app_id": {
          "user_id": USER_ID,
          "app_id": APP_ID
      },
      "inputs": [
          {
              "data": {
                  "image": {
                      "url": IMAGE_URL
                  }
              }
          }
      ]
    });
    return {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Key ' + PAT
      },
      body: raw
    };
  }

const handleApiCall = () => (req, res) => {
    console.log(req.body);
    console.log(returnClarifaiRequestOptions(req.body.input));
    fetch("https://api.clarifai.com/v2/models/face-detection/outputs", returnClarifaiRequestOptions(req.body.input))
    .then(response => response.json())
    .then(data => {
       res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with API'));
}


const handleImage = (db) => (req, res) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0].entries);
        })
        .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
}
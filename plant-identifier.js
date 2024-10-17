
// const menuToggle = document.querySelector('.menu-toggle');
// const navLinks = document.querySelector('#navbar ul');
// console.log(menuToggle)

// menuToggle.addEventListener ('click', () => {
//     navLinks.classList.toggle('active');
// });



function uploadAndIdentifyPlantID(){
    // Retrieve the photo from the frontend
    const photoInput = document.getElementById('photoInput');

    // If no photos are selected, it alerts the user to upload a photo
    if(photoInput.files.length === 0){
        alert("Please select a photo to upload.");
        return;
    }

    // Select the first file from the files array of an input element
    const selectedFile = photoInput.files[0];

    // Create a new file reader object so that we can read the contents of the file 
    const reader = new FileReader ();

    // Set up the event handler for the onload for the file reader Object the onload event is triggered when the reading operaton of the file is completed
    reader.onload = function (e) {

        // store the base64Image in the variable
        const base64Image = e.target.result;
        console.log('base64Image',base64Image);


        // store all the variables for the API call
        const apiKey = 'Fv5W1ATY4XpRSBTIk3H75SrStuA590x7xk9uf4LzvOouTMWZCZ';
        const latitude = 49.207;
        const longitude = 16.608;
        const health = 'all';
        const similarImages = true;
        const details = 'common_names,url,description,taxonomy,rank,gbif_id,inaturalist_id,image,synonyms,edible_parts,watering,propagation_methods,treatment,cause';
        const language = 'en';
        const apiUrlPlantID = `https://plant.id/api/v3/identification?details=${details}&language=${language}`;

        // Making the first API call with the base64 image
        axios.post(apiUrlPlantID, {
            "images": [base64Image],
            "latitude": latitude,
            "longitude": longitude,
            "health": health,
            "similar_images": similarImages
        },{
            headers: {
            "Api-Key": apiKey,
            "Content-Type": "application/json"
            }
        })

        // Successful state of promise
        .then(function (response){
            console.log('Response from Plant ID API', response.data);
            displayPlantIDInfo(response.data, base64Image);
        })

        // Error state of promise
        .catch(function (error) {
            alert(`Error:${error}❌❌❌`)
            console.error('Error:', error);
        });
    };

// Read the selected as a data URL which is a base64 encoded representation of the file's content
    reader.readAsDataURL(selectedFile);
}

function displayPlantIDInfo(plantIdResponse,base64Image){
    // ======================================
    // VARIABLE TO STORE THE FIRST SUGGESTION 
    // ======================================
    const plantIdClassification = plantIdResponse.result.classification;
    const plantIdDisease = plantIdResponse.result.disease;
    const plantIdIsHealthy = plantIdResponse.result.is_healthy;
    const plantIdIsPlant = plantIdResponse.result.is_plant;

    // ======================================
    // PLANT PREVIEW IMAGE
    // ======================================
    // Grab the preview image element from the front plantidentifier.html
    const previewImage = document.getElementById('previewImage')
    // Set the image HTML src attribute to the preview image we uploaded on the plantidentifier.html
    previewImage.src = base64Image

    // ======================================
    // PLANT NAME
    // ======================================
    // Grab the HTML for the plant title container 
        const plantNameContainer = document.getElementById('plant-name-container');
    // Create a new <p> tag element for the plant title 
        const plantNameElement = document.createElement('p');
    // Add the name of the plant to the innerHTML of the <p> tag we created 
        plantNameElement.innerHTML = `<strong> Name: </strong> ${plantIdClassification.suggestions[0].name}`
    // Append the new div that we created to the api result container that we grabbed from our html 
        plantNameContainer.appendChild(plantNameElement);

    // ======================================
    // SIMILAR IMAGE
    // ======================================
    // Grab the similar image from the API Response
        const plantSimilarImage = plantIdClassification.suggestions[0].similar_images[0].url;
    // Grab the HTML where the image will be placed 
        const similarImageHTML = document.getElementById('plant-similar-image');
    // Set the image HTML src attribute to the image 
        similarImageHTML.src = plantSimilarImage;

    // ======================================
    // PROBABILITY
    // ======================================
    // Grab the probability score from the API Response
        const probabilityOfPlant = plantIdClassification.suggestions[0].probability;
    // Grab the HTML where the probability is going to be placed 
        const probabilityNameContainer = document.getElementById('probability-container');
    // Create a new <p> tag element for the probability text
        const probabilityNameElement = document.createElement('p');
    // Add the probability text to the innerHTML of the new <p> tag created 
        probabilityNameElement.innerHTML = `<strong> Probability: </strong> ${probabilityOfPlant}`;
    // Append the new div we created to the probabilityNameContainer we grabbed from our HTML
        probabilityNameContainer.appendChild(probabilityNameElement);

    // ======================================
    // IS PLANT
    // ======================================
    // Grab the 'is plant' boolean value from the API response
        const isPlant = plantIdIsPlant.binary;
    // Grab the HTML where the plant boolean will be placed 
        const isPlantContainer = document.getElementById('isPlant-container');
    // Create a new <p> tag element for the is plant boolean 
        const isPlantElement = document.createElement('p');
    // Check if the image submitted is a plant. If not, alert the user 
    if (isPlant===false){
        alert('The picture you submitted is not a plant❌❌❌. Please try again!');
        // Reload the page 
        window.location.reload();
    }
    // Add the boolean text to the innerHTML of the new p tag we created
        isPlantElement.innerHTML = `<strong> Is Plant: </strong> ${isPlant}`;
    // Append the new div we created to the isPlantContainer we created
    isPlantContainer.appendChild(isPlantElement)

    // ======================================
    // COMMON NAME
    // ======================================
    //Grab the first common name from the API Response 
    const commonName = plantIdClassification.suggestions[0].details.common_names[0];
    // Grab the HTML where the common name will be placed
    const commonNameContainer = document.getElementById('common-name-container');
    // Create a new p tag element for the common name text
    const commonNameElement = document.createElement('p');
    // Add the common name text to the inner html of the new <p> tag we created 
    commonNameElement.innerHTML = `<strong>Common Name:</strong> ${commonName}`;
    // Append the new div we created to the commonNameContainer we created
    commonNameContainer.appendChild(commonNameElement);

    // ======================================
    // DESCRIPTION
    // ======================================
    // Grab value from the API Response
    const plantDescription = plantIdClassification.suggestions[0].details.description.value;
    // Grab container from front end 
    const descriptionContainer = document.getElementById('description-container');
    // Create a new p tag element for the description text
    const descriptionElement = document.createElement('p')
    // Add the description text to the inner html of the new <p> tag we created 
    descriptionElement.innerHTML = `<strong> Description: </strong> ${plantDescription}`;
    // Append the new div we created to the container we grabbed from our html 
    descriptionContainer.appendChild(descriptionElement);

    
    // ======================================
    // PLANT HEALTH STATUS
    // ======================================
    // Grab value from the API Response
    const plantHealthStatus = plantIdIsHealthy.binary;
    // Grab container from front end 
    const plantHealthStatusContainer = document.getElementById('plant-health-status-container');
    // Create a new p tag element
    const plantHealthStatusElement = document.createElement('p');
    // Add the text to the inner html of the new <p> tag we created 
    plantHealthStatusElement.innerHTML = `<strong> Is Plant Healthy: </strong> ${plantHealthStatus}`;
    // Append the new div we created to the container we grabbed from our html 
    plantHealthStatusContainer.appendChild(plantHealthStatusElement);


    // ======================================
    // SIMILAR IMAGE WITH DISEASE
    // ======================================
    // Grab the similar image from API Response
    const plantSimilarImageWithDisease = plantIdDisease.suggestions[0].similar_images[0].url;
    // Grab the html where image will be placed 
    const similarImageWithDiseaseHTML = document.getElementById('plant-similar-image-with-disease');
    // set the image HTML src attribute to the image
    similarImageWithDiseaseHTML.src = plantSimilarImageWithDisease;
    

    // ======================================
    // DISEASE NAME
    // ======================================
    // Grab value from the API Response
    const plantDiseaseName = plantIdDisease.suggestions[0].name;
    // Grab container from front end 
    const plantDiseaseNameContainer = document.getElementById('plant-disease-name-container');
    // Create a new p tag element
    const plantDiseaseNameElement = document.createElement('p');
    // Add the text to the inner html of the new <p> tag we created 
    plantDiseaseNameElement.innerHTML = `<strong> Disease: </strong> ${plantDiseaseName}`;
    // Append the new div we created to the container we grabbed from our html 
    plantDiseaseNameContainer.appendChild(plantDiseaseNameElement);

    // ======================================
    // DISEASE PROBABILITY
    // ======================================
    // Grab value form API Response 
    const plantDiseaseProbability = plantIdDisease.suggestions[0].probability;
    // Grab container from the front end HTML
    const plantDiseaseProbabilityContainer = document.getElementById('plant-disease-probability');
    // Create a new <p> tag element 
    const plantDiseaseProbabilityElement = document.createElement('p');
    // Add the text to the inner html of the new <p> tag we created 
    plantDiseaseProbabilityElement.innerHTML = `<strong> Disease Probability: </strong> ${plantDiseaseProbability}`;
    // Append the new div we created to the container we grabbed from our html 
    plantDiseaseProbabilityContainer.appendChild(plantDiseaseProbabilityElement);

    // ======================================
    // DISEASE DESCRIPTION
    // ======================================
    // Grab value form API Response 
    const plantDiseaseDescription = plantIdDisease.suggestions[0].details.description;
    // Grab container from the front end HTML
    const plantDiseaseDescriptionContainer = document.getElementById('plant-disease-description');
    // Create a new <p> tag element 
    const plantDiseaseDescriptionElement = document.createElement('p');
    // Add the text to the inner html of the new <p> tag we created 
    plantDiseaseDescriptionElement.innerHTML = `<strong> Disease Description: </strong> ${plantDiseaseDescription}`;
    // Append the new div we created to the container we grabbed from our html 
    plantDiseaseDescriptionContainer.appendChild(plantDiseaseDescriptionElement);

    // ======================================
    // DISEASE TREATMENT 
    // ======================================
    // Grab value form API Response 
    const plantDiseaseTreatment = plantIdDisease.suggestions[0].details.treatment;
    // Grab container from the front end HTML
    const plantDiseaseTreatmentContainer = document.getElementById('plant-disease-treatment');
    // Create a new <p> tag element 
    const plantDiseaseTreatmentElement = document.createElement('p');

    // Do a check if the plant is dead and the object is empty we let the user know that there is no treatment available for dead plants 
    if (Object.keys(plantDiseaseTreatment).length === 0) {
        // Add text to the innerHTML of the new <p> tag we created 
        plantDiseaseTreatmentElement.innerHTML = `<strong> Disease Treatment: </strong> No treatment available`;
        // Append the new div we created to the container we grabbed from our html 
        plantDiseaseTreatmentContainer.appendChild(plantDiseaseTreatmentElement);
    }
   
    // Loop through the object and map keys to values 
    // Then attach them to the HTML container 
    for (const key in plantDiseaseTreatment) {
        // If the object has a key value pair 
        if (plantDiseaseTreatment.hasOwnProperty(key)) {
            // Create a variable and store the value of each key on each iteration 
            const plantDiseaseTreatmentValues = plantDiseaseTreatment[key].map(value => `<li>${value}</li>`).join('');
            // Create a variable that matches the key with the values and wrap them in HTML 
            const plantDiseaseTreatmentText = `<strong>${key}:</strong> <ul>${plantDiseaseTreatmentValues}</ul>`;
            // Append the text of the key value pairs into the HTML container 
            plantDiseaseTreatmentContainer.innerHTML += plantDiseaseTreatmentText;
        }
    }
}



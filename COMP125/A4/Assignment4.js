var allCatFacts = []; //Stores fetched cat facts data
var allCatImages = []; //stores fetched cat images data
var allJokes = []; //stores fetched jokes data

//make HTTP requests using XMLHttpRequest
function makeRequest(method, url) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onload = function() {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(xhr.response); 
            } else {
                reject({status: xhr.status, statusText: xhr.statusText}); 
            }
        };
        xhr.onerror = function() {
            reject({status: xhr.status, statusText: xhr.statusText});
        };
        xhr.send();
    });
}

//Fetch and display random cat facts from the API
makeRequest("GET", "https://catfact.ninja/facts?limit=10")
.then(function(rawdata) {
    var data = JSON.parse(rawdata); //parse the JSON response
    allCatFacts = data.data; //stores the data in the global array
    displayCatFacts(allCatFacts); //display the cat facts by calling the displayCatFacts function
})
.catch(function(err) {console.log(err.status)});//Logs any errors

//Fetch and display random cat images from the API
makeRequest("GET", "https://api.thecatapi.com/v1/images/search?limit=6")
.then(function(rawdata) {
    var data = JSON.parse(rawdata); //parse the JSON response
    allCatImages = data; //stores the data in the global array
    displayCatImages(allCatImages); //display the cat images by calling the displayCatImages function
})
.catch(function(err) {console.log(err.status)});//Logs any errors

//Fetch and display jokes from the API
makeRequest("GET", "https://v2.jokeapi.dev/joke/Any?type=single&amount=6")
.then(function(rawdata) {
    var data = JSON.parse(rawdata); //parse the JSON response
    allJokes = data.jokes; //stores the data in the global array
    displayJokes(allJokes); //display the jokes by calling the displayJokes function
})
.catch(function(err) {console.log(err.status)});//Logs any errors

//Displays cat facts with a maximum of 3 facts, or a no results message if empty
function displayCatFacts(facts) {
    var output = "<ul>";
    var limit = Math.min(facts.length, 3); //Display a maximum of 3 facts
    if (limit === 0) {
        output = "<p class='no-results'>No results found.</p>"; //Show no results message
    } else {
        for (var i = 0; i < limit; i++) {
            output = output + "<li>" + facts[i].fact + "</li>"; //Add each fact as a list item
        }
        output = output + "</ul>";
    }
    document.getElementById("posts1").innerHTML = output; //Update webpage content with the output
}

//Displays a maximum of 6 cat images, or a no results message if empty
function displayCatImages(images) {
    var output = "";
    var limit = Math.min(images.length, 6); //Display a maximum of 6 images
    if (limit === 0) {
        output = "<p class='no-results'>No results found.</p>"; //Show no results message
    } else {
        for (var i = 0; i < limit; i++) {
            output = output + "<img src=" + images[i].url + " alt=\"Random Cat\">";//Add each image
        }
    }
    document.getElementById("posts2").innerHTML = output; //Update webpage content with the output
}

//Displays a maximum of 6 jokes, or a no results message if empty
function displayJokes(jokes) {
    var output = "";
    var limit = Math.min(jokes.length, 6); //Display a maximum of 6 jokes
    if (limit === 0) {
        output = "<p class='no-results'>No results found.</p>"; //Show no results message
    } else {
        for (var i = 0; i < limit; i++) {
            output = output + "<p>" + jokes[i].joke + "</p>"; //Add each joke
        }
    }
    document.getElementById("posts3").innerHTML = output; //Update webpage content with the output
}

//Performs a search across the data and display filtered results
function performSearch() {
    var searchValue = document.getElementById('searchInput').value.toLowerCase();

    // Filter and display Cat Facts
    var filteredFacts = [];
    for (var i = 0; i < allCatFacts.length; i++) {
        if (allCatFacts[i].fact.toLowerCase().indexOf(searchValue) !== -1) {
            filteredFacts.push(allCatFacts[i]); //Add matching facts to the filtered list
        }
    }
    displayCatFacts(filteredFacts); //Display the filtered facts

    //Filter and display Cat Images
    var filteredImages = [];
    for (var i = 0; i < allCatImages.length; i++) {
        filteredImages.push(allCatImages[i]); //Add matching images to the filtered list
    }
    displayCatImages(filteredImages); //Display the filtered images

    //Filter and display Jokes
    var filteredJokes = [];
    for (var i = 0; i < allJokes.length; i++) {
        if (allJokes[i].joke.toLowerCase().indexOf(searchValue) !== -1) {
            filteredJokes.push(allJokes[i]); //Add matching jokes to the filtered list
        }
    }
    displayJokes(filteredJokes); //Display the filtered jokes
}
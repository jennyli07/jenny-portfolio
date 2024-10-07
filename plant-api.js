//function syntax example//
// function functionName ('parameters') {
// //code;
// } im so confused..

//let fileInput = document.querySelector('.fileInput');

//function Submit () {
    //code 
//}

function uploadFile() {
    let fileInput = document.getElementById('fileInput');
    let file = fileInput.files[0];

    if (file) {
        document.getElementById('status').textContent = 'Selected file: ${file.name}';
    } else {
        document.getElementById('status').textContent = 'No file selected.';
    }
}

let myButton = document.getElementById("myButton");

myButton.addEventListener("click", function(b) {
    let name = alert('Please upload a photo');
    console.log(name);
});

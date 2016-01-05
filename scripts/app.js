/**
 * Created by rizky on 1/5/16.
 */

// This function sends the file as a HTTP request to the server when the submit button is clicked
var form = document.getElementById("image-form");
form.onsubmit = function(){
    var data = new FormData(form);
    var xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.response);

            document.open();
            document.write(this.response);
            document.close();
        }
    });

    xhr.open("POST", "http://thisprojectiskilling.me/ascii");
    //xhr.open("POST", "http://localhost:8080/ascii");
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.send(data);

    return false;
};

// This function displays image when the user choose or take an image
function showImage(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#picture')
                .attr('src', e.target.result)
                .width(512);
            //console.log(e);
        };

        reader.readAsDataURL(input.files[0]);
    }
}
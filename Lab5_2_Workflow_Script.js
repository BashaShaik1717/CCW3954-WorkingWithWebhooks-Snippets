var payloadObject = JSON.parse(current.payload); 
var message = ""; 
payloadObject.commits.forEach(function (commit) {
    message += "Message: " + commit.message      + "\n"; 
    message += "URL: "     + commit.url          + "\n"; 
    message += "Author: "  + commit.author.email + "\n"; 
    message += "------------------------------------\n"; 
}); 
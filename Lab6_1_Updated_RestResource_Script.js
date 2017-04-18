// The 'jsSHA' library has been pre-loaded into your lab instance as a Script Include. 
// You can retrieve it from https://github.com/Caligatio/jsSHA if you wish to use it 
// in your own instances. 
var body   = request.body.dataString; 
var secret = gs.getProperty('x_snc_cc17_webhook.github_secret'); 
var sha    = new global.jsSHA('SHA-1', 'TEXT'); 
sha.setHMACKey(secret, 'TEXT'); 
sha.update(body); 
var hmac = sha.getHMAC('HEX'); 

// Now that we have a hash, compare it with the hash from the request
if (request.getHeader('X-Hub-Signature') == 'sha1=' + hmac) {

    // Move the rest of the processing logic here 
    var grWebhook = new GlideRecord('x_snc_cc17_webhook_stream'); 
    grWebhook.newRecord();
    grWebhook.source  = 'GitHub'; 
    grWebhook.id      = request.getHeader('X-GitHub-Delivery');
    grWebhook.action  = request.getHeader('X-GitHub-Event'); 
    grWebhook.payload = request.body.dataString;
    grWebhook.insert(); 

} else {
    // The signature did not match, reject the request
    var unauthorized = new sn_ws_err.ServiceError();
    unauthorized.setStatus(401);
    unauthorized.setMessage('Invalid secret');
    response.setError(unauthorized); 
}
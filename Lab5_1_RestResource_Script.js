(function process(/*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {

    // gs.info('GitHub Webhook URL: {0}', request.url); 
    // gs.info('GitHub Webhook Body: {0}', request.body.dataString); 

    var grWebhook = new GlideRecord('x_snc_cc17_webhook_stream'); 
    grWebhook.newRecord();
    grWebhook.source = 'GitHub'; 

    // Extract unique ID associated with this webhook
    grWebhook.id     = request.getHeader('X-GitHub-Delivery');

    // Extract event type associated with this webhook
    // See https://developer.github.com/v3/activity/events/types/
    grWebhook.action = request.getHeader('X-GitHub-Event'); 

    // Save the payload from the request body
    grWebhook.payload = request.body.dataString; 
    grWebhook.insert();

})(request, response);
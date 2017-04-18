(function process(/*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {

    gs.info('GitHub Webhook URL: {0}', request.url); 
    gs.info('GitHub Webhook Body: {0}', request.body.dataString); 

})(request, response);
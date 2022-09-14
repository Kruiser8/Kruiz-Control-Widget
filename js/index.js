// Do stuff if the document is fully loaded
document.addEventListener("DOMContentLoaded", function() {
  var kcConn = new KCConnection(
    'ws://127.0.0.1:4455', 'YOUR_PASSWORD'
  );

  kcConn.on('connected', function() {
    var data = {
      property: 'value'
    };
    kcConn.send('MyOtherCustomMessage', data);
  });

  kcConn.on('error', function(err) {
    console.error(err)
  });

  kcConn.on('MyCustomMessage', function(data) {
    // do stuff with data
    console.error(data);
  });
});

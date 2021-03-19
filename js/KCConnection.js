class KCConnection {
  constructor(address, password) {
    address = address || 'localhost:4444';
    password = password || '';
    this._initOBS(address, password);
    this._triggers = {
      'open': [],
      'error': []
    };
  }

  on(event, callback) {
    if(!this._triggers[event])
        this._triggers[event] = [];
    this._triggers[event].push(callback);
  }

  triggerHandler(event, params) {
      if(this._triggers[event]) {
          for(var i in this._triggers[event])
              this._triggers[event][i](params);
      }
  }

  async _initOBS(address, password) {
    await this.timeout(Math.random() * 10 * 1000);
    return this._initOBSAsync(address, password);
  }

  _initOBSAsync(address, password) {
    var obs = new OBSWebSocket();
    obs.connect({ address: address, password: password })
    .then(() => {
      this.triggerHandler('connected');
    })
    .catch(err => {
      this.triggerHandler('error', err);
    });


    // You must add this handler to avoid uncaught exceptions.
    obs.on('error', function(err) {
      this.triggerHandler('error', err);
    }.bind(this));

    obs.on('BroadcastCustomMessage', function(broadcast) {
      if (broadcast.realm === 'kruiz-control' && typeof(broadcast.data.message) !== 'undefined') {
        this.triggerHandler(broadcast.data.message, broadcast.data.data);
      }
    }.bind(this));

    obs.on('Exiting', function() {
      obs.disconnect();
    });

    this.obs = obs;
  }

  send(message, data) {
    this.obs.send('BroadcastCustomMessage', {
      'realm': 'kruiz-control',
      'data': {
        'message': message,
        'data': data
      }
    }).catch(err => {
      this.triggerHandler('error', err);
    });
  }

  timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

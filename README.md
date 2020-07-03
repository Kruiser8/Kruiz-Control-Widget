# Kruiz Control Widget

<p align="center"><i>
Kruiz Control Widget is a template for connecting browser sources to Kruiz Control through the OBS websocket.
</i></p>

<p align="center"><i><b>
  <a href="https://twitter.com/kruiser8">@Kruiser8</a> |
  <a href="https://trello.com/b/oIV3q6Im/kruiz-control">Trello (Roadmap)</a> |
  <a href="https://patreon.com/kruiser8">Patreon</a> |
  <a href="https://discord.gg/wU3ZK3Q">Support Discord</a>
</b></i></p>

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
  + [OBS Websocket](#obs-websocket)
  + [Add as Browser Source](#add-as-browser-source)
- [Configure the Script](#configure-the-script)
  + [Send Messages from Kruiz Control](#send-messages-from-kruiz-control)
  + [Send Messages from the Widget](#send-messages-from-the-widget)
- [Support Kruiz Control](#support-kruiz-control)
- [Credits](#credits)

***

## Overview
Kruiz Control Widget requires that you use OBS and the OBS websocket. This allows Kruiz Control to pass information from Kruiz Control to the Widget through the websocket and vice versa.

***

## Installation

### OBS Websocket
To use this widget, install the [obs-websocket](https://github.com/Palakis/obs-websocket/releases) plugin. Reopen OBS after installing.

In OBS, click **Tools** > **WebSockets Server Settings** and enable the websocket server.

It is **highly recommended** to use a password!

In **js/index.js**, update the OBS websocket url and password to match the settings you configured in the **WebSockets Server Settings** window mentioned above.

### Add as Browser Source
Add the **index.html** file as a browser source within your broadcast software. It is *recommended* to add this source to one scene that is included in all other scenes (like your alert scene) rather than recreate this source in every scene.

#### Steps for adding to OBS
- In OBS, under **Sources** click the + icon to add a new **Browser** source.
- Name it and select OK.
- Check the `Local file` checkbox.
- Click **Browse** and open the **index.html** file within the Kruiz Control Widget directory.

***

## Configure the Script

### Send Messages from Kruiz Control
In Kruiz Control, send messages to the widget by passing them through the OBS websocket.
```
# Send data when a command happens
OnCommand b 0 !tada
OBS Send MyCustomMessage {user}
```
Receive the data in the widget using `kcConn.on(event, callback)`. Any data that follows the message (like `{user}`) will be passed as a string input to the callback.
```js
kcConn.on('MyCustomMessage', function(data) {
  console.log(data); // data is the value of {user}
});
```

### Send Messages from the Widget
In the widget, send messages to Kruiz Control by passing them through `kcConn.send(message, data)` function.
```js
kcConn.send('MyOtherCustomMessage', 'Hey there!');
```
Receive the data in Kruiz Control using `OnOBSCustomMessage`. `data` will be passed to the `OnOBSCustomMessage` as a parameter.
```
# {data} is 'Hey there!' in the below example
OnOBSCustomMessage MyOtherCustomMessage
Chat Send {data}
```

***

## Support Kruiz Control
There are a number of ways to support this project.

- Support Kruiser through <a href="https://patreon.com/kruiser8">Patreon</a>.
- <a href="https://github.com/Kruiser8/Kruiz-Control-Documentation">Translate the Kruiz Control documentation</a>.
- Help others in the <a href="https://discord.gg/wU3ZK3Q">Support Discord</a>.
- Contribute ideas for the <a href="https://trello.com/b/oIV3q6Im/kruiz-control">roadmap</a>.
- Spread the word!

I do take commissions to implement custom functionality when necessary. Please reach out if you have a specific request.

***

## Credits
- [obs-websocket-js](https://github.com/haganbmj/obs-websocket-js) by Brendan Hagan (haganbmj)

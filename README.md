# Z-Way Client

Client library for the Z-Way Device API, allows for easy polling for changes, running commands, and events.

## Overview

### Initializing

```js
var zway = require('node-zway');

// without password
var deviceApi = new zway.DeviceApi('192.168.0.123');

// with password
var deviceApi = new zway.DeviceApi({ host: '192.168.0.123', user: 'admin', password: 'mypass' });
```

## Manually Refreshing

```js
deviceApi.refresh()
.then(() => {
    console.log('Done!');
});
```

## Polling

Rather than manually refreshing for updates you can just start polling at a defined interval.

```js
var interval = 1000; // ms
deviceApi.poll(interval);
```

## Events

The main reason to poll is to receive events. The client uses EventEmitter2 that supports wildcard events. The event format is `device_id.command_class_id.eventname`.

```js
deviceApi.on('5.98.*', data => {
    console.log('event data:', data);
});
```

For debugging:
```js
deviceApi.onAny(() => {
    console.log('event data:', data);
});
```

## Reading Device Data

```js
var device1 = deviceApi.getDevice(1, 98);
console.log(device1.DoorLock.get('mode'));
```

## Running Device Commands

```js
var device1 = deviceApi.getDevice(1, 98);
console.log(device1.DoorLock.lock());
```

## Command Class Info

### 37 - SwitchBinary

Commands:

- activate();
- deactivate();
- toggle();
- refresh();

Queries:

- TODO: isActivated();

### 48 - SensorBinary

Events:

- onChange();

Queries:

- getItems();

### 49 - SensorMultilevel

Commands:

- refresh();

Events:

- onChange();

Queries:

- getItems();

### 98 - DoorLock

Commands:

- lock();
- unlock();
- refresh();

Queries:

- isLocked();

### 113 - Alarm

Events:

- on();

## Notes

Have also looked at using the JS API (/ZAutomation) but the authentication system for this is limited and impractical.

## TODO

* Make it more flexible to reference everything by either command class name or ID (decimal or hex).
* Add more command class info

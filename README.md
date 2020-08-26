# jQuery Data Update
jQuery Data Update is a simple jQuery function which makes use of AJAX to retrieve updated elements on a HTML page.

## Usage
```javascript
new DataUpdate({
  debug: false, //Debug mode?
  autostart: true, //Should we start updating the elements as soon as the class is instansiated?
  interval: 10, //Interval in seconds to check for updates.
  dataSelector: 'update', //Data selector to use. In this example we will search for [data-update].
  updateAll: false, //If there are multiple elements with the same selector, should we update all of them?
  ajaxMethod: 'get', //Which method should we use when fetching updates?
  ajaxData: {}, //If there is additional data to send, then add it here.
  success: function(changes, ajaxResponse) {},
  error: function(ajaxResponse) {}
});
```

## Advanced Usage
### Starting Manually
You can choose to manually start the updater by making use of the 'autostart' option and 'start' method.
```javascript
var dataUpdate = new DataUpdate({
  autostart: false //Disable autostart, so that we can start it whenever we want.
});
dataUpdate.start(); //Start updating
```

### Stopping Manually
You can also choose to manually stop the updater.
```javascript
var dataUpdate = new DataUpdate();
dataUpdate.stop(); //Stop updating
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)

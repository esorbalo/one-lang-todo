# One-Lang Todo Mobile

## Requirements

* At least XCode or [Android Studio](https://developer.android.com/studio/index.html) has to be installed and configured. 
* [Expo](https://expo.io)

## Setup

1. The mobile needs to know the address of the server. This is given in the folder [src/config](src/config).
   1. Copy the file `env.sample.js` to `env.current.js`.
   1. Determine the IP address of your machine (if the local backend runs locally on your machine). You can use terminal commands like `ifconfig` or `ipconfig` for that.
   1. Write the IP address and the correct port in the file `env.current.js`.
1. Run `npm install`
1. Open the project in Expo XDE.
1. Send the project to a simulation. 

# tv7samsung

[TV7](https://www.tv7.fi/) Samsung smart TV application.

[Tizen TV](https://developer.tizen.org/tizen/tv) developer web pages.

![Demo](https://github.com/heaven-dev/tv7samsung/blob/master/misc/demo.gif)

## Instructions

### Download and install git
  - If your computer OS is windows you can download the git from [here](https://git-scm.com/download/win).
  - If your computer OS is linux (Ubuntu) you can install git using package manager.

### Clone repository
Clone this repository to your computer disk.
  - __git clone https://github.com/heaven-dev/tv7samsung.git__

### Download and install node (version 12.x.x)
  - If your computer OS is windows you can download node from [here](https://nodejs.org/en/download/).
  - If your computer OS is linux (Ubuntu) you can install node using package manager.

### Install live-server
  - __sudo npm install -g live-server__
  - You can use __live-server__ to run this application on a browser, but then the functionality is limited. Just run __live-server__ command in the root folder of the project.

### Download and install Tizen studio
  - Download Tizen studio from [here](https://developer.tizen.org/development/tizen-studio/download).
    - Select your OS.
    - Download this package: __Tizen Studio 3.7 with IDE installer__.
    - Save package to disk and start setup.
    - Follow installation instructions from [here](https://developer.samsung.com/smarttv/develop/getting-started/setting-up-sdk/installing-tv-sdk.html).
    - When you see text __To install the extensions from local images:__ you have done.

### Import project into the Tizen studio IDE
  - Start Tizen studio.
  - Select workspace folder and launch.
  - Select __File -> Import -> Tizen project__.
    - Select location (root folder of this project) and click __Next__.
    - Select profile __samsung-tv__ and version __5.5__ and select __Next__.
  - Now you should see the project on IDE.

### Run application on emulator
  - Select __Run -> Run configurations__ from the menu.
  - Select Tizen web application and click __New launch configuration__.
  - Set name to launch configuration.
  - Select project if not already selected.
  - Select __Apply__ and __Close__.
  - You can run __release__ version:
    - Click the project name with right mouse button.
    - Select __Run As -> Run configurations__ and select launch configuration you create and click __Run__.
    - Emulator is started and application is opened into the emulator.
  - You can run __debug__ version:
    - Click the project name with right mouse button.
    - Select __Debug As -> Debug configurations__ and select launch configuration you create and click __Run__.
    - Debug mode opens also an inspector of the browser.
    - Emulator is started and application is opened into the emulator.

### Run application on TV
  - At first you have to switch TV to the developer mode.
  - Your computer and TV have to be in the same network (wi-fi is fine).
  - Follow instructions from [here](https://developer.samsung.com/smarttv/develop/getting-started/using-sdk/tv-device.html).
  - Be sure that your computer firewall isn't blocking the connection between the computer and the TV.

### Notes
  - Application have two separate video player. One is HTML5 (video.js) and other is Samsung AvPlayer. Both player are working. You can select which player to use from the __main.js__ file (line 5).
  - There is also shell script (run.sh) which do all necessary things to run app on emulator or on TV. The script run app only in __release__ mode. 
    - If you are using the __run.sh__ script you have to change paths to the __profiles.xml.bu__ file.
    - You have also run two commands from the __cert.txt__ file.
      - Generate an author certificate.
      - Add new security profile.
      - Change value of parameters suits your needs.
    - Depending are you running app on emulator or on TV you have to change the value of __DEVICE_NAME__ from the __run.sh__ file. 
    - You can find the value of __DEVICE_NAME__ from the __Tools -> Device Manager__ menu of the IDE after the device is connected.
    - Probably the device name of emulator is __T-samsung-5.5-x86__, but you have to check the device name of TV after __Computer -> TV__ connection success.

### Useful links
  - [Command Line Interface (CLI) Commands](https://developer.tizen.org/development/tizen-studio/web-tools/cli)
  - [Application Signing and Certificates](https://docs.tizen.org/application/web/tutorials/sign-certificate/)
  - [Tizen TV Web Device API Reference](https://docs.tizen.org/application/web/api/latest/device_api/tv/index.html)

### License
 - [MIT](https://github.com/heaven-dev/tv7samsung/blob/master/LICENSE.md)
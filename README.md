# tv7samsung

[TV7](https://www.tv7.fi/) Samsung smart TV application.

[Tizen TV](https://developer.tizen.org/tizen/tv) developer web pages.

![Demo](https://github.com/heaven-dev/tv7samsung/blob/master/misc/demo.gif)

## Instructions

### Other platforms (LG and Android)
This application is also implemented to __LG__ and __Android__ smart TV platforms:
  - Repository of __LG__ application is [here](https://github.com/heaven-dev/tv7lg).
  - Repository of __Android__ application is [here](https://github.com/heaven-dev/tv7android).

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
  - There are __build__ and __run__ shell scripts in the root folder of this project.
    - __build.sh__: builds the application and the __TV7.wgt__ file is created in the __output__ folder.
    - __run.sh emulator|tv__: builds the application and runs it on emulator or TV.

### Useful links
  - [Command Line Interface (CLI) Commands](https://developer.tizen.org/development/tizen-studio/web-tools/cli)
  - [Application Signing and Certificates](https://docs.tizen.org/application/web/tutorials/sign-certificate/)
  - [Tizen TV Web Device API Reference](https://docs.tizen.org/application/web/api/latest/device_api/tv/index.html)

### License
 - [MIT](https://github.com/heaven-dev/tv7samsung/blob/master/LICENSE.md)
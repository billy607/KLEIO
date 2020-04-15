17/12/2019
complete front end of the login page.
resource：
	1. React Native FBSDK：https://github.com/facebook/react-native-fbsdk
	2. React Native Google Sign in: https://github.com/react-native-community/react-native-google-signin

19/12/2019
fix the bug of google signin button. Now if click this button, it will show the google account login page.
implement the page jumps and value transfer between different pages.
implement the example of react-native-popup-menu which provided by it's official website: https://github.com/instea/react-native-popup-menu

02/01/2020
Before using geofencing, open the setting of android emulator. Setting -> security&location -> location -> advanced -> allow google location accuracy.

*While test on the real device. Need to add NSLocationWhenInUseUsageDescription key in Info.plist to enable geolocation in order to make showsUserLocation enable.

04/15/2020
Add component Panel. (Use it the way you use View)
	Props:
		show: bool (default: false)
		title: string
		titleStyle:  Text.propType (default: styles.subTitle)
		containerStyle:  ViewPropType (default: styles.dropdown)
		
	Example:
		<Panel show = {true} title="Description">
                    <Panel title="Freshman" containerStyle={//your container style} titleStyle={//your title style}>
                        <Text style={//your text style}>
                            #34 Nationally
                        </Text>
                    </Panel>
                </Panel>

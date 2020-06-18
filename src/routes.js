import {createStackNavigator} from 'react-navigation';

import Main from './pages/main';
import Details from './pages/details';

export default createStackNavigator({
    Main, Details 
}, {
        navigationOptions: {
            headerStyle: {
                backgroundColor: "#882288"
        },
        headerTintColor: "#FFF"
        //882288
    },
});
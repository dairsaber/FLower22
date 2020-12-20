// ! 暗号：建立清晰规范的数据处理流程
import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {NavigationContainer, RouteProp} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {TextInput} from 'react-native-gesture-handler';

export type ParamsList = {
  Home: undefined;
  User: {name?: string; setName: Function};
};

interface HomeProp {
  navigation: StackNavigationProp<ParamsList, 'Home'>;
}
interface UserProp {
  navigation: StackNavigationProp<ParamsList, 'User'>;
  route: RouteProp<ParamsList, 'User'>;
}

// 首屏
function HomeScreen(props: HomeProp) {
  console.log('props :>> ', props);
  const {navigation} = props;
  const [name, setName] = React.useState('');
  return (
    <View style={styles.container}>
      <Text>UserName: {name}</Text>
      <Button
        onPress={() => {
          navigation.navigate('User', {setName, name});
        }}
        title="edit"
      />
    </View>
  );
}

// 编辑用户名称
function UserScreen(props: UserProp) {
  const {navigation, route} = props;
  const {name, setName} = route.params;
  const [userName, setUserName] = React.useState(name);
  return (
    <View style={styles.container}>
      <Text>UserName:</Text>
      <TextInput
        style={styles.textInput}
        value={userName}
        onChangeText={setUserName}
      />
      <Button
        onPress={() => {
          setName(userName);
          navigation.goBack();
        }}
        title="返回"
      />
    </View>
  );
}
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="User" component={UserScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  textInput: {width: 300, borderWidth: 1},
});

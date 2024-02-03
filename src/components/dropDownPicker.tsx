import { View, Text } from 'react-native'
import React, {useState} from 'react'
import DropDownPicker from 'react-native-dropdown-picker'
import { useNavigation } from '@react-navigation/native'

const dropDownPicker = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Login', value: 'Login'},
    {label: 'SignUp', value: 'SignUp'}
  ]);

  const navigation = useNavigation()

  return (
    <View>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder='DJ?'
        onChangeValue={() => {
          if (value === 'Login') {
            navigation.navigate('Login')
          } else if (value === 'SignUp') {
            navigation.navigate('SignUp')
          }
        }}
        containerStyle={{ 
          height: 40, 
          width: 100, 
          alignItems: 'center', 
          justifyContent: 'center',
          paddingLeft: 10,
          paddingTop: 10
        }}
      />
    </View>
  )

}

export default dropDownPicker
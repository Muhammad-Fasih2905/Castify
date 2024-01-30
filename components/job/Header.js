import {View, Text} from 'react-native';
import React from 'react';
import {Appbar, Searchbar, Button} from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
import { Colors } from '../../constants/Colors';
export default function Header() {
  const _goBack = () => console.log('Went back');

  const _handleSearch = () => console.log('Searching');

  const _handleMore = () => console.log('Shown more');
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);
  return (
    <>
      <Appbar.Header>
        {/* <Appbar.BackAction onPress={_goBack} /> */}
        <View
          style={{
            display: 'flex',
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            backgroundColor:Colors.whiteColor
          }}>
          <View>
            <Searchbar
              style={{width: 290}}
              placeholder="Search"
              onChangeText={onChangeSearch}
              value={searchQuery}
            />
          </View>
          <View>
            <Appbar.Action icon="chat" onPress={_handleMore} />
          </View>
        </View>
      </Appbar.Header>
    </>
  );
}

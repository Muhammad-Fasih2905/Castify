import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  useColorScheme,
} from 'react-native';
import {Colors, themeGreen, themePink} from '../../constants/Colors';
import NewHeader from '../newHeader/NewHeader';

const Order = ({navigation}) => {
  const [headerData, setHeaderData] = useState([
    {id: 1, title: 'All', isActive: true},
    {id: 2, title: 'Open', isActive: false},
    {id: 3, title: 'Completed', isActive: false},
    {id: 4, title: 'Expired', isActive: false},
    {id: 5, title: 'Declined', isActive: false},
    {id: 6, title: 'Canceled', isActive: false},
  ]);

  const handleActive = id => {
    setHeaderData(prev =>
      prev.map(e =>
        e.id == id ? {...e, isActive: true} : {...e, isActive: false},
      ),
    );
  };
  const themeChange = useColorScheme() === 'Male' ? 'Male' : 'female';

  return (
    <View style={{marginTop: 10}}>
      <NewHeader title="Your orders" navigation={navigation} />
      <View style={{marginTop: 19}}>
        <FlatList
          data={headerData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <View
              style={[
                {padding: 20},
                item.isActive && {
                  backgroundColor:
                    themeChange === 'Male'
                      ? themeGreen.greenThemeColor
                      : themePink.pinkThemeColor,
                  borderRadius: 50,
                  minWidth: 100,
                },
              ]}>
              <TouchableOpacity onPress={() => handleActive(item.id)}>
                <Text
                  style={{
                    fontSize: 15,
                    color: Colors.black,
                    textAlign: 'center',
                  }}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            </View>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View
        style={{
          display: 'flex',
          backgroundColor: Colors.whiteColor,
          width: '100%',
          height: '70%',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 30,
        }}>
        <Text style={{color: Colors.black, fontSize: 17}}>
          Have an occasion coming up?
        </Text>
        <TouchableOpacity
          style={[
            styles.browsebtn,
            themeChange === 'Male'
              ? {backgroundColor: themeGreen.greenThemeColor}
              : {backgroundColor: themePink.pinkThemeColor},
          ]}>
          <Text style={{color: Colors.whiteColor}}>Start browsing</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Order;

const styles = StyleSheet.create({
  browsebtn: {
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    height: 50,
    width: 200,
    borderRadius: 22,
    top: 20,
  },
});

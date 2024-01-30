import React, {useCallback} from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import TalentUser from '../../components/browseUsers/TalentUser';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import {Colors} from '../../constants/Colors';
import {useNavigation} from '@react-navigation/native';
import PortfiloTalentUsersComp from '../../components/portfilotalentuser/PortfiloTalentUsersComp';
import {useEffect} from 'react';
import {getAllUsersRequest} from '../Redux/action/followUser';

const PortfiloTalentUsers = () => {
  const {allUsers} = useSelector(state => state.follow);
  const {token, user} = useSelector(state => state.auth);
  const navigation = useNavigation();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsersRequest(token));
  }, []);

  const renderItem = useCallback(
    ({item, index}) => {
      if (
        item &&
        item.role === '2' &&
        item.id !== user.id &&
        item.portfolio &&
        item.portfolio
      ) {
        return <PortfiloTalentUsersComp item={item} index={index} />;
      }
      return null;
    },
    [allUsers, user],
  );

  return (
    <View flex={1}>
      <View style={{...styles.Newheader}}>
        <View flex={0.2}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="left" size={20} color={Colors.black} />
          </TouchableOpacity>
        </View>
        <Text flex={1} style={{fontSize: 18, color: Colors.black}}>
          Portfilo Talent Users
        </Text>
        <View flex={0.2} />
      </View>
      <View style={{flex: 1, alignSelf: 'center'}}>
        <FlatList
          data={allUsers}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
          }}
          numColumns={2}
        />
      </View>
    </View>
  );
};

export default PortfiloTalentUsers;

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  column: {
    flex: 1,
    marginRight: 10,
  },
  Newheader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
});

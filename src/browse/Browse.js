import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  ScrollView,
  RefreshControl,
  Dimensions,
  Animated,
} from 'react-native';

import * as Animatable from 'react-native-animatable';

import {useNavigation} from '@react-navigation/native';

import styles from '../home/styles';
import Header from '../../components/header';
import SeeAllUsers from '../home/SeeAllUsers';
import {Colors} from '../../constants/Colors';
import Icon from 'react-native-vector-icons/Ionicons';

import {useDispatch, useSelector} from 'react-redux';
import {getAllUsersRequest} from '../Redux/action/followUser';
import OtherAllUsers from '../../components/OthersSeeAllUsers';
import TalentUser from '../../components/browseUsers/TalentUser';
import NormalUser from '../../components/browseUsers/NormalUser';

const SCREEN_WIDTH = Dimensions.get('window').width;

const Browse = () => {
  const [placement, setPlacement] = useState(undefined);
  const [refreshing, setRefreshing] = useState(false);
  const [showAllUsers, setShowAllUsers] = useState(null);
  const [showAllUsers1, setShowAllUsers1] = useState(null);
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navigation = useNavigation();

  const dispatch = useDispatch();

  const {token, user} = useSelector(state => state.auth);

  const {isLoading, allUsers} = useSelector(state => state.follow);

  const animationValue = new Animated.Value(-200);

  // const cardAnimations = useRef(
  //   categorizedUsers[category].map((_, index) => new Animated.Value(0)),
  // ).current;
  // const AnimatedFlatList = createAnimatedComponent(FlatList);

  const getCategorizedUsers = () => {
    const categorizedUsers = {};

    allUsers?.map(User => {
      if (User?.category !== null && User?.id !== user?.id) {
        const category = User?.category;
        if (!categorizedUsers[category]) {
          categorizedUsers[category] = [];
        }
        categorizedUsers[category].push(User);
      }
      return null; // Return null in map to avoid linter warning
    });

    return categorizedUsers;
  };

  const categorizedUsers = getCategorizedUsers();

  // Seacrh username Function ...
  // const filteredUsers = categorizedUsers?.actor.filter(user =>
  //   user.username.toLowerCase().includes(searchQuery.toLowerCase()),
  // );

  // Sort the categories to show "trending" users on the top
  const sortedCategories = Object.keys(categorizedUsers);

  // console.log('allUsers ===>', allUsers);

  const openModal = placement => {
    setOpen(true);
    setPlacement(placement);
  };

  const animateComponent = () => {
    return Animated.timing(animationValue, {
      toValue: 0,
      duration: 1100,
      useNativeDriver: false,
    });
  };

  useEffect(() => {
    dispatch(getAllUsersRequest(token));
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      dispatch(getAllUsersRequest(token));
      setRefreshing(false);
    }, 2000);
  }, []);

  const toggleShowAllUsers = users => {
    setShowAllUsers(users);
  };

  const toggleShowAllUsers1 = users => {
    setShowAllUsers1(users);
  };

  if (categorizedUsers?.is_blocked) {
    return (
      <View style={styles.BlockparentDiv}>
        <View
          style={{display: 'flex', justifyContent: 'space-around', flex: 1}}>
          <View style={styles.blockcontainer}>
            <View style={styles.blockusernameContainer}>
              <Text style={styles.blockusername}>Unblock</Text>
            </View>
          </View>

          <TouchableOpacity
            style={{...styles.blockBtn, backgroundColor: Colors.redColor}}>
            <Text
              style={{
                fontSize: 15,
                color: Colors.whiteColor,
                textAlign: 'center',
              }}>
              Unblock
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (showAllUsers)
    return (
      <SeeAllUsers
        setShowAllUsers={setShowAllUsers}
        showAllUsers={showAllUsers}
        allUsers={allUsers}
      />
    );

  // Other See All Users
  if (showAllUsers1)
    return (
      <OtherAllUsers
        setShowAllUsers1={setShowAllUsers1}
        showAllUsers1={showAllUsers1}
      />
    );
  const getFirstLetter = user => {
    if (user?.name && user.name.length > 0) {
      return user.name.charAt(0).toUpperCase();
    }
    // Return a default value (e.g., '?' or any character you like) if the username is not available
    return '';
  };

  const categoryData = Object.keys(categorizedUsers).map(category => ({
    category,
    users: categorizedUsers[category],
  }));

  const handleSearchInputChange = query => {
    setSearchQuery(query);
  };

  const filteredUsers = allUsers?.filter(
    e => e?.role !== '2' && e?.id !== (user && user?.id),
  );

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      showsVerticalScrollIndicator={false}>
      <View
        style={{
          backgroundColor: Colors.whiteColor,
          flex: 1,
        }}>
        <Header title="Browse" />
        <View style={styles.searchView}>
          <View
            style={{
              flexDirection: 'row',
              height: '47%',
              width: '80%',
              backgroundColor: Colors.whiteColor,
              marginHorizontal: 17,
              marginVertical: 20,
              alignItems: 'center',
              justifyContent: 'space-around',
              borderRadius: 22,
            }}>
            <Icon name="search" color={Colors.black} size={20} />
            <TextInput
              style={{width: '80%', padding: 2}}
              placeholder="Search"
              value={searchQuery}
              onChangeText={handleSearchInputChange}
              scrollEnabled={false}
            />
          </View>
        </View>
        {/* Display the categorized users */}
        <ScrollView
          vertical
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
          }}>
          <View>
            {/* Add the category title and "See all" link */}
            {!searchQuery && (
              <Animatable.View
                animation="slideInLeft"
                delay={300}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 15,
                  marginTop: 12,
                  borderBottomColor: Colors.grayColor,
                  borderBottomWidth: 1,
                  bottom: 4,
                }}>
                <Text style={{...styles.Text, bottom: 3}}>Talent User</Text>
                {/* Implement the navigation for "See all" */}
                <TouchableOpacity
                  onPress={() => setShowAllUsers(!showAllUsers)}>
                  <Text style={{...styles.Text, bottom: 3}}>See all</Text>
                </TouchableOpacity>
              </Animatable.View>
            )}

            {/* Render the users for this category */}
            <ScrollView
              horizontal
              contentContainerStyle={{
                paddingHorizontal: 15,
              }}
              showsHorizontalScrollIndicator={false}>
              {allUsers
                ?.filter(user =>
                  user.username
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()),
                )
                .slice(0, 5)
                .map((User, index) => {
                  if (User.role === '2' && User.id !== user.id) {
                    return <TalentUser item={User} index={index} />;
                  }
                  return null;
                })}
            </ScrollView>
          </View>
          {!searchQuery && (
            <>
              <Animatable.View
                animation="slideInLeft"
                delay={300}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 15,
                  marginTop: 12,
                  borderBottomColor: Colors.grayColor,
                  borderBottomWidth: 1,
                  bottom: 4,
                }}>
                <Text style={{...styles.Text, bottom: 3}}>Others</Text>
                <TouchableOpacity
                  onPress={() => toggleShowAllUsers1(filteredUsers)}>
                  <Text style={{...styles.Text, bottom: 3}}>See all</Text>
                </TouchableOpacity>
              </Animatable.View>
            </>
          )}
          <ScrollView
            horizontal
            contentContainerStyle={{
              paddingHorizontal: 15,
            }}
            showsHorizontalScrollIndicator={false}>
            <>
              {/* ......................All User And Talent Users.................... */}
              {filteredUsers
                ?.filter(user =>
                  user?.username
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()),
                )
                .filter(user => (showAllUsers1 ? true : user.role === '1'))
                .slice(0, 5)
                .map((item, index) => {
                  return <NormalUser item={item} index={index} />;
                })}
            </>
          </ScrollView>
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default Browse;

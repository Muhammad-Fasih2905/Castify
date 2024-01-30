import React from 'react';
import {
  Button,
  Actionsheet,
  useDisclose,
  Center,
  NativeBaseProvider,
  VStack,
} from 'native-base';
import {View, Text, StyleSheet, Image} from 'react-native';
import * as Animatable from 'react-native-animatable';

import {Colors} from '../../constants/Colors';

const FollowUser = ({onOpen, isOpen, onClose, allFollowers}) => {
  //   const {isOpen, onOpen, onClose} = useDisclose();

  return (
    <>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          {allFollowers?.map(item => {
            return (
              <Animatable.View
                animation="slideInLeft"
                delay={200}
                style={styles.Suggestiondata}>
                <View style={styles.container}>
                  {item?.pic ? (
                    <Image
                      source={{uri: item?.pic}}
                      style={styles.usernamePic}
                    />
                  ) : (
                    <View style={styles.NameViewcontainer}>
                      <View style={styles.usernameContainer}>
                        <Text style={styles.username}>
                          {item?.name?.charAt(0).toUpperCase()}
                        </Text>
                      </View>
                    </View>
                  )}

                  <VStack
                    mx={4}
                    space={2}
                    alignItems="flex-start"
                    flexShrink={1}>
                    <View style={styles.NewMessageBox}>
                      <Text
                        style={{
                          fontSize: 17,
                          fontWeight: '800',
                          color: Colors.black,
                          top: 6,
                        }}>
                        {item?.name}
                      </Text>
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: '700',
                          color: Colors.black,
                          top: 6,
                          right: 6,
                        }}>
                        {item?.category
                          ? item?.category.charAt(0).toUpperCase() +
                            item?.category.slice(1)
                          : ''}
                      </Text>
                    </View>
                  </VStack>
                </View>
              </Animatable.View>
            );
          })}
        </Actionsheet.Content>
      </Actionsheet>
    </>
  );
};

export default FollowUser;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    padding: 16,
    borderRadius: 8,
  },
  titleDes: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 16,
  },

  title: {
    width: 150,
    height: 34,
    backgroundColor: Colors.purpleDim,
    marginBottom: 8,
    borderRadius: 20,
  },
  description: {
    width: 230,
    height: 17,
    borderRadius: 20,
    backgroundColor: Colors.purpleDim,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.purpleDim,
  },

  // Name Container
  NameViewcontainer: {
    display: 'flex',
    alignSelf: 'center',
  },
  usernameContainer: {
    bottom: 0,
    right: 0,
    backgroundColor: Colors.profileColor,
    borderRadius: 60,
    padding: 5,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  username: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  // Message Box Card
  NewMessageBox: {
    height: 65,
    width: 180,
    backgroundColor: Colors.whiteColor,
    marginHorizontal: 10,
    marginTop: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
    borderRadius: 12,
    bottom: 6,
  },
  usernamePic: {
    width: 55,
    height: 55,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: Colors.grayColor,
    top: 10,
  },
});

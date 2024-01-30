import {View, Text, TouchableOpacity, Linking} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import styles from './styles';
import {Colors} from '../../constants/Colors';
import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon4 from 'react-native-vector-icons/Fontisto';
import Icon3 from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Icon5 from 'react-native-vector-icons/Entypo';
import {Icon, ScrollView, Image} from 'native-base';
import NewHeader from '../../components/newHeader/NewHeader';

const Settings = ({navigation}) => {
  return (
    <ScrollView>
      <View style={styles.settingsBg}>
        <NewHeader title="Account Settings" navigation={navigation} />
      </View>
      <View
        style={{
          backgroundColor: Colors.whiteColor,
          borderTopWidth: 1,
          borderTopColor: Colors.grayColor,
        }}>
        <View style={styles.settingsScreenView}>
          <TouchableOpacity onPress={() => navigation.navigate('updateEmail')}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 30,
              }}>
              <View style={styles.profileView}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '700',
                    marginBottom: 15,
                    paddingHorizontal: 10,
                  }}>
                  Change email
                </Text>
                <Icon size="6" as={<Icon4 name="email" />} />
              </View>
              <Icon mr={5} size="6" as={<Icon1 name="chevron-forward" />} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.settingsScreenView}>
          <TouchableOpacity
            onPress={() => navigation.navigate('updatePassword')}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 30,
              }}>
              <View style={styles.profileView}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '700',
                    marginBottom: 15,
                    paddingHorizontal: 10,
                  }}>
                  Change password
                </Text>
                <Icon size="6" as={<Icon1 name="lock-closed-outline" />} />
              </View>
              <Icon size="6" mr={5} as={<Icon1 name="chevron-forward" />} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{backgroundColor: Colors.whiteColor}}>
        <View style={styles.settingsScreenView}>
          <TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 30,
              }}>
              <View style={styles.profileView}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '700',
                    marginBottom: 15,
                    paddingHorizontal: 10,
                  }}>
                  Security and privacy
                </Text>
                <Icon size="6" as={<Icon3 name="privacy-tip" />} />
              </View>
              <Icon mr={5} size="6" as={<Icon1 name="chevron-forward" />} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.settingsScreenView}>
          <TouchableOpacity onPress={() => navigation.navigate('InvitionCode')}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 30,
              }}>
              <View style={styles.profileView}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '700',
                    marginBottom: 15,
                    paddingHorizontal: 10,
                  }}>
                  Got an invite code ?
                </Text>
                <Icon size="6" as={<Icon2 name="star" />} />
              </View>
              <Icon size="6" mr={5} as={<Icon1 name="chevron-forward" />} />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.settingsScreenView}>
          <TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 30,
              }}>
              <View style={{...styles.profileView}}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '700',
                    marginBottom: 15,
                    paddingHorizontal: 10,
                  }}>
                  FAQs
                </Text>
                <Icon size="6" as={<Icon2 name="questioncircleo" />} />
              </View>
              <Icon size="6" mr={5} as={<Icon1 name="chevron-forward" />} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{backgroundColor: Colors.whiteColor}}>
        <View style={styles.settingsScreenView}>
          <TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 30,
              }}>
              <View style={{...styles.profileView}}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '700',
                    marginBottom: 15,
                    paddingHorizontal: 10,
                  }}>
                  Accessibility
                </Text>
                <Icon size="6" as={<Icon2 name="eye" />} />
              </View>
              <Icon size="6" mr={5} as={<Icon1 name="chevron-forward" />} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{backgroundColor: Colors.whiteColor}}>
        <View style={styles.settingsScreenView}>
          <TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 30,
              }}>
              <View style={{...styles.profileView}}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '700',
                    marginBottom: 15,
                    paddingHorizontal: 10,
                  }}>
                  Log Out
                </Text>
                <Icon size="6" as={<Icon5 name="log-out" />} />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <Text
        style={{
          textAlign: 'center',
          padding: 50,
          color: Colors.whiteColor,
        }}>
        156.3.0
      </Text>
    </ScrollView>
  );
};

export default Settings;

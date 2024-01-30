import React from 'react';
import {View, Text, Touchable, TouchableOpacity} from 'react-native';
import styles from './about.style';
import {List, Avatar} from 'react-native-paper';
import Applicant from '../../applicant/Applicant';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {MaterialIcons} from 'react-native-vector-icons/MaterialIcons';
const About = ({info, description, applied_users, ...restProps}) => {
  const naviagtion = useNavigation();
  const result = restProps.user;
  const jobId = restProps.jobId;
  const {user} = useSelector(state => state.auth);
  console.log(applied_users, 'applied_users=========about');
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.headText}>About the job</Text>
        <List.Item
          title={info}
          description={description}
          left={props => <List.Icon {...props} icon="account-search" />}
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.headText}>About the Director</Text>
        <List.AccordionGroup>
          <View>
            <List.Accordion title="Profile" id="3">
              <TouchableOpacity
                onPress={() =>
                  naviagtion.navigate('Profile', {
                    screenName: 'About',
                    data: undefined,
                  })
                }>
                <List.Item
                  title={result?.username}
                  description={result?.email}
                  left={props => (
                    <Avatar.Image
                      style={{alignSelf: 'center'}}
                      size={35}
                      source={{uri: result?.pic}}
                    />
                  )}
                />
              </TouchableOpacity>
            </List.Accordion>
          </View>
        </List.AccordionGroup>
      </View>

      {user?.role === '1' ? (
        <View style={styles.container}>
          <View>
            <Text style={styles.headText}>Applicants</Text>
            <Applicant applied_users={applied_users} jobId={jobId} />
          </View>
        </View>
      ) : (
       null
      )}
    </>
  );
};

export default About;

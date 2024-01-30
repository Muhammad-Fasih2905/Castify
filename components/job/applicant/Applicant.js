import React from 'react';
import {Image, View, Text, TouchableOpacity} from 'react-native';
import {IconButton, List, MD3Colors, Chip} from 'react-native-paper';
import image from '../../../assets/Castify.png';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {approvedJobRequest} from '../../../src/Redux/action/job/JobAction';
import { Colors } from '../../../constants/Colors';
export default function Applicant({applied_users, jobId}) {
  console.log(applied_users, 'applied_users=-==========');
  const {token} = useSelector(state => state.auth);
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const handleApproved = id => {
    let data = {
      approveJobs: jobId,
      user: id,
    };
    dispatch(approvedJobRequest(token, data));
  };
  return (
    <List.Section>
      {applied_users?.length > 0 ? (
        applied_users.map(item => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigate.navigate('ApplicantProfile', {
                  id: applied_users[0].id,
                });
              }}>
              <List.Item
                style={{
                  backgroundColor: 'white',
                  borderRadius: 8,
                  paddingVertical: 10,
                  paddingHorizontal: 25,
                  width: '100%',
                  borderBottomWidth: 1,
                  borderBottomColor: '#333333',
                }}
                title={item?.name}
                left={() => (
                  <List.Icon
                    icon={({size, color}) => (
                      <Image source={image} style={{width: 30, height: 30}} />
                    )}
                  />
                )}
                right={props => {
                  if (item.status === 'Approved') {
                    return (
                      <>
                        <Chip
                          icon="information"
                          onPress={() => console.log('Pressed')}>
                          Approved
                        </Chip>
                      </>
                    );
                  } else if (item.status === 'Rejected') {
                    return (
                      <>
                        <Chip
                          iconColor={MD3Colors.error50}
                          icon="close-circle"
                          onPress={() => console.log('Pressed')}>
                          Rejected
                        </Chip>
                      </>
                    );
                  } else {
                    return (
                      <>
                        <View style={{flexDirection: 'row'}}>
                          <IconButton
                            icon="close-circle"
                            size={20}
                            onPress={() => console.log('Pressed')}
                            style={{marginRight: 0}}
                            iconColor={MD3Colors.error50}
                            mode="contained"
                          />
                          <IconButton
                            icon="hand-back-right"
                            size={20}
                            onPress={() => {
                              handleApproved(item?.applied_job);
                            }}
                            style={{marginRight: 0}}
                            iconColor={MD3Colors.green400}
                            mode="contained"
                          />
                        </View>
                      </>
                    );
                  }
                }}
              />
            </TouchableOpacity>
          );
        })
      ) : (
        <Text style={{color:Colors.black}}>Not Found</Text>
      )}
    </List.Section>
  );
}

import React from 'react';
import {Image, View, Text, TouchableOpacity} from 'react-native';
import {IconButton, List, MD3Colors, Chip} from 'react-native-paper';
import image from '../../../assets/Castify.png';
import {useNavigation} from '@react-navigation/native';
export default function ApprovedApplicant({applied_users}) {
  const navigate = useNavigation();
  const approvedUsers = applied_users.filter(
    item => item.status === 'Approved',
  );
  return (
    <List.Section>
      {approvedUsers?.length > 0 ? (
        approvedUsers.map(item => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigate.navigate('ApplicantProfile', {
                  id: applied_users?.id,
                });
              }}>
              <List.Item
                style={{
                  backgroundColor: 'white',
                  borderRadius: 8,
                  paddingVertical: 10,
                  paddingHorizontal: 25,
                  width: '100%',
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
                  }
                }}
              />
            </TouchableOpacity>
          );
        })
      ) : (
        <Text>Not Found</Text>
      )}
    </List.Section>
  );
}

import React from 'react';
import {List, MD3Colors} from 'react-native-paper';
import {ScrollView, View, Text, TouchableOpacity, Image} from 'react-native';
import styles from './nearbyjobcard.style';
import image from '../../../assets/Castify.png';
import {checkImageURL} from '../../../src/utils';
const NearbyJobCard = props => {
  const {job, handleNavigate} = props;
  return (
    <TouchableOpacity style={{paddingHorizontal: 10}} onPress={handleNavigate}>
      <List.Section>
        <List.Item
          style={{
            backgroundColor: 'white',
            borderRadius: 8,
            paddingVertical: 10,
            paddingHorizontal: 25,
            width: '100%',
          }}
          title={job.title}
          description={job.description}
          left={() => (
            <List.Icon
              icon={({size, color}) => (
                <Image source={image} style={{width: 30, height: 30}} />
              )}
            />
          )}
        />
      </List.Section>
    </TouchableOpacity>
  );
};

export default NearbyJobCard;

import React, {useEffect} from 'react';
import {List, MD3Colors} from 'react-native-paper';
import {Image, ScrollView, Text, View} from 'react-native';
import image from '../../../assets/Castify.png';
import {useDispatch, useSelector} from 'react-redux';
import {getAppliedJobRequest} from '../../../src/Redux/action/job/JobAction';
export default function UserAppliedJob({appliedJobs}) {
  const dispatch = useDispatch();
  const {token} = useSelector(state => state.auth);
  return (
    <ScrollView>
      <List.Section>
        {appliedJobs?.length > 0 ? (
          appliedJobs.map(item => {
            return (
              <>
                <List.Item
                  style={{
                    backgroundColor: 'white',
                    borderRadius: 8,
                    paddingVertical: 10,
                    paddingHorizontal: 25,
                    width: '100%',
                    marginBottom: 10,
                  }}
                  title="Status"
                  left={() => (
                    <List.Icon
                      icon={({size, color}) => (
                        <Image source={image} style={{width: 30, height: 30}} />
                      )}
                    />
                  )}
                  right={() =>
                    item.is_approved === false ? (
                      <Text style={{paddingTop: 5}}>Pending</Text>
                    ) : (
                      <Text style={{paddingTop: 5}}>Approved</Text>
                    )
                  }
                />
              </>
            );
          })
        ) : (
          <>
            <Text>Not Found</Text>
          </>
        )}
      </List.Section>
    </ScrollView>
  );
}

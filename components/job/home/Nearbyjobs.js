import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import styles from './nearjobs.style';
import {COLORS} from '../../../constants/Colors';
import NearbyJobCard from '../alljob/NearbyJobCard';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getAllJobs} from '../../../src/Redux/action/job/JobAction';
const Nearbyjobs = () => {
  const navigation = useNavigation();
  const [isloading, setIsLoading] = useState(false);
  const {token, user} = useSelector(state => state.auth);
  const {isLoading, isSuccess, jobs} = useSelector(state => state.jobs);
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const [data, setData] = useState([]);
  useEffect(() => {
    dispatch(getAllJobs(token));
  }, []);
  const router = useRoute();
  const handleRedirect = job => {
    console.log('PRESSS');
    navigation.navigate('JobDetails', {data: job});
  };
  return (
    <View style={styles.container}>
      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : jobs?.length > 0 ? (
          jobs.map(job => (
            <NearbyJobCard
              job={job}
              key={job.id}
              handleNavigate={() => {
                handleRedirect(job);
              }}
            />
          ))
        ) : (
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>NOT FOUND</Text>
          </View>
        )}
      </View>
    </View>
  );
};
export default Nearbyjobs;

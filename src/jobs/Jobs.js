import React, {useState, useEffect} from 'react';
import {SafeAreaView, ScrollView, View, Text} from 'react-native';
import Header from '../../components/job/Header';
import {COLORS} from '../../constants/Colors';
import Nearbyjobs from '../../components/job/home/Nearbyjobs';
import Tabs from '../../components/job/jobDetail/tab/Tabs';
import PostJob from '../../components/job/postJob/PostJob';
import styles from '../../components/job/alljob/nearbyjobcard.style';
import {useDispatch, useSelector} from 'react-redux';
import Applicant from '../../components/job/applicant/Applicant';
import UserAppliedJob from '../../components/job/userAppliedJob/UserAppliedJob';
import {getAppliedJobRequest} from '../Redux/action/job/JobAction';
const Jobs = () => {
  const dispatch = useDispatch();
  const {appliedJobs, isLoading, isSuccess} = useSelector(state => state.jobs);
  const {token, user} = useSelector(state => state.auth);
  let role = user?.role;

  const tabs = ['My Jobs', 'Post a job'];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const tabs1 = ['All Jobs', 'Applied Job'];
  const [userActiveTab, setUserActiveTab] = useState(tabs1[0]);
  const displayTabContent = () => {
    switch (activeTab) {
      case 'My Jobs':
        return <Nearbyjobs />;
      case 'Post a job':
        return <PostJob />;
      default:
        return null;
    }
  };
  const userDisplayTabContent = () => {
    switch (userActiveTab) {
      case 'All Jobs':
        return <Nearbyjobs />;
      case 'Applied Job':
        return <UserAppliedJob appliedJobs={appliedJobs} />;
      default:
        return null;
    }
  };
  useEffect(() => {
    dispatch(getAppliedJobRequest(token));
  }, [dispatch]);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <Header />
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          flexDirection: 'row',
        }}>
        {role === '1' ? (
          <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
        ) : (
          <Tabs
            tabs={tabs1}
            activeTab={userActiveTab}
            setActiveTab={setUserActiveTab}
          />
        )}
      </View>
      {role === '1' ? (
        <ScrollView>{displayTabContent()}</ScrollView>
      ) : (
        <ScrollView>{userDisplayTabContent()}</ScrollView>
      )}
    </SafeAreaView>
  );
};
export default Jobs;

import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import Footer from '../../components/job/jobDetail/footer/Footer';
import About from '../../components/job/jobDetail/about/About';
import Tabs from '../../components/job/jobDetail/tab/Tabs';
import {SIZES} from '../../constants/Colors';
import {ScrollView} from 'react-native';
import Qualification from '../../components/job/jobDetail/qualification/Qualification';
import {useDispatch, useSelector} from 'react-redux';
import {
  createAppliedJobRequest,
  getJobById,
  getJobByIdRequest,
} from '../Redux/action/job/JobAction';
import Applicant from '../../components/job/applicant/Applicant';
import ApprovedApplicant from '../../components/job/applicant/ApprovedApplicants';
const JobDeatils = () => {
  const [id, setId] = useState('');
  console.log(id, 'id');
  const naviagtion = useNavigation();
  const {token, user} = useSelector(state => state.auth);
  const {jobs} = useSelector(state => state.jobs);
  const dispatch = useDispatch();
  const tabs = ['About', 'Eligibility', 'Responsibilites', 'Applicants'];
  const router = useRoute();
  const {title, description, responsibility, eligibility, applied_users} =
    jobs[0] || {};
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [refreshing, setRefreshing] = useState(false);
  const handleApproved = () => {
    let data = {
      job: id,
      user: user.id,
    };
    dispatch(createAppliedJobRequest(token, data));
    naviagtion.navigate('Job');
  };
  console.log(jobs, 'jobs============');
  const displayTabContent = () => {
    switch (activeTab) {
      case 'About':
        return (
          <About
            info={title ?? 'No data provided'}
            description={description ?? 'No data provided'}
            applied_users={applied_users}
            user={jobs[0]?.user}
            jobId={jobs[0]?.id}
          />
        );
      case 'Eligibility':
        return (
          <Qualification title="Eligibility" points={eligibility ?? ['N/A']} />
        );
      case 'Responsibilites':
        return (
          <Qualification
            title="Responsibilities"
            points={responsibility ?? ['N/A']}
          />
        );
      case 'Applicants':
        return (
          <ApprovedApplicant title="Applicants" applied_users={applied_users} />
        );
      default:
        return null;
    }
  };
  useEffect(() => {
    setId(router.params.data.id);
    if (id) {
      dispatch(getJobByIdRequest(token, id));
    }
  }, []);
  // console.log(router.params.data, 'router.params.data.id');
  return (
    <>
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}>
        <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{padding: SIZES.medium, paddingBottom: 100}}>
          {displayTabContent()}
        </View>
      </ScrollView>
      <Footer handleApproved={handleApproved} />
    </>
  );
};

export default JobDeatils;

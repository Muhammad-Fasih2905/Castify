import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../auth';
import Signup from '../auth/Signup';
import EmailSend from '../auth/ForgotPassword';
import CreatePassword from '../auth/CreatePassword';
import LoginPassword from '../auth/LoginPassword';
import InviteCode from '../auth/InviteCode';
import Bottom_Tabs from './BottomNavigation';
import Profile from '../Profile/Profile';
import Order from '../../components/yourOrder/Order';
import EditProfile from '../editProfile/EditProfile';
import Settings from '../settings/Settings';
import UpdateEmail from '../settings/UpdateEmail';
import UpdatePassword from '../settings/UpdatePassword';
import InvitionCode from '../settings/InviteCode';
import TalentScreen from '../talentScreen/TalentScreen';
import TalentUserProfile from '../talentUser/TalentUserProfile';
import Chat from '../chat/Chat';
import CreatePost from '../post/CreatePost';
import ShowPost from '../postsShow/ShowPost';
import Comments from '../../components/postComments/Comment';
import ApplyTalent from '../applyTalent/ApplyTalent';
import SeeAllUsers from '../home/SeeAllUsers';
import Browse from '../browse/Browse';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import DrawerCustom from './DrawerCustom';
import SpecialLogin from '../auth/SpecialLogin';
import UserProfile from '../userProfile/UserProfile';
import TalentProfile from '../TalentProfile/TalentProfile';
import JobDeatils from '../jobs/JobDetail';
import ProtfiloScreen from '../protfiloScreen/ProtfiloScreen';
import PortfiloEditScreen from '../protfiloScreen/PortfiloEditScreen';
import NotificationNaviagte from './NotificationNaviagte';
import PortfiloTalentUsers from '../protfiloScreen/PortfiloTalentUsers';
import UsersChatList from '../chat/UsersChatList';
import AllUsersChatChoice from '../chat/AllUsersChatChoice';
import TalentUserShowPortfilo from '../protfiloScreen/TalentUserShowPortfilo';
import ApplicantProfile from '../Profile/ApplicantProfile';

const Drawer = createDrawerNavigator();
const DrawerNavigation = () => {
  return (
    <NavigationContainer
      ref={ref => NotificationNaviagte.setTopLevelNavigator(ref)}>
      <Drawer.Navigator
        screenOptions={{headerShown: false}}
        drawerContent={props => <DrawerCustom {...props} />}>
        <Drawer.Screen name="HomeNav" component={Navigation} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const Navigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      // initialRouteName="bottomSheet"
      initialRouteName="starter"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="starter" component={SplashScreen} />
      {/* <Stack.Screen name="drawer" component={DrawerNavigation} /> */}
      <Stack.Screen name="signup" component={Signup} />
      <Stack.Screen name="EmailSend" component={EmailSend} />
      <Stack.Screen component={Bottom_Tabs} name="Home" />
      <Stack.Screen name="LoginPassword" component={LoginPassword} />
      <Stack.Screen name="specialLogin" component={SpecialLogin} />
      <Stack.Screen name="InviteCode" component={InviteCode} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="ApplicantProfile" component={ApplicantProfile} />
      <Stack.Screen name="UserProfile" component={UserProfile} />
      <Stack.Screen name="yourorder" component={Order} />
      <Stack.Screen name="editProfile" component={EditProfile} />
      <Stack.Screen name="settings" component={Settings} />
      <Stack.Screen name="updateEmail" component={UpdateEmail} />
      <Stack.Screen name="updatePassword" component={UpdatePassword} />
      <Stack.Screen name="InvitionCode" component={InvitionCode} />
      <Stack.Screen name="CreatePassword" component={CreatePassword} />
      <Stack.Screen name="TalentScreen" component={TalentScreen} />
      <Stack.Screen name="ApplyTalent" component={ApplyTalent} />
      <Stack.Screen name="TalentUserProfile" component={TalentUserProfile} />
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="createPost" component={CreatePost} />
      <Stack.Screen name="post" component={ShowPost} />
      <Stack.Screen name="comments" component={Comments} />
      <Stack.Screen name="SeeAllUsers" component={SeeAllUsers} />
      <Stack.Screen name="Browse" component={Browse} />
      <Stack.Screen name="TalentProfile" component={TalentProfile} />
      <Stack.Screen name="ProtfiloScreen" component={ProtfiloScreen} />
      <Stack.Screen name="PortfiloEditScreen" component={PortfiloEditScreen} />
      <Stack.Screen name="UsersChatList" component={UsersChatList} />
      <Stack.Screen name="AllUsersChat" component={AllUsersChatChoice} />
      <Stack.Screen
        name="JobDetails"
        component={JobDeatils}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="TalentUserShowPortfilo"
        component={TalentUserShowPortfilo}
      />
      <Stack.Screen
        name="PortfiloTalentUsers"
        component={PortfiloTalentUsers}
      />
    </Stack.Navigator>
  );
};
// export default Navigation;
export default DrawerNavigation;

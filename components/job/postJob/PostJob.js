import React from 'react';
import {useState} from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import {TextInput, Button, Switch} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {createJobRequest} from '../../../src/Redux/action/job/JobAction';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';
import {themePink} from '../../../constants/Colors';
export default function PostJob() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {token, user} = useSelector(state => state.auth);
  const {isLoading, isSuccess} = useSelector(state => state.jobs);
  console.log(user, 'user===================');
  const [userInput, setuserInput] = useState({
    title: '',
    description: '',
    eligibility: '',
    responsibility: '',
    price: '',
    location: '',
  });
  const onHandleChnage = (key, e) => {
    console.log(e);
    setuserInput(pre => ({
      ...pre,
      [key]: e,
    }));
  };
  const handleSubmit = async () => {
    console.log('PRESS');
    const data = {
      title: userInput.title,
      description: userInput.description,
      eligibility: userInput.eligibility,
      responsibility: userInput.responsibility,
      price: userInput.price,
      location: userInput.location,
      user:user?.id
    };
    // Assuming that `dispatch(createJobRequest(token, data))` returns a promise
    try {
      await dispatch(createJobRequest(token, data));
      setuserInput({
        title: '',
        description: '',
        eligibility: '',
        responsibility: '',
        price: '',
        location: '',
      });
      // If the request was successful, clear the userInput state
      if (isSuccess) {
        setuserInput({
          title: null,
          description: null,
          eligibility: null,
          responsibility: null,
          price: null,
          location: null,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text variant="displaySmall">Title</Text>
        <TextInput
          label="Title"
          name="title"
          value={userInput.title}
          onChangeText={e => {
            onHandleChnage('title', e);
          }}
          style={styles.input}
          underlineColor={themePink.pinkThemeColor}
          activeUnderlineColor={themePink.pinkThemeColor}
        />
        <Text variant="displaySmall">Description</Text>
        <TextInput
          label="Description"
          value={userInput.description}
          style={styles.input}
          onChangeText={e => {
            onHandleChnage('description', e);
          }}
          name="description"
          underlineColor={themePink.pinkThemeColor}
          activeUnderlineColor={themePink.pinkThemeColor}
          autoCapitalize="none"
        />
        <Text variant="displaySmall">Eligibility</Text>
        <TextInput
          label="Eligibility"
          style={styles.input}
          onChangeText={e => {
            onHandleChnage('eligibility', e);
          }}
          value={userInput.eligibility}
          textContentType="text"
          underlineColor={themePink.pinkThemeColor}
          activeUnderlineColor={themePink.pinkThemeColor}
        />
        <Text variant="displaySmall">Responsibilites</Text>
        <TextInput
          label="Responsibilites"
          style={styles.input}
          textContentType="text"
          value={userInput.responsibility}
          underlineColor={themePink.pinkThemeColor}
          activeUnderlineColor={themePink.pinkThemeColor}
          onChangeText={e => {
            onHandleChnage('responsibility', e);
          }}
        />
        <Text variant="displaySmall">Location</Text>
        <TextInput
          label="Location"
          style={styles.input}
          value={userInput.location}
          textContentType="text"
          underlineColor={themePink.pinkThemeColor}
          activeUnderlineColor={themePink.pinkThemeColor}
          onChangeText={e => {
            onHandleChnage('location', e);
          }}
        />
        <Text variant="displaySmall">Salary</Text>
        <TextInput
          label="Salary"
          style={styles.input}
          value={userInput.price}
          onChangeText={e => {
            onHandleChnage('price', e);
          }}
          textContentType="text"
          underlineColor={themePink.pinkThemeColor}
          activeUnderlineColor={themePink.pinkThemeColor}
        />
        <Button
          style={{marginVertical: 10, paddingVertical: 10}}
          mode="contained"
          onPress={handleSubmit}
          buttonColor={themePink.pinkThemeColor}>
          Submit
        </Button>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', marginHorizontal: 30},
  input: {marginVertical: 5},
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 20,
    justifyContent: 'space-between',
  },
});

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Avatar, Button, Card} from 'react-native-paper';

const JobsPosts = () => {
  return (
    <Card>
      <Card.Content>
        <Text variant="titleLarge">New Post</Text>
        <Text variant="bodyMedium">Hello My new Post</Text>
      </Card.Content>
      <Card.Cover source={{uri: 'https://picsum.photos/700'}} />
    </Card>
  );
};

export default JobsPosts;

const styles = StyleSheet.create({});

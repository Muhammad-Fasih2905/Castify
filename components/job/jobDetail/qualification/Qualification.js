import React from 'react';
import {View, Text} from 'react-native';
import styles from './qualification.style';
const Qualification = ({title, points}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{points}</Text>
      {/* <View style={styles.pointsContainer}>
        {points.map((item, index) => (
          <View style={styles.pointWrapper} key={item + index}>
            <View style={styles.pointDot} />
            <Text style={styles.pointText}>{item}</Text>
          </View>
        ))}
      </View> */}
    </View>
  );
};

export default Qualification;

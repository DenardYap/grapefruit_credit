import React from 'react';
import styles from '../styles';
import {Pressable, Text, View} from 'react-native';
import textStyles from '../textStyles';
import {handleSimulatePmt} from '../helpers/helpers';
type SimulatePmtType = {
  setPayable: Function;
  setBalance: Function;
  setPendingList: Function;
  setSettledList: Function;
  payable: string;
  pendingList: number[][];
};
const SimulatePmt = (props: SimulatePmtType) => {
  return (
    <View style={styles.simulateContainer}>
      <Pressable
        onPress={() =>
          handleSimulatePmt(
            props.setPayable,
            props.setBalance,
            props.setPendingList,
            props.payable,
            props.pendingList,
            props.setSettledList,
          )
        }>
        <Text style={[textStyles.lg, textStyles.white]}>Simulate Payment</Text>
      </Pressable>
    </View>
  );
};

export default SimulatePmt;

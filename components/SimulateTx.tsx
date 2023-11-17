import React from 'react';
import {Pressable, Text, View} from 'react-native';
import styles from '../styles';
import {handleSimulateTx} from '../helpers/helpers';
import textStyles from '../textStyles';

type SimulateTxType = {
  setPayable: Function;
  setBalance: Function;
  setPendingList: Function;
  setSettledList: Function;
  balance: string;
  pendingList: number[][];
};
const SimulateTx = (props: SimulateTxType) => {
  return (
    <View style={styles.simulateContainer}>
      <Pressable
        onPress={() =>
          handleSimulateTx(
            props.setPayable,
            props.setBalance,
            props.setPendingList,
            props.balance,
            props.pendingList,
            props.setSettledList,
          )
        }>
        <Text style={[textStyles.lg, textStyles.white]}>
          Simulate Transaction
        </Text>
      </Pressable>
    </View>
  );
};

export default SimulateTx;

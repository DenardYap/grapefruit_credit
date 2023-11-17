import React from 'react';
import textStyles from '../textStyles';
import {Image, Pressable, Text, View} from 'react-native';
import styles from '../styles';
import {handleCancelPending} from '../helpers/helpers';

type PendingType = {
  pendingList: number[][];
  setPayable: Function;
  setBalance: Function;
  setPendingList: Function;
};
const Pending = (props: PendingType) => {
  return (
    <View style={styles.pendingTextContainer}>
      <Text style={[textStyles.lg, textStyles.bold]}>Pending Transactions</Text>
      <View style={styles.pendingContainer}>
        <View style={styles.pendingList}>
          {props.pendingList.length === 0 ? (
            <View style={styles.iconTextContainer}>
              <Image
                source={require('../assets/gf_icon_white.png')}
                style={styles.gfIcon}></Image>
              <Text
                style={[textStyles.sm, textStyles.center, textStyles.white]}>
                You do not have any pending transactions yet
              </Text>
            </View>
          ) : (
            props.pendingList.map((item, index) => (
              <View style={styles.txListStyle}>
                <View style={styles.leftTextContainer}>
                  <Text style={[textStyles.md, textStyles.italic]}>
                    {item[4] === 1 ? 'Payment pending' : 'Transaction pending'}
                  </Text>
                  <Text
                    style={[textStyles.xs, textStyles.italic, textStyles.grey]}>
                    {item[0]}
                  </Text>
                </View>
                <View style={styles.rightTextContainer}>
                  <Text style={[textStyles.sm]}>${item[1].toFixed(2)}</Text>
                  <Pressable
                    style={styles.cancelContainer}
                    onPress={() =>
                      handleCancelPending(
                        item[2],
                        true,
                        props.setPayable,
                        props.setBalance,
                        props.setPendingList,
                        props.pendingList,
                      )
                    }>
                    <Text style={[textStyles.sm, textStyles.white]}>
                      Cancel
                    </Text>
                  </Pressable>
                </View>
              </View>
            ))
          )}
        </View>
      </View>
    </View>
  );
};

export default Pending;

import React from 'react';
import textStyles from '../textStyles';
import {Image, Text, View} from 'react-native';
import styles from '../styles';

type SettledType = {
  settledList: string[][];
};
const Settled = (props: SettledType) => {
  return (
    <View style={styles.settledTextContainer}>
      <Text style={[textStyles.lg, textStyles.bold]}>Settled Transactions</Text>
      <View style={styles.settledContainer}>
        <View style={styles.settledList}>
          {props.settledList.length === 0 ? (
            <View style={styles.iconTextContainer}>
              <Image
                source={require('../assets/gf_icon_white.png')}
                style={styles.gfIcon}></Image>
              <Text
                style={[textStyles.sm, textStyles.center, textStyles.white]}>
                You do not have any settled transactions yet
              </Text>
            </View>
          ) : (
            props.settledList.map((item, index) => (
              // 0 is initial date, 1 is posted date, 2 is price
              <View style={styles.txListStyle}>
                <View style={styles.leftTextContainer}>
                  <Text
                    style={[
                      textStyles.md,
                      textStyles.italic,
                      textStyles.bold,
                      {color: item[5] === 1 ? '#00CF00' : 'black'},
                    ]}>
                    {item[5] === 1
                      ? 'Payment Received'
                      : `Transaction ${item[3]}`}
                  </Text>
                  <Text
                    style={[textStyles.xs, textStyles.italic, textStyles.grey]}>
                    Initial Date: {item[0]}
                  </Text>
                  <Text
                    style={[textStyles.xs, textStyles.italic, textStyles.grey]}>
                    Posted Date: {item[1]}
                  </Text>
                </View>
                <Text style={[textStyles.sm]}>${item[2].toFixed(2)}</Text>
              </View>
            ))
          )}
        </View>
      </View>
    </View>
  );
};

export default Settled;

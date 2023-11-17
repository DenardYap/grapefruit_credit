import React from 'react';
import {Pressable, Text, View} from 'react-native';
import styles from '../styles';
import textStyles from '../textStyles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {handleAddFunds} from '../helpers/helpers';
import {COLOR} from '../helpers/constants';
type CreditcardType = {
  setBalance: Function;
  balance: string;
  payable: string;
};
const Creditcard = (props: CreditcardType) => {
  return (
    <View style={styles.middleContainer}>
      <Text style={[textStyles.xl4, textStyles.bold]}>
        Welcome back, Grapefruiter
      </Text>

      <View style={styles.creditCardContainer}>
        <Text style={[textStyles.xl3, textStyles.white]}>Your Card</Text>
        <View style={styles.cardButtonContainer}>
          <AntDesign name="creditcard" size={160} color={COLOR.white} />

          <Pressable
            style={styles.buttonContainer}
            onPress={() => handleAddFunds(props.setBalance)}>
            <AntDesign name="pluscircleo" size={40} color={COLOR.white} />
            <Text style={[textStyles.md, textStyles.white]}>Add credit</Text>
          </Pressable>
        </View>
        <Text style={[textStyles.lg, textStyles.white]}>
          Your credit: {props.balance}
        </Text>
        <Text style={[textStyles.md, textStyles.white]}>
          Payable balance: {props.payable}
        </Text>
      </View>
    </View>
  );
};

export default Creditcard;

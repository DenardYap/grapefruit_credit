/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {updatePendingTxs, updateSettledTxs} from './helpers/helpers';
import styles from './styles';
import Creditcard from './components/Creditcard';
import SimulateTx from './components/SimulateTx';
import SimulatePmt from './components/SimulatePmt';
import Settled from './components/Settled';
import Pending from './components/Pending';
function App(): JSX.Element {
  const [balance, setBalance] = useState('0');
  const [payable, setPayable] = useState('0');
  const [pendingList, setPendingList] = useState([]);
  const [settledList, setSettledList] = useState([]);

  // useEffect to handle pendingTxs
  useEffect(() => {
    updatePendingTxs(
      setPayable,
      setBalance,
      setPendingList,
      pendingList,
      setSettledList,
    );
  }, []);

  // useEffect to handle settledList
  useEffect(() => {
    updateSettledTxs(setSettledList);
  }, []);
  // Find out the user's credit
  useEffect(() => {
    const execute = async () => {
      const credit: string | null = await AsyncStorage.getItem('credit');
      const payable: string | null = await AsyncStorage.getItem('payable');
      if (credit !== null) {
        setBalance(credit);
      } else {
        await AsyncStorage.setItem('credit', '0');
      }
      if (payable !== null) {
        setPayable(payable);
      } else {
        const payable: string | null = await AsyncStorage.getItem('payable');
        await AsyncStorage.setItem('payable', '0');
      }
    };
    execute();
  }, []);
  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        <Creditcard
          setBalance={setBalance}
          balance={balance}
          payable={payable}></Creditcard>
        <SimulateTx
          setBalance={setBalance}
          setPendingList={setPendingList}
          setSettledList={setSettledList}
          setPayable={setPayable}
          balance={balance}
          pendingList={pendingList}></SimulateTx>
        <SimulatePmt
          setBalance={setBalance}
          setPendingList={setPendingList}
          setSettledList={setSettledList}
          setPayable={setPayable}
          payable={payable}
          pendingList={pendingList}></SimulatePmt>
        <Settled settledList={settledList}></Settled>
        <Pending
          pendingList={pendingList}
          setBalance={setBalance}
          setPendingList={setPendingList}
          setPayable={setPayable}></Pending>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;

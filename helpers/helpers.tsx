import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
import {getISO8601Date} from './utils';
import {UPDATE_COEF, CREDIT_LIMIT} from './constants';
export const updateSettledTxs = async setSettledList => {
  //
  let settledTxs = await AsyncStorage.getItem('settledTxs');
  if (settledTxs === null) {
    await AsyncStorage.setItem('settledTxs', '{}');
    return;
  }

  settledTxs = JSON.parse(settledTxs);
  let tmpSettledList = [];
  const newDate = new Date();
  Object.entries(settledTxs).map(async entry => {
    const id = entry[0];
    const date = entry[1][0];
    const postedDate = entry[1][1];
    const amount = parseFloat(entry[1][2]);
    const oldDate = new Date(entry[1][3]);
    const paymentType = entry[1][4];

    tmpSettledList.push([date, postedDate, amount, id, oldDate, paymentType]);
  });
  tmpSettledList.sort((a, b) => Math.abs(a[4] - b[4]));
  setSettledList(tmpSettledList);
};

export const updatePendingTxs = async (
  setPayable,
  setBalance,
  setPendingList,
  pendingList,
  setSettledList,
) => {
  // await AsyncStorage.removeItem('pendingTxs');
  let pendingTxs = await AsyncStorage.getItem('pendingTxs');
  if (pendingTxs === null) {
    await AsyncStorage.setItem('pendingTxs', '{}');
    return;
  }
  pendingTxs = JSON.parse(pendingTxs);
  let tmpPendingList = [];
  const newDate = new Date();
  Object.entries(pendingTxs).map(async entry => {
    const id = entry[0];
    const date = entry[1][0];
    const amount = parseFloat(entry[1][1]);
    const oldDate = new Date(entry[1][2]);
    const paymentType = entry[1][3];
    const differenceInMilliseconds = Math.abs(oldDate - newDate);
    const differenceInMinutes = Math.floor(
      differenceInMilliseconds / (1000 * 60),
    );
    if (differenceInMinutes < UPDATE_COEF) {
      tmpPendingList.push([date, amount, id, oldDate, paymentType]);
    } else {
      // POST PAYMENT
      handleCancelPending(
        parseInt(id),
        false,
        setPayable,
        setBalance,
        setPendingList,
        pendingList,
      );

      // Transaction
      const postedDate = getISO8601Date();
      const settledTxs = JSON.parse(await AsyncStorage.getItem('settledTxs'));
      if (paymentType === 0) {
        const payable = parseFloat(await AsyncStorage.getItem('payable'));
        await AsyncStorage.setItem('payable', (payable + amount).toFixed(2));

        setPayable(val => {
          return (parseFloat(val) + amount).toFixed(2);
        });
      }
      // Payment
      else {
        const credit = parseFloat(await AsyncStorage.getItem('credit'));
        await AsyncStorage.setItem('credit', (credit + amount).toFixed(2));

        setBalance(val => {
          return (parseFloat(val) + amount).toFixed(2);
        });
      }
      settledTxs[id] = [date, postedDate, amount, oldDate, paymentType];
      await AsyncStorage.setItem('settledTxs', JSON.stringify(settledTxs));
      updateSettledTxs(setSettledList);
    }
  });
  tmpPendingList.sort((a, b) => Math.abs(a[3] - b[3]));
  setPendingList(tmpPendingList);
};

export async function handleAddFunds(setBalance) {
  Alert.prompt('Add credit', 'Enter your desired amount', [
    {
      text: 'Cancel',
      style: 'cancel',
    },
    {
      text: 'OK',
      onPress: async (inputValue: string) => {
        const isValidInput = /^[0-9.]+$/.test(inputValue);

        if (!isValidInput) {
          Alert.alert('Invalid input', 'Please enter numbers only.');
        }
        const inc: number = parseFloat(inputValue);
        if (inc > CREDIT_LIMIT) {
          Alert.alert(
            'Credit limit exceeded',
            `Please make sure your credit limit is below $${CREDIT_LIMIT}`,
          );
          return;
        }
        let credit: string | null = await AsyncStorage.getItem('credit');

        if (credit === null) {
          AsyncStorage.setItem('credit', inc.toFixed(2));
          setBalance(inc.toFixed(2));
          return;
        }
        const newCredit = parseFloat(credit) + inc;
        if (newCredit > CREDIT_LIMIT) {
          Alert.alert(
            'Credit limit exceeded',
            `Please make sure your credit limit is below $${CREDIT_LIMIT}`,
          );
          return;
        }
        AsyncStorage.setItem('credit', newCredit.toFixed(2));
        setBalance(newCredit.toFixed(2));
      },
    },
  ]);
}

export async function handleSimulateTx(
  setPayable,
  setBalance,
  setPendingList,
  balance,
  pendingList,
  setSettledList,
) {
  Alert.prompt('Simulate Transaction', 'Enter your desired amount', [
    {
      text: 'Cancel',
      style: 'cancel',
    },
    {
      text: 'OK',
      onPress: async (inputValue: string) => {
        const isValidInput = /^[0-9.]+$/.test(inputValue);

        if (!isValidInput) {
          Alert.alert('Invalid input', 'Please enter numbers only.');
        }
        const inc: number = parseFloat(inputValue);
        if (inc > parseFloat(balance)) {
          Alert.alert(
            'Insufficient credit',
            `You don't have enough credit to make this transaction`,
          );
          return;
        }
        const newCredit = parseFloat(balance) - inc;
        AsyncStorage.setItem('credit', newCredit.toFixed(2));
        setBalance(newCredit.toFixed(2));

        appendPendingTx(
          inc,
          0,
          setPayable,
          setBalance,
          setPendingList,
          pendingList,
          setSettledList,
        );
      },
    },
  ]);
}

export async function handleSimulatePmt(
  setPayable,
  setBalance,
  setPendingList,
  payable,
  pendingList,
  setSettledList,
) {
  Alert.prompt('Simulate Payment', 'Enter your desired amount', [
    {
      text: 'Cancel',
      style: 'cancel',
    },
    {
      text: 'OK',
      onPress: async (inputValue: string) => {
        const isValidInput = /^[0-9.]+$/.test(inputValue);

        if (!isValidInput) {
          Alert.alert('Invalid input', 'Please enter numbers only.');
        }
        const inc: number = parseFloat(inputValue);
        if (inc > parseFloat(payable)) {
          Alert.alert(
            'Payable balance is too low',
            `You cannot pay more than your payable balance`,
          );
          return;
        }
        const newPayable = parseFloat(payable) - inc;
        AsyncStorage.setItem('payable', newPayable.toFixed(2));
        setPayable(newPayable.toFixed(2));

        appendPendingTx(
          inc,
          1,
          setPayable,
          setBalance,
          setPendingList,
          pendingList,
          setSettledList,
        );
      },
    },
  ]);
}
export async function appendPendingTx(
  amount: number,
  type: number,
  setPayable,
  setBalance,
  setPendingList,
  pendingList,
  setSettledList,
) {
  let pendingTxs = await AsyncStorage.getItem('pendingTxs');
  if (pendingTxs === null) {
    await AsyncStorage.setItem('pendingTxs', '{}');
    pendingTxs = '{}';
  }
  pendingTxs = JSON.parse(pendingTxs);

  let id = await AsyncStorage.getItem('id');

  if (id === null) {
    await AsyncStorage.setItem('id', '0');
    id = 0;
  }
  id = parseInt(id) + 1;
  await AsyncStorage.setItem('id', id.toString());

  const date = getISO8601Date();
  pendingTxs[id] = [date, amount, new Date(), type];
  await AsyncStorage.setItem('pendingTxs', JSON.stringify(pendingTxs));
  updatePendingTxs(
    setPayable,
    setBalance,
    setPendingList,
    pendingList,
    setSettledList,
  );
}

export async function handleCancelPending(
  pendingIdx: number,
  refund: boolean,
  setPayable,
  setBalance,
  setPendingList,
  pendingList,
) {
  let indexToRemove = -1;
  let tmpPendingList = JSON.parse(JSON.stringify(pendingList));
  console.log(tmpPendingList);
  for (let i = 0; i < tmpPendingList.length; i++) {
    if (tmpPendingList[i][2] === pendingIdx) {
      if (refund) {
        // Transaction
        if (tmpPendingList[i][4] == 0) {
          console.log('zxczczxczxczxczxczxczxcxzc');
          setBalance(val => val + parseFloat(tmpPendingList[i][1]));
          let credit: string | null = await AsyncStorage.getItem('credit');
          const newCredit =
            parseFloat(credit) + parseFloat(tmpPendingList[i][1]);
          AsyncStorage.setItem('credit', newCredit.toFixed(2));
          setBalance(newCredit.toFixed(2));
        }
        // Payment
        else {
          console.log('qweqweqweqweqweqweqeqwe');
          setPayable(val => val + parseFloat(tmpPendingList[i][1]));
          let payable: string | null = await AsyncStorage.getItem('payable');
          const newPayable =
            parseFloat(payable) + parseFloat(tmpPendingList[i][1]);
          AsyncStorage.setItem('payable', newPayable.toFixed(2));
          setPayable(newPayable.toFixed(2));
        }
      }
      indexToRemove = i;
      break;
    }
  }

  if (indexToRemove !== -1) {
    tmpPendingList.splice(indexToRemove, 1);
  }

  setPendingList(tmpPendingList);
  const pendingTxs = JSON.parse(await AsyncStorage.getItem('pendingTxs'));

  if (pendingTxs.hasOwnProperty(pendingIdx)) {
    delete pendingTxs[pendingIdx];
  } else if (pendingTxs.hasOwnProperty(pendingIdx.toString())) {
    delete pendingTxs[pendingIdx.toString()];
  }
  await AsyncStorage.setItem('pendingTxs', JSON.stringify(pendingTxs));
}

import {Dimensions, StyleSheet} from 'react-native';
import {COLOR} from './helpers/constants';
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.background,
    flexDirection: 'column',
    // height: Dimensions.get('window').height,
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'flex-end',
  },
  middleContainer: {
    padding: 16,
    flex: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  cardButtonContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  creditCardContainer: {
    padding: 16,
    marginTop: 16,
    width: Dimensions.get('window').width * 0.8,
    backgroundColor: COLOR.secondary,
    borderColor: COLOR.ascent,
    borderWidth: 1,
    borderRadius: 8,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  settledContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  pendingContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  pendingTextContainer: {
    paddingTop: 16,
    paddingBottom: 16,
    flex: 10,
    width: Dimensions.get('window').width * 0.8,
  },
  settledTextContainer: {
    paddingTop: 16,
    paddingBottom: 16,
    flex: 10,
    width: Dimensions.get('window').width * 0.8,
  },
  settledList: {
    padding: 16,
    marginTop: 16,
    width: Dimensions.get('window').width * 0.8,
    backgroundColor: COLOR.secondary,
    borderColor: COLOR.ascent,
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  pendingList: {
    padding: 16,
    marginTop: 16,
    width: Dimensions.get('window').width * 0.8,
    backgroundColor: COLOR.secondary,
    borderColor: COLOR.ascent,
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  gfIcon: {
    resizeMode: 'contain',
    width: 200,
    height: 200,
  },
  iconTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  txListStyle: {
    flexDirection: 'row',
    padding: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLOR.background,
    width: '105%',
    borderRadius: 4,

    height: 75,
    marginBottom: 8,
    marginTop: 8,
    borderColor: COLOR.ascent,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  simulateContainer: {
    backgroundColor: COLOR.ascent,
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.6,
    shadowRadius: 5,
    elevation: 5,
    marginTop: 8,
    marginBottom: 8,
    alignItems: 'center',
    minWidth: '70%',
  },
  cancelContainer: {
    backgroundColor: COLOR.ascent,
    padding: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 5,
  },
  leftTextContainer: {
    height: '100%',
    justifyContent: 'space-between',
  },
  rightTextContainer: {
    height: '100%',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
});
export default styles;

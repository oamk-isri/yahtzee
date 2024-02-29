import { StyleSheet } from 'react-native';
import {
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  BUTTON_TEXT,
} from '../components/Constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  innerContainer: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 15,
  },
  header: {
    backgroundColor: SECONDARY_COLOR,
    flexDirection: 'row',
  },
  footer: {
    // marginTop: 20,
    backgroundColor: SECONDARY_COLOR,
    flexDirection: 'row'
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 23,
    textAlign: 'center',
    margin: 10,
  },
  bigText: {
    //color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 50
  },
  author: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
  },
  gameboard: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  gameinfo: {
    backgroundColor: '#fff',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: "center",
    fontSize: 20,
    marginTop: 10
  },
  row: {
    marginTop: 20,
    padding: 10
  },
  flex: {
    flexDirection: "row"
  },
  button: {
    margin: 30,
    flexDirection: "row",
    padding: 10,
    backgroundColor: PRIMARY_COLOR,
    width: 150,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: BUTTON_TEXT,
    fontSize: 20
  },
  inputField: {
    textAlign: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: SECONDARY_COLOR,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
  },
  statusText: {
    textAlign: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: SECONDARY_COLOR,
    borderRadius: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 17,
    marginTop: 10,
  }
});
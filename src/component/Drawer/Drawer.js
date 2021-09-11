import React from 'react';
import {
  View,
  Image,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './Styles';

class DrawerBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    }
  }

  componentWillMount() { 
    const {navigation} = this.props
  }

  goMainHome = () => {
    this.toggleDrawer();
    Actions.NovusHomePage();
  }

  toggleDrawer = () => {
    Actions.drawerToggle();
  }

  render() {

    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
        <View style={styles.mainContainer}>
          <ScrollView>
            <View>
              <TouchableOpacity onPress={Actions.Home}>
                <View style={styles.drawerView}>
                  <Image
                    style={styles.inputIcon}
                  //  source={homeIcon}
                    resizeMode="contain"
                  />
                  <Text style={styles.drawerText}> Dashboard</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={Actions.Listing}>
                <View style={styles.drawerView}>
                  <Image
                    style={styles.inputIcon}
                    source={{uri:"https://png.pngtree.com/png-clipart/20191120/original/pngtree-location-icon-png-image_5054141.jpg"}}
                    resizeMode="contain"
                  />
                  <Text style={styles.drawerText}> Listing</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={styles.drawerView}>
                  <Image
                    style={styles.inputIcon}
                    // source={homeIcon}
                    resizeMode="contain"
                  />
                  <Text style={styles.drawerText}> Booking</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={styles.drawerView}>
                  <Image
                    style={styles.inputIcon}
                    // source={homeIcon}
                    resizeMode="contain"
                  />
                  <Text style={styles.drawerText}> Messages</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity>
                <View style={styles.drawerView}>
                  <Image
                    style={styles.inputIcon}
                    // source={homeIcon}
                    resizeMode="contain"
                  />
                  <Text style={styles.drawerText}> Training</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={styles.drawerView}>
                  <Image
                    style={styles.inputIcon}
                    // source={homeIcon}
                    resizeMode="contain"
                  />
                  <Text style={styles.drawerText}> Reports</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={Actions.Settings}>
                <View style={styles.drawerView}>
                  <Image
                    style={styles.inputIcon}
                    // source={homeIcon}
                    resizeMode="contain"
                  />
                  <Text style={styles.drawerText}> Settings</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={styles.drawerView}>
                  <Image
                    style={styles.inputIcon}
                    // source={homeIcon}
                    resizeMode="contain"
                  />
                  <Text style={styles.drawerText}> Notification</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={styles.drawerView}>
                  <Image
                    style={styles.inputIcon}
                    // source={homeIcon}
                    resizeMode="contain"
                  />
                  <Text style={styles.drawerText}> Log Out</Text>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    );
  }
};

DrawerBar.propTypes = {}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerBar);
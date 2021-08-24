package com.btbnative;

import com.facebook.react.ReactActivity;
import java.util.List;
import java.util.Arrays;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.react.ReactPackage;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is
   * used to schedule rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "btbNative";
  }

  protected List<ReactPackage> getPackages() {
    return Arrays.<ReactPackage>asList(new RNDeviceInfo(), // <------ add here
        new MainReactPackage());
  }
}

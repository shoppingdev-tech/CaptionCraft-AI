package com.welcome.emojitranslate

import android.os.Bundle
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import com.zoontek.rnbootsplash.RNBootSplash // <-- add this

class MainActivity : ReactActivity() {

    override fun getMainComponentName(): String = "excusemeai"

    override fun createReactActivityDelegate(): ReactActivityDelegate =
        DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)

    override fun onCreate(savedInstanceState: Bundle?) {
               RNBootSplash.init(this, R.style.BootTheme) 

        super.onCreate(null) // null is needed when using react-native-screens
    }
}

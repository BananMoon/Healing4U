package com.example.myapp2

import android.net.Uri
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.widget.TextView
import com.google.firebase.dynamiclinks.ktx.dynamicLinks
import com.google.firebase.ktx.Firebase
import retrofit2.Call
import retrofit2.http.*

class ViewActivity : AppCompatActivity() {
    companion object {
        val TAG = "ViewActivity"
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_view)
        Log.w("테스트4","테스트4")

        Firebase.dynamicLinks
            .getDynamicLink(intent)
            .addOnSuccessListener(this) { pendingDynamicLinkData ->
                var deeplink: Uri? = null
                if(pendingDynamicLinkData != null) {
                    deeplink = pendingDynamicLinkData.link
                    Log.w("테스트1","테스트1")
                }

                if(deeplink != null) {
                    val tvDeepLinkContent = findViewById<TextView>(R.id.tv_deeplink_content)
                    tvDeepLinkContent.text = deeplink.toString()    // deeplink 주소 받아서 string으로
                    Log.w("테스트2","테스트2")
                }
                else {
                    Log.d(TAG, "getDynamicLink: no link found")
                }
            }
            .addOnFailureListener(this) { e -> Log.w(TAG, "getDynamicLink:onFailure", e) }
    }
}





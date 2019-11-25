package com.archy.intent_launcher;

import android.content.Intent;
import android.content.pm.PackageManager;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;

public class IntentModule extends ReactContextBaseJavaModule {
    private static final String ACTIVITY_NOT_FOUND = "ACTIVITY NOT FOUND";

    private final ReactApplicationContext reactContext;

    public IntentModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "IntentLauncher";
    }

    @ReactMethod
    public void sendMail(ReadableMap params, Promise promise) {
    }

    @ReactMethod
    public void sendSms(ReadableMap params, Promise promise) {
    }

    @ReactMethod
    public void sendPhoneCall(String phoneNumber, Promise promise) {
    }

    @ReactMethod
    public void isAppInstalled(String appId, Promise promise) {
        try {
            reactContext.getPackageManager().getPackageInfo(appId, 0);
            promise.resolve(true);
        } catch (PackageManager.NameNotFoundException e) {
            promise.reject(ACTIVITY_NOT_FOUND, e);
        }
    }

    @ReactMethod
    public void openApp(ReadableMap params, Promise promise) {
    }

    @ReactMethod
    public void openSettings(String screenId, Promise promise) {
        Intent settingsIntent = new Intent(screenId);
        if (settingsIntent.resolveActivity(reactContext.getPackageManager()) != null) {
            reactContext.startActivity(settingsIntent);
            promise.resolve(true);
        } else {
            promise.reject(ACTIVITY_NOT_FOUND, screenId);
        }
    }

    @ReactMethod
    public void openAppWithResult(ReadableMap params, Promise promise) {
    }
}

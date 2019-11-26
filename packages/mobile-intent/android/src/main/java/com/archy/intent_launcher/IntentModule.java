package com.archy.intent_launcher;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;

import java.util.ArrayList;
import java.util.List;

public class IntentModule extends ReactContextBaseJavaModule {
    private static final String ACTIVITY_NOT_FOUND = "E_ACTIVITY_NOT_FOUND";
    private static final int MODULE_REQUEST_CODE = 42;

    private Promise activityResultPromise;

    IntentModule(ReactApplicationContext reactContext) {
        super(reactContext);
        reactContext.addActivityEventListener(new BaseActivityEventListener() {
            @Override
            public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
                if (activityResultPromise != null) {
                    if (requestCode == MODULE_REQUEST_CODE && resultCode == Activity.RESULT_OK && data != null) {
                        WritableMap resultMap = new WritableNativeMap();
                        resultMap.putString("data", data.getDataString());
                        if (data.getExtras() != null) {
                            resultMap.putMap("extras", Arguments.fromBundle(data.getExtras()));
                        }
                        activityResultPromise.resolve(resultMap);
                    } else {
                        activityResultPromise.resolve(null);
                    }

                    activityResultPromise = null;

                }
            }
        });
    }

    @Override
    public String getName() {
        return "IntentLauncher";
    }

    @ReactMethod
    public void sendMail(ReadableMap params, Promise promise) {
        ReadableArray emails = params.getArray("emails");
        String subject = params.getString("subject");
        String body = params.getString("body");
        ReactApplicationContext applicationContext = getReactApplicationContext();

        Intent intent = new Intent(Intent.ACTION_SENDTO);
        intent.setData(Uri.parse("mailto:"));
        if (emails != null && emails.size() > 0) {
            intent.putExtra(Intent.EXTRA_EMAIL, this.convertToStringArray(emails));
        }
        intent.putExtra(Intent.EXTRA_SUBJECT, subject);
        intent.putExtra(Intent.EXTRA_TEXT, body);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);

        if (intent.resolveActivity(applicationContext.getPackageManager()) != null) {
            applicationContext.startActivity(intent);
            promise.resolve(true);
        } else {
            promise.reject(ACTIVITY_NOT_FOUND, "E-Mail app doesn't installed");
        }
    }

    @ReactMethod
    public void sendSms(ReadableMap params, Promise promise) {
        String phoneNumber = params.getString("phoneNumber");
        String smsBody = params.getString("smsBody");
        ReactApplicationContext applicationContext = getReactApplicationContext();

        Intent intent = new Intent(Intent.ACTION_SENDTO);
        intent.setData(Uri.parse("smsto:" + (phoneNumber == null ? "" : phoneNumber.trim())));
        intent.putExtra("sms_body", smsBody);

        if (intent.resolveActivity(applicationContext.getPackageManager()) != null) {
            applicationContext.startActivity(intent);
            promise.resolve(true);
        } else {
            promise.reject(ACTIVITY_NOT_FOUND, "SMS app doesn't installed");
        }
    }

    @ReactMethod
    public void sendPhoneCall(String phoneNumber, Promise promise) {
        ReactApplicationContext applicationContext = getReactApplicationContext();
        Intent intent = new Intent(Intent.ACTION_DIAL);
        intent.setData(Uri.parse("tel:" + phoneNumber));

        if (intent.resolveActivity(applicationContext.getPackageManager()) != null) {
            applicationContext.startActivity(intent);
            promise.resolve(true);
        } else {
            promise.reject(ACTIVITY_NOT_FOUND, "Dialer app doesn't installed");
        }
    }

    @ReactMethod
    public void isAppInstalled(String appId, Promise promise) {
        if (this.getAppIntent(appId) != null) {
            promise.resolve(true);
        } else {
            promise.reject(ACTIVITY_NOT_FOUND, appId);
        }
    }

    @ReactMethod
    public void openApp(ReadableMap params, Promise promise) {
        String appId = params.getString("appId");

        Intent intent = this.getAppIntent(appId);
        if (intent == null) {
            promise.reject(ACTIVITY_NOT_FOUND, appId);
            return;
        }

        intent.addCategory(Intent.CATEGORY_LAUNCHER);
        if (params.hasKey("extras") && params.getMap("extras") != null) {
            ReadableMap extras = params.getMap("extras");
            intent.putExtras(Arguments.toBundle(extras));
        }
        getReactApplicationContext().startActivity(intent);
        promise.resolve(true);
    }

    @ReactMethod
    public void openSettings(String screenId, Promise promise) {
        Intent settingsIntent = new Intent(screenId);
        ReactApplicationContext applicationContext = getReactApplicationContext();
        if (settingsIntent.resolveActivity(applicationContext.getPackageManager()) != null) {
            applicationContext.startActivity(settingsIntent);
            promise.resolve(true);
        } else {
            promise.reject(ACTIVITY_NOT_FOUND, screenId);
        }
    }

    @ReactMethod
    public void openAppWithResult(ReadableMap params, Promise promise) {
        Activity currentActivity = getCurrentActivity();
        if (currentActivity == null) {
            promise.reject(ACTIVITY_NOT_FOUND, "React activity has destroyed");
            return;
        }

        String action = params.getString("action");
        String data = params.getString("data");

        Intent intent = new Intent(action, Uri.parse(data));
        if (params.hasKey("extras") && params.getMap("extras") != null) {
            ReadableMap extras = params.getMap("extras");
            intent.putExtras(Arguments.toBundle(extras));
        }
        activityResultPromise = promise;
        currentActivity.startActivityForResult(intent, MODULE_REQUEST_CODE);
    }

    private Intent getAppIntent(String packageName) {
        return getReactApplicationContext().getPackageManager().getLaunchIntentForPackage(packageName);
    }

    private String[] convertToStringArray(ReadableArray readableArray) {
        List<String> strings = new ArrayList<>(readableArray.size());
        for (int i = 0; i < readableArray.size(); i++) {
            strings.add(readableArray.getString(i));
        }
        return strings.toArray(new String[0]);
    }
}

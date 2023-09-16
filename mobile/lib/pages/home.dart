import 'dart:convert';

import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:get_storage/get_storage.dart';
import 'package:mobile/api/api.dart';
import 'package:mobile/pages/login.dart';

class Home extends StatefulWidget {
  const Home({super.key});

  @override
  State<Home> createState() => _HomeState();
}

class _HomeState extends State<Home> {
  late FirebaseMessaging messaging;

  void handleToken() async {
    final box = GetStorage();

    // Fetch the FCM token.
    String? tokenValue;
    try {
      tokenValue = await messaging.getToken();
    } catch (e) {
      print("Error fetching FCM token: $e");
      return;
    }

    // Store the FCM token in GetStorage.
    await box.write('fcm_token', tokenValue);

    // Fetch stored token from backend.
    Map<String, dynamic>? tokenFromDB;
    try {
      tokenFromDB = await Api().getFCMtoken();
    } catch (e) {
      print("Error fetching FCM token from database: $e");
      return;
    }
    print("token value: $tokenValue");
    // If the tokens do not match, update the backend.
    if (tokenValue != null &&
        tokenFromDB != null &&
        tokenFromDB["fcm_token"] != tokenValue) {
      print("token not matching");
      try {
        final response = await Api().updateFCMRequest(token: tokenValue);
        if (response != null) {
          print("fcm updated");
        }
      } catch (e) {
        print("Error updating FCM token in database: $e");
      }
    }

    final user = box.read('user');
  }

  @override
  void initState() {
    super.initState();
    messaging = FirebaseMessaging.instance;
    handleToken();
    messaging.onTokenRefresh.listen((event) {
      print("token refresh");
      print(event);
    });

    FirebaseMessaging.onMessage.listen((RemoteMessage event) {});
    FirebaseMessaging.onMessageOpenedApp.listen((message) {
      print('Message clicked!');
      print(message.notification!.body);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: TextButton(
            onPressed: () {
              // navigate to login page
              Get.to(
                () => const Login(),
                transition: Transition.fadeIn,
              );
            },
            child: const Text("Login")),
      ),
    );
  }
}

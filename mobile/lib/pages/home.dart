import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:get_storage/get_storage.dart';
import 'package:mobile/pages/login.dart';

class Home extends StatefulWidget {
  const Home({super.key});

  @override
  State<Home> createState() => _HomeState();
}

class _HomeState extends State<Home> {
  late FirebaseMessaging messaging;

  @override
  void initState() {
    super.initState();
    messaging = FirebaseMessaging.instance;
    messaging.getToken().then((value) async {
      // store this token in box storage
      final box = GetStorage();
      print("fcm token");
      print(value);
      await box.write('fcm_token', value);
    });
    FirebaseMessaging.onMessage.listen((RemoteMessage event) {});
    FirebaseMessaging.onMessageOpenedApp.listen((message) {});
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

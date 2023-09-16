import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:mobile/pages/login.dart';

class Home extends StatefulWidget {
  const Home({super.key});

  @override
  State<Home> createState() => _HomeState();
}

class _HomeState extends State<Home> {
  @override
  Widget build(BuildContext context) {
    return  Scaffold(
      body: Center(
        child: TextButton(onPressed: () {
          // navigate to login page
          Get.to(
            () => const Login(),
            transition: Transition.fadeIn,

          );
        }, child: const Text("Login")),
      ),
    );
  }
}

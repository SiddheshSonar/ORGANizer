import 'package:dio/dio.dart';
// import 'dart:math';

import 'package:flutter/foundation.dart';

class Api {
  final Dio _dio = Dio();

  // static var baseURL = "http://127.0.0.1:5000/";
  static var baseURL = "http://10.0.2.2:5000/api/";

  // endpoints:
  // static final storiesCount = "${baseURL}get_story_count";
  static final login = "${baseURL}auth/mlogin";

  void setBaseURL(String url) {
    baseURL = url;
  }

  Future<Map<String, dynamic>> loginRequest({
    required String email,
    required String password,
    required String token
  }) async {
    try {
      final response = await _dio.post(
        login,
        data: {
          'email': email,
          'password': password,
          'fcm_token': token
        },
      );
      // print("login resp: ${response.data}");
      return response.data;
    } catch (e) {
      if (kDebugMode) print("login err: $e");
      return {}; // You can handle error cases as needed
    }
  }

  // Future<int> getStoryCount() async {
  //   try {
  //     final response = await _dio.get(storiesCount);
  //     final Map data = response.data;
  //     return data['count'] ?? 0;
  //   } catch (e) {
  //     return 0;
  //   }
  // }

  // Future<dynamic> getStory(int n) async {
  //   try {
  //     // base url is the url of the server
  //     // print("getStory: $baseURL");
  //     // final response = await _dio.get("$getNstories?n=$n");
  //     final response = await _dio.get("${baseURL}get_n_stories?n=$n");
  //     Map data = response.data;
  //     List<dynamic> stories = data['stories'];
  //     // sort the stories by the id in desc order in the individual objects
  //     stories.sort((a, b) => b['id'].compareTo(a['id']));
  //     // print(data['stories']);
  //     return stories ?? [];
  //   } catch (e) {
  //     return [];
  //   }
  // }

  // Future<Map<String, dynamic>> getFollowupResponse({
  //   required int storyId,
  //   required String question,
  // }) async {
  //   final sessionId = _generateRandomSessionId();
  //   try {
  //     final response = await _dio.get(
  //       "${baseURL}get_followup",
  //       queryParameters: {
  //         'session_id': sessionId,
  //         'story_id': storyId,
  //         'question': question,
  //       },
  //     );
  //     return response.data;
  //   } catch (e) {
  //     return {'response': '', 'audio': ''};
  //   }
  // }

  // Future<Map<String, dynamic>> createStory({
  //   required String topic,
  // }) async {
  //   try {
  //     final response = await _dio.get(
  //       "${baseURL}generate",
  //       queryParameters: {
  //         'topic': topic,
  //       },
  //     );
  //     print("story gen resp: ${response.data}");
  //     return response.data;
  //   } catch (e) {
  //     if (kDebugMode) print("story gen err: $e");
  //     return {}; // You can handle error cases as needed
  //   }
  // }

  // int _generateRandomSessionId() {
  //   final random = Random();
  //   return random.nextInt(900000) + 100000; // Generates a 6-digit random number
  // }
}

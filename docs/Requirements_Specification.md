## 5.0	Requirements Specification

## 5.1	Introduction

This Software Requirements Specification (SRS) documents the requirements for a mobile application called Reppy. Reppy is an application that lets its user to follow the restaurant reviews of only family, friends or anyone of user’s choosing. The app has three pages: Home, Profile and Search. In the Home page, users will be able to browse reviews of restaurant that reviewed by people they are following. The Profile page will contain the user’s own reviews, number of posts, number of followers and number of people the user is following. The Search will let users to find family, friends or people users would like to follow.

Reppy system architecture is comprised of  two layers. The first is the client(Ionic), and the second is the server(Firebase). On the client side there is an Angular fire layer which interacts with Firebase and acts as a service layer for the application. It is this layer that gives the power to keep the data in sync between the server (Firebase) and the client.

<p align="center">
	<img src="../resources/architecture.png" alt="High-Level Diagram of System">
</p>

## Outline of Requirements Specifications
- 5.2	CSCI Component Breakdown
- 5.3	Functional Requirements by CSC
- 5.4	Performance Requirements by CSC
- 5.5	Project Environment Requirements
	- 5.5.1	Development Environment Requirements
	- 5.5.2	Execution Environment Requirements


  ### 5.2 	CSCI Component Breakdown
  - 5.2.1		Reppy Frontend CSC -- GUI components that the user will interact with
  	- 5.2.1.1		Login Page CSU -- modules for accessing the system
  		- 5.2.1.1.1	Login input module -- input fields for user credentials
  		- 5.2.1.1.2	Login button module -- buttons to submit inputs to server
  		- 5.2.1.1.3	Post New Restaurant Review module --
  			- 5.2.1.1.3.1	Input fields for pictures and comments
  			- 5.2.1.1.3.2	Submission
  		- 5.2.1.1.4	Delete Post module --
  	- 5.2.1.2		Home Page CSU -- page that browses other users' posts
  	- 5.2.1.3		Profile CSU -- page that browses the user's own posts
  	- 5.2.1.4		Search CSU -- modules for searching other users
  		- 5.2.1.5.1	Search bar module -- input fields for user searches
  	- 5.2.1.6		Settings CSU -- modules for configuring user settings for the mobile app
  		- 5.2.1.6.1	Notifications CSU -- modules for handling notifications from the mobile app
  	- 5.2.1.7		Troubleshoot CSU -- modules for troubleshooting the system

  - 5.2.2		Firebase CSC -- server components that will host the Frontend

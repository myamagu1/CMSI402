## 5.0	Requirements Specification

## 5.1	Introduction

This Software Requirements Specification (SRS) documents the requirements for a mobile application called Reppy. Reppy is an application that lets its user to follow the restaurant reviews of only family, friends or anyone of user’s choosing. The app has three pages: Home, Profile and Search. In the Home page, users will be able to browse reviews of restaurant that reviewed by people they are following. The Profile page will contain the user’s own reviews, number of posts, number of followers and number of people the user is following. The Search will let users to search family, friends or people users would like to follow.

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

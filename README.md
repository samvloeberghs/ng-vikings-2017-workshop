# Ionic 2 w/ Firebase

( this is part 2 - connecting firebase )

This is the project for the Ionic 2 w/ Firebase ngVikings 2017 workshop.
It is based on the [Ionic 2 Conference application starter](https://github.com/driftyco/ionic-conference-app)

## Content

1. Starting with Ionic 2
2. Connecting Firebase
3. Working offline in the browser
4. Moving to a progressive web app

### Goal of the application

We will build a basic conference application that shows the schedule of ngVikings 2017 coming from a Firebase real-time database.

The application will be served as a progressive web-app that can ben installed to the home-screen of the user.

It will fetch the necesarry data and save it to make sure that the user can check the schedule, even when he is offline.
 
## Starting with Ionic 2

To start this part of the workshop, checkout the `part-1` "starting with ionic2" branch.

During this part of the workshop we will briefly go trough the abilities of Ionic 2 by browsing the documentation and exploring the basic elements and features.

Your part will be to clone the application and setup the basic elements we will need to visualize the speaker list and schedule.

## Connecting Firebase

To start this part of the workshop, checkout the `part-2` "connecting firebase" branch.

Next up is showing how we can connect to the real-time database and hosting of Firebase and show the schedule and speaker list of the conference.

Your part will be to import the initial data to your Firebase container and connect it to your running application, showing the dynamic data.

## Working offline in the browser

To start this part of the workshop, checkout the `part-3` "working offline" branch.

The user should be able to see the speaker list and schedule at all times, even when he is offline.

We'll guide you trough a strategy to be cache the data and make the application available offline.

## Moving to a progressive web app

To start this part of the workshop, checkout the `part-4` "moving to pwa" branch.

We won't be building this application for deployment as a mobile app, but we will be serving it as a mobile web-app.

You will need to setup the correct configurations to make sure that the user can install the app to his or her homescreen.
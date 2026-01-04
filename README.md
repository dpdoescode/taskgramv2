# Web Development Final Project - *TaskGram*

Submitted by: **Diego Perez-Aguilar**

This web app: **TaskGram is designed to combine discipline with entertainment, personalizing task management is meant to help associate being held accountable as a fun way to positively-challenge friends.**

Time spent: **40** hours spent in total

## Video Walkthrough

Here's a walkthrough of implemented TaskGram:

[![Video Walkthrough](https://img.youtube.com/vi/gxcz9q1kpDQ/0.jpg)](https://youtu.be/gxcz9q1kpDQ)


## Required Features

The following required functionality is completed:

[X] Web app includes a create form that allows the user to create posts

Form requires users to add a post title

Forms have the option for users to add:

additional textual content

an image added as an external image URL

Only authenticated users may create posts

[X] Web app includes a home feed displaying previously created posts

Web app includes a home feed displaying all previously created posts

By default, each post on the posts feed shows:

creation time

title

upvotes count

Clicking on a post directs the user to a dedicated post detail page

[X] Users can view posts in different ways

Users can sort posts by either:

creation time

upvotes count

Users can search for posts by title

[X] Users can interact with each post in different ways

The app includes a separate post page for each created post, displaying:

full post content

image (if provided)

comments section

Authenticated users can leave comments underneath a post

Each post includes an upvote button

Each click increases the post's upvotes count by one

Users can upvote any post any number of times

[X] A post that a user previously created can be edited or deleted

Users can edit posts they previously created

Users can delete posts they previously created

Edit/delete controls are restricted to the post author

The following additional features are implemented:

[X] Google Authentication

Users can log in via Supabase Auth using Google

Session is persisted across browser refreshes

[X] Profiles Page

Automatic profile creation (username and avatar) on first login

Profiles are stored in the database and displayed alongside user activity

[X] Create Event Feature

Dedicated page for creating events associated with the user

[X] Comment System with Full CRUD & Voting

Users can create, edit inline, and delete their own comments

Integrated upvote/downvote system for comments

[X] Security & Data Integrity

Row Level Security (RLS) enabled on all tables

Foreign key constraints enforce relational integrity

🚀 Next Steps / Future Enhancements
Camera Integration: Capture and upload photos directly from the device.

Public Deployment: Full Google OAuth for public access.

Gamification: Implementation of the Streak System and Leaderboard.

Social Features: Friendship System to enable personalized feeds.

Advanced Filtering: Filter by category, tags, or specific users.

## License

    Copyright 2025 Diego Perez-Aguilar

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
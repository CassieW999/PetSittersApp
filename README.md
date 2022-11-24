# PetSittersApp

## Team Member

Huajuan Chen, Chen Yang, Luhan Wen

## Introduction

The aim of the App is for people to look for a pet sitter or volunteer to be a sitter. For example, a pet owner can create a post to look for a pet sitter when he/she is unavailable to take care of his/her dog. The user can create a post in the petsitting-in-need list and wait for someone to contact him/her, or the user could look for the suitable pet sitter on the pet sitter screen list.

## Target Users

- Someone who needs a pet sitter
- someone who want to be a pet sitter

## Screens

- **Home**: user could switch identity as a pet owner or pet sitter to see posts

- **Profile**: user’s information such as username, location, etc.
- **Notification**: user will be notified when the pet sitter is interested in the post
- **Create Post**: user could create a post for looking for a pet sitter or being a pet sitter
- **Post Detail**: information of the post such as time duration, location, identity, type of pet, etc.
- **To-Do List**: user could add any scheduled event of the pet sitter as a reminder
- **Add Todo**: information of todo event such as time, location, description, etc.

## Progress & Contributions

### Huajuan Chen

- Implemented home screen to show post list
- Implemented PostCreate Screen to allow user to create a post and wrote data to Firebase
- Impletemented PostDetail Screen to display all the detail of post, including pet sitter date, location, pet type and post description etc. Also it allowed user to click the Accept button to update Firebase information that marked it to show in todo list
- Implemented and design a PostItem component of post list

### Chen Yang

- Built and implemented the overal structure of 6 screens including Home, CreatePost, PostDetail, Notification and Profile.
- Built the UI design and different header for different screens.
- Designed and implemented the tab-navigation of Home, Todo, Notification and Profile and implemented the navigation inside these main screens.
- Modified and added screensshots to readme.md.

### Luhan Wen

- implemented authentification features such as login, regitster and signout
- implemented the todolist tab to filter by my related posts as owner or sitter
- implemented the firebase set-up and basic CRUD operations
- implemented the initial readme.md

## Screenshots

### Home

![Home](https://github.com/CassieW999/PetSittersApp/blob/dev_chen/ScreenShots/Home.png?raw=true)

### CreatePost

![CreatePost](https://github.com/CassieW999/PetSittersApp/blob/dev_chen/ScreenShots/CreatePost.png?raw=true)

### PostDetais

![PostDetais](https://github.com/CassieW999/PetSittersApp/blob/dev_chen/ScreenShots/PostDetais.png?raw=true)

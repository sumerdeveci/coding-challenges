# Coding Challenges

This repository contains several of coding challenges that are done and submitted by Sümer Deveci. The challenges do not include hints regarding the companies that the challenges were completed for.

***IMPORTANT:*** You can download or clone the whole repository, and then you would need to start each project **individually**, including operations like installing packages (described in project READMEs), by going into the respective directories. And also extensive information regarding the project details and architecture are provided in the respective READMEs.

In this repository you can find the following challenges with the associated features:

## Find Dogs

### Tech Stack

**Language:** TypeScript
<br />**Testing:** Jest / React Testing Library
<br />**CSS-Precompilers:** Sass
<br />**Extra:** The project also includes image processing via Tensorflow and lazy loading of images. Also uses Bulma as a modular and fast Sass library

### Summary

Users can upload an image of a dog, and the picture is processed using tensorflow, getting a result regarding the species of the given dog. Then several images of the given dog species are fetched from an api, being returned to the user in an infinite-scroll approach with lazy loading. Loading and error states are handled in an esthetic fashion.

## Simple Checkout Form

### Tech Stack

**Language:** JavaScript
<br />**Testing:** Jest / React Testing Library
<br />**CSS-Precompilers:** Sass
<br />**Extra:** Uses Bulma as a modular and fast Sass library

### Summary
Users give out information, and proceeds to the next steps of the form. If the necessary information are not provided user cannot proceed. At the final step of the form the user is able to preview the information given, and his/her github profile photo. Step transitions are handled in an esthetic fashion.
# Coding Challenges

This repository contains several of coding challenges that are done and submitted by Sümer Deveci. The challenges **do not** include hints regarding the companies that the challenges were completed for.

In this repository you can find the following challenges with the associated features:

## Find Dogs

### Tech Stack

**Language:** TypeScript
<br />**Testing:** Jest / React Testing Library
<br />**CSS-Precompilers:** Sass
<br />**Extra:** The project also includes image processing via Tensorflow and lazy loading of images.

### Summary

Users can upload an image of a dog, and the picture is processed using tensorflow, getting a result regarding the species of the given dog. Then several images of the given dog species are fetched from an api, being returned to the user in an infinite-scroll approach with lazy loading. Loading and error states are handled in an esthetic fashion.
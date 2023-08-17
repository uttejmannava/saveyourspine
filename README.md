**save your spine: **
a little web app i made to make sure i remember HTML and CSS

- used React for the first time; state management, reusable components, overall more dynamic elements
- TensorFlow PoseNet model for pose estimation, which plots keypoints across the body; i monitored "good posture" by checking visiblity and slope of the two shoulder points
- first time doing client-side ML, and it was fairly smooth aside from the _little_ hiccup described below

**what can i fix**
- there's a memory leak somewhere and i'm quite confident it has to do with leftover variables from the running PoseNet model; still doing code reviews to figure this out, but i'm new 

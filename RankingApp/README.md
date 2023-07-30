This is a practice tutorial to make an API with C# and a front End utilizing React with JavaScript following [this video](https://www.youtube.com/watch?v=4RKuyp_bOhY) as a guide.

Bear in mind, the video does a poor job in one area, not explaining that a piece of CSS code is needed to get the dra-drop functionality to work.

The CSS code in question is:

```css
.rank-cell, .row-label {
    width: 80px;
    text-align: center;
    display: flex;
    align-items: center;
}

```
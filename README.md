# toastn
Toast notification JS library for seamless modern notification (10.69 KB)


# Version: 1.0.0

ToDo: i forgot to remove the -50% X translate from the success notification on hover


# Usage:
```html
<!-- First add a link to the important files -->
<link type="text/css" href="path/to/toastn.min.css" rel="stylesheet">
<script src="path/to/toastn.min.js"></script>

<!--
  might need to add defer for the script tag
  <script src="path/to/toastn.min.js" defer></script> 
-->
```

```js
/*
  Types:
    - SUCCESS  <- green indecator for successful operation
    - INFO     <- cyan indecator for information
    - WARNING  <- yellow indecator for warnings
    - ERROR    <- red indecator for errors
    - CUSTOM   <- Not that good yet (:
*/


// <message>, <second>

// simply do
new ToastN(ToastN.TYPE.SUCCESS).show("Hi!");

// or to add timed notification
new ToastN(ToastN.TYPE.SUCCESS).show("Hi!", 3);

// and to have same settings notification, do
toaster = new ToastN(ToastN.TYPE.SUCCESS);
toaster.show("I like my own library, Lol!", 1);
toaster.show("Time should be about 1-10", 10);
toaster.show("Higher n. of seconds will work", 999);
toaster.show("But there will be less frames (:");
```

# IMX Link Connect

IMX link can only be use on a webpack environment due to no dist file generated and privacy of the source code of https://www.npmjs.com/package/@imtbl/imx-sdk#1.14.1

## Installation
```npm install```

## Local development

```npm run dev```

Code is written in src/index.js

## Build for production

⚠️ Before production, you have to change line 24-26 like this : 

From : 
```html
<script type="text/javascript" src="http://127.0.0.1:5000/bundle.js"></script>
```

To : 
```html
<script type="text/javascript" src="./build/bundle.js"></script>
```


Then run : ```npm run build```


This will generate a bundle.js file in `build/` which contains everything needed to get the link sdk working.

This could be done during CI/CD.
import React from 'react';
// import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';

// 1. import `ChakraProvider` component
// import * as React from 'react';
import { ChakraProvider } from '@chakra-ui/react'
// import ReactDOM, { createRoot } from 'react-dom/client';
import ReactDOM from 'react-dom/client';

// const root = ReactDOM(document.getElementById('root'));
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// )

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// // reportWebVitals();

// import * as React from 'react'
// import ReactDOM from "react-dom/client";

// // 1. import `ChakraProvider` component
// import { ChakraProvider } from '@chakra-ui/react'
// import App from './App';

// const root = ReactDOM.createRoot(document.getElementById('root'))
// root.render(
//   <ChakraProvider>
//     <App />
//   </ChakraProvider>
// )
// // ReactDOM.render(
//   // <ChakraProvider>
//   //   <App />
//   // </ChakraProvider>,
// //   document.getElementById('root')
// // );



// // function Index() {
// //   // 2. Wrap ChakraProvider at the root of your app
// //   return (
// //     <ChakraProvider>
// //       <App />
// //     </ChakraProvider>
// //   )
// // }

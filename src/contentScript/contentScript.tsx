// // // TODO: content script
// import React, { useEffect, useState } from "react";
// import ReactDOM, { createRoot } from "react-dom/client";

// import "../popup/popup.css";

// const App: React.FC<{}> = () => {
//   const [height, setHeight] = useState(60);
//   const [srcLink, setSrcLink] = useState(
//     "https://www.youtube.com/embed/videoseries?fs=0&si=38bbqBSyot0tX0Ru&amp;list=PLF9mJC4RrjIhS4MMm0x72-qWEn1LRvPuW"
//   );
//   const [inputText, setInputText] = useState("");
//   return (
//     <div id="overlay-card" className="overlay-card">
//       <button
//         className="button-24"
//         role="button"
//         onClick={() => {
//           if(height === 60){
//             setHeight(400);
//           }else{
//             setHeight(60);
//           }
//           setSrcLink(
//             "https://www.youtube.com/embed/LvSuxW8uM_o?si=ozQzu3EpPiT0K54k?fs=0"
//           );
//         }}
//       >
//         Show
//       </button>
//       <input
//         className="input-box"
//         size={30}
//         placeholder="Please enter the video embed link here"
//         value={inputText}
//         onChange={(e) => setInputText(e.target.value)}
//       />
//       <iframe
//         id="myFrame"
//         width="400"
//         height={height}
//         src={srcLink}
//         title="YouTube video player"
//         frameBorder="0"
//         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//         // allowFullScreen
//       ></iframe>
//     </div>
//   );
// };

// // const root = ReactDOM.createRoot(document.getElementById("root"));
// // root.render(
// //   <React.StrictMode>
// //     <App />
// //   </React.StrictMode>
// // );

// const appContainer = document.createElement("div");
// if (!appContainer) {
//   throw new Error("Can't find appconatiner");
// }

// document.body.appendChild(appContainer);

// const root = createRoot(appContainer);
// root.render(<App />);

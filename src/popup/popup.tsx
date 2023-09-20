import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./popup.css";
import { Messages } from "../utils/messages";

const App: React.FC<{}> = () => {
  const [height, setHeight] = useState(50);
  const [srcLink, setSrcLink] = useState(
    "https://www.youtube.com/embed/videoseries?fs=0&si=38bbqBSyot0tX0Ru&amp;list=PLF9mJC4RrjIhS4MMm0x72-qWEn1LRvPuW"
  );
  const [inputText, setInputText] = useState("");

  const handleOverlayBtn = () => {
    chrome.tabs.query(
      {
        active: true,
      },
      (tabs) => {
        if (tabs?.length > 0) {
          chrome.tabs.sendMessage(tabs[0].id, Messages.TOGGLE_OVERLAY);
        }
      }
    );
  };

  return (
    <div style={{backgroundColor: "#181818"}}>
      <button
        className="button-24"
        role="button"
        onClick={() => {
          height === 400 ? setHeight(50) : setHeight(400);
          setSrcLink(
            "https://www.youtube.com/embed/LvSuxW8uM_o?si=ozQzu3EpPiT0K54k?fs=0"
          );
        }}
      >
        {height === 400 ? "Half" : "Full"}
      </button>
      <input
        className="input-box"
        size={30}
        placeholder="Please enter the video embed link here"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <button className="button-24" onClick={handleOverlayBtn} type="button">
        {" "}
        Pip{" "}
      </button>
      <iframe
        id="myFrame"
        width="400"
        height={height}
        src={srcLink}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        style={{borderRadius: ".5rem"}}
      ></iframe>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

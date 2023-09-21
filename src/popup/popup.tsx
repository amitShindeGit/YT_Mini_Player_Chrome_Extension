import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./popup.css";
import { Messages } from "../utils/messages";

const App: React.FC<{}> = () => {
  const [height, setHeight] = useState(50);
  const [srcLink, setSrcLink] = useState("");
  const [inputText, setInputText] = useState("");

  const handleOverlayBtn = () => {
    chrome.tabs.query(
      {
        active: true,

      },
      (tabs) => {
        if (tabs?.length > 0) {
          chrome.tabs.sendMessage(tabs[0].id, Messages.TOGGLE_OVERLAY);
          chrome.tabs.sendMessage(tabs[0].id, {"srcLink": srcLink});
        }
      }
    );
  };

  return (
    <div style={{ backgroundColor: "#181818", width: "25rem" }}>
      <button
        className="button-24"
        role="button"
        onClick={() => {
          height === 400 ? setHeight(50) : setHeight(400);
        }}
      >
        {height === 400 ? "Half" : "Full"}
      </button>
      <input
        className="input-box"
        size={32}
        placeholder="Please enter the youtube video embed link here"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && inputText?.length) {
            setSrcLink(inputText);
            setInputText("");
          }
        }}
      />
      <button className="button-24" onClick={handleOverlayBtn} type="button">
        {" "}
        Pip{" "}
      </button>
      {srcLink.length ? (
        <iframe
          id="myFrame"
          width="400"
          height={height}
          src={srcLink}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          style={{ borderRadius: ".5rem" }}
        ></iframe>
      ) : (
        <></>
      )}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

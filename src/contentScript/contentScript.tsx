// // TODO: content script
import React, { useEffect, useRef, useState } from "react";
import ReactDOM, { createRoot } from "react-dom/client";

import "./contentScript.css";
import { Messages } from "../utils/messages";

const App: React.FC<{}> = () => {
  const [height, setHeight] = useState(60);
  const [srcLink, setSrcLink] = useState("");
  const [inputText, setInputText] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const isClicked = useRef<boolean>(false);

  const [isActive, setIsActive] = useState(false);

  const coords = useRef<{
    startX: number;
    startY: number;
    lastX: number;
    lastY: number;
  }>({
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
  });

  useEffect(() => {
    chrome.runtime.onMessage.addListener((msg) => {
      if (msg === Messages.TOGGLE_OVERLAY) {
        setIsActive(!isActive);
      }

      if (msg?.srcLink?.length) {
        setSrcLink(msg?.srcLink);
      }
    });
  }, [isActive]);

  useEffect(() => {
    if (!boxRef.current || !containerRef.current) return;

    const box = boxRef.current;
    const container = containerRef.current;

    const onMouseDown = (e: MouseEvent) => {
      isClicked.current = true;
      coords.current.startX = e.clientX;
      coords.current.startY = e.clientY;
    };

    const onMouseUp = (e: MouseEvent) => {
      isClicked.current = false;
      coords.current.lastX = box.offsetLeft;
      coords.current.lastY = box.offsetTop;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isClicked.current) return;

      const nextX = e.clientX - coords.current.startX + coords.current.lastX;
      const nextY = e.clientY - coords.current.startY + coords.current.lastY;

      box.style.top = `${nextY}px`;
      box.style.left = `${nextX}px`;
    };

    box.addEventListener("mousedown", onMouseDown);
    box.addEventListener("mouseup", onMouseUp);
    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseleave", onMouseUp);

    const cleanup = () => {
      box.removeEventListener("mousedown", onMouseDown);
      box.removeEventListener("mouseup", onMouseUp);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseUp);
    };

    return cleanup;
  }, []);

  return (
    <div ref={containerRef} className="container-yt">
      <div
        ref={boxRef}
        id="overlay-card"
        className="overlay-card"
        style={{ backgroundColor: `${isActive ? "#181818" : ""}` }}
      >
        {isActive ? (
          <>
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
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

const appContainer = document.createElement("div");

if (!appContainer) {
  throw new Error("Can't find appconatiner");
}

document.body.appendChild(appContainer);

const root = createRoot(appContainer);
root.render(<App />);

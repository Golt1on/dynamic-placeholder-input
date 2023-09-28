import React, { useState, useEffect } from "react";

const placeholders = ["Playtime !", "Here we go!", "Start Journey!"];

const icons = [
  "/input-icons/gamepad.png",
  "/input-icons/start-game.png",
  "/input-icons/switch.png",
];

const DynamicInput = () => {
  const [icon, setIcon] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const [index, setIndex] = useState(0);
  const [writtenWord, setWrittenWord] = useState(0);
  const [isCompleted, setIsCompleted] = useState(true);

  useEffect(() => {
    const iconInterval = setInterval(() => {
      setIcon(icons[Math.floor(Math.random() * icons?.length)]);
    }, 1500);
    return () => clearInterval(iconInterval);
  }, []);

  useEffect(() => {
    if (writtenWord < placeholders[index].length) {
      const writeTimeout = setTimeout(() => {
        setPlaceholder(placeholder + placeholders[index][writtenWord]);
        setWrittenWord(writtenWord + 1);
      }, 150);
      return () => clearTimeout(writeTimeout);
    } else if (placeholder.length > 0 && isCompleted) {
      const completeTimeout = setTimeout(() => {
        setIsCompleted(false);
      }, 1000);
      return () => clearTimeout(completeTimeout);
    } else if (!isCompleted && placeholder.length > 0) {
      const deleteTimeout = setTimeout(() => {
        setPlaceholder(placeholder.slice(0, -1));
      }, 100);
      return () => clearTimeout(deleteTimeout);
    } else {
      const startTimeout = setTimeout(() => {
        setWrittenWord(0);
        setPlaceholder("");
        setIsCompleted(true);
        setIndex((index + 1) % placeholders.length);
      }, 250);
      return () => clearTimeout(startTimeout);
    }
  }, [writtenWord, index, placeholder, isCompleted]);

  return (
    <>
      <div className="container">
        <div className="input-input-wrapper">
          <div className="icon-wrapper">
            <div
              key={icon}
              className="icon"
              style={{
                backgroundImage: "url('" + icon + "')",
                backgroundPosition: "center center",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
          </div>
          <div className="input-wrapper">
            <input className="input" type="text" placeholder={placeholder} />
          </div>
          <div className="button-wrapper">
            <button>
              <img src="/input-icons/search.png" alt="" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DynamicInput;

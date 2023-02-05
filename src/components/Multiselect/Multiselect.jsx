import { useState } from "react";
import classes from "./Multiselect.module.scss";

function Multiselect({ values, setFilters }) {
  const [inputValue, setInputValue] = useState("");
  const [wordList, setWordList] = useState([]);

  const showHints = () => {
    if (inputValue.trim() === "" || /\W/g.test(inputValue)) return [];

    const regexp = new RegExp(inputValue, "i");
    return values.filter(el => {
      return el.match(regexp);
    });
  };

  return (
    <div className={classes.root}>
      <input
        className={classes.input}
        value={inputValue}
        type="text"
        onInput={event => {
          setInputValue(event.target.value);
        }}
      />
      <div className={classes.hints}>
        {showHints().map((item, index) => (
          <button
            key={index}
            onClick={() => {
              setInputValue("");
              setFilters(prev => {
                if (!prev.words.includes(item)) {
                  return { ...prev, words: [...prev.words, item] };
                }
                return prev;
              });
              setWordList(prev => {
                if (!prev.includes(item)) {
                  return [...prev, item];
                }
                return prev;
              });
            }}
            className={classes.button}
          >
            {item}
          </button>
        ))}
      </div>
      {wordList.map((item, index) => (
        <div key={index} className={classes["word-filter"]}>
          {item}
          <button
            className={classes["delete-button"]}
            onClick={() => {
              const spliceByIndex = array => {
                const wordIndex = array.indexOf(item);
                array.splice(wordIndex, 1);
              };

              setFilters(prev => {
                const newArray = [...prev.words];
                spliceByIndex(newArray);
                return { ...prev, words: newArray };
              });
              setWordList(prev => {
                const newArray = [...prev];
                spliceByIndex(newArray);
                return newArray;
              });
            }}
          ></button>
        </div>
      ))}
    </div>
  );
}

export default Multiselect;

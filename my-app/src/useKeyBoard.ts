import {useCallback, useEffect, useState} from "react";

function insertString(wholeString: string, insertString: string, pos: number) {
  return wholeString.slice(0, pos) + insertString + wholeString.slice(pos)
}

export function useKeyBoard(defaultText: string, defaultCaretPos: number): [string, number] {
  const [userText, setUserText] = useState(defaultText);
  const [caretPos, setCaretPos] = useState(defaultCaretPos);
  const handleUserKeyPress = useCallback(event => {
    const {key, keyCode} = event;
    if (keyCode === 32 || (keyCode >= 65 && keyCode <= 90)) {
      setUserText(prevUserText => insertString(prevUserText, key, caretPos));
      setCaretPos(prevCaretPos => prevCaretPos + 1);
    }
    if (keyCode === 8 && caretPos > 0) { // backspace
      setUserText(prevUserText => prevUserText.slice(0, caretPos - 1) + prevUserText.slice(caretPos));
      setCaretPos(prevCaretPos => Math.max(prevCaretPos - 1, 0));
    }
    const textLength = userText.length;
    if (keyCode === 37) { // ←
      setCaretPos(prevCaretPos => Math.max(prevCaretPos - 1, 0));
    }
    if (keyCode === 39) { // →
      setCaretPos(prevCaretPos => Math.min(prevCaretPos + 1, textLength));
    }
    if (keyCode === 27) { // ESC
      setUserText("");
      setCaretPos(0);
    }
  }, [setUserText, setCaretPos, userText, caretPos]);

  useEffect(() => {
    window.addEventListener('keyup', handleUserKeyPress);

    return () => {
      window.removeEventListener('keyup', handleUserKeyPress);
    };
  }, [handleUserKeyPress]);

  return [userText, caretPos];
}

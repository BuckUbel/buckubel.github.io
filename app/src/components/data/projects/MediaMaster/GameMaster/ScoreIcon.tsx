import React from 'react';
import styled from 'styled-components';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircle as faCircleRegular} from "@fortawesome/free-regular-svg-icons";
import {rgbToHex} from "../../../../helper/rgbToHex";

function getColorFromScore(score: number): string {
  const correctedScore = Math.min(100, Math.max(score, 0));
  let r = 255;
  let g = 0;
  if (score <= 50) {
    r = 255;
    g = (255 / 50) * correctedScore;
  }
  if (score > 50) {
    r = 510 + (-255 / 50) * correctedScore;
    g = 255;
  }
  return rgbToHex(Math.round(r), Math.round(g), 0);
}

interface ScoreIconProps {
  className?: string;
  score: number
}

function ScoreIcon({score}: ScoreIconProps) {
  if (score >= 0) {
    const scoreColor = getColorFromScore(score);
    return <span className="fa-layers fa-fw fa-2x" style={{color: scoreColor}}>
            <FontAwesomeIcon icon={faCircleRegular} size={"2x"}/>
            <span style={{marginLeft: "2px"}}>{score}</span>
          </span>
  }
  return null;
}

export default styled(ScoreIcon)``;

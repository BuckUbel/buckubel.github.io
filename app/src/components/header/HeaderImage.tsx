import * as React from "react";
import {CSSProperties} from "react";
import {useRouter} from "react-router-ts";
import {routes} from "../config/routes";
import startbanner from "../../images/banner1024.png"
import styled from "styled-components";
import {StyledCompProps} from "../helper/types";

function HeaderImage(props:StyledCompProps) {
  const router = useRouter();
  let style: CSSProperties = {};
  let imageString: string;
  let altString: string;
  switch (router.path) {
    case routes.default.href:
      imageString = startbanner;
      altString = "Buck Ubel Banner";
      break;
    default:
      imageString = startbanner;
      altString = "Buck Ubel Banner";
      break;

  }
  if (imageString) {
    style = {backgroundImage: "url(" + imageString + ")"}
  }
  return (
    <div className={props.className}>
      <img src={imageString} alt={altString}/>
      <div className="header-image-blur" style={style}/>
    </div>
  );
}

export default styled(HeaderImage)`

    text-align: center;
    width: 100%;
    height: 184px;

    @media (max-width: 1100px) {
        height: 140px;
    }

    @media (max-width: 900px) {
        height: 120px;
    }

    .header-image-blur {
        width: 100%;
        height: 184px;
        z-index: 0;
        display: none;
    }

    @media (min-width: 1174px) {
        .header-image-blur {
            display: block;
            filter: blur(8px);
            -webkit-filter: blur(8px);
            background-position: center;
            background-repeat: repeat;
            background-size: cover;
        }
    }

    img {
        display: inline-block;
        position: absolute;
        left: 0;
        right: 0;
        margin: auto;
        max-width: 100%;
        max-height: 184px;
        z-index: 2;
        filter: blur(0px);
        -webkit-filter: blur(0px);
    }
`;

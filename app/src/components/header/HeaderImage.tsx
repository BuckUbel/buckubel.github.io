import * as React from "react";
import {CSSProperties} from "react";
import {useRouter} from "react-router-ts";
import {routes} from "../config/routes";
import startbanner from "../../images/banner1024.png"
import '../../css/HeaderImage.css';

function HeaderImage() {
  const router = useRouter();
  let style: CSSProperties = {};
  let imageString:string;
  let altString:string;
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
    <div className="header-image">
      <img src={imageString} alt={altString}/>
      <div className="header-image-blur" style={style}/>
    </div>
  );
}

export default HeaderImage;

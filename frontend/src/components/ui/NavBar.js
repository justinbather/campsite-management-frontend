import React from "react";
import profilePic from "../../assets/orange-gradient.jpg";
import GradientButton from "./GradientButton";
import ProfileIcon from "./ProfileIcon";
import Logo from "../../assets/weCamp-favicon.png";
import { useNavigate } from "react-router-dom";
import { MEDIA_URL } from "../../constants";

const NavBar = (props) => {
  const navigate = useNavigate();
  /* 

Component Use

<NavBar showButton:true buttonText:str clickDestination:str (ex. "/park/parkId/") /> // Will show gradient button with custom text, when clicked is sent to park home
  or
<NavBar showTitle:true titleText:str titleImg:image /> Will Display title text (for park home pages) with logo

*/
  return (
    <div class="navbar bg-base-100 border-b border-neutral-content flex justify-between p-4">
      <div className="cursor-pointer" onClick={() => navigate("/park")}>
        <img src={Logo} className="w-20" />
        <p className="font-bold">WeCamp</p>
      </div>

      <div className="flex justify-center mr-36">
        {props.showButton && (
          <GradientButton
            buttonText={props.buttonText}
            clickDestination={props.clickDestination}
          />
        )}

        {props.showTitle && (
          <div className="flex flex-row justify-center items-center gap-3">
            <img className="max-h-10" src={props.titleImg}></img>
            <h1 className="font-5xl text-center justify-center">
              {props.titleText}
            </h1>
          </div>
        )}
      </div>
      <ProfileIcon />
    </div>
  );
};

export default NavBar;

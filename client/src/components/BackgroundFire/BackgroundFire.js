import React from "react";
import { useState, useEffect } from "react";
import BackgroundFireVideo from "./background fire pepe.mp4";
import "./BackgroundFire.css";
import { Fade, Grow, CardMedia } from "@mui/material";

const BackgroundFire = ({ isShown, id, doomFactor }) => {
  const [isShownBackgroundFireVideo, setIsShownBackgroundFireVideo] =
    useState(false);
  const [backgroundVideoFade, setBackgrounDireVideoFade] = useState(
    "background-fire-video-fade-in"
  );

  useEffect(() => {
    if (isShown) {
      setBackgrounDireVideoFade("background-fire-video-fade-in");
      setIsShownBackgroundFireVideo(true);
    } else {
      setBackgrounDireVideoFade("background-fire-video-fade-out");
      setIsShownBackgroundFireVideo(false);
    }
  }, [isShown]);

  return (
    <div>
      <div className="background-fire-class-profile-tracker">
        <Fade
          in={isShownBackgroundFireVideo}
          {...(isShownBackgroundFireVideo ? { timeout: 1000 } : {})}
        >
          <CardMedia
            component="video"
            className="background-fire-video-fade-in"
            src={BackgroundFireVideo}
            autoPlay
            muted
          />
        </Fade>
      </div>

      <Grow in={isShown} timeout={1500}>
        <div className="doom-factor-number"></div>
      </Grow>
    </div>
  );
};

export default BackgroundFire;

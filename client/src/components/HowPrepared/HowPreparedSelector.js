import React, { useState } from "react";
import { Rating, Typography } from "@mui/material";
import BlackSkullsvg from "./BlackSkullsvg";
import WhiteSkullsvg from "./WhiteSkullsvg";
import MrIncredibleUncanny from "./MrIncredibleUncannySkull.webp";
import Box from "@mui/material/Box";
import { IconButton } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import "./HowPrepared.css";

const labels = {
  0.5: "Very Slightly Doomed",
  1: "Very Slightly Doomed Plus+",
  1.5: "Just Doomed",
  2: "Just Doomed Plus",
  2.5: "Solidly Doomed",
  3: "Solidly Doomed Plus",
  3.5: "Undeniably Doomed",
  4: "Undeniably Doomed Plus",
  4.5: "CRAZY Doomed",
  5: "CRAZY Doomed Pro Max Plus",
};

function getLabelText(value) {
  return `${value}`;
}

const HowPreparedSelector = () => {
  const [value, setValue] = useState(1);
  const [hover, setHover] = useState(-1);
  const [maxDoomShown, setMaxDoomShown] = useState(false);

  const maxDoomSelector = () => {
    return (
      <div>
        <Rating
          max={1}
          icon={<img src={MrIncredibleUncanny}></img>}
          emptyIcon={<img src={MrIncredibleUncanny}></img>}
        />

        <Typography variant="h6">I'm DOOOMED</Typography>
      </div>
    );
  };

  const handleClickDropdownSelector = () => {
    if (maxDoomShown) {
      setMaxDoomShown(false);
    } else {
      setMaxDoomShown(true);
    }
  };

  return (
    <>
      <div className="how-prepared-rating">
        <div className="how-prepared-selector">
          <Rating
            icon={<WhiteSkullsvg />}
            emptyIcon={<BlackSkullsvg />}
            precision={0.5}
            value={value}
            getLabelText={getLabelText}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            onChangeActive={(event, newHover) => {
              setHover(newHover);
            }}
            className="how-prepared-rating-selector"
          />
        </div>

        <Typography>
          {value !== null && (
            <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
          )}
        </Typography>

        <IconButton
          className="how-prepared-dropdown-arrow"
          onClick={handleClickDropdownSelector}
        >
          <ArrowDropDownIcon />
        </IconButton>
        {maxDoomShown && (
          <div>
            <Rating
              max={1}
              icon={<img src={MrIncredibleUncanny}></img>}
              emptyIcon={<img src={MrIncredibleUncanny}></img>}
            />

            <Typography variant="h6">I'm DOOOMED</Typography>
          </div>
        )}
      </div>
    </>
  );
};

export default HowPreparedSelector;
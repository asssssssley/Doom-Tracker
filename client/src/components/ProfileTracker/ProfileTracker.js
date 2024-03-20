import React from "react";
import ProgressBarWhole from "./ProgressBarWhole";
import "./ProgressTrackerStyling.css";
import { Divider } from "@mui/material";

const ProfileTracker = ({ runUpdateTasks, dataTasks, id }) => {
  return (
    <>
      <div className="profile-tracker-container">
        <Divider id="profile-tracker-title">PROGRESS</Divider>
        {/* Filter by taskType */}
        <ProgressBarWhole
          ProgressBarType="Lectures"
          dataTasks={dataTasks.filter((task) => {
            return task.taskType === "lecture";
          })}
          runUpdateTasks={runUpdateTasks}
          userId={id}
        />
        <ProgressBarWhole
          ProgressBarType="Tutorials"
          dataTasks={dataTasks.filter((task) => {
            return task.taskType === "tutorial";
          })}
          runUpdateTasks={runUpdateTasks}
          userId={id}
        />
        <ProgressBarWhole
          ProgressBarType="Homework"
          dataTasks={dataTasks.filter((task) => {
            return task.taskType === "homework";
          })}
          runUpdateTasks={runUpdateTasks}
          userId={id}
        />
      </div>
    </>
  );
};

export default ProfileTracker;

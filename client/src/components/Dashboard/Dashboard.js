import { Typography, TextField, Card, CardActions, CardContent, Box, Slider, Divider } from '@mui/material';
import { styled } from '@mui/system';
import { LocalizationProvider, CalendarPicker, PickersDay } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useState, useEffect } from 'react';
import { TaskCard } from './TaskCards';
import './Dashboard.css';


export default function Dashboard() {

  const [pickedDate, setPickedDate] = useState(dayjs(new Date()));
  const [dataTasks, setDataTasks] = useState([]);
  const [taskProgress, setTaskProgress] = useState([]);
  const [startDate, setStartDate] = useState(dayjs(new Date()).format('DD/MM/YYYY'));
  const [endDate, setEndDate] = useState(dayjs(new Date()).format('DD/MM/YYYY'));

  let currentWeek = 7;

  useEffect(() => {
    fetch("http://localhost:5000/tasks/get")
      .then((res) => {
        return res.json();
      })
      .then((dataTasks) => {
        setDataTasks(dataTasks);
      });
  }, [pickedDate]);

  useEffect(() => {
  }, []);

  console.log(dataTasks);

  const TaskCardList = (taskType) => {
    let returnObj = [];
    for (let i in dataTasks) {
      let task = dataTasks[i];
      if (task.taskType === taskType) {
        let taskInfo = TaskCard(task.course, task.taskType, task.year, task.term, task.week, task.completed, taskProgress, setTaskProgress, i);
        returnObj.push(taskInfo);
      }
    }
    return returnObj;
  }

  const CustomPickersDay = styled(PickersDay, {
    shouldForwardProp: (prop) =>
      prop !== 'dayIsBetween' && prop !== 'isFirstDay' && prop !== 'isLastDay',
  })(({ theme, dayIsBetween, isFirstDay, isLastDay }) => ({
    ...(dayIsBetween && {
      borderRadius: 0,
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      '&:hover, &:focus': {
        backgroundColor: theme.palette.primary.dark,
      },
    }),
    ...(isFirstDay && {
      borderTopLeftRadius: '50%',
      borderBottomLeftRadius: '50%',
    }),
    ...(isLastDay && {
      borderTopRightRadius: '50%',
      borderBottomRightRadius: '50%',
    }),
  }));

  const renderWeekPickerDay = (date, selectedDates, pickersDayProps) => {
    if (!pickedDate) {
      return <PickersDay {...pickersDayProps} />;
    }

    const start = pickedDate.startOf('week');
    const end = pickedDate.endOf('week');

    const dayIsBetween = date.isBetween(start, end, null, '[]');
    const isFirstDay = date.isSame(start, 'day');
    const isLastDay = date.isSame(end, 'day');

    setStartDate(dayjs(start).format('DD/MM/YYYY'));
    setEndDate(dayjs(end).format('DD/MM/YYYY'));

    return (
      <CustomPickersDay
        {...pickersDayProps}
        disableMargin
        dayIsBetween={dayIsBetween}
        isFirstDay={isFirstDay}
        isLastDay={isLastDay}
      />
    );
  };

  return (
    <>
      <div className='dashboard-container'>
        <Typography variant="h2" align='center' sx={{fontWeight:"bold"}}>💀 DASHBOARD 💀</Typography>
        <div className="selector-screen">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <CalendarPicker 
          date={pickedDate} onChange={(pickedDate) => setPickedDate(pickedDate)}
          renderDay={renderWeekPickerDay}
          showDaysOutsideCurrentMonth
          views={["day", "month"]}
           />
        </LocalizationProvider>
        <Divider className='date-divider' sx={{mt:0}}>WEEK {currentWeek}<br></br>
        <Typography className='date-subtext'>{startDate} - {endDate}</Typography>
        </Divider>
        </div>
        <Divider className='divider'>LECTURES</Divider>
        <div className="divider-container">
        {TaskCardList("lecture")}
        </div>
        <Divider className='divider'>TUTORIALS</Divider>
        <div className="divider-container">
        {TaskCardList("tutorial")}
        </div>
        <Divider className='divider'>HOMEWORK</Divider>
        <div className="divider-container">
        {TaskCardList("homework")}
        </div>
      </div>
    </>
  )
}
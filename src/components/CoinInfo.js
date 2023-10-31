import React, { useEffect, useState, useRef } from "react";
import { CryptoState } from "../CryptoContext";
import axios from "axios";
import { HistoricalChart } from "../config/api";
import {
  CircularProgress,
  ThemeProvider,
  createTheme,
  makeStyles,
} from "@material-ui/core";
import { Line } from "react-chartjs-2";
import { Chart } from "chart.js";
import SelectButton from "./SelectButton";
import { chartDays } from "../config/data";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "75%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    padding: 40,
    [theme.breakpoints.down("md")]: {
      width: "100%",
      marginTop: 0,
      padding: 20,
      paddingTop: 0,
    },
  },
}));

const Coininfo = ({ coin }) => {
  const classes = useStyles();
  const [historicalData, setHistoricalData] = useState([]);
  const [days, setDays] = useState(1);
  const [flag, setflag] = useState(false);
  const { currency } = CryptoState();

  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setflag(true);
    setHistoricalData(data.prices);
  };

  useEffect(() => {
    fetchHistoricData();
  }, [days]);

  useEffect(() => {
    const chartInstance = new Chart(chartRef.current, {
      type: "line",
      data: {
        labels: historicalData?.map((coin) => {
          let date = new Date(coin[0]);
          let time =
            date.getHours() > 12
              ? `${date.getHours() - 12}:${date.getMinutes()} PM`
              : `${date.getHours()}:${date.getMinutes()} AM`;
          return days === 1 ? time : date.toLocaleDateString();
        }),
        datasets: [
          {
            data: historicalData?.map((coin) => Number(coin[1])),
            label: `Price ( Past ${days} Days ) in ${currency}`,
            borderColor: "#0086D0",
          },
        ],
      },
      options: {
        elements: {
          point: {
            radius: 1,
          },
        },
        animation: false,
        // responsive: true,
        // maintainAspectRatio: false,
      },
    });

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [historicalData, days, currency]);

  const chartRef = useRef(null);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        {!historicalData.length ? (
          <CircularProgress
            style={{ color: "#0086D0" }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
            <canvas ref={chartRef} />
            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  onClick={() => {
                    setDays(day.value);
                    setflag(false);
                  }}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectButton>
              ))}
            </div>
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

export default Coininfo;

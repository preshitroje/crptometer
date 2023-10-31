import React from "react";
import { makeStyles, Container, Typography } from "@material-ui/core";
import Carousel from "./Carousel";

const useStyles = makeStyles(() => ({
  banner: {
    backgroundImage: "url(./banner2.jpg)",
  },
  bannerContent: {
    height: 400,
    display: "flex",
    flexDirection: "column",
    paddingTop: 25,
    justifyContent: "space-around",
  },
  tagline: {
    height: "40%",
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    justifyContent: "center",
  },
}));

const Banner = () => {
  const classes = useStyles();
  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <div className={classes.tagline}>
          <Typography
            style={{
              fontWeight: "bold",
              marginBottom: 15,
              fontFamily: "Montserrat",
            }}
            variant="h2"
          >
            Crypto Meter
          </Typography>

          <Typography
            style={{
              color: "darkgrey",
              fontFamily: "Montserrat",
              textTransform: "capitalize",
            }}
            variant="subtitle2"
          >
            Get All The Info Regarding Your Favorite Crypto Currency
          </Typography>
        </div>
        <Carousel />
      </Container>
    </div>
  );
};

export default Banner;

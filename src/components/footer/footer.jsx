import React, { Component } from "react";
import "./footer.css";
import { Grid, makeStyles } from "@material-ui/core";

const Footer = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    inputField: {
      width: "100%",
    },
  }));
  const classes = useStyles();
  return (
    <div className="footer">
      <div className="container">
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item md={4} xs={12}>
              <div className="widget">
                <h3 className="title">About me</h3>
                <p className="paragraph">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Illum dolorum qui nobis quis rerum maiores eum consequatur
                  placeat accusantium, perspiciatis nihil eos fugiat odio
                  asperiores maxime incidunt voluptatibus tempore. Veniam.
                </p>
              </div>
            </Grid>
            <Grid item md={4} xs={12}>
              <div className="widget">
                <h3 className="title">Important Links</h3>
                <p className="paragraph">
                  <span>Github: </span>
                  <a href="https://github.com/AhmedAbbas19">
                    Github.com/AhmedAbbas19
                  </a>
                </p>
              </div>
            </Grid>
            <Grid item md={4} xs={12}>
              <div className="widget">
                <h3 className="title">Contact Info</h3>
                <p className="paragraph">
                  <span>Address: </span>Maadi, Cairo
                </p>
                <p className="paragraph">
                  <span>Phone: </span>01158671285
                </p>
                <p className="paragraph">
                  <span>Mail: </span>ahmeddabbas19@gmail.com
                </p>
                <p className="paragraph">
                  <span>Linkedin: </span>in/ahmeddabbas
                </p>
              </div>
            </Grid>
          </Grid>
        </div>

        {/* <div className="widgets">
          <div className="widget sm-12">
            <div className="widget-container">
              <h3 className="title">About me</h3>
              <p className="paragraph">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum
                dolorum qui nobis quis rerum maiores eum consequatur placeat
                accusantium, perspiciatis nihil eos fugiat odio asperiores
                maxime incidunt voluptatibus tempore. Veniam.
              </p>
            </div>
          </div>
          <div className="widget sm-12">
            <div className="widget-container">
              <h3 className="title">Important Links</h3>
              <p className="paragraph">
                <span>Github: </span>
                <a href="https://github.com/AhmedAbbas19">
                  Github.com/AhmedAbbas19
                </a>
              </p>
            </div>
          </div>
          <div className="widget sm-12">
            <div className="widget-container">
              <h3 className="title">Contact Info</h3>
              <p className="paragraph">
                <span>Address: </span>Maadi, Cairo
              </p>
              <p className="paragraph">
                <span>Phone: </span>01158671285
              </p>
              <p className="paragraph">
                <span>Mail: </span>ahmeddabbas19@gmail.com
              </p>
              <p className="paragraph">
                <span>Linkedin: </span>in/ahmeddabbas
              </p>
            </div>
          </div>
        </div>
         */}
        <div className="copy-rights">
          <p className="paragraph">Copyright ©2020 All rights reserved</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;

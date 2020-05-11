import React, { Component } from "react";
import "./footer.css";

export class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <div className="container">
          <div className="widgets">
            <div className="widget">
              <div className="widget-container">
                <h3 className="title">About me</h3>
                <p className="paragraph">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Illum dolorum qui nobis quis rerum maiores eum consequatur
                  placeat accusantium, perspiciatis nihil eos fugiat odio
                  asperiores maxime incidunt voluptatibus tempore. Veniam.
                </p>
              </div>
            </div>
            <div className="widget">
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
            <div className="widget">
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
          <div className="copy-rights">
            <p className="paragraph">Copyright ©2020 All rights reserved</p>
          </div>
        </div>
      </div>
    );
  }
}

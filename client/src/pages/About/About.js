import React from "react";
import { FiGithub } from "react-icons/fi";
import { TiSocialLinkedin } from "react-icons/ti";
import { MdPersonOutline } from "react-icons/md";
import "./About.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const About = () => {
  return (
    <>
      <Header />
      <div className="full-container">
        <div className="container about-container ">
          <div className="row h-100 text-center py-5">
            <div className="col-lg-12">
              <h1
                className="About-header"
                style={{
                  fontSize: "1.6rem",
                  fontFamily: "Montserrat",
                }}
              >
                About WanderView
              </h1>
              <p className="about-text mb-0 mt-3">
                WanderView is an Australian online travel application that was
                created for users to view and add reviews on locations all over
                the world. This allows users to share their experience with a
                restaurant, hotel or holiday destination that they have visited
                by simply clicking a location on the map and adding their review
                and star rating. This generates a pin drop that provides easy
                access when returning back to view existing reviews.
              </p>
            </div>
          </div>
        </div>

        <div className="container team-container">
          <div className="team-header">
            <h4>Our Team</h4>
          </div>
          <div className="sub-container">
            <div className="teams">
              <img src="https://i.ibb.co/pd64WLT/Lizimg.jpg" alt=""></img>
              <div className="name">Liz Mackle</div>
              <div className="about">FOUNDER</div>
              <div className="social-links">
                <a href="https://lizmackle.github.io/React_Portfolio/">
                  <MdPersonOutline
                    id="portfolioicon"
                    size="1.5rem"
                    color="#292b2c"
                  />
                </a>
                <a href="https://github.com/LizMackle">
                  <FiGithub id="githubicon" size="1.2rem" color="#292b2c" />
                </a>
                <a href="https://www.linkedin.com/in/liz-mackle/">
                  <TiSocialLinkedin
                    id="linkedinicon"
                    size="1.6rem"
                    color="#292b2c"
                  />
                </a>
              </div>
            </div>

            <div className="teams">
              <img src="https://i.ibb.co/ZBbww29/Tahliaimg.jpg" alt=""></img>
              <div className="name">Tahlia La Galia</div>
              <div className="about">FOUNDER</div>
              <div className="social-links">
                <a href="https://github.com/tahlialg">
                  <MdPersonOutline
                    id="portfolioicon"
                    size="1.5rem"
                    color="#292b2c"
                  />
                </a>
                <a href="https://github.com/tahlialg">
                  <FiGithub id="githubicon" size="1.2rem" color="#292b2c" />
                </a>
                <a href="https://www.linkedin.com/in/tahlia-la-galia-865379193/">
                  <TiSocialLinkedin
                    id="linkedinicon"
                    size="1.6rem"
                    color="#292b2c"
                  />
                </a>
              </div>
            </div>

            <div className="teams">
              <img src="https://i.ibb.co/FK5M7Gm/Mayraimg.jpg" alt=""></img>
              <div className="name">Mayra Rivas Lara</div>
              <div className="about">FOUNDER</div>
              <div className="social-links">
                <a href="https://github.com/MayraRivasLara">
                  <MdPersonOutline
                    id="portfolioicon"
                    size="1.5rem"
                    color="#292b2c"
                  />
                </a>
                <a href="https://github.com/MayraRivasLara">
                  <FiGithub id="githubicon" size="1.2rem" color="#292b2c" />
                </a>
                <a href="https://www.linkedin.com/in/mayra-rivas-lara-696032226/">
                  <TiSocialLinkedin
                    id="linkedinicon"
                    size="1.6rem"
                    color="#292b2c"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;

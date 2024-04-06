import { Box, Typography } from "@mui/material";
import { PropTypes } from "prop-types";
import { useState, useEffect } from "react";

const quotes = [
  "There is no friend as loyal as a book.",
  "In the end, we only regret the chances we didn't take.",
  "The only way to do great work is to love what you do.",
  "Success is not final, failure is not fatal: It is the courage to continue that counts.",
  "Believe you can and you're halfway there.",
  "The future belongs to those who believe in the beauty of their dreams.",
  "You miss 100% of the shots you don't take.",
  "Strive not to be a success, but rather to be of value.",
  "The only limit to our realization of tomorrow will be our doubts of today.",
  "You are never too old to set another goal or to dream a new dream.",
  "Success is not the key to happiness. Happiness is the key to success.",
  "The only person you should try to be better than is the person you were yesterday.",
  "It does not matter how slowly you go as long as you do not stop.",
  "The only impossible journey is the one you never begin.",
  "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle.",
  "The way to get started is to quit talking and begin doing.",
  "Don't watch the clock; do what it does. Keep going.",
  "The secret of getting ahead is getting started.",
  "With the new day comes new strength and new thoughts.",
  "Opportunities don't happen, you create them."
];

const Loading = ({ condition }) => {

  const randomIndex = Math.floor(Math.random() * quotes.length);

  return (
    <>
      {condition && (
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            position: "fixed",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            background: "#2c298075",
            zIndex: 11111111,
            padding: 10
          }}
        >
          <div className="book">
            <div className="book__pg-shadow"></div>
            <div className="book__pg"></div>
            <div className="book__pg book__pg--2"></div>
            <div className="book__pg book__pg--3"></div>
            <div className="book__pg book__pg--4"></div>
            <div className="book__pg book__pg--5"></div>
          </div>
          <Typography fontWeight={"bold"} style={{ color: "white" }}>
            {quotes[randomIndex]}
          </Typography>
        </Box>
      )}
    </>
  );
};

Loading.defaultProps = {
  condition: false,
};

Loading.propTypes = {
  condition: PropTypes.bool,
};

export default Loading;

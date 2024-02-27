import React, { useEffect, useState } from "react";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftBadge from "components/SoftBadge";
import axios from "axios";

// Define your API endpoint
const API_ENDPOINT = process.env.REACT_APP_API_BASE_URL;

function Author({ fullName, email, phone }) {
  return (
    <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
      <SoftBox mr={2}>
        <SoftAvatar src={""} alt={fullName} size="sm" variant="rounded" />
      </SoftBox>
      <SoftBox display="flex" flexDirection="column">
        <SoftTypography variant="button" fontWeight="medium">
          {fullName}
        </SoftTypography>
        <SoftTypography variant="caption" color="secondary">
          {email}
        </SoftTypography>
        <SoftTypography variant="caption" color="secondary">
          {phone}
        </SoftTypography>
      </SoftBox>
    </SoftBox>
  );
}

function generateAuthorsTableData() {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${API_ENDPOINT}/get-members`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();

        // Process the fetched data and populate the authors array
        const processedAuthors = data.map((author) => ({
          author: <Author fullName={author.fullName} email={author.email} phone={author.phone} />,
        }));

        // Set the authors array with the processed data
        setAuthors(processedAuthors);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    // Call the fetchData function
    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once on component mount

  const columns = [{ name: "author", align: "left" }];

  return { columns, rows: authors };
}

export default generateAuthorsTableData;

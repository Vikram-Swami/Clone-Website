import React, { useEffect, useState } from "react";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftBadge from "components/SoftBadge";
import axios from "axios";

// Define your API endpoint
const API_ENDPOINT = process.env.REACT_APP_API_BASE_URL;

function Author({ image, name, email }) {
  return (
    <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
      <SoftBox mr={2}>
        <SoftAvatar src={image} alt={name} size="sm" variant="rounded" />
      </SoftBox>
      <SoftBox display="flex" flexDirection="column">
        <SoftTypography variant="button" fontWeight="medium">
          {name}
        </SoftTypography>
        <SoftTypography variant="caption" color="secondary">
          {email}
        </SoftTypography>
      </SoftBox>
    </SoftBox>
  );
}

function Function({ job, org }) {
  return (
    <SoftBox display="flex" flexDirection="column">
      <SoftTypography variant="caption" fontWeight="medium" color="text">
        {job}
      </SoftTypography>
      <SoftTypography variant="caption" color="secondary">
        {org}
      </SoftTypography>
    </SoftBox>
  );
}

function generateAuthorsTableData() {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let userID = sessionStorage.getItem("userId");
      try {
        const response = await axios.get(`${API_ENDPOINT}/get-members/${userID}`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();

        const processedAuthors = data.map((author) => ({
          author: <Author image={author.image} name={author.name} email={author.email} />,
          function: <Function job={author.job} org={author.org} />,
          status: (
            <SoftBadge
              variant="gradient"
              badgeContent={author.status}
              color={author.status === "online" ? "success" : "secondary"}
              size="xs"
              container
            />
          ),
          employed: (
            <SoftTypography variant="caption" color="secondary" fontWeight="medium">
              {author.employed}
            </SoftTypography>
          ),
          action: (
            <SoftTypography
              component="a"
              href={author.actionLink}
              variant="caption"
              color="secondary"
              fontWeight="medium"
            >
              View
            </SoftTypography>
          ),
        }));
        setAuthors(processedAuthors);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  const columns = [
    { name: "author", align: "left" },
    { name: "function", align: "left" },
    { name: "status", align: "center" },
    { name: "employed", align: "center" },
    { name: "action", align: "center" },
  ];

  return { columns, rows: authors };
}

export default generateAuthorsTableData;

import { Icon } from "@mui/material";
import { symbol } from "d3";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const StaticsCard = ({ user }) => {

    let stats = [
        {
            head: "Net Earning",
            title: "My Earnings",
            symbol: "₹",
            amt: user?.earning,
            link: "/account",
            action: "payment",
            icon: <svg className="progress-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
            </svg>
        },
        {
            head: "Net Income",
            title: "Monthly Income",
            amt: user?.mIncome,
            symbol: "₹",
            link: "/incomes",
            action: "event_repeat",
            icon: <svg className="progress-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v4m0 0l-2-2m2 2l2-2M3 16a9 9 0 0118 0M5.25 16.75a7.5 7.5 0 0113.5 0M9 12c0 .414.672 1 1.5 1s1.5-.586 1.5-1c0-.414-.672-1-1.5-1S9 11.586 9 12zm-3 5.5a3 3 0 013-3h6a3 3 0 013 3v1H6v-1z" />
            </svg>
        },
        {
            head: "Total Business",
            title: "Reach Out to Team",
            symbol_b: "TB",
            amt: user?.memStr,
            link: "/team",
            action: "group_2",
            icon: <svg className="team-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 13.5a4.5 4.5 0 10-9 0M6 13.5a6 6 0 1112 0M5 18.75a7.5 7.5 0 0114 0v1.5H5v-1.5zm-2-3.75a3 3 0 100-6 3 3 0 000 6zm18 0a3 3 0 100-6 3 3 0 000 6z" />
            </svg>
        }
    ]
    return (
        <div className="d-flex j-between g8 card-container">

            {stats.map(e =>
                <div key={e.amt} className="custom-card">
                    <div className="card-content-horizontal">
                        <div className="progress-circle">
                            {e.icon}
                            <div className="circular-progress" data-rogress="80"></div>
                        </div>
                        <div className="card-content">
                            <p className="body-md">{e.head}</p>
                            <h2 className="profit-amount">{e?.symbol}{e.amt?.toFixed(0)} {e.symbol_b}</h2>
                        </div>
                    </div>
                    <div className="card-actions">
                        <h5 className="help-text">{e.title}</h5>
                        <NavLink to={e?.link} style={{ color: "white" }}><Icon >{e.action}</Icon></NavLink>
                    </div>
                </div>)}
        </div>

    )
}

// Setting default values for the props of Sidenav
StaticsCard.defaultProps = {
    user: {}
};

// Typechecking props for the StaticsCard
StaticsCard.propTypes = {
    user: PropTypes.object
};

export default StaticsCard;
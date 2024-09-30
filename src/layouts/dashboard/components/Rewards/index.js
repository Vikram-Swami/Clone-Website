import { useEffect } from "react";
import reward from "../../../../assets/images/reward.png";
import { useSoftUIController } from "context";
import { getAllRewards } from "api/users";
import { claimRewards } from "api/users";
import { Icon } from "@mui/material";
import { formatIndianCurrency } from "api/users";

const Rewards = () => {

    const [controller, dispatch] = useSoftUIController();

    const { rewards } = controller;


    useEffect(() => {
        rewards?.length < 1 && getAllRewards(dispatch);
    }, [])

    return (
        <div className="card transactions" style={{ minHeight: "100%" }}>
            <div className="d-flex j-between">
                <h5 style={{ textTransform: "uppercase" }}>Claim & Win</h5>
            </div>

            <div className="card-body" style={{ color: "goldenrod" }}>

                {rewards?.length > 0 ?
                    rewards.map(e =>
                        <div key={e.id} className="d-flex j-center mb20" style={{ paddingBottom: "20px", flexWrap: "wrap", borderBottom: '1px solid grey', lineHeight: '1' }} >
                            <div className="d-flex j-center mb10">
                                <div className="d-flex g8 mb10" style={{ flexDirection: "row", justifyContent: "start" }}>
                                    <img src={reward} alt="reward" style={{ margin: 0, width: "40px" }} />
                                    <h5 style={{ textTransform: "uppercase" }}>{e.reward ?? "Reward"} </h5>


                                </div>
                                {e.claimed ? <Icon className="badge success">done_all</Icon> : ""}
                            </div>
                            <div className="desc-small mb20" >
                                {parseFloat(e?.salary) > 0 ?
                                    <div className="d-flex g8 mb10" style={{ flexDirection: "row", justifyContent: "start" }}>
                                        <Icon fontSize="large" style={{ color: "#344767" }}>event</Icon>
                                        <p>₹{formatIndianCurrency(e.salary)} Salary for {e?.rule} Months</p>
                                    </div> : ""}
                                {e.type == "limit" ? <p>Duration: {e.rule}Days</p> : ""}
                            </div>


                            <div className="desc-small d-flex j-between g8">
                                <p className="textCenter mt5 tag"><b style={{ color: "#fbe08f", fontSize: "1rem", whiteSpace: "nowrap" }}>{e.range} TB</b> Milestones to Unlock </p>

                                {e.claimed ? <p className="badge success">claimed</p> : e.claim ? <button className="btn btn-reward" onClick={() => { claimRewards(e.id, dispatch) }}>claim</button> : <p className="btn-disabled">claim</p>}
                            </div>

                        </div>)
                    :
                    <div className="d-flex">
                        <h6 className="help-text">Rewards are Not Available.</h6>
                    </div>
                }
            </div>
        </div>
    )
}

export default Rewards;
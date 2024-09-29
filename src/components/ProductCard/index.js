/* 
https://tinyurl.com/ffWishlistProductCard 
*/
import { Icon } from "@mui/material";
import React from "react";

const ProductCard = () => {
    // const { storage, rent, amount } = props;

    return (
        <div className="br-card face-card mb20" style={{ maxWidth: "100%" }}>
            <div className="content-card">
                <div className="card-group-content">
                    <div>
                        <div className="d-flex j-start g8" style={{ maxWidth: "170px" }}>
                            <div className="card-icon-space">
                                <Icon fontSize="large" color="primary" sx={{ verticalAlign: "middle" }}>cloud</Icon>
                            </div>
                            <div className="mx5">
                                <h4>1 - 60 TB</h4>
                            </div>
                        </div>
                        <div className="d-flex column">
                            <p className="span2">₹1675 PER TB EVERY MONTH</p>
                            <p className="span1">₹39,530 PER TB ( INCL GST )</p>
                            <p className="span3">VALID FOR 84 MONTHS</p>
                        </div>
                    </div>
                    <div>
                        <div className="d-flex j-start g8" style={{ maxWidth: "170px" }}>
                            <div className="card-icon-space">
                                <Icon fontSize="large" color="primary" sx={{ verticalAlign: "middle" }}>cloud</Icon>
                            </div>
                            <div className="mx5">
                                <h4 style={{ whiteSpace: "nowrap" }}>61 - 120 TB</h4>
                            </div>
                        </div>
                        <div className="d-flex column">
                            <p className="span2">₹1842 PER TB EVERY MONTH</p>
                            <p className="span1">₹39,530 PER TB ( INCL GST )</p>
                            <p className="span3">VALID FOR 84 MONTHS</p>
                        </div>
                    </div>

                    <div>
                        <div className="d-flex j-start g8" style={{ maxWidth: "170px" }}>
                            <div className="card-icon-space">
                                <Icon fontSize="large" color="primary" sx={{ verticalAlign: "middle" }}>cloud</Icon>
                            </div>
                            <div className="mx5">
                                <h4>121 TB</h4>
                            </div>
                        </div>
                        <div className="d-flex column">
                            <p className="span2">₹2010 PER TB EVERY MONTH</p>
                            <p className="span1">₹39,530 PER TB ( INCL GST )</p>
                            <p className="span3">VALID FOR 84 MONTHS</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;

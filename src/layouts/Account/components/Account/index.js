// import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import { useSoftUIController } from "context";

import { setDialog } from "context";
import { payment } from "api/users";
import { formatIndianCurrency } from "api/users";


function AccountInfo() {
    const [controller, dispatch] = useSoftUIController();
    const { user } = controller;

    return (
        <div className="card transactions">
            <div className="d-flex g8">
                <h5>Hi, {user.fullName}</h5>
                <h6>( Account Info )</h6>
            </div>

            <div className="card-body">


                <div className="d-flex j-between mb10 info" >

                    <div className="d-flex" style={{ flexDirection: "row" }}>
                        <div className="icon">
                            <Icon color="success">storage</Icon>
                        </div>
                        <div className="desc-small">
                            <p >Storage</p>
                        </div>
                    </div>
                    <div className="desc-small" >
                        {parseFloat(user?.ownStr) > 0 ? <h4>{user?.ownStr}</h4> : <h4 style={{ color: "red" }}>Inactive</h4>}
                    </div>

                </div>

                <div className="d-flex j-between mb10 info" >
                    <div className="d-flex" style={{ flexDirection: "row" }}>
                        <div className="icon">
                            <Icon color="success">currency_rupee</Icon>
                        </div>
                        <div className="desc-small">
                            <p >Earnings</p>
                        </div>
                    </div>
                    <div className="desc-small">
                        <h4 >₹{formatIndianCurrency(user?.earning?.toFixed(0)) ?? 0}</h4>
                    </div>
                </div>

                <div className="d-flex j-between mb10 info" >

                    <div className="d-flex" style={{ flexDirection: "row" }}>
                        <div className="icon">
                            <Icon color="success">receipt</Icon>
                        </div>
                        <div className="desc-small">
                            <p>Monthly Income</p>
                        </div>
                    </div>
                    <div className="desc-small">
                        <h4 >₹{formatIndianCurrency(user?.mIncome?.toFixed(0)) ?? 0}</h4>
                    </div>

                </div>
                <div className="d-flex j-between mb10 info" >

                    <div className="d-flex" style={{ flexDirection: "row" }}>
                        <div className="icon">
                            <Icon color="success">receipt_long</Icon>
                        </div>
                        <div className="desc-small">
                            <p >TDS</p>
                        </div>
                    </div>
                    <div className="desc-small">
                        <h4 >₹{formatIndianCurrency(user?.tds?.toFixed(0)) ?? 0}</h4>
                    </div>

                </div>
                <div className="d-flex j-between mb10 info" >

                    <div className="d-flex" style={{ flexDirection: "row" }}>
                        <div className="icon">
                            <Icon color="success">add_card</Icon>
                        </div>
                        <div className="desc-small">
                            <p >Withdrawn</p>
                        </div>
                    </div>
                    <div className="desc-small">
                        <h4 >₹{formatIndianCurrency(user?.totalWithdraw) ?? 0}</h4>
                    </div>

                </div>
                <div className="d-flex j-between mb10 info" >

                    <div className="d-flex" style={{ flexDirection: "row" }}>
                        <div className="icon">
                            <Icon color="success">trending_up_icon</Icon>
                        </div>
                        <div className="desc-small">
                            <p>Levels</p>
                        </div>
                    </div>
                    <div className="desc-small">
                        <h4 >{user?.leader ? "LEADER" : user?.avail}</h4>
                    </div>

                </div>
                <div className="d-flex j-between mb10 info" >
                    <div className="d-flex" style={{ flexDirection: "row" }}>
                        <div className="icon">
                            <Icon color="success">payments</Icon>
                        </div>
                        <div className="desc-small">
                            <p className="mb10">Balance</p>
                            <h6 >{user.bankName}</h6>
                        </div>
                    </div>
                    <div className="desc-small">
                        <h4 style={{ color: user.wallet > 0 ? "green" : "red" }} >₹{formatIndianCurrency((user.wallet)?.toFixed(0))}</h4>
                    </div>

                </div>
                {parseFloat(user?.wallet) < 500 ? <div className="d-flex j-end mb10 g8">
                    <h6>Transfer to Bank</h6>
                    <div style={{ fontSize: "35px", lineHeight: 0, cursor: "pointer" }} onClick={() => {
                        setDialog(dispatch, [
                            {
                                status: "form",
                                title: "Transfer to Self Bank Account",
                                message: `Enter Amount to Withdraw (Current Balance: ${formatIndianCurrency(user?.wallet?.toFixed(2))})`,
                                action: "Confirm",
                                children: <input type="number" min={0} step="any" placeholder="Enter Amount ₹" defaultValue={user?.wallet?.toFixed(0)} name="amount" />,
                                call: (form) =>
                                    setDialog(dispatch, [
                                        {
                                            status: "form",
                                            title: "Transfer to Self Bank Account",
                                            message: `Kindly confirm for the transaction of ₹${form.get("amount")}`,
                                            action: "Confirm",
                                            call: () => payment(form.get("amount"), dispatch),
                                        },
                                    ])
                            },
                        ]);
                    }}>
                        <Icon color="success">payment</Icon>
                    </div>
                </div>
                    :
                    <div className="d-flex j-end mb10">
                        <h6>A minimum transaction of ₹500 is required for bank transfers.</h6>
                    </div>
                }
            </div>
        </div>
    );
}

export default AccountInfo;

import { fetchTransaction } from "api/users"
import { useSoftUIController } from "context"
import PropTypes from "prop-types"
import { useEffect, useRef } from "react"

export const PaymentMode = ({ amount }) => {
    return (
        <div className="d-flex column" >
            <div className="mb10 d-flex g8">
                <input type="radio" name="paymentMethod" value="netBanking" id="netBanking" />
                <label htmlFor="netBanking" className="help-text c-point">Net Banking (Coming Soon)</label>
            </div>
            <div className="mb10 d-flex g8">
                <input type="radio" name="paymentMethod" value="cards" id="cards" />
                <label htmlFor="cards" className="help-text c-point">Credit/Debit Card (Coming Soon)</label>
            </div>
            <div className="mb10 d-flex g8">
                <input type="radio" name="paymentMethod" value="TnxId" id="tnxId" />
                <label htmlFor="tnxId" className="help-text c-point">Transaction ID (CASH)</label>
            </div>
            <div className="d-flex j-end mb20">
                <h5 className="help-text">Billed Amount: ₹{amount}</h5>
            </div>
            <div className="d-flex mt5">
                <ul className="desc-small">
                    <h5>Terms And Policies</h5>
                    <li><span>Once the purchase of the virtual storage is completed, the amount paid is non-refundable under any circumstances. Please ensure you review your purchase carefully before proceeding.</span></li>
                    <li><span>After purchasing the virtual storage, you are responsible for manually activating your rent. Failure to activate the rent will result in a delay in accessing any associated benefits.</span></li>
                    <li><span>By completing this purchase, you confirm that all the information provided during the transaction is accurate and true to the best of your knowledge. False information may lead to termination of your account or access to services</span></li>
                    <li><span>The virtual storage provided under this purchase is subject to the limits and specifications outlined at the time of sale. Any misuse of storage beyond the agreed terms may result in suspension or termination of the Account.</span></li>
                    <li><span>The purchase of virtual storage is personal and non-transferable. Any attempt to resell or transfer the storage without authorization will be void and may lead to account suspension.</span></li>
                    <li><span>Our virtual storage is sold under a direct selling model, where you may have the opportunity to refer others to purchase the product. Participation in the referral program is voluntary and subject to the company&apos;s referral policies.</span></li>
                    <li><span>The company reserves the right to modify these terms and conditions at any time. Any changes will be communicated to you, and continued use of the product constitutes acceptance of the revised terms</span></li>
                </ul>
            </div>
        </div>
    )
}

export const TnxId = ({ amount }) => {
    const [_, dispatch] = useSoftUIController();
    const inputRef = useRef()
    inputRef.called = false;
    const fetch = async () => {
        let result = await fetchTransaction(dispatch, amount);
        if (result) {
            inputRef.current.value = result;
        }
        else {
            inputRef.current.value = ""
        }
        inputRef.called = true;
    }
    useEffect(() => {
        if (inputRef.called === false) {
            fetch();
        }
    }, [])
    return (
        <div className="d-flex">
            <input type="text" name="transactionId" ref={inputRef} placeholder="Enter Transaction Number" />
        </div>
    )
}


PaymentMode.propTypes = {
    amount: PropTypes.number ?? 0,
}
TnxId.propTypes = {
    amount: PropTypes.number ?? 0
}


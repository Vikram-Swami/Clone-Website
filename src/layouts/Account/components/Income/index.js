import { getIncomes } from 'api/users';
import { useSoftUIController } from 'context';
import * as React from 'react';
import { useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";





const Income = () => {

    const [controller, dispatch] = useSoftUIController();

    const { income } = controller;

    const [startDate, setStartDate] = React.useState(new Date());

    const handleChange = (date) => {
        setStartDate(date);
        getIncomes(dispatch, { month: date.getMonth() + 1, year: date.getFullYear() });
    };

    function subtotal(items, quer) {
        return items.map((item) => item[quer]).reduce((sum, i) => sum + i, 0);
    }
    function total(items) {
        return items.reduce((sum, curr) => sum + curr.amount + curr.tds + curr.conCharge, 0);
    }

    useEffect(() => {
        income.length < 1 && getIncomes(dispatch, { month: startDate.getMonth() + 1, year: startDate.getFullYear() });
    }, []);

    return (
        // <TableContainer component={Paper}>
        <div className='card transactions'>
            <div className="d-flex j-between">
                <h5>Credited Incomes</h5>
                <DatePicker
                    selected={startDate}
                    onChange={handleChange}
                    dateFormat="MMMM yyyy"
                    showMonthYearPicker
                    showFullMonthYearPicker
                />
            </div>
            <div className='card-body'>
                {income?.length > 0 ? <div className="custom-table">
                    <table>
                        <thead>
                            <tr>
                                <th colSpan="3" className="center-text">Details</th>
                                <th className="right-text">Deductions</th>
                                <th className="right-text">Amount</th>
                            </tr>
                            <tr>
                                <th>User Info</th>
                                <th className="right-text">Type & Date</th>
                                <th className="right-text">Status</th>
                                <th className="right-text">Tds</th>
                                <th className="right-text">Credited</th>
                            </tr>
                        </thead>
                        <tbody>
                            {income.map((row, i) => (
                                <tr key={i}>
                                    <td className='desc-small'><h6 className='help-text'>{row.sourceName?.toUpperCase()}</h6><br /><span >{row.sourceId?.toUpperCase()}</span></td>
                                    <td className="right-text "><h6 className='help-text'>{row.type?.toUpperCase()}</h6><br /><span className='help-text'>{row.createdAt}</span></td>
                                    <td className="right-text">{row.status ? "PAID" : "NOT PAID"}</td>
                                    <td className="right-text">{row.tds?.toFixed(2)}</td>
                                    <td className="right-text">{row.amount?.toFixed(2)}</td>
                                </tr>
                            ))}
                            <tr>
                                <td rowSpan="5" colSpan={2} />

                            </tr>
                            <tr style={{ fontWeight: 600 }}>
                                <td colSpan="2" >Subtotal</td>
                                <td className="right-text">{subtotal(income, "amount")}</td>
                            </tr>
                            <tr>
                                <td colSpan="2">Convenience Charge</td>
                                <td className="right-text">{subtotal(income, "conCharge")}</td>
                            </tr>
                            <tr>
                                <td>TDS</td>
                                <td className="right-text">5% on Incomes &<br />2% on Rent</td>
                                <td className="right-text">{subtotal(income, "tds")}</td>
                            </tr>
                            <tr style={{ fontWeight: 600 }}>
                                <td colSpan="2">Total</td>
                                <td className="right-text">{total(income)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div> :
                    <div className="d-flex">
                        <h6 className="help-text">No Incomes found for current Month!</h6>
                    </div>
                }
            </div>
        </div>
        // </TableContainer>
    );
}

export default Income;
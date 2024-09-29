import { Icon } from '@mui/material';
import { getClaims } from 'api/users';
import { useSoftUIController } from 'context';
import Table from 'examples/Tables/Table';
import ClaimView from 'layouts/Account/data/reward';
import * as React from 'react';
import { useEffect } from 'react';





const Claims = () => {

    const [controller, dispatch] = useSoftUIController();

    const { claims } = controller;

    const memoizedRows = ClaimView.rows(claims, dispatch);

    useEffect(() => {
        claims.length < 1 && getClaims(dispatch);
    }, []);

    return (
        claims?.length > 0 &&
        <div className='card'>
            <div className='d-flex j-start g8'>

                <h5 className='mb10' style={{ width: "fit-content" }}>Claimed Rewards</h5>
                <span className='c-point' onClick={() => getClaims(dispatch)}><Icon>refresh</Icon></span>
            </div>

            <Table columns={ClaimView.columns} rows={memoizedRows} />

        </div>
    );
}

export default Claims;
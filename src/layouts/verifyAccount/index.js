import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ApiClient from 'Services/ApiClient';
import { activateAccount } from 'Services/endpointes';
import { useParams } from 'react-router-dom';
import { startLoading } from 'context';
import { useSoftUIController } from 'context';
import { setDialog } from 'context';
import CoverLayout from 'layouts/authentication/components/CoverLayout';

export default function RecipeReviewCard() {
    const [, dispatch] = useSoftUIController();
    const [message, setMessage] = React.useState("Your Account Details are being fetched!");
    let { id } = useParams();
    const fetchData = async () => {
        startLoading(dispatch, true);
        try {
            const response = await ApiClient.getDataByParam(activateAccount, id);
            setDialog(dispatch, [response]);
            setMessage(response?.message);
        } catch (error) {
            console.log(error);
            setDialog(dispatch, [error.reponse?.data ?? { message: "Error while Fetching you account details." }])
            // Set an error message if the API call fails
        } finally {
        }
    };
    React.useEffect(() => {
        fetchData();
    }, []);

    return (
        <CoverLayout title="Account Activation">

            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Activation Status
                    </Typography>
                    <Typography variant="h5" component="div">
                        {message}
                    </Typography>
                </CardContent>
            </Card>
        </CoverLayout>
    );
}

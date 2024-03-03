import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import BasicLayout from 'layouts/authentication/components/BasicLayout';
import Loading from 'layouts/loading';
import ApiClient from 'Services/ApiClient';
import { activateAccount } from 'Services/endpointes';
import { useParams } from 'react-router-dom';
import { startLoading } from 'context';
import { useSoftUIController } from 'context';
import { setDialog } from 'context';

export default function RecipeReviewCard() {
    const [controller, dispatch] = useSoftUIController();
    let { id } = useParams();
    const fetchData = async () => {
        startLoading(dispatch, true);
        try {
            const response = await ApiClient.getDataByParam(activateAccount, id);
            message = response?.message;
            setDialog(dispatch, [response])
        } catch (error) {
            console.log(error);
            setDialog(dispatch, [error.reponse?.data ?? { message: "Error while Fetching you account details." }])
            // Set an error message if the API call fails
        } finally {
        }
    };
    let message = 'Hold for a moment while we are updating your request.';
    React.useEffect(() => {
        fetchData();
    }, []);

    return (
        <BasicLayout title="Account Activation">

            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Activation Status
                    </Typography>
                    <Typography variant="h5" component="div">
                        {message}
                    </Typography>

                    {/* Optionally, you can display additional details from the API response */}
                    {/* <Typography variant="body2">
                            Additional details: {response?.data?.additionalDetails}
                        </Typography> */}
                </CardContent>
            </Card>
        </BasicLayout>
    );
}

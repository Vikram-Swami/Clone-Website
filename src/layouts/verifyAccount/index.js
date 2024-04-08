import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ApiClient from 'Services/ApiClient';
import { activateAccount } from 'Services/endpointes';
import { useParams } from 'react-router-dom';
import { startLoading } from 'context';
import { useSoftUIController } from 'context';
import { toast } from "react-toastify";
import { setDialog } from 'context';
import CoverLayout from 'layouts/authentication/components/CoverLayout';
import { setLoading } from 'context';

export default function RecipeReviewCard() {
    const [, dispatch] = useSoftUIController();
    const [message, setMessage] = React.useState("Your Account Details are being fetched!");
    let { id } = useParams();
    const fetchData = async () => {
        startLoading(dispatch, true);
        try {
            const response = await ApiClient.getDataByParam(activateAccount, id);
            setMessage(response?.message);
            setDialog(dispatch, [response]);
        } catch (error) {
            toast.error(error.toString());
            setLoading(dispatch, false);

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

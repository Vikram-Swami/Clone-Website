// import { Card, FormControl, FormControlLabel, FormLabel, RadioGroup } from "@mui/material";
// const PurchaseView = ({ data }) => {
//     return (
//         <Card>
//             <FormControl component="fieldset" margin="dense">
//                 <FormLabel component="legend">Payment Method</FormLabel>
//                 <RadioGroup aria-label="payment-method" color="secondary" name="paymentMethod">
//                     <FormControlLabel
//                         value="withdraw"
//                         control={<Radio />}
//                         label={
//                             <span>
//                                 Wallet&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                                 0
//                             </span>
//                         }
//                     />
//                     <FormControlLabel
//                         value="credit-debit"
//                         control={<Radio />}
//                         label={
//                             <span>
//                                 Credit/Debit
//                                 Card&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                                 (Coming Soon)
//                             </span>
//                         }
//                         disabled={true}
//                     />
//                     <FormControlLabel
//                         value="upi"
//                         control={<Radio />}
//                         label={
//                             <span>
//                                 Netbanking&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                                 (Coming Soon)
//                             </span>
//                         }
//                         disabled={true}
//                     />
//                     <FormControlLabel
//                         value="utrl"
//                         control={<Radio />}
//                         label="UTI"
//                         onClick={handleUtrlClick}
//                     />
//                     <Dialog open={true} onClose={handleCloseDialog}>
//                         <DialogTitle>Enter UTI </DialogTitle>
//                         <DialogContent>
//                             <TextField
//                                 autoFocus
//                                 margin="dense"
//                                 id="utrlInput"
//                                 label="UTI"
//                                 type="text"
//                                 fullWidth
//                                 variant="standard"
//                                 value={utrlInput}
//                                 onChange={(e) => setUtrlInput(e.target.value)}
//                             />
//                         </DialogContent>
//                         <DialogActions>
//                             <Button onClick={handleCloseDialog}>Cancel</Button>
//                             <Button onClick={handleUtrlSubmit}>Submit</Button>
//                         </DialogActions>
//                     </Dialog>
//                 </RadioGroup>
//             </FormControl>
//             {/* Additional input fields based on payment method */}
//             {/* {PaymentMethod === "uri" && (
//                 <TextField
//                     required
//                     margin="dense"
//                     id="uri"
//                     name="tnxId"
//                     label="UTI (unique transaction id)"
//                     type="text"
//                     fullWidth
//                     variant="standard"
//                 />
//             )} */}
//         </Card>
//     )
// }

// export default PurchaseView;
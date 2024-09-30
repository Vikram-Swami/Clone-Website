import { setStep } from "context";
import { setOtp } from "context";
import { setMembers } from "context";
import { setClaims } from "context";
import { setConnection } from "context";
import { setProducts } from "context";
import { setRewards } from "context";
import { setNotification } from "context";
import { setTransaction } from "context";
import { setIncome } from "context";
import { startLoading, setUser, setDialog, setLoading } from "context";
import { toast } from "react-toastify";
import ApiClient from "Services/ApiClient";
import { generateProduct } from "Services/endpointes";
import { verifyTransaction } from "Services/endpointes";
import { markRead } from "Services/endpointes";
import { deleteAllNotifications } from "Services/endpointes";
import { getUserNotification } from "Services/endpointes";
import { claimReward } from "Services/endpointes";
import { getUserRewards } from "Services/endpointes";
import { createConnections } from "Services/endpointes";
import { getProducts } from "Services/endpointes";
import { activateConnection } from "Services/endpointes";
import { registerUser } from "Services/endpointes";
import { getIncomeByUserId } from "Services/endpointes";
import { getTransactionsByUserId } from "Services/endpointes";
import { getUserClaims } from "Services/endpointes";
import { getConnectionByUserID } from "Services/endpointes";
import { updateReward } from "Services/endpointes";
import { getMembers } from "Services/endpointes";
import { withdraw } from "Services/endpointes";
import { validateUser } from "Services/endpointes";
import { achieve } from "Services/endpointes";
import { getUserById } from "Services/endpointes";

// SET COOKIES
const setCookie = (name, value, days) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
};

// Login
export const handleLogin = async (e, route, dispatch, navigate) => {
  try {
    e.preventDefault();
    startLoading(dispatch, true);
    const formDetails = new FormData(e.currentTarget);
    const response = await ApiClient.createData(route, formDetails);
    if (response?.status == 200) {
      setCookie("authToken", response?.data.token, 1);
      setCookie("userId", response?.data.userId, 1);
      navigate("/dashboard");
      toast.success(response.message);
    } else {
      setOtp(dispatch, response);
    }
  } catch (error) {
    toast.error(error.toString());
  } finally {
    setLoading(dispatch, false);
  }
};

// Clear cookies while error and Logout
export const deleteData = (navigate) => {
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
  navigate();
};

// Get User
export async function getUser(dispatch) {
  try {
    startLoading(dispatch, true);
    const data = await ApiClient.getData(getUserById);
    if (data.status == 200) {
      const royality = await ApiClient.createData(achieve, "");
      if (royality.status == 200) {
        setDialog(dispatch, [royality]);
      }
      setUser(dispatch, data?.data);
    } else {
      deleteData();
      setDialog(dispatch, [data]);
    }
  } catch (error) {
    deleteData();
    setLoading(dispatch, false);
  }
}

//   Vallidate user Verification
export const completeProfile = async (dispatch, navigate) => {
  try {
    startLoading(dispatch, true);
    const response = await ApiClient.getData(validateUser);
    console.log("complete Profile", response);
    if (response.status === 200) {
      navigate(`/kyc`);
      setStep(dispatch, response?.data?.step ?? 0);
      getUser(dispatch);
    } else {
      navigate('/home');
      setDialog(dispatch, [response]);
    }
  } catch (error) {
    toast.error(error?.message ?? "Network Error!");
    setLoading(dispatch, false);
  }
};

// Register new User
export const submitHandler = async (e, dispatch, accept, form, navigate) => {
  e.preventDefault();
  if (!accept) {
    toast.error("Please accept our Terms and Policies.");
    return;
  }
  const formdata = new FormData(e.currentTarget);
  formdata.append("sponsorId", form.sponsorId)
  formdata.append("placementId", form.placementId)

  startLoading(dispatch, true);
  try {
    const response = await ApiClient.createData(registerUser, formdata);
    if (response.status == 200) {
      navigate("/");
    }
    setDialog(dispatch, [response]);
  } catch (error) {
    setLoading(dispatch, false);
    toast.error(error?.message ?? "Network Error!");
  }
};

// BANK TRANSFER
export const payment = async (amount, dispatch) => {
  try {
    let form = new FormData();
    form.append("paymentMethod", "Account Transfer");
    console.log("payment");
    form.append("type", "withdraw");
    form.append("amount", amount);
    startLoading(dispatch, true);
    const response = await ApiClient.createData(withdraw, form);
    if (response.status == 200) {
      getUser(dispatch);
    }
    setDialog(dispatch, [response]);

  } catch (err) {
    toast.error(err?.message ?? "Network Error!");
    setLoading(dispatch, false);
  }
};

// FETCH INCOMES
export const getIncomes = async (dispatch, data) => {
  startLoading(dispatch, true);
  try {
    const response = await ApiClient.getData(getIncomeByUserId + "?month=" + data?.month + "&year=" + data?.year);
    if (response.status == 200) {
      setIncome(dispatch, response.data);
    } else {
      setIncome(dispatch, []);
    }
  } catch (error) {
    toast.info(error.toString());
    setLoading(dispatch, false);
  }
};

// FETCH ALL TRANSACTIONS
export const getAllUsersTransaction = async (dispatch, data) => {
  try {
    setLoading(dispatch, true);
    const response = await ApiClient.getData(getTransactionsByUserId + "?month=" + data?.month + "&year=" + data?.year);
    if (response?.status === 200) {
      setTransaction(dispatch, response?.data);
    }
    else {
      setTransaction(dispatch, []);
    }
  } catch (error) {
    toast.error(error.toString());
    setLoading(dispatch, false);
  }
};

// FETCH TEAM MEMBERS
export const getMember = async (dispatch, user) => {
  startLoading(dispatch, true);
  try {
    const response = await ApiClient.getData(getMembers);

    if (response.status === 200) {
      let self = JSON.parse(JSON.stringify(user));
      self.userId = self?.id?.toLowerCase();

      const memberWithSelf = [self, ...response.data];
      // setEdges(createEdges(member));
      setMembers(dispatch, memberWithSelf);
      return response.data;
    } else {
      setDialog(dispatch, [response]);
      return [];
    }
  } catch (error) {
    toast.info(error?.message ?? "Network Error!");
    setLoading(dispatch, false);
    return [];
  }
};

// FETCHED CLAIMED REWARDS
export const getClaims = async (dispatch) => {
  startLoading(dispatch, true);
  try {
    const response = await ApiClient.getData(getUserClaims);
    if (response.status == 200) {
      setClaims(dispatch, response.data);
    }
  } catch (error) {
    toast.info(error.message ?? "Network Error!");
    setLoading(dispatch, false);
  }
}

// FETCH PRODUCTS
export const getSlabs = async (dispatch, type) => {
  try {
    setLoading(dispatch, true);
    const response = await ApiClient.getData(getProducts + "?type=" + type);
    if (response?.status === 200) {
      setProducts(dispatch, response?.data);
    } else {
      setLoading(dispatch, false);
    }
  } catch (error) {
    toast.error(error?.message ?? "Network Error!");
    setLoading(dispatch, false);
  }
};

// FETCH BOUGHT CONNECTION

export const getConnection = async (dispatch) => {
  startLoading(dispatch, true);
  try {
    const response = await ApiClient.getData(getConnectionByUserID);
    if (response.status == 200) {
      setConnection(dispatch, response.data);
      let connection = response?.data.find(e => e.status == false)
      if (connection && !connection?.status) {
        setDialog(dispatch, [{
          status: "form",
          title: "Your Connection is Inactive!",
          message: "Kindly Activate Connection to Get Continous Montly Rent.",
          action: "Activate Rent",
          call: () => activateRent(connection?._id, dispatch)
        }])
      }
    } else {
      toast.warn(response?.message ?? "Network Error!");
      setLoading(dispatch, false);
    }
  } catch (error) {
    toast.error(err?.message ?? "Network Error!");
    setLoading(dispatch, false);
  }
};

// FETCH REWARDS

export const getAllRewards = async (dispatch) => {
  try {
    startLoading(dispatch, true);
    const response = await ApiClient.getData(getUserRewards);
    if (response.status == 200) {
      setRewards(dispatch, response.data);
    } else {
      setLoading(dispatch, false);
    }
  } catch (error) {
    setLoading(dispatch, false);
    toast.error(error?.message ?? "Network Error!");
  }
};

// CLAIM REWARDS   
export const claimRewards = async (id, dispatch) => {
  startLoading(dispatch, true);
  try {
    const response = await ApiClient.createData(claimReward + `/${id}`);
    setDialog(dispatch, [response]);
  } catch (error) {
    setLoading(dispatch, false);
    toast.info(error.message ?? "Network Error!");
  }
};

// Buy Connection
export const buyConnection = async (form, storage, method, dispatch, navigate) => {
  try {

    startLoading(dispatch, true);
    form.append("storage", storage);
    form.append("paymentMethod", method);
    const response = await ApiClient.createData(createConnections, form);
    if (response.status === 200) {
      setConnection(dispatch, []);
      navigate("/portfolio");
    }
    setDialog(dispatch, [response]);
  } catch (error) {
    toast.error(error?.message ?? "Network Error!");
    setLoading(dispatch, false);
  }
};

export const fetchTransaction = async (dispatch, amount) => {
  try {
    setLoading(dispatch, true);
    const response = await ApiClient.getData(verifyTransaction + "/" + amount);
    if (response.status == 200) {
      setLoading(dispatch, false);
      return response?.data;
    } else {
      toast.error(response.message ?? "Network Error");
      setLoading(dispatch, false);
      return false;
    }
  } catch (err) {
    toast.error(err?.message ?? "Netowrk Error!");
    setLoading(dispatch, false)
    return false;

  }
}

// FETCH ALL NOTIFICATIONS.

export const fetchNotifications = async (dispatch) => {
  startLoading(dispatch, true);
  try {
    const response = await ApiClient.getData(getUserNotification);
    if (response.status === 200) {
      setNotification(dispatch, response.data);
    } else {
      setLoading(dispatch, false);
    }
  } catch (error) {
    setLoading(dispatch, false);
    toast.error(error.message ?? "Network Error!");
  }
};

// ACTIVATE RENT
const activateRent = async (id, dispatch) => {
  try {
    startLoading(dispatch, true);
    const response = await ApiClient.createData(activateConnection, { connectionId: id });
    if (response.status == 200) {
      setDialog(dispatch, [response]);
      getConnection(dispatch)
    } else {
      setDialog(dispatch, [response]);
    }
  } catch (err) {
    startLoading(dispatch, false);
    toast.error(err?.message ?? "Network Error!");
  }
};

// Generate New Product
export const generateSlab = async (form, dispatch, products) => {
  try {
    setLoading(dispatch, true);
    let range = form.get("range");
    const response = await ApiClient.getData(
      generateProduct + `/${range}`
    );
    if (response?.status === 200) {
      setProducts(dispatch, [...products, response.data]);
      toast.success(response.message);
    } else {
      setDialog(dispatch, [response]);
    }
  } catch (error) {
    toast.error(error?.message ?? "Network Error!");
    setLoading(dispatch, false);
  }
};


// MARK REWARD RECEIVED
export const receiveReward = async (id, dispatch) => {
  startLoading(dispatch, true);
  try {

    const response = await ApiClient.updateData(updateReward, { id: id });
    if (response.status == 200) {
      getClaims(dispatch);
    }
    setDialog(dispatch, [response]);
  } catch (error) {
    setLoading(dispatch, false);
    toast.error(error.message ?? "Network Error!");
  }
};

// READ ALL NOTIFICATION
export const markReadNotif = async (dispatch) => {
  startLoading(dispatch, true);
  try {
    const response = await ApiClient.updateData(markRead);
    if (response.status == 200) {
      setNotification(dispatch, [])

    }
    setDialog(dispatch, [response]);
  } catch (error) {
    toast.error(error.message ?? "Network Error!");
    setLoading(dispatch, false);
  }
};

// DELETE ALL NOTIFICATIONS
export const deleteAllNotif = async (dispatch) => {
  try {
    startLoading(dispatch, true);
    const response = await ApiClient.deleteData(deleteAllNotifications, "");
    if (response.status == 200) {
      fetchNotifications(dispatch);
    }
    setDialog(dispatch, [response]);
  } catch (error) {
    toast.error(error?.message ?? "Network Error");
    setLoading(dispatch, false);
  }
};


//   Share Link
function generateWhatsAppMessage(referralLink, name) {
  const companyName = "TRIWAVES INDIA LIMITED (KNO-ONE)";
  const message = `👋 Hey there!\n\nLooking to start earning?💰\nClick on this link to get started with ${companyName}.\n\nLink: ${referralLink}\n\nJoin us at ${companyName} and explore exciting opportunities to earn from the comfort of your home.\n\nHappy earning! 🚀\n\nRegards\n ${name}`;
  return message;
}

const handleSend = (message) => {
  // Construct the WhatsApp URL with only the prewritten message
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;

  // Open WhatsApp in a new window or tab
  window.open(whatsappUrl, "_blank");
};

const generateReferLink = (uid, pid) => {
  const referLink = window.location.origin;

  return pid ? `${referLink}/sign-up?sponsorId=${uid}&placementId=${pid}` : `${referLink}/sign-up?sponsorId=${uid}`;
};

export const handleCopyLink = (user, pId, dispatch) => {
  const referLink = generateReferLink(user.id, pId);

  navigator.clipboard
    .writeText(referLink)
    .then(() => {
      toast.success("Refer Link has been copied to Clipboard.")
    })
    .catch((_) => {
      toast.error("Unable to copy Link.")
    });
  let message = generateWhatsAppMessage(referLink, user.fullName);
  setDialog(dispatch, [
    {
      status: "form",
      title: "More You Refer, More You Earn!",
      children: <p className="help-text">Kindly click on share button to share your REFER LINK with your near and dear ones.</p>,
      action: "Share",
      call: () => handleSend(message),
    },
  ]);
};

export function formatIndianCurrency(num) {
  const numStr = num.toString();

  // Match last 3 digits first, then continue matching groups of 2 digits for Indian numbering
  const lastThree = numStr.substring(numStr.length - 3);
  const otherNumbers = numStr.substring(0, numStr.length - 3);

  if (otherNumbers !== '') {
    return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + lastThree;
  } else {
    return lastThree;  // No formatting needed for numbers less than 1,000
  }
}

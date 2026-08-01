import axios from "axios";
import { server } from "../../../server";

// create event
export const createEvent = (newForm) => async (dispatch) => {
  try {
    dispatch({
      type: "eventCreateRequest",
    });
    const config = { headers: { "Content-Type": "multipart/formData" } };

    const { data } = await axios.post(
      `${server}/event/create-event`,
      newForm,
      config,
    );

    dispatch({
      type: "eventCreateSuccess",
      payload: data.event,
    });
  } catch (error) {
    dispatch({
      type: "eventCreateFailure",
      payload: error.response.data.message,
    });
  }
};
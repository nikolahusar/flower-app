import axios from "axios";
import {
  commentsFailed,
  commentsRequest,
  commentsSuccess,
} from "./CommentsSlice";

import {
  favoriteId,
  favoriteListError,
  favoriteListRequest,
  favoriteListSuccess,
} from "./FavoriteSlice";
import { flowersError, flowersRequest, flowersSuccess } from "./FlowersSlice";
import { likesError, likesReq, likesSuccess } from "./LikesSlice";
import {
  sightingError,
  sightingRequest,
  sightingSuccess,
} from "./SightingDetailsSlice";
import {
  sightingsRequest,
  sightingsSuccess,
  sightingsError,
} from "./SightingsSlice";
import {
  userSightingError,
  userSightingRequest,
  userSightingSuccess,
} from "./userSightingSlice";
import {
  loginStart,
  loginSuccess,
  loginError,
  userLoggedIn,
  userSuccess,
  getToken,
} from "./UserSlice";

export const fetchFlowers = () => async (dispatch) => {
  dispatch(flowersRequest());
  try {
    const res = await axios.get(
      "https://flowrspot-api.herokuapp.com/api/v1/flowers"
    );
    dispatch(flowersSuccess(res.data.flowers));
  } catch (error) {
    dispatch(flowersError());
  }
};

export const loginUser = async (user, dispatch) => {
  try {
    dispatch(loginStart());
    const res = await axios.post(
      "https://flowrspot-api.herokuapp.com/api/v1/users/login",
      user
    );
    dispatch(loginSuccess(res.data));
    dispatch(getToken(res.data.auth_token));
    dispatch(userLoggedIn());
    dispatch(favoriteList(res.data.auth_token));
  } catch (err) {
    dispatch(loginError(err.response.data.error));
  }
};

export const getUser = (token) => async (dispatch) => {
  try {
    dispatch(loginStart());
    const res = await axios.get(
      "https://flowrspot-api.herokuapp.com/api/v1/users/me",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(userSuccess(res.data.user));
  } catch (error) {
    dispatch(loginError());
  }
};

export const favoriteList = (token) => async (dispatch) => {
  try {
    dispatch(favoriteListRequest());
    const res = await axios.get(
      "https://flowrspot-api.herokuapp.com/api/v1/flowers/favorites",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(favoriteListSuccess(res.data.fav_flowers));

    dispatch(
      favoriteId(res?.data?.fav_flowers?.map((flower) => flower.flower.id))
    );
  } catch (error) {
    dispatch(favoriteListError());
  }
};

export const markAsFavorite = (token, id) => async (dispatch) => {
  try {
    await axios.post(
      `https://flowrspot-api.herokuapp.com/api/v1/flowers/${id}/favorites`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch(favoriteList(token));
  } catch (error) {}
};

export const getComments = (id) => async (dispatch) => {
  try {
    dispatch(commentsRequest());
    const res = await axios.get(
      `https://flowrspot-api.herokuapp.com/api/v1/sightings/${id}/comments`
    );
    dispatch(commentsSuccess(res.data.comments));
  } catch (error) {
    dispatch(commentsFailed());
  }
};

export const addComment = (sighting_id, content, token) => async (dispatch) => {
  try {
    await axios.post(
      `https://flowrspot-api.herokuapp.com/api/v1/sightings/${sighting_id}/comments`,
      {
        content: content,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(getComments(sighting_id));
  } catch (error) {}
};

export const deleteComment = (sighting_id, id, token) => async (dispatch) => {
  try {
    await axios.delete(
      `https://flowrspot-api.herokuapp.com/api/v1/sightings/${sighting_id}/comments/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(getComments(sighting_id));
  } catch (error) {
    console.log(error);
  }
};

export const getSightings = () => async (dispatch) => {
  try {
    dispatch(sightingsRequest());
    const res = await axios.get(
      "https://flowrspot-api.herokuapp.com/api/v1/sightings"
    );
    dispatch(sightingsSuccess(res.data.sightings));
  } catch (error) {
    dispatch(sightingsError());
  }
};

export const getSightingDetails = (id) => async (dispatch) => {
  try {
    dispatch(sightingRequest());
    const res = await axios.get(
      `https://flowrspot-api.herokuapp.com/api/v1/sightings/${id}`
    );
    dispatch(sightingSuccess(res.data.sighting));
  } catch (error) {
    dispatch(sightingError());
  }
};

export const like = (id, token) => async (dispatch) => {
  await axios.post(
    `https://flowrspot-api.herokuapp.com/api/v1/sightings/${id}/likes`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  dispatch(getSightingDetails(id));
  dispatch(getLikes(id));
};
export const unlike = (id, token) => async (dispatch) => {
  await axios.delete(
    `https://flowrspot-api.herokuapp.com/api/v1/sightings/${id}/likes`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  dispatch(getSightingDetails(id));
  dispatch(getLikes(id));
};

export const getLikes = (id) => async (dispatch) => {
  try {
    dispatch(likesReq());
    const res = await axios.get(
      `https://flowrspot-api.herokuapp.com/api/v1/sightings/${id}/likes`
    );

    dispatch(likesSuccess(res.data.likes));
  } catch (error) {
    dispatch(likesError());
  }
};

export const getUserSightings = (id, token) => async (dispatch) => {
  try {
    dispatch(userSightingRequest());
    const res = await axios.get(
      `https://flowrspot-api.herokuapp.com/api/v1/users/${id}/sightings`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(userSightingSuccess(res.data.sightings));
  } catch (error) {
    dispatch(userSightingError());
  }
};

export const deleteSighting = (id, token, userId) => async (dispatch) => {
  await axios.delete(
    `https://flowrspot-api.herokuapp.com/api/v1/sightings/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  dispatch(getUserSightings(userId, token));
  dispatch(getSightings());
};

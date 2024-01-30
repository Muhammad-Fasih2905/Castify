import {useState, useEffect} from 'react';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';

import {appConfig} from '../Redux/config';

const API = axios.create({
  baseURL: appConfig.BASE_URL,
});

const usePortfilo = () => {
  const dispatch = useDispatch();
  const token = useSelector(state => state?.auth?.token);
  const {get_portfilo} = useSelector(state => state.portfilo);
  const [myRating, setMyRating] = useState(null);

  const postRating = async data => {
    console.log('data portfilo ==>', data);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const res = await API.post('portfolio/portfolioRating/', data, config);
      //   dispatch({
      //     type: 'UPDATE_PORTFOLIO',
      //     payload: {...get_portfilo, ratings: [{...res?.data?.rating}]},
      //   });
      setMyRating(res?.data?.rating);
    } catch (error) {
      console.log('Post Rating Error ===> ', error);
    }
  };

  const patchRating = async (data, id) => {
    console.log('patch data ==>', data, id);
    try {
      const config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await API.patch(
        `portfolio/portfolioRating/${id}/`,
        data,
        config,
      );
      //   dispatch({
      //     type: 'UPDATE_PORTFOLIO',
      //     payload: {
      //       ...get_portfilo,
      //       ratings: [{...res?.data?.rating}],
      //     },
      //   });
      setMyRating(res?.data?.rating);

      console.log('Rating Patch Res ===> ', res.data);
    } catch (error) {
      console.log('Patch Rating Error ===> ', error);
    }
  };
  const updateViewCount = async data => {
    console.log('data ==>', data);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await API.post('portfolio/portfolioView/', data, config);
      console.log('View Res ===> ', res);
    } catch (error) {
      console.log('View Error ===> ', error);
    }
  };

  return {
    myRating,
    setMyRating,
    postRating,
    patchRating,
    updateViewCount,
  };
};

export default usePortfilo;

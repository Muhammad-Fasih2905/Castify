import {useState, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {getChatMessageListServiceRequest} from '../Redux/service/chat';
import {API_GET_ALL_USER_CHAT_REQUEST} from '../Redux/action/chat';
import {Axios} from 'axios';

const useMessage = () => {
  const dispatch = useDispatch();

  const allChats = useSelector(state => state.chat.userChatList);

  const [loading, setLoading] = useState(false);
  const [laodMore, setLoadMore] = useState(false);

  const getChats = async () => {
    try {
      setLoading(true);

      const res = await Axios({
        url: getChatMessageListServiceRequest,
        method: 'GET',
      });

      dispatch({type: API_GET_ALL_USER_CHAT_REQUEST, payload: res});
    } catch (error) {
      console.log('Getting Chats Error ==> ', error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  //   const getLoadMore = async () => {
  //     if (laodMore || !allChats?.next) return;

  //     try {
  //       setLoadMore(true);

  //       const res = await axios({
  //         url: allChats?.next,
  //         method: "GET",
  //       });

  //       let newData = {
  //         ...allChats,
  //         data: allChats?.results.concat(res.resuts),
  //         next: res?.next,
  //       };

  //       dispatch({
  //         type: ADD_CHATS,
  //         payload: newData,
  //       });
  //     } catch (error) {
  //       console.log("Getting Error on Load more chats ", error);
  //       setLoadMore(false);
  //     } finally {
  //       setLoadMore(false);
  //     }
  //   };

  useFocusEffect(
    useCallback(() => {
      getChats();
    }, []),
  );

  return {
    allChats,
    loading,
    getChats,
    // getLoadMore,
  };
};

export default useMessage;

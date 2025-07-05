import axios from "axios"
import { useEffect } from "react"
import { serverUrl } from "../main"
import { useDispatch, useSelector } from "react-redux"
import { setMessages } from "../redux/messageSlice"



const getMessages=()=>{
    let dispatch=useDispatch();
    let {userData,selectedUser}=useSelector(state=>state.user);
    let {messages}=useSelector(state=>state.message);
    useEffect(()=>{
        const fetchMessages=async()=>{
            try{
        let result=await axios.get(`${serverUrl}/api/message/get/${selectedUser?._id}`,{
            withCredentials:true
        })
            dispatch(setMessages(result.data));


            }
            catch(error){
                console.log(error);

            }
            

        }
        fetchMessages();

    },[selectedUser,userData])

}



// const getMessages = () => {
//   const dispatch = useDispatch();
//   const { userData, selectedUser } = useSelector(state => state.user);

//   useEffect(() => {
//     const fetchMessages = async () => {
//       try {
//         if (!selectedUser?._id) return;

//         const result = await axios.get(
//           `${serverUrl}/api/message/get/${selectedUser._id}`,
//           { withCredentials: true }
//         );

//         dispatch(setMessages(result.data));
//       } catch (error) {
//         if (error.response?.status === 404) {
//           // No conversation yet, just set empty
//           dispatch(setMessages([]));
//         } else {
//           console.error("Message fetch error:", error);
//         }
//       }
//     };

//     fetchMessages();
//   }, [selectedUser, userData]);
// };

export default getMessages;
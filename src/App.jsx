import React, { useEffect, useRef ,useState,useMemo } from "react";
import { ZIM } from "zego-zim-web";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";


const App = () => {
  const zpRef = useRef(null);

// user--1-------------------------------
 const [userID] = useState(() => "situ" + Math.floor(Math.random()*100));
 const [userName] = useState(() => "ab" + userID);


  const appID = 1774545718;
  const serverSecret = "60de9154da7a06c322f2ec99742cc318";

 const TOKEN = useMemo(
   () =>
     ZegoUIKitPrebuilt.generateKitTokenForTest(
       appID,
       serverSecret,
       null,
       userID,
       userName,
     ),
   [userID, userName],
 );

  useEffect(() => {
    const zp = ZegoUIKitPrebuilt.create(TOKEN);
    zpRef.current = zp;
    zp.addPlugins({ ZIM });

    return () => {
      zp.destroy();
      zpRef.current = null;
    };
  }, [TOKEN]);

  function invite(callType) {
    const targetUser = {
      userID: prompt("Enter calle's UserID :"),
      userName: prompt("Enter calle's UserName :"),
    };
    zpRef.current
      .sendCallInvitation({
        callees: [targetUser],
        callType,
        timeout: 60, // Timeout duration (second). 60s by default, range from [1-600s].
      })
      .then((res) => {
        console.warn(res);
      })
      .catch((err) => {
        console.warn(err);
      });
  }

  return (
    <>
      <div className="h-screen w-full bg-black flex justify-center items-center">
        <div className="h-[70%] w-[50%] border-2 border-red-400 bg-blue-500 flex  flex-col justify-center items-center rounded-2xl">
          <h1>
            Username: <span className="text-white">{userName} </span>
          </h1>
          <h1>
            UserID: <span className="text-white">{userID} </span>
          </h1>
          <div className="flex  gap-13 mt-7">
            <button 
            onClick={()=> invite(ZegoUIKitPrebuilt.InvitationTypeVoiceCall)}
            className="text-white cursor-pointer bg-green-400 p-2 rounded-2xl active:scale-90 active:bg-green-300">
              Voice Call
            </button>
            <button 
            onClick={()=> invite(ZegoUIKitPrebuilt.InvitationTypeVideoCall)}
            className="text-white cursor-pointer bg-green-400 p-2 rounded-2xl active:scale-90 active:bg-green-300">
              Video Call
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;

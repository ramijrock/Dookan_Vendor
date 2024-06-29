import React, { useState } from "react";
import AppContext from "./appContext";

export default function State (props) {
    const [userData, setUserData] = useState(props.dataUser);

    const unsetUserData = () => setUserData(null);

    const stateValue = {
        userData,
        setUserData,
        unsetUserData
    };

    return (
        <AppContext.Provider value={stateValue}>
          {props.children}
        </AppContext.Provider>
    );
} 
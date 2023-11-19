"use client";
import { useEffect, useState } from "react";
import useServiceWorkerStore from "@/store/SWStore";


const ServiceWorkerRegister = () => {
    //const [subscription, setSubscription] = useState(null);
    // const [registration, setRegistration] = useState(null);

    const setRegistration = useServiceWorkerStore((state) => state.setRegistration)



    useEffect(() => {
        if ("serviceWorker" in navigator) {
            const serviceWorkerRegistraion = async () => {
                try {
                    const registration = await navigator.serviceWorker.register("/sw.js");
                    console.log("Service Worker registration successful with scope: ", registration.scope);
                    setRegistration(registration);

                } catch (err) {
                    console.log("Service Worker registration failed: ", err);
                }
            };
            serviceWorkerRegistraion();
        }
    }, []);

    return (
        <></>
    );
};

export default ServiceWorkerRegister;
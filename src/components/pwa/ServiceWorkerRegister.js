"use client";
import { useEffect, useState } from "react";
import Button from "../ui/Button";

const base64ToUint8Array = base64 => {
    const padding = '='.repeat((4 - (base64.length % 4)) % 4)
    const b64 = (base64 + padding).replace(/-/g, '+').replace(/_/g, '/')

    const rawData = window.atob(b64)
    const outputArray = new Uint8Array(rawData.length)

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
}

const ServiceWorkerRegister = () => {
    const [subscription, setSubscription] = useState(null);
    const [registration, setRegistration] = useState(null);

    const subscribeButtonOnClick = async event => {
        event.preventDefault()
        const sub = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: base64ToUint8Array(process.env.NEXT_PUBLIC_NOTIFICATION_KEY)
        })
        // TODO: you should call your API to save subscription data on server in order to send web push notification from server
        setSubscription(sub)
        // setIsSubscribed(true)
        console.log('web push subscribed!')
        console.log(JSON.stringify(sub))
    }

    const unsubscribeButtonOnClick = async event => {
        event.preventDefault()
        await subscription.unsubscribe()
        // TODO: you should call your API to delete or invalidate subscription data on server
        setSubscription(null)
        // setIsSubscribed(false)
        console.log('web push unsubscribed!')
    }

    const sendNotification = async (event) => {
        event.preventDefault()
        if (subscription == null) {
            console.error('web push not subscribed')
            return
        }

        await fetch('/api/notification', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                subscription: subscription
            })
        })
    }

    useEffect(() => {
        if ("serviceWorker" in navigator) {

            const serviceWorkerRegistraion = async () => {
                try {
                    const registration = await navigator.serviceWorker.register("/sw.js");
                    console.log("Service Worker registration successful with scope: ", registration.scope);

                    try {

                        const pushSubsciption = await registration.pushManager.getSubscription();
                        if (pushSubsciption && !(pushSubsciption.expirationTime && Date.now() > pushSubsciption.expirationTime - 5 * 60 * 1000)) {
                            setSubscription(pushSubsciption);
                            console.log(pushSubsciption);
                            // setIsSubscribed(true);
                        }
                    } catch (err) {
                        console.log("Push subscribtion err: " + err);
                    }

                    setRegistration(registration);

                } catch (err) {
                    console.log("Service Worker registration failed: ", err);
                }
            };
            serviceWorkerRegistraion();
        }

    }, []);



    return (
        <div className="flex justify-between my-4">
            {!subscription && <Button onClick={subscribeButtonOnClick}>subscribe</Button>}
            {subscription && <Button onClick={unsubscribeButtonOnClick}>unsubscribe</Button>}
            {subscription && <Button onClick={sendNotification}>test push</Button>}
        </div>
    );
};

export default ServiceWorkerRegister;
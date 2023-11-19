"use client";
import { useEffect, useState } from "react";
import useServiceWorkerStore from "@/store/SWStore";
import useAuthStore from "@/store/AuthStore";
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


const NotificationManager = () => {
    const registration = useServiceWorkerStore((state) => state.registration);
    const { id, user } = useAuthStore();
    const [isClient, setIsClient] = useState(false);
    const [subscription, setSubscription] = useState(null);

    useEffect(() => {
        if (registration === undefined) {
            return;
        }

        if (!registration) {
            setIsClient(true);
            return;
        };

        const swSubscription = async () => {
            try {
                const pushSubsciption = await registration.pushManager.getSubscription();
                if (pushSubsciption && !(pushSubsciption.expirationTime && Date.now() > pushSubsciption.expirationTime - 5 * 60 * 1000)) {
                    setSubscription(pushSubsciption);
                    console.log(pushSubsciption);
                }
            } catch (err) {
                console.log("Push subscribtion err: " + err);
            }
            setIsClient(true);
        }

        swSubscription();
    }, [registration]);

    const subscribeButtonOnClick = async event => {
        event.preventDefault()
        const sub = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: base64ToUint8Array(process.env.NEXT_PUBLIC_NOTIFICATION_KEY)
        })

        try {
            await fetch('/api/notification', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    action: 'SUBSCRIBE',
                    user: id,
                    subscription: sub
                })
            })

            setSubscription(sub);
            console.log('web push subscribed!')
            console.log(JSON.stringify(sub))
        } catch (err) {
            console.log(err);
        }

    }

    const unsubscribeButtonOnClick = async event => {
        event.preventDefault()
        await subscription.unsubscribe()

        try {
            await fetch('/api/notification', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    action: 'UNSUBSCRIBE',
                    user: id
                })
            })
        } catch (err) {
            console.log(err);
        }
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
                action: 'SEND_NOTIFICATION',
                user: id
            })
        })
    }

    if (!isClient || !user) {
        return <></>;
    }

    return (
        <div className="flex justify-around my-4 ">
            {!subscription && <Button onClick={subscribeButtonOnClick}>subscribe</Button>}
            {subscription && <Button onClick={unsubscribeButtonOnClick}>unsubscribe</Button>}
            {subscription && <Button onClick={sendNotification}>test push</Button>}
        </div>
    );
}

export default NotificationManager;
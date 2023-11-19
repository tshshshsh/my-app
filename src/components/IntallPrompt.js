"use client";

import { useEffect, useState } from "react";

const InstallPrompt = () => {
    const [installPrompt, setInstallPrompt] = useState(null);

    const installButtonClickHandler = async () => {
        if (!installPrompt) return;

        const result = await installPrompt.prompt();
        console.log(`Install prompt was: ${result.outcome}`);
    };

    useEffect(() => {
        window.addEventListener("beforeinstallprompt", (event) => {

            console.log('beforeinstallprompt');

            event.preventDefault();
            setInstallPrompt(event);
        });

        window.addEventListener("appinstalled", () => {
            console.log("Thank you for installing our app!");
            setInstallPrompt(null);
        });
    }, [])



    return (
        <div className="fixed bottom-0 right-0 my-2 mr-2">
            {
                installPrompt &&
                <button className="bg-green-600 px-1 py-1 rounded text-white"
                    onClick={installButtonClickHandler}>
                    Install app
                </button>
            }
        </div>
    );
};

export default InstallPrompt;
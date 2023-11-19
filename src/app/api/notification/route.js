import { NextResponse } from 'next/server';
import usersData from '@/app/dataUsers.json';
const webPush = require('web-push')
const fs = require('fs');


webPush.setVapidDetails(
    `mailto:${process.env.NOTIFICATION_EMAIL}`,
    process.env.NEXT_PUBLIC_NOTIFICATION_KEY,
    process.env.NOTIFICATION_PRIVATE_KEY
)

export async function POST(request) {
    const body = await request.json();
    const { action } = body;

    switch (action) {
        case 'SUBSCRIBE': {
            const { subscription, user } = body;

            if (!user || !subscription) {
                return NextResponse.json({ message: 'Incorrect request' }, { status: 500 })
            }

            const currentUser = usersData.users.find(({ name }) => name === user);

            if (!currentUser) {
                return NextResponse.json({ message: 'Wrong user name' }, { status: 500 })
            }
            console.log(currentUser);
            currentUser.webSubscription = subscription;

            fs.writeFileSync(process.cwd() + '/src/app/dataUsers.json', JSON.stringify(usersData));

            return NextResponse.json({ message: 'You successfully subscribed' });
        }

        case 'UNSUBSCRIBE': {
            const { user } = body;

            if (!user) {
                return NextResponse.json({ message: 'Incorrect request' }, { status: 500 })
            }

            const currentUser = usersData.users.find(({ name }) => name === user);

            if (!currentUser) {
                return NextResponse.json({ message: 'Wrong user name' }, { status: 500 })
            }

            delete currentUser.webSubscription;

            fs.writeFileSync(process.cwd() + '/src/app/dataUsers.json', JSON.stringify(usersData));

            return NextResponse.json({ message: 'You successfully unsubscribed' });
        }


        case 'SEND_NOTIFICATION':
            const { subscription } = body;
            console.log(subscription.endpoint);

            const notification = await webPush
                .sendNotification(
                    subscription,
                    JSON.stringify({
                        title: 'Your Title',
                        body: 'Your Notification ' + new Date(),
                    })
                );
            console.log(notification);
            //             .then(response => {
            //                 res.writeHead(response.statusCode, response.headers).end(response.body)
            //             })
            //             .catch(err => {
            //                 if ('statusCode' in err) {
            //                     res.writeHead(err.statusCode, err.headers).end(err.body)
            //                 } else {
            //                     console.error(err)
            //                     res.statusCode = 500
            //                     res.end()
            //                 }
            //             })


            return NextResponse.json({ message: 'Hello from Next.js!' });

        default:
            return NextResponse.json({ error: 'Unexpected value for action param' }, { status: 501 });
    }
}


// export (req, res) => {
//     if (req.method == 'POST') {
//         const { subscription } = req.body

//         webPush
//             .sendNotification(
//                 subscription,
//                 JSON.stringify({ title: 'Hello Web Push', message: 'Your web push notification is here!' })
//             )
//             .then(response => {
//                 res.writeHead(response.statusCode, response.headers).end(response.body)
//             })
//             .catch(err => {
//                 if ('statusCode' in err) {
//                     res.writeHead(err.statusCode, err.headers).end(err.body)
//                 } else {
//                     console.error(err)
//                     res.statusCode = 500
//                     res.end()
//                 }
//             })
//     } else {
//         res.statusCode = 405
//         res.end()
//     }
// }
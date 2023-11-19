import { NextResponse } from 'next/server';
const webPush = require('web-push')

webPush.setVapidDetails(
    `mailto:${process.env.NOTIFICATION_EMAIL}`,
    process.env.NEXT_PUBLIC_NOTIFICATION_KEY,
    process.env.NOTIFICATION_PRIVATE_KEY
)

export async function POST(request) {
    const body = await request.json();
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


    return NextResponse.json({ Test: 'QQQ' });
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
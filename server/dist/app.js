"use strict";
// import express, { Express } from 'express';
// const app: Express = express();
// const port = 3000;
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
console.log(1111);
const Strophe = require('strophe.js').Strophe;
console.log(222);
// اطلاعات کاربر XMPP فرستنده
const senderJID = 'admin';
const senderPassword = '123';
console.log(33333);
// اطلاعات کاربر XMPP مقصد
const recipientJID = 'user2@example.com';
console.log(44444);
// اطلاعات پوش نوتیفیکیشن
const notificationBody = 'Hello, XMPP!'; // متن پوش نوتیفیکیشن
const notificationTitle = 'MyApp'; // عنوان پوش نوتیفیکیشن
console.log(55555);
// ایجاد اتصال
const connection = new Strophe.Connection('http://127.0.0.1:9090/http-bind');
console.log(6666);
(function checkConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        yield connection.connect(senderJID, senderPassword, (status) => {
            console.log(777777);
            console.log('status', 1);
            if (status === Strophe.Status.CONNECTED) {
                console.log(8888);
                console.log('اتصال برقرار شد');
                // ارسال پوش نوتیفیکیشن
                const notification = {
                    id: 'notification_id',
                    title: notificationTitle,
                    body: notificationBody,
                    badge: 1 // تعداد بج‌ها (در این مثال 1 بج)
                };
                const message = new Strophe.Builder('message', { to: recipientJID })
                    .c('gcm', { xmlns: 'google:mobile:data' })
                    .t(JSON.stringify(notification));
                connection.send(message);
                // قطع اتصال پس از ارسال پوش نوتیفیکیشن
                connection.disconnect();
            }
            else if (status === Strophe.Status.DISCONNECTED) {
                console.log(9999);
                console.log('قطع شدید');
            }
        });
    });
})();
// رویداد برای وقتی که اتصال برقرار شد
// رویداد برای وقتی که اتصال قطع شد
connection.onDisconnect = () => {
    console.log('اتصال قطع شد');
};
// app.listen( port, () =>
// {
//     console.log( `Server is running onport : ${ port }` );
// } )

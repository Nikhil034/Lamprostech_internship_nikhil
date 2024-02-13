// Install with: npm install @trycourier/courier
import { CourierClient } from "@trycourier/courier";

const courier = new CourierClient({ authorizationToken: "pk_prod_3XT36A1KRRMG42GKMHGVPV7ZYN6Z" });

const { requestId } = await courier.send({
    message: {
        to: {
            email: "jaysojitra1011@gmail.com",
        },
        template: "G6SCXG7FXE4JPBPRMY5E0E2H9SZ0",
        data: {
            recipientName: "TestDev",
        },
    },
});


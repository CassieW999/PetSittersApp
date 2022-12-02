import * as Notifications from "expo-notifications";


const verifyPermission = async () => {
    const permissionStatus = await Notifications.getPermissionsAsync();
    if (permissionStatus.granted) {
        return true;
    }
    const requestedPermission = await Notifications.requestPermissionsAsync({
        ios: {
        allowBadge: true,
        },
    });
    return requestedPermission.granted;
};
    

export const scheduleNotificationHandler = async (posterEmail) => {
    try {
        const hasPermission = await verifyPermission();
        if (!hasPermission) {
        return;
        }
        await Notifications.scheduleNotificationAsync({
        content: {
            title: "You have a notification",
            body: `You accpted ${posterEmail} post`,
            color: "red",
            // data: { url: "https://www.google.ca" },
        },
        trigger: {
            seconds: 2,
        }, 
        });
    } catch (err) {
        console.log("Error:", err);
    }
};
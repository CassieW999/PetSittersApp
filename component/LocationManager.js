import { View, Image, Button } from "react-native";
import React, { useState } from "react";
import * as Location from "expo-location";
// import { getCurrentPositionAsync } from "expo-location";
import { MAPS_API_KEY } from "react-native-dotenv";
export default function LocationManager() {
  const [permissionResponse, requestPermission] =
    Location.useForegroundPermissions();
  const [location, setLocation] = useState(null);

  const verifyPermission = async () => {
    if (permissionResponse.granted) {
      return true;
    }
    const requestPermissionResponse = await requestPermission();
    return requestPermissionResponse.granted;
  };
  const locateUserHandler = async () => {
    try {
      const hasPermission = await verifyPermission();
      if (!hasPermission) {
        return;
      }
      const currentPosition = await Location.getCurrentPositionAsync();
      console.log(currentPosition);
      setLocation({
        latitude: currentPosition.coords.latitude,
        longitude: currentPosition.coords.longitude,
      });
    } catch (err) {
      console.log("locate user ", err);
    }
  };

  return (
    <View>
      <Button title="Current Location" onPress={locateUserHandler} />
      {location && (
        <Image
          source={{
            uri: `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${location.latitude},${location.longitude}&key=${MAPS_API_KEY}`,
          }}
          style={{ width: "100%", height: 150 }}
        />
      )}
    </View>
  );
}
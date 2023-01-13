import { Text, View, FlatList, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectTravelTimeInformation } from "../slices/navSlice";

const data = [
  {
    id: "Flash-X-123",
    title: "Flash X",
    multiplier: 1,
    image: "https://links.papareact.com/3pn",
  },
  {
    id: "Flash-XL-123",
    title: "Flash XL",
    multiplier: 1.2,
    image: "https://links.papareact.com/5w8",
  },
  {
    id: "Flash-LUX-123",
    title: "Flash LUX",
    multiplier: 1.75,
    image: "https://links.papareact.com/7pf",
  },
];

const SURGE_CHARGE_RATE = 15;

const RideOptionsCard = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);

  console.log(travelTimeInformation?.distance.value);
  return (
    <SafeAreaView className="bg-white flex-grow">
      <View>
        <TouchableOpacity
          className="absolute top-3 left-5 p-3 z-50 rounded-full"
          onPress={() => navigation.navigate("NavigateCard")}
        >
          <Icon name="chevron-left" type="font-awesome" size={18} />
        </TouchableOpacity>
        <Text className="text-center py-5 text-xl">
          Select a Ride - {travelTimeInformation?.distance?.text}
        </Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item: { id, title, multiplier, image }, item }) => (
          <TouchableOpacity
            onPress={() => setSelected(item)}
            className={
              id === selected?.id
                ? "flex-row items-center justify-between px-10 bg-gray-200 space-x-3"
                : "flex-row items-center space-x-3 justify-between px-10"
            }
          >
            <Image
              style={{
                width: 100,
                flex: 1,
                height: 100,
                resizeMode: "contain",
              }}
              source={{ uri: image }}
            />
            <View className="-ml-6 flex-1">
              <Text className="text-xl font-semibold">{title}</Text>
              <Text>{travelTimeInformation?.duration?.text} Travel Time</Text>
            </View>

            <Text className="text-xl flex-1">
              {Math.round(
                (travelTimeInformation?.distance.value *
                  SURGE_CHARGE_RATE *
                  multiplier) /
                  100
              )}{" "}
              NGN
            </Text>
          </TouchableOpacity>
        )}
      />
      <View>
        <TouchableOpacity
          className={!selected ? "bg-gray-500" : "bg-black"}
          disabled={!selected}
        >
          <Text className="text-center text-white text-xl py-3 m-3">
            Choose {selected?.title}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RideOptionsCard;

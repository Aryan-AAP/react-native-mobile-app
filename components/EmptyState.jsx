import { router } from "expo-router";
import { View, Text, Image } from "react-native";

import { images } from "../constants";
import Whyerrorinbutton from "./Whyerrorinbutton";
// import Whyerrorinbutton from "../../components/Whyerrorinbutton";

const EmptyState = ({ title, subtitle }) => {
  return (
    <View className="flex justify-center items-center  px-4">
      <Image
        source={images.empty}
        resizeMode="contain"
        className="w-[270px] h-[216px]"
      />

      <Text className="text-sm font-pmedium text-gray-100">{title}</Text>
      <Text className="text-xl text-center font-psemibold text-white mt-2">
        {subtitle}
      </Text>

      <Whyerrorinbutton
        title="Create Video"
        handlePress={() => router.push("/create")}
        containerStyles="w-full my-5"
      />
    </View>
  );
};

export default EmptyState;
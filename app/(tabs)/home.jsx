import {
  View,
  Text,
  FlatList,
  Image,
  RefreshControl,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import SearchInput from "../../components/SearchInput";
import Trending from "../../components/Trending";
import EmptyState from "../../components/EmptyState";
import { getAllPosts, getLatestPosts } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import VideoCard from "../../components/VideoCard";

const Home = () => {
const {data:posts,refetch}=useAppwrite(getAllPosts);
const {data:latestPost}=useAppwrite(getLatestPosts);
  
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
await refetch()
    setRefreshing(false)
  };
console.log(posts);   

  return (
    <SafeAreaView className="bg-primary h-full ">
      <FlatList
        refreshControl={ 
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={posts}  
        keyExtractor={(item) => item.title}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6 ">
            <View className=" justify-between items-start flex-row mb-6 ">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>

                <Text className="font-psemibold text-2xl text-gray-100">
                  Aryan  Pardeshi 
                </Text>
              </View>

              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>
            <SearchInput />
            <View className="w-full pt-5 pb-8 flex-1 ">
              <Text className=" text-gray-100 font-pregular mb-3 text-lg ">
                Latest Videos
              </Text>

              <Trending posts={latestPost||[]} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="Be the first one to upload a video"
          />
        )}
        renderItem={({ item }) => (
          <VideoCard video={item} />
        )}
      />
    </SafeAreaView>
  );
};

export default Home;

import type { FC } from "react";
import React from "react";
import { Image } from "react-native";
import { Text, TouchableOpacity, View } from "react-native";

type Item = { id: string; text: string; done: boolean };

type Props = {
  item: Item;
  toggle: (id: string) => void;
  remove: (id: string) => void;
  dark: boolean;
};

const TodoItem: FC<Props> = ({ item, toggle, remove, dark }) => {
  const colorClasses = `${dark ? (item.done ? "text-[#4D5067]" : "text-white") : item.done ? "text-[#4D5067]" : "text-black"}`;
  return (
    <View
      className={`border-b-[2px] ${dark ? "border-b-[#393A4B]" : "border-b-[#E3E4F1]"} flex-row items-center p-2 h-16`}
    >
      <View className="bg-gradient-to-br from-[#55DDFF] to-[#C058F3] p-[2px] rounded-full">
      <TouchableOpacity
        activeOpacity={0.8}
        accessibilityRole="button"
        className={`mr-3 h-6 w-6 rounded-full items-center justify-center ${
          dark ? (item.done ? "" : "border border-slate-600") : item.done ? "" : "border border-slate-300" 
        } ${!item.done ? "border hover:border-[#, #C058F3]" : ""}` }
        onPress={() => toggle(item.id)}
      >
        {item.done && (
          <Image source={require('../assets/images/checked.png')} className="w-full h-full" />
        )}
      </TouchableOpacity>
      </View>
      <Text
        className={`flex-1 ${item.done ? "line-through" : ""} ${colorClasses}`}
      >
        {item.text}
      </Text>
      <TouchableOpacity onPress={() => remove(item.id)} className="px-2 py-1">
        <Text className="text-sm">X</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TodoItem;

import type { FC } from 'react';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

type Item = { id: string; text: string; done: boolean };

type Props = {
  item: Item;
  toggle: (id: string) => void;
  remove: (id: string) => void;
  dark: boolean;
};

const TodoItem: FC<Props> = ({ item, toggle, remove, dark }) => {
  return (
    <View className={`flex-row items-center p-2 rounded-md mb-1 ${item.done ? 'opacity-70' : ''}`}>
      <TouchableOpacity onPress={() => toggle(item.id)} className="w-7 items-center">
        <Text>{item.done ? '✔' : '○'}</Text>
      </TouchableOpacity>
      <Text className={`flex-1 ${item.done ? 'line-through text-[#6b7280]' : ''}`}>{item.text}</Text>
      <TouchableOpacity onPress={() => remove(item.id)} className="px-2 py-1 rounded-md border border-[rgba(0,0,0,0.06)]">
        <Text className="text-sm">Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TodoItem;

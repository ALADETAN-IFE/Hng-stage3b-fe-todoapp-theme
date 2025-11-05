import type { FC } from 'react';
import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

type Props = {
  text: string;
  setText: (v: string) => void;
  onSubmit: () => void;
  dark: boolean;
};

const TodoInput: FC<Props> = ({ text, setText, onSubmit, dark }) => {
  return (
    <View className="flex-row items-center mb-3">
      <TextInput
        className={`${dark ? 'text-[#e6eef8] border-white/6' : 'text-[#111827] border-slate-900/6'} flex-1 p-2 rounded-md border bg-transparent`}
        value={text}
        onChangeText={setText}
        placeholder="What needs to be done?"
        placeholderTextColor={dark ? '#9aa6bd' : '#6b7280'}
        onSubmitEditing={onSubmit}
        returnKeyType="done"
        accessibilityLabel="New todo"
      />
      <TouchableOpacity className="ml-2 px-3 py-2 rounded-md bg-blue-600" onPress={onSubmit} accessibilityRole="button">
        <Text className="text-white">Add</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TodoInput;

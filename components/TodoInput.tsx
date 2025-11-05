import type { FC } from 'react';
import React from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';

type Props = {
  text: string;
  setText: (v: string) => void;
  onSubmit: () => void;
  dark: boolean;
};

const TodoInput: FC<Props> = ({ text, setText, onSubmit, dark }) => {
  return (
    <View className="w-full h-16">
      <View
        className={`flex-row items-center rounded-[5px] px-4 py-3 w-full ${dark ? "bg-[#25273D]" : "bg-white"}`}
        style={{ alignItems: 'center' }}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          accessibilityRole="button"
          className={`h-5 w-5 rounded-full items-center justify-center ${
            dark ? 'border border-slate-600' : 'border border-slate-300'
          }`}
          onPress={() => { }}
        >
          {text.length > 0 ? (
            <View className="h-3 w-3 rounded-full bg-blue-500" />
          ) : (
            <View className="h-3 w-3 rounded-full bg-transparent" />
          )}
        </TouchableOpacity>
        <TextInput
          className={`flex-1 ml-3 text-sm ${dark ? 'text-[#e6eef8]' : 'text-[#111827]'} outline-none caret-[#3A7CFD]`}
          value={text}
          onChangeText={setText}
          placeholder="Create a new todo…"
          placeholderTextColor={dark ? '#9aa6bd' : '#9ca3af'}
          onSubmitEditing={onSubmit}
          returnKeyType="done"
          accessibilityLabel="New todo"
          underlineColorAndroid="transparent"
        />
      </View>
    </View>
  );
};

export default TodoInput;

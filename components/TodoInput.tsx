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
    <View className="w-full mb-3">
      {/* Container: dark rounded bar matching the design */}
      <View
        className={`flex-row items-center rounded-2xl px-4 py-3 w-full ${
          dark ? 'bg-[#111827]' : 'bg-white/5'
        }`}
        style={{ alignItems: 'center' }}
      >
        {/* Left circular checkbox / handle */}
        <TouchableOpacity
          activeOpacity={0.8}
          accessibilityRole="button"
          className={`h-5 w-5 rounded-full items-center justify-center ${
            dark ? 'border border-slate-600' : 'border border-slate-300'
          }`}
          onPress={() => {
            /* optional: could toggle completion of a draft or focus the input */
          }}
        >
          {/* small filled dot when there's text to hint activity */}
          {text.length > 0 ? (
            <View className="h-3 w-3 rounded-full bg-blue-500" />
          ) : (
            <View className="h-3 w-3 rounded-full bg-transparent" />
          )}
        </TouchableOpacity>

        {/* Text input that visually centers text similar to the screenshot */}
        <TextInput
          className={`flex-1 ml-3 text-sm ${dark ? 'text-[#e6eef8]' : 'text-[#111827]'}`}
          value={text}
          onChangeText={setText}
          placeholder="Currently typing"
          placeholderTextColor={dark ? '#9aa6bd' : '#9ca3af'}
          onSubmitEditing={onSubmit}
          returnKeyType="done"
          accessibilityLabel="New todo"
          underlineColorAndroid="transparent"
        />

        {/* Subtle Add button — kept small to match compact UI */}
        <TouchableOpacity
          className="ml-3 px-3 py-1 rounded-md"
          onPress={onSubmit}
          accessibilityRole="button"
          style={{ backgroundColor: '#2563EB' }}
        >
          <Text className="text-white text-sm">Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TodoInput;

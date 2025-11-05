// export { default } from './_index_new';

import { LinearGradient } from "expo-linear-gradient";
import type { FC } from "react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Alert, FlatList, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import TodoInput from "../components/TodoInput";
import TodoItem from "../components/TodoItem";
import {
  clearCompletedTodos,
  loadTodos,
  addTodo as persistAddTodo,
  deleteTodo as persistDeleteTodo,
  updateTodo as persistUpdateTodo,
  saveTodos,
} from "../lib/AsynStorage";

type Todo = { id: string; text: string; done: boolean };

const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const stored = await loadTodos();
        if (mounted) setTodos(stored);
      } catch {
        // ignore
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    saveTodos(todos).catch(() => {});
  }, [todos]);

  const add = useCallback((text: string) => {
    const t: Todo = { id: Math.random().toString(36).slice(2), text, done: false };
    setTodos((s) => {
      const next = [t, ...s];
      persistAddTodo(t).catch(() => {});
      return next;
    });
  }, []);

  const toggle = useCallback((id: string) => {
    setTodos((s) => {
      const next = s.map((t) => (t.id === id ? { ...t, done: !t.done } : t));
      const changed = next.find((t) => t.id === id);
      if (changed) {
        persistUpdateTodo(id, { done: changed.done }).catch(() => {});
      }
      return next;
    });
  }, []);

  const remove = useCallback((id: string) => {
    setTodos((s) => {
      const next = s.filter((t) => t.id !== id);
      persistDeleteTodo(id).catch(() => {});
      return next;
    });
  }, []);

  const clearCompleted = useCallback(() => {
    setTodos((s) => {
      const next = s.filter((t) => !t.done);
      clearCompletedTodos().catch(() => {});
      return next;
    });
  }, []);

  return { todos, add, toggle, remove, clearCompleted } as const;
};

const AppScreen: FC = () => {
  const { todos, add, toggle, remove, clearCompleted } = useTodos();
  const [text, setText] = useState("");
  const [dark, setDark] = useState(false);

  const remaining = useMemo(() => todos.filter((t) => !t.done).length, [todos]);

  const onSubmit = useCallback(() => {
    const value = text.trim();
    if (!value) return;
    add(value);
    setText("");
  }, [text, add]);

  const onClear = useCallback(() => {
    if (todos.some((t) => t.done)) {
      clearCompleted();
    } else {
      Alert.alert("No completed todos");
    }
  }, [todos, clearCompleted]);

  return (
    <SafeAreaView className={`${dark ? "bg-transparent" : "bg-transparent"} flex-1 relative w-full`}>
      <ImageBackground
        source={dark ? require("../assets/images/darkModeBg.png") : require("../assets/images/lightModeBg.png")}
        resizeMode="cover"
        className="w-full h-[200px] md:h-[300px] items-center"
        style={{ width: '100%' }}
      >
        <LinearGradient colors={dark ? ["#3710BD", "#A42395"] : ["#5596FF", "#AC2DEB"]} locations={[0, 1]} style={styles.gradientOverlay} pointerEvents="none" className="opacity-50"/>

        <Header dark={dark} setDark={setDark} />
      </ImageBackground>

      <SafeAreaView className="w-screen absolute top-[108px] md:top-[158px] h-full items-center">
        <View className={`${dark ? "bg-[#071021]" : "bg-[#f3f4f6]"} rounded-lg p-3 relative w-[327px] md:w-[540px]`}>
          <TodoInput text={text} setText={setText} onSubmit={onSubmit} dark={dark} />

          <View style={{ minHeight: 80 }}>
            {todos.length === 0 ? (
              <Text className={`${dark ? "text-[#9aa6bd]" : "text-[#6b7280]"}`}>No todos yet.</Text>
            ) : (
              <FlatList data={todos} keyExtractor={(item) => item.id} renderItem={({ item }) => <TodoItem item={item as any} toggle={toggle} remove={remove} dark={dark} />} />
            )}
          </View>

          <View className="flex-row justify-between items-center mt-3">
            <Text className={`${dark ? "text-[#9aa6bd]" : "text-[#6b7280]"}`}>{todos.length} total</Text>
            <View className="flex-row space-x-2">
              <TouchableOpacity className="px-3 py-1 rounded-md border" onPress={() => { setText(""); }}>
                <Text className="text-sm">Clear input</Text>
              </TouchableOpacity>
              <TouchableOpacity className="px-3 py-1 rounded-md border" onPress={onClear}>
                <Text className="text-sm">Clear completed</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default AppScreen;

const styles = StyleSheet.create({
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
});

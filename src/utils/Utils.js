import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

export const readData = async (key) => {
    try {
      let rawData = await AsyncStorage.getItem(key);
      return rawData !== null ? JSON.parse(rawData) : null;
    } catch (e) {
      throw new Error("failed to retrieve data from storage");
    }
};


export const writeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      throw new Error("failed to write data in storage");
    }
};

export const clearUserData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    throw new Error("failed to remove data from device");
  }
};
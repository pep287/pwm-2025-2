import * as eva from "@eva-design/eva";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ApplicationProvider, Layout, Text } from "@ui-kitten/components";
import { Slot } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <ApplicationProvider {...eva} theme={eva.light}>
        <Layout style={styles.header}>
          <Text category="s1" style={styles.headerText}>
            index
          </Text>
        </Layout>

        <Slot />
      </ApplicationProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 56,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    zIndex: 10,
  },
  headerText: {
    color: "#111111",
    fontWeight: "700",
  },
});

import { addTask, deleteTask, getTasks, updateTask } from "@/api";
import { CardTask } from "@/components/CardTask";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Divider,
  Input,
  Layout,
  List,
  Text,
} from "@ui-kitten/components";
import { useState } from "react";
import { StyleSheet } from "react-native";

export default function TaskList() {
  const [description, setDescription] = useState("");
  const queryClient = useQueryClient();
  const { data, isFetching, error, isPending } = useQuery({
    queryKey: ["todos"],
    queryFn: getTasks,
  });

  const addMutation = useMutation({
    mutationFn: addTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      setDescription("");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  if (isFetching) {
    return (
      <Layout style={styles.center}>
        <Text>Loading...</Text>
      </Layout>
    );
  }
  if (error) {
    return (
      <Layout style={styles.center}>
        <Text>Error: {error.message}</Text>
      </Layout>
    );
  }
  if (!data) {
    return (
      <Layout style={styles.center}>
        <Text>No data available</Text>
      </Layout>
    );
  }

  return (
    <Layout style={styles.container}>
      <Text category="h5" style={styles.title}>
        Task List
      </Text>

      <Layout style={styles.row}>
        <Input
          placeholder="Add a task"
          value={description}
          onChangeText={setDescription}
          style={styles.input}
          status="basic"
        />
        <Button
          onPress={() => addMutation.mutate({ description })}
          appearance="ghost"
          style={styles.addButton}
        >
          Add
        </Button>
      </Layout>

      <Divider style={styles.divider} />

      <List
        style={styles.list}
        data={data.results || []}
        renderItem={({ item }) => (
          <CardTask
            key={item.objectId}
            task={item}
            onDelete={deleteMutation.mutate}
            onCheck={updateMutation.mutate}
          />
        )}
      />

      {isPending && (
        <Layout style={styles.center}>
          <Text>Pending...</Text>
        </Layout>
      )}
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: "#f2f0e6",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
  },
  title: {
    marginBottom: 12,
    color: "#111",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  input: {
    flex: 1,
    backgroundColor: "#fff",
    color: "#000",
  },
  addButton: {
    minWidth: 80,
  },
  divider: {
    marginVertical: 8,
  },
  list: {
    flex: 1,
  },
});

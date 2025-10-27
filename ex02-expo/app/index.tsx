import * as eva from "@eva-design/eva";
import {
  ApplicationProvider,
  Avatar,
  Button,
  Card,
  Input,
  Layout,
  Modal,
  Text,
} from "@ui-kitten/components";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Keyboard,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";

// import { FlatListExample } from "@/components/FlatListExample";
import { SectionListExample } from "@/components/SectionListExample";

export default function Index() {
  const router = useRouter();
  const [idade, onChangeIdade] = useState("");
  const [showDetails, setShowDetails] = useState(true);
  const anoNasc = new Date().getFullYear() - parseInt(idade);

  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  function showDialog(msg: string) {
    setDialogMessage(msg);
    setDialogVisible(true);
  }

  function hideDialog() {
    setDialogVisible(false);
    setDialogMessage("");
  }

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      {/* Fecha o teclado ao tocar fora do input */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Layout style={styles.container}>
          <Text style={styles.title} category="h1">
            Olá Turma!
          </Text>

          <Avatar
            style={[
              styles.avatar,
              { width: 180, height: 180, borderRadius: 90 },
            ]}
            source={require("@/assets/images/avatar.jpg")}
          />

          <Pressable onPress={() => setShowDetails(!showDetails)}>
            <Text style={styles.text} numberOfLines={showDetails ? 0 : 1}>
              Este é um App de exemplo da disciplina Programação Web e Mobile do
              Curso de Ciência da Computação da Universidade Católica de
              Pernambuco (semestre 2025.2)
            </Text>
          </Pressable>

          {!isNaN(anoNasc) && (
            <Text style={styles.text}>Você nasceu em {anoNasc}</Text>
          )}

          <Input
            style={[styles.input, styles.inputWhite]}
            placeholder="Qual a sua idade?"
            keyboardType="numeric"
            value={idade}
            onChangeText={onChangeIdade}
          />

          <Layout style={styles.buttonsContainer}>
            <Button
              appearance="ghost"
              status="basic"
              onPress={() => showDialog("Botão OK pressionado")}
              style={{ flex: 1, marginRight: 8 }}
            >
              OK
            </Button>
            <Button
              appearance="ghost"
              status="basic"
              onPress={() => showDialog("Botão Cancel pressionado")}
              style={{ flex: 1 }}
            >
              Cancel
            </Button>
          </Layout>

          <Button
            appearance="ghost"
            status="basic"
            onPress={() => router.navigate("/taskList")}
            style={{ marginTop: 10 }}
          >
            Ir para Lista de Tarefas
          </Button>

          <Layout style={styles.space} />

          <Modal
            visible={dialogVisible}
            backdropStyle={styles.backdrop}
            onBackdropPress={hideDialog}
          >
            <Card>
              <Text style={styles.dialogText}>{dialogMessage}</Text>
              <Layout
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginTop: 12,
                }}
              >
                <Button appearance="ghost" status="basic" onPress={hideDialog}>
                  OK
                </Button>
              </Layout>
            </Card>
          </Modal>
        </Layout>
      </TouchableWithoutFeedback>
    </ApplicationProvider>
  );
}

// Exemplos de Listas
function App() {
  // return <FlatListExample />;
  return <SectionListExample />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "beige",
    paddingTop: 24,
    paddingHorizontal: 15,
    paddingBottom: 0,
  },

  title: {
    fontSize: 42,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#111",
  },
  avatar: {
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    color: "#111",
    marginTop: 30,
  },
  input: {
    height: 45,
    width: 200,
    margin: 12,
    padding: 0,
  },
  inputWhite: {
    backgroundColor: "#fff",
    color: "#000",
  },
  space: {
    height: 0,
    width: "100%",
    backgroundColor: "transparent",
  },
  dialogText: {
    color: "#000",
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 250,
    alignItems: "center",
    padding: 0,
    elevation: 0,
  },
});
